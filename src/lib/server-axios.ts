import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { configuration } from '@/environment/configuration';
import logger from '@/utils/logger-server';

// Server-side axios instance - needs explicit cookie handling
export const axiosInstanceServer: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: configuration.SERVER_AXIOS_API_URL,
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  }),
});

// Interceptor to add cookies to server-side requests
axiosInstanceServer.interceptors.request.use(
  async (config) => {
    try {
      // Get cookies from Next.js server
      const cookieStore = await cookies();
      // Only set sid cookie
      const sidCookie = cookieStore.get('websid');
      if (sidCookie) {
        config.headers.set('Cookie', `websid=${sidCookie.value}`);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        config.headers.set('Cookie-Expires', tomorrow.toUTCString());
      }
    } catch (error) {
      void logger.error('Error reading cookies in server axios interceptor', error);
    }
    return config;
  },
  (error) => {
    void logger.error('Request interceptor error', error);
    return Promise.reject(error);
  }
);

axiosInstanceServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          // Handle unauthorized error - redirect to session expiry page
          void logger.info('Session expired (401)', { status: 401, data: error.response.data });
          redirect(`${configuration.BASE_PATH}/session_expiry`);
          break;
        }
        case 403:
          // Handle forbidden error
          void logger.warn('Forbidden request', { status: 403, data: error.response.data });
          break;
        case 404:
          // Handle not found error
          if (error.response.data?.message?.toLowerCase().includes('workspace not found')) {
            void logger.warn('Workspace not found', { status: 404, data: error.response.data });
          }
          notFound();
          break;
        case 500:
          // Handle internal server error
          void logger.error('Internal server error', error, {
            status: 500,
            data: error.response.data,
          });
          break;
        default:
          void logger.error(`HTTP ${error.response.status} error`, error, {
            status: error.response.status,
            data: error.response.data,
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Extended request configuration for server API client
 */
export interface ServerApiRequestConfig extends Omit<AxiosRequestConfig, 'params'> {
  params?: Record<string, unknown>;
  signal?: AbortSignal;
}

/**
 * Configuration for DELETE requests
 */
export interface ServerDeleteRequestConfig {
  data?: unknown;
}

/**
 * Configuration for image requests
 */
export interface ServerImageRequestConfig extends AxiosRequestConfig {
  signal?: AbortSignal;
}

/**
 * Type-safe server API client wrapper around axios instance
 */
export const serverApiClient = {
  /**
   * Performs a GET request
   */
  get: <T>(route: string, config?: ServerApiRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstanceServer.get<T>(route, {
      signal: config?.signal,
      params: config?.params,
    }),

  /**
   * Performs a POST request
   */
  post: <T>(
    route: string,
    data?: unknown,
    config?: ServerApiRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceServer.post<T>(route, data, {
      signal: config?.signal,
      params: config?.params,
    }),

  /**
   * Performs a PUT request
   */
  put: <T>(
    route: string,
    data?: unknown,
    config?: ServerApiRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceServer.put<T>(route, data, {
      signal: config?.signal,
      params: config?.params,
    }),

  /**
   * Performs a PATCH request
   */
  patch: <T>(
    route: string,
    data?: unknown,
    config?: ServerApiRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceServer.patch<T>(route, data, {
      signal: config?.signal,
      params: config?.params,
    }),

  /**
   * Performs a DELETE request
   */
  delete: <T>(route: string, config?: ServerDeleteRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstanceServer.delete<T>(route, {
      data: config?.data,
    }),

  /**
   * Performs a GET request for images
   */
  image: <T>(route: string, config?: ServerImageRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstanceServer.get<T>(route, {
      ...config,
    }),
};
