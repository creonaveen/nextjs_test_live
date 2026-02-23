import { cookies } from 'next/headers';

import { configuration } from '@/environment/configuration';
import logger from '@/utils/logger-server';

import { apiUrls, buildApiUrl } from '../api-urls';

// Auth response type
export interface AuthResponse {
  websid: string;
  [key: string]: unknown; // Allow other properties that may exist
}

const AUTH_TIMEOUT_MS = 7000;

async function fetchWithTimeout(url: string, headers: Record<string, string>): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      void logger.error('Auth request timeout', {
        url,
        timeout: AUTH_TIMEOUT_MS,
        component: 'auth-api-service-edge',
        errorType: 'timeout',
      });
      throw new Error(
        `Authentication request timed out for after ${AUTH_TIMEOUT_MS / 1000} seconds`
      );
    }
    void logger.error(
      'Auth request network error',
      error instanceof Error ? error : new Error(String(error)),
      {
        url,

        component: 'auth-api-service-edge',
        errorType: 'network',
        errorName: error instanceof Error ? error.name : 'UnknownError',
        errorMessage: error instanceof Error ? error.message : String(error),
      }
    );
    throw new Error(`Authentication network error for after ${AUTH_TIMEOUT_MS / 1000} seconds`);
  }
}

function logUnexpectedAuthError(error: unknown): void {
  void logger.error(
    'Unexpected auth service error',
    error instanceof Error ? error : new Error(String(error)),
    {
      component: 'auth-api-service-edge',
      errorType: 'unexpected',
      errorName: error instanceof Error ? error.constructor.name : 'UnknownError',
    }
  );
}

async function parseAuthJson(
  response: Response,

  url: string
): Promise<AuthResponse> {
  try {
    return (await response.json()) as AuthResponse;
  } catch (parseError) {
    void logger.error(
      'Auth response JSON parse error',
      parseError instanceof Error ? parseError : new Error(String(parseError)),
      {
        url,

        component: 'auth-api-service-edge',
        errorType: 'parse',
      }
    );
    throw new Error(
      `Failed to parse authentication response for after ${parseError instanceof Error ? (parseError as Error).message : 'Invalid JSON'}`
    );
  }
}

function buildAuthHeaders(websid: string | undefined): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (websid) {
    headers.Cookie = `websid=${websid}`;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    headers['Cookie-Expires'] = tomorrow.toUTCString();
  }
  return headers;
}

async function fetchAuthResponse(url: string): Promise<AuthResponse> {
  const cookieStore = await cookies();
  const websid = cookieStore.get('websid')?.value;
  const headers = buildAuthHeaders(websid);
  const response = await fetchWithTimeout(url, headers);
  if (!response.ok) {
    void logger.error(
      'Auth request HTTP error',
      new Error(`HTTP error! status: ${response.status}`),
      {
        url,
        status: response.status,
        statusText: response.statusText,
        component: 'auth-api-service-edge',
        errorType: 'http',
      }
    );
    throw new Error(`Authentication failed for : HTTP ${response.status} ${response.statusText}`);
  }
  return parseAuthJson(response, url);
}

// Edge Runtime compatible auth service using fetch instead of axios
export const authApiServiceEdge = {
  getAuthorization: async (): Promise<AuthResponse> => {
    try {
      const url = configuration.SERVER_AXIOS_API_URL + buildApiUrl(apiUrls.getAuthorization);
      void logger.debug('Auth API URL', { url });
      const data = await fetchAuthResponse(url);
      void logger.debug('Auth response received', {
        hasWebsid: !!data.websid,
        url,
        component: 'auth-api-service-edge',
      });
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      logUnexpectedAuthError(error);
      throw error;
    }
  },
};
