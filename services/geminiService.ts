import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the AI client
// Note: In a real production app, ensure this is handled via a backend proxy to hide keys if not using the secure user-provided flow.
// For this demo portfolio, we assume the env var is present as per instructions.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "MorphBot", the intelligent assistant for a Senior Web Developer's portfolio.
The developer's name is Alex.
Key Traits of Alex:
- Expert in React, TypeScript, Node.js, and UI/UX Design.
- Loves creating fluid, interactive web experiences (like this portfolio).
- Has 8+ years of experience.
- Available for freelance and full-time roles.

Your goal is to answer visitor questions about Alex's skills, experience, and availability.
Keep answers concise, professional, yet slightly witty and tech-savvy.
If asked to contact Alex, suggest they use the form or email alex@example.com.
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      return "I'm currently in offline mode (API Key missing). But I can tell you Alex is great!";
    }

    const model = 'gemini-2.5-flash';

    // Convert history to chat format expected by SDK if needed, 
    // but for a simple generateContent call with context, we can just construct the prompt 
    // or use the chat API. Let's use the Chat API for better context management.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I received your message but couldn't generate a text response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be having trouble connecting to the neural network. Please try again later.";
  }
};
