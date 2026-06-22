/**
 * API Client with Error Handling and Retry Logic
 * ⚠️ IMPORTANT: This is a client-side utility.
 * For Gemini API calls, use a server-side proxy (see geminiService.ts)
 */

import { API, TIMING } from '@/utils/constants';
import type { ApiError, ApiResponse } from '@/types';

interface FetchOptions extends RequestInit {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private retryConfig: RetryConfig;
  private requestCache: Map<string, { data: unknown; timestamp: number }> = new Map();

  constructor() {
    this.baseUrl = API.BASE_URL;
    this.defaultTimeout = TIMING.API_CALL_TIMEOUT_MS;
    this.retryConfig = {
      maxAttempts: API.RETRY.MAX_ATTEMPTS,
      initialDelay: API.RETRY.INITIAL_DELAY_MS,
      maxDelay: API.RETRY.MAX_DELAY_MS,
      backoffMultiplier: API.RETRY.BACKOFF_MULTIPLIER,
    };
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(
    url: string,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    url: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown>(
    url: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(
    url: string,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * Core request method with retry logic
   */
  private async request<T = unknown>(
    url: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retryCount = this.retryConfig.maxAttempts,
      retryDelay = this.retryConfig.initialDelay,
      ...fetchOptions
    } = options;

    const cacheKey = `${fetchOptions.method || 'GET'}:${url}`;
    const cached = this.requestCache.get(cacheKey);

    // Return cached response if fresh
    if (cached && Date.now() - cached.timestamp < TIMING.API_CALL_TIMEOUT_MS) {
      return {
        data: cached.data as T,
        success: true,
        timestamp: Date.now(),
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const fullUrl = this.baseUrl ? `${this.baseUrl}${url}` : url;
      const response = await fetch(fullUrl, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await this.handleErrorResponse(response);
        return {
          error,
          success: false,
          timestamp: Date.now(),
        };
      }

      const data = await response.json() as T;

      // Cache successful response
      if (fetchOptions.method === 'GET') {
        this.requestCache.set(cacheKey, { data, timestamp: Date.now() });
      }

      return {
        data,
        success: true,
        timestamp: Date.now(),
      };
    } catch (error) {
      if (retryCount > 0 && this.shouldRetry(error)) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.request<T>(url, {
          ...options,
          retryCount: retryCount - 1,
          retryDelay: Math.min(
            retryDelay * this.retryConfig.backoffMultiplier,
            this.retryConfig.maxDelay
          ),
        });
      }

      const apiError = this.handleError(error);
      return {
        error: apiError,
        success: false,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Handle error response from server
   */
  private async handleErrorResponse(response: Response): Promise<ApiError> {
    try {
      const data = await response.json();
      return {
        message: data.message || `HTTP ${response.status}`,
        code: data.code || `HTTP_${response.status}`,
        status: response.status,
        details: data.details,
        timestamp: Date.now(),
      };
    } catch {
      return {
        message: `HTTP ${response.status}: ${response.statusText}`,
        code: `HTTP_${response.status}`,
        status: response.status,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Handle client-side errors
   */
  private handleError(error: unknown): ApiError {
    if (error instanceof TypeError) {
      if (error.message.includes('abort')) {
        return {
          message: 'Request timeout',
          code: 'TIMEOUT',
          status: 408,
          timestamp: Date.now(),
        };
      }
      if (error.message.includes('fetch')) {
        return {
          message: 'Network error',
          code: 'NETWORK_ERROR',
          status: 0,
          timestamp: Date.now(),
        };
      }
    }

    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 'UNKNOWN_ERROR',
      status: 500,
      timestamp: Date.now(),
    };
  }

  /**
   * Determine if error is retryable
   */
  private shouldRetry(error: unknown): boolean {
    if (error instanceof TypeError) {
      return error.message.includes('abort') || error.message.includes('fetch');
    }
    return false;
  }

  /**
   * Clear cache
   */
  clearCache(url?: string): void {
    if (url) {
      this.requestCache.delete(url);
    } else {
      this.requestCache.clear();
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;