import { cookies } from 'next/headers';

import logger from '@/utils/logger-server';

import { apiUrls, buildApiUrl } from '../../api-urls';
import { authApiServiceEdge, AuthResponse } from '../auth-api-service-edge';

// Mock dependencies
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    SERVER_AXIOS_API_URL: 'http://localhost:3000',
  },
}));

jest.mock('@/utils/logger-server', () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

jest.mock('../../api-urls', () => ({
  apiUrls: {
    getAuthorization: '/api/v1/web/?context=authorization',
  },
  buildApiUrl: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

describe('authApiServiceEdge', () => {
  const mockWebsid = 'test-session-id';
  const mockApiUrl = 'http://localhost:3000/api/v1/web/?context=authorization';

  beforeEach(() => {
    jest.clearAllMocks();
    (buildApiUrl as jest.Mock).mockReturnValue('/api/v1/web/?context=authorization');
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getAuthorization', () => {
    it('should fetch authorization successfully with cookie', async () => {
      const mockResponseData: AuthResponse = {
        websid: 'new-session-id',
        user: 'test-user',
      };

      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponseData),
      });

      const result = await authApiServiceEdge.getAuthorization();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('websid');
      expect(buildApiUrl).toHaveBeenCalledWith(apiUrls.getAuthorization);
      expect(global.fetch).toHaveBeenCalledWith(
        mockApiUrl,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Cookie: `websid=${mockWebsid}`,
            'Cookie-Expires': expect.any(String),
          }),
          credentials: 'include',
          signal: expect.any(AbortSignal),
        })
      );
      expect(result).toEqual(mockResponseData);
      expect(logger.debug).toHaveBeenCalledWith('Auth API URL', {
        url: mockApiUrl,
      });
      expect(logger.debug).toHaveBeenCalledWith('Auth response received', {
        hasWebsid: true,
        url: mockApiUrl,
        component: 'auth-api-service-edge',
      });
    });

    it('should fetch authorization successfully without cookie', async () => {
      const mockResponseData: AuthResponse = {
        websid: 'new-session-id',
      };

      const mockCookieStore = {
        get: jest.fn().mockReturnValue(undefined),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponseData),
      });

      const result = await authApiServiceEdge.getAuthorization();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('websid');
      expect(global.fetch).toHaveBeenCalledWith(
        mockApiUrl,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          credentials: 'include',
          signal: expect.any(AbortSignal),
        })
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.not.objectContaining({
          headers: expect.objectContaining({
            Cookie: expect.anything(),
          }),
        })
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should handle timeout error', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const abortError = new Error('Request timeout');
      abortError.name = 'AbortError';
      (global.fetch as jest.Mock).mockRejectedValue(abortError);

      await expect(authApiServiceEdge.getAuthorization()).rejects.toThrow(
        'Authentication request timed out for after 7 seconds'
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Auth request timeout',
        expect.objectContaining({
          url: mockApiUrl,
          timeout: 7000,
          component: 'auth-api-service-edge',
          errorType: 'timeout',
        })
      );
    });

    it('should handle network error', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const networkError = new Error('Network request failed');
      networkError.name = 'NetworkError';
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      await expect(authApiServiceEdge.getAuthorization()).rejects.toThrow(
        'Authentication network error for after 7 seconds'
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Auth request network error',
        networkError,
        expect.objectContaining({
          url: mockApiUrl,
          component: 'auth-api-service-edge',
          errorType: 'network',
          errorName: 'NetworkError',
          errorMessage: 'Network request failed',
        })
      );
    });

    it('should handle HTTP error (non-200 status)', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      await expect(authApiServiceEdge.getAuthorization()).rejects.toThrow(
        'Authentication failed for : HTTP 401 Unauthorized'
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Auth request HTTP error',
        expect.any(Error),
        expect.objectContaining({
          url: mockApiUrl,
          status: 401,
          statusText: 'Unauthorized',
          component: 'auth-api-service-edge',
          errorType: 'http',
        })
      );
    });

    it('should handle HTTP 500 error', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(authApiServiceEdge.getAuthorization()).rejects.toThrow(
        'Authentication failed for : HTTP 500 Internal Server Error'
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Auth request HTTP error',
        expect.any(Error),
        expect.objectContaining({
          status: 500,
          statusText: 'Internal Server Error',
        })
      );
    });

    it('should handle JSON parse error', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(authApiServiceEdge.getAuthorization()).rejects.toThrow(
        'Failed to parse authentication response for after Invalid JSON'
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Auth response JSON parse error',
        expect.any(Error),
        expect.objectContaining({
          url: mockApiUrl,
          component: 'auth-api-service-edge',
          errorType: 'parse',
        })
      );
    });

    it('should handle non-Error rejection in JSON parse', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue('String error'),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(authApiServiceEdge.getAuthorization()).rejects.toThrow(
        'Failed to parse authentication response for after Invalid JSON'
      );
    });

    it('should clear timeout on successful fetch', async () => {
      const mockResponseData: AuthResponse = {
        websid: 'new-session-id',
      };

      const mockCookieStore = {
        get: jest.fn().mockReturnValue(undefined),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponseData),
      });

      // Spy on setTimeout and clearTimeout
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      await authApiServiceEdge.getAuthorization();

      expect(setTimeoutSpy).toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalled();

      setTimeoutSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });

    it('should clear timeout on fetch error', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const networkError = new Error('Network request failed');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      try {
        await authApiServiceEdge.getAuthorization();
      } catch {
        // Expected to throw
      }

      expect(setTimeoutSpy).toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalled();

      setTimeoutSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });

    it('should set Cookie-Expires header to tomorrow when cookie exists', async () => {
      const mockResponseData: AuthResponse = {
        websid: 'new-session-id',
      };

      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponseData),
      });

      await authApiServiceEdge.getAuthorization();
      const afterCall = new Date();

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const headers = fetchCall[1].headers;
      const cookieExpires = new Date(headers['Cookie-Expires']);

      // Cookie-Expires should be approximately tomorrow (within 1 second tolerance)
      const expectedTomorrow = new Date();
      expectedTomorrow.setDate(expectedTomorrow.getDate() + 1);

      expect(cookieExpires.getTime()).toBeGreaterThanOrEqual(expectedTomorrow.getTime() - 1000);
      expect(cookieExpires.getTime()).toBeLessThanOrEqual(
        afterCall.getTime() + 24 * 60 * 60 * 1000
      );
    });

    it('should handle unexpected errors and re-throw with logging', async () => {
      const mockCookieStore = {
        get: jest.fn().mockImplementation(() => {
          throw 'non-Error rejection';
        }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      await expect(authApiServiceEdge.getAuthorization()).rejects.toBe('non-Error rejection');

      expect(logger.error).toHaveBeenCalledWith(
        'Unexpected auth service error',
        expect.any(Error),
        expect.objectContaining({
          component: 'auth-api-service-edge',
          errorType: 'unexpected',
        })
      );
    });

    it('should not log unexpected error twice if error already has context', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const errorWithContext = new Error('Authentication failed for : HTTP 401');
      (global.fetch as jest.Mock).mockRejectedValue(errorWithContext);

      try {
        await authApiServiceEdge.getAuthorization();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('Authentication network error');
      }

      // Should not have logged as "unexpected" when error is rethrown as-is
      const unexpectedErrorCalls = (logger.error as jest.Mock).mock.calls.filter(
        (call) => call[0] === 'Unexpected auth service error'
      );
      expect(unexpectedErrorCalls.length).toBe(0);
    });

    it('should use AbortController signal for timeout', async () => {
      const mockResponseData: AuthResponse = {
        websid: 'new-session-id',
      };

      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: mockWebsid }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponseData),
      });

      await authApiServiceEdge.getAuthorization();

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const signal = fetchCall[1].signal;

      expect(signal).toBeInstanceOf(AbortSignal);
      expect(signal.aborted).toBe(false);
    });
  });
});
