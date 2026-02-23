import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { configuration } from '../../environment/configuration';
import { axiosInstanceServer, serverApiClient } from '../server-axios';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    SERVER_AXIOS_API_URL: 'http://localhost:3000',
    BASE_PATH: '/web',
    ERROR_TRACKING_ENABLED: true,
  },
}));

// Mock logger
jest.mock('@/utils/logger-server', () => ({
  __esModule: true,
  default: {
    warn: jest.fn(async (message: string, context?: Record<string, unknown>) => {
      console.warn(message, context);
    }),
    error: jest.fn(async (message: string, error?: unknown, context?: Record<string, unknown>) => {
      console.error(message, error, context);
    }),
    info: jest.fn(async (message: string, context?: Record<string, unknown>) => {
      console.info(message, context);
    }),
    debug: jest.fn(async (message: string, context?: Record<string, unknown>) => {
      console.debug(message, context);
    }),
  },
}));

describe('axiosInstanceServer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.warn = jest.fn();
    console.error = jest.fn();
    console.log = jest.fn();
    console.info = jest.fn();
  });

  it('should create axios instance with correct baseURL', () => {
    expect(axiosInstanceServer.defaults.baseURL).toBe(configuration.SERVER_AXIOS_API_URL);
  });

  it('should have withCredentials set to true', () => {
    expect(axiosInstanceServer.defaults.withCredentials).toBe(true);
  });

  it('should have correct content-type header', () => {
    const headers = axiosInstanceServer.defaults.headers;
    expect(headers['Content-Type']).toBe('application/json');
  });

  describe('Request interceptor', () => {
    it('should add cookie to request headers when websid cookie exists', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'test-session-id' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const config = {
        headers: {
          set: jest.fn(),
        },
      };

      await axiosInstanceServer.interceptors.request.handlers?.[0]?.fulfilled(
        config as unknown as InternalAxiosRequestConfig
      );

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('websid');
      expect(config.headers.set).toHaveBeenCalledWith('Cookie', 'websid=test-session-id');
      expect(config.headers.set).toHaveBeenCalledWith('Cookie-Expires', expect.any(String));
    });

    it('should not add cookie when websid cookie does not exist', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(undefined),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const config = {
        headers: {
          set: jest.fn(),
        },
      };

      await axiosInstanceServer.interceptors.request.handlers?.[0]?.fulfilled(
        config as unknown as InternalAxiosRequestConfig
      );

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('websid');
      expect(config.headers.set).not.toHaveBeenCalled();
    });

    it('should handle error when reading cookies', async () => {
      const error = new Error('Cookie read error');
      (cookies as jest.Mock).mockRejectedValue(error);

      const config = {
        headers: {
          set: jest.fn(),
        },
      };

      const result = await axiosInstanceServer.interceptors.request.handlers?.[0]?.fulfilled(
        config as unknown as InternalAxiosRequestConfig
      );

      expect(console.error).toHaveBeenCalledWith(
        'Error reading cookies in server axios interceptor',
        error,
        undefined
      );
      expect(result).toBe(config);
    });

    it('should reject error in request interceptor', async () => {
      const error = new Error('Request error');
      const rejected =
        axiosInstanceServer.interceptors.request.handlers?.[0]?.rejected ?? undefined;

      try {
        await rejected?.(error);
      } catch (e) {
        expect(e).toBe(error);
        expect(console.error).toHaveBeenCalledWith('Request interceptor error', error, undefined);
      }
    });
  });

  describe('Response interceptor - 401 Unauthorized', () => {
    it('should redirect to session expiry page on 401 error', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch {
        // Expected to reject
      }

      expect(console.info).toHaveBeenCalledWith(
        'Session expired (401)',
        expect.objectContaining({ status: 401, data: error.response.data })
      );
      expect(redirect).toHaveBeenCalledWith(`${configuration.BASE_PATH}/session_expiry`);
    });
  });

  describe('Response interceptor - 403 Forbidden', () => {
    it('should log warning on 403 error', async () => {
      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
      };

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch {
        // Expected to reject
      }

      expect(console.warn).toHaveBeenCalledWith(
        'Forbidden request',
        expect.objectContaining({ status: 403, data: error.response.data })
      );
    });
  });

  describe('Response interceptor - 404 Not Found', () => {
    it('should call notFound() on 404 error', async () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      };

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch {
        // Expected to reject
      }

      expect(notFound).toHaveBeenCalled();
    });

    it('should handle workspace not found message', async () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Workspace not found' },
        },
      };

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch {
        // Expected to reject
      }

      expect(console.warn).toHaveBeenCalledWith(
        'Workspace not found',
        expect.objectContaining({ status: 404, data: error.response.data })
      );
      expect(notFound).toHaveBeenCalled();
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

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch {
        // Expected to reject
      }

      expect(console.error).toHaveBeenCalledWith(
        'Internal server error',
        expect.anything(),
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

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch {
        // Expected to reject
      }

      expect(console.error).toHaveBeenCalledWith(
        'HTTP 503 error',
        expect.anything(),
        expect.objectContaining({ status: 503, data: error.response.data })
      );
    });
  });

  describe('Response interceptor - no response', () => {
    it('should reject error when there is no response', async () => {
      const error = {
        message: 'Network Error',
      };

      try {
        await axiosInstanceServer.interceptors.response.handlers?.[0]?.rejected?.(error);
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });

  describe('Response interceptor - success', () => {
    it('should return response on success', () => {
      const response = { data: { test: 'data' }, status: 200 };
      const result = axiosInstanceServer.interceptors.response.handlers?.[0]?.fulfilled?.(
        response as unknown as AxiosResponse<unknown>
      );
      expect(result).toBe(response);
    });
  });
});

describe('serverApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should call axiosInstanceServer.get with correct parameters', async () => {
      const getSpy = jest.spyOn(axiosInstanceServer, 'get').mockResolvedValue({ data: {} });

      await serverApiClient.get('/test', { params: { id: 1 } });

      expect(getSpy).toHaveBeenCalledWith('/test', {
        signal: undefined,
        params: { id: 1 },
      });
    });

    it('should handle signal in config', async () => {
      const abortController = new AbortController();
      const getSpy = jest.spyOn(axiosInstanceServer, 'get').mockResolvedValue({ data: {} });

      await serverApiClient.get('/test', { signal: abortController.signal });

      expect(getSpy).toHaveBeenCalledWith('/test', {
        signal: abortController.signal,
        params: undefined,
      });
    });
  });

  describe('post', () => {
    it('should call axiosInstanceServer.post with correct parameters', async () => {
      const postSpy = jest.spyOn(axiosInstanceServer, 'post').mockResolvedValue({ data: {} });

      await serverApiClient.post('/test', { name: 'test' }, { signal: undefined });

      expect(postSpy).toHaveBeenCalledWith(
        '/test',
        { name: 'test' },
        {
          signal: undefined,
        }
      );
    });
  });

  describe('put', () => {
    it('should call axiosInstanceServer.put with correct parameters', async () => {
      const putSpy = jest.spyOn(axiosInstanceServer, 'put').mockResolvedValue({ data: {} });

      await serverApiClient.put('/test', { name: 'test' });

      expect(putSpy).toHaveBeenCalledWith(
        '/test',
        { name: 'test' },
        {
          signal: undefined,
        }
      );
    });
  });

  describe('patch', () => {
    it('should call axiosInstanceServer.patch with correct parameters', async () => {
      const patchSpy = jest.spyOn(axiosInstanceServer, 'patch').mockResolvedValue({ data: {} });

      await serverApiClient.patch('/test', { name: 'test' });

      expect(patchSpy).toHaveBeenCalledWith(
        '/test',
        { name: 'test' },
        {
          signal: undefined,
        }
      );
    });
  });

  describe('delete', () => {
    it('should call axiosInstanceServer.delete with correct parameters', async () => {
      const deleteSpy = jest.spyOn(axiosInstanceServer, 'delete').mockResolvedValue({ data: {} });

      await serverApiClient.delete('/test', { data: { id: 1 } });

      expect(deleteSpy).toHaveBeenCalledWith('/test', {
        data: { id: 1 },
      });
    });
  });

  describe('image', () => {
    it('should call axiosInstanceServer.get with correct parameters for image', async () => {
      const getSpy = jest.spyOn(axiosInstanceServer, 'get').mockResolvedValue({ data: {} });

      await serverApiClient.image('/test/image', { responseType: 'blob' });

      expect(getSpy).toHaveBeenCalledWith('/test/image', {
        responseType: 'blob',
      });
    });
  });
});
