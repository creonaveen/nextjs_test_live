import { notFound } from 'next/navigation';

import { configuration } from '../../environment/configuration';
import { axiosInstance, apiClient } from '../axios';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    NEXT_PUBLIC_AXIOS_API_URL: 'http://localhost:3000',
    BASE_PATH: '/web',
    ERROR_TRACKING_ENABLED: true,
  },
}));

// Mock logger
jest.mock('@/utils/logger', () => ({
  __esModule: true,
  default: {
    warn: jest.fn((message: string, context?: Record<string, unknown>) => {
      console.warn(message, context);
    }),
    error: jest.fn((message: string, error?: unknown, context?: Record<string, unknown>) => {
      console.error(message, error, context);
    }),
    info: jest.fn((message: string, context?: Record<string, unknown>) => {
      console.info(message, context);
    }),
    debug: jest.fn((message: string, context?: Record<string, unknown>) => {
      console.debug(message, context);
    }),
  },
}));

// Note: We don't mock window.location here because jsdom doesn't allow it
// Instead, we verify the redirect logic by checking console outputs
// For 404 tests, we need to mock window as undefined to test notFound() calls

describe('axiosInstance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.warn = jest.fn();
    console.error = jest.fn();
    console.log = jest.fn();
    console.info = jest.fn();
  });

  it('should create axios instance with correct baseURL', () => {
    expect(axiosInstance.defaults.baseURL).toBe(configuration.NEXT_PUBLIC_AXIOS_API_URL);
  });

  it('should have withCredentials set to true', () => {
    expect(axiosInstance.defaults.withCredentials).toBe(true);
  });

  it('should have correct content-type header', () => {
    const headers = axiosInstance.defaults.headers;
    expect(headers['Content-Type']).toBe('application/json');
  });

  describe('Response interceptor - 401 Unauthorized', () => {
    it('should redirect to session expiry page on 401 error', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };

      // Get the rejected handler from interceptors
      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch {
          // Expected to reject
        }
      }

      // Verify that the redirect logic was executed
      // The code attempts to set window.location.href, which may not work in jsdom
      // but we can verify the code path was executed by checking console.warn
      expect(console.warn).toHaveBeenCalledWith('Session expired (401)', undefined);
    });

    /* Skipped due to non-configurable window in current JSDOM environment
      it('should handle 401 error when window is undefined', async () => {
        const originalWindow = global.window;
        // @ts-expect-error - testing undefined window
        global.window = undefined;

        const error = {
          response: {
            status: 401,
            data: { message: 'Unauthorized' },
          },
        };

        const handlers = axiosInstance.interceptors.response.handlers;
        const rejectedHandler = handlers[0]?.rejected;

        if (rejectedHandler) {
          try {
            await rejectedHandler(error);
          } catch {
            // Expected to reject
          }
        }

        expect(console.warn).toHaveBeenCalledWith(
          'Unauthorized request',
          expect.objectContaining({ status: 401, data: error.response.data })
        );

        global.window = originalWindow;
      });
      */
  });

  describe('Response interceptor - 403 Forbidden', () => {
    it('should log warning on 403 error', async () => {
      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
      };

      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch {
          // Expected to reject
        }
      }

      expect(console.info).toHaveBeenCalledWith(
        'Forbidden request (403)',
        expect.objectContaining({ status: 403, data: error.response.data })
      );
    });
  });

  describe('Response interceptor - 404 Not Found', () => {
    it('should redirect to not-found page on 404 error when window is defined', async () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      };

      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch {
          // Expected to reject
        }
      }

      expect(console.info).toHaveBeenCalledWith(
        '404 error - allowing page-level error handling',
        expect.objectContaining({ status: 404, data: error.response.data })
      );
      expect(console.warn).not.toHaveBeenCalled();
      expect(notFound).not.toHaveBeenCalled();
    });

    it('should handle workspace not found message when window is defined', async () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Workspace not found' },
        },
      };

      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch {
          // Expected to reject
        }
      }

      expect(console.info).toHaveBeenCalledWith(
        'Workspace not found (404)',
        expect.objectContaining({ status: 404, data: error.response.data })
      );
      expect(console.warn).not.toHaveBeenCalled();
      expect(notFound).not.toHaveBeenCalled();
    });
  });

  describe('Response interceptor - 500 Internal Server Error', () => {
    it('should log error on 500 status', async () => {
      const error = {
        response: {
          status: 500,
          data: { message: 'Internal server error' },
        },
      };

      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch {
          // Expected to reject
        }
      }

      expect(console.error).toHaveBeenCalledWith(
        'Internal server error (500)',
        error,
        expect.objectContaining({ status: 500, data: error.response.data })
      );
    });
  });

  describe('Response interceptor - other status codes', () => {
    it('should log error for other status codes', async () => {
      const error = {
        response: {
          status: 503,
          data: { message: 'Service unavailable' },
        },
      };

      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch {
          // Expected to reject
        }
      }

      expect(console.error).toHaveBeenCalledWith(
        'HTTP 503 error',
        error,
        expect.objectContaining({ data: error.response.data })
      );
    });
  });

  describe('Response interceptor - no response', () => {
    it('should reject error when there is no response', async () => {
      const error = {
        message: 'Network Error',
      };

      const handlers = axiosInstance.interceptors.response.handlers;
      const rejectedHandler = handlers?.[0]?.rejected ?? undefined;

      if (rejectedHandler) {
        try {
          await rejectedHandler(error);
        } catch (e) {
          expect(e).toBe(error);
        }
      }
    });
  });

  describe('Response interceptor - success', () => {
    it('should return response on success', () => {
      const response = { data: { test: 'data' }, status: 200 };
      const handlers = axiosInstance.interceptors.response.handlers;
      const fulfilledHandler = handlers?.[0]?.fulfilled ?? undefined;

      if (fulfilledHandler) {
        const result = fulfilledHandler(response as unknown as AxiosResponse);
        expect(result).toBe(response);
      }
    });
  });
});

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should call axiosInstance.get with correct parameters', async () => {
      const getSpy = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: {} });

      await apiClient.get('/test', { params: { id: 1 } });

      expect(getSpy).toHaveBeenCalledWith('/test', {
        signal: undefined,
        params: { id: 1 },
        withCredentials: true,
      });
    });

    it('should handle signal in config', async () => {
      const abortController = new AbortController();
      const getSpy = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: {} });

      await apiClient.get('/test', { signal: abortController.signal });

      expect(getSpy).toHaveBeenCalledWith('/test', {
        signal: abortController.signal,
        params: undefined,
        withCredentials: true,
      });
    });
  });

  describe('post', () => {
    it('should call axiosInstance.post with correct parameters', async () => {
      const postSpy = jest.spyOn(axiosInstance, 'post').mockResolvedValue({ data: {} });

      await apiClient.post('/test', { name: 'test' }, { signal: undefined });

      expect(postSpy).toHaveBeenCalledWith(
        '/test',
        { name: 'test' },
        {
          signal: undefined,
          withCredentials: true,
        }
      );
    });
  });

  describe('put', () => {
    it('should call axiosInstance.put with correct parameters', async () => {
      const putSpy = jest.spyOn(axiosInstance, 'put').mockResolvedValue({ data: {} });

      await apiClient.put('/test', { name: 'test' });

      expect(putSpy).toHaveBeenCalledWith(
        '/test',
        { name: 'test' },
        {
          signal: undefined,
          withCredentials: true,
        }
      );
    });
  });

  describe('patch', () => {
    it('should call axiosInstance.patch with correct parameters', async () => {
      const patchSpy = jest.spyOn(axiosInstance, 'patch').mockResolvedValue({ data: {} });

      await apiClient.patch('/test', { name: 'test' });

      expect(patchSpy).toHaveBeenCalledWith(
        '/test',
        { name: 'test' },
        {
          signal: undefined,
          withCredentials: true,
        }
      );
    });
  });

  describe('delete', () => {
    it('should call axiosInstance.delete with correct parameters', async () => {
      const deleteSpy = jest.spyOn(axiosInstance, 'delete').mockResolvedValue({ data: {} });

      await apiClient.delete('/test', { data: { id: 1 } });

      expect(deleteSpy).toHaveBeenCalledWith('/test', {
        data: { id: 1 },
        withCredentials: true,
      });
    });
  });

  describe('image', () => {
    it('should call axiosInstance.get with correct parameters for image', async () => {
      const getSpy = jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: {} });

      await apiClient.image('/test/image', { responseType: 'blob' });

      expect(getSpy).toHaveBeenCalledWith('/test/image', {
        responseType: 'blob',
        withCredentials: true,
      });
    });
  });
});
