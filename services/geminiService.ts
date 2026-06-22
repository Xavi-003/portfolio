/**
 * Gemini API Service
 * ⚠️ SECURITY WARNING: API calls should go through a server-side proxy!
 * This file shows the client-side implementation.
 * 
 * RECOMMENDED: Use a backend endpoint that proxies Gemini API calls
 * to keep your API key secure (never expose in frontend code).
 */

import { apiClient } from './apiClient';
import type { Message, GeminiRequest, GeminiGenerateResponse, ApiError } from '@/types';
import { TIMING, ERROR_MESSAGES } from '@/utils/constants';

interface SendMessageOptions {
  temperature?: number;
  maxTokens?: number;
  onError?: (error: ApiError) => void;
}

/**
 * Convert application messages to Gemini format
 */
function convertToGeminiMessages(messages: Message[]): Array<{
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}> {
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));
}

/**
 * Send message to Gemini API via server proxy
 * 
 * IMPORTANT: This assumes you have a backend endpoint at /api/chat
 * that handles the Gemini API call securely.
 */
export async function sendMessageToGemini(
  messages: Message[],
  userMessage: string,
  options: SendMessageOptions = {}
): Promise<string> {
  const { temperature = 0.7, maxTokens = 1024, onError } = options;

  try {
    // Call YOUR backend endpoint instead of Gemini directly
    const response = await apiClient.post<{ response: string }>(
      '/api/chat', // This should be YOUR backend proxy endpoint
      {
        messages: convertToGeminiMessages([...messages, {
          role: 'user',
          text: userMessage,
          timestamp: Date.now(),
        }]),
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
      },
      { timeout: TIMING.API_CALL_TIMEOUT_MS }
    );

    if (!response.success || !response.data) {
      const error = response.error || {
        message: ERROR_MESSAGES.NO_RESPONSE,
        code: 'NO_RESPONSE',
        status: 500,
        timestamp: Date.now(),
      };
      onError?.(error);
      throw error;
    }

    return response.data.response;
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Gemini API error:', apiError);
    onError?.(apiError);
    throw apiError;
  }
}

/**
 * Stream response from Gemini (for real-time chat)
 * Requires Server-Sent Events support
 */
export async function* streamGeminiResponse(
  messages: Message[],
  userMessage: string,
  options: SendMessageOptions = {}
): AsyncGenerator<string, void, unknown> {
  const { temperature = 0.7, maxTokens = 1024 } = options;

  try {
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: convertToGeminiMessages([...messages, {
          role: 'user',
          text: userMessage,
          timestamp: Date.now(),
        }]),
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              yield data.text;
            }
          } catch (e) {
            // Parse error, continue
          }
        }
      }

      buffer = lines[lines.length - 1];
    }
  } catch (error) {
    console.error('Stream error:', error);
    throw error;
  }
}

/**
 * Example of how to implement the backend proxy:
 * 
 * // server/api.ts (Node.js/Express)
 * import { GoogleGenerativeAI } from '@google/generative-ai';
 * 
 * const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 * 
 * app.post('/api/chat', async (req, res) => {
 *   try {
 *     const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
 *     const result = await model.generateContent({
 *       contents: req.body.messages,
 *       generationConfig: req.body.generationConfig,
 *     });
 *     
 *     const responseText = result.response.text();
 *     res.json({ response: responseText });
 *   } catch (error) {
 *     res.status(500).json({ 
 *       message: 'API error',
 *       error: error.message 
 *     });
 *   }
 * });
 */

export default { sendMessageToGemini, streamGeminiResponse };