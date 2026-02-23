import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notFound } from 'next/navigation';

import { configuration } from '@/environment/configuration';
import logger from '@/utils/logger';

/**
 * Extended request configuration for API client
 * Excludes certain Axios options that are handled internally
 */
export interface ApiRequestConfig extends Omit<AxiosRequestConfig, 'withCredentials' | 'params'> {
  params?: Record<string, unknown>;
  signal?: AbortSignal;
}

/**
 * Configuration for DELETE requests
 */
export interface DeleteRequestConfig {
  data?: unknown;
}

/**
 * Configuration for image requests
 */
export interface ImageRequestConfig extends Omit<AxiosRequestConfig, 'withCredentials'> {
  signal?: AbortSignal;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: configuration.NEXT_PUBLIC_AXIOS_API_URL,
  withCredentials: true,
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  }),
});

/** Prevent repeated 401 handling */
let hasHandled401 = false;
let sessionExpired = false;

axiosInstance.interceptors.request.use((config) => {
  if (sessionExpired) {
    return Promise.reject(new axios.Cancel('Session expired'));
  }
  return config;
});

function handle401(): void {
  if (typeof window === 'undefined' || hasHandled401) return;
  hasHandled401 = true;
  sessionExpired = true;
  if (!document.cookie.includes('websid')) {
    logger.warn('Session expired (401)');
    window.location.href = `${configuration.BASE_PATH}/session_expiry`;
  }
}

function handle404(response: { data?: { message?: string } }): void {
  const { BASE_PATH } = configuration;
  const isWorkspaceNotFound = response.data?.message?.toLowerCase().includes('workspace not found');
  if (isWorkspaceNotFound) {
    logger.info('Workspace not found (404)', { status: 404, data: response.data });
    if (typeof window === 'undefined') {
      notFound();
    } else {
      window.location.href = `${BASE_PATH}/not-found`;
    }
  } else {
    logger.info('404 error - allowing page-level error handling', {
      status: 404,
      data: response.data,
    });
  }
}

function handleResponseError(error: { response?: { status?: number; data?: unknown } }): void {
  const status = error.response?.status;
  const data = error.response?.data;
  if (status === 401) {
    handle401();
    return;
  }
  if (status === 403) {
    logger.info('Forbidden request (403)', { status: 403, data });
    return;
  }
  if (status === 404) {
    handle404(error.response as { data?: { message?: string } });
    return;
  }
  if (status === 500) {
    logger.error('Internal server error (500)', error, { status: 500, data });
    return;
  }
  if (status) {
    logger.error(`HTTP ${status} error`, error, { data });
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      handleResponseError(error);
    }
    return Promise.reject(error);
  }
);

/**
 * Type-safe API client wrapper around axios instance
 */
export const apiClient = {
  /**
   * Performs a GET request
   */
  get: <T>(route: string, config?: ApiRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(route, {
      signal: config?.signal,
      params: config?.params,
      withCredentials: true,
    }),

  /**
   * Performs a POST request
   */
  post: <T>(route: string, data?: unknown, config?: ApiRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(route, data, {
      signal: config?.signal,
      params: config?.params,
      withCredentials: true,
    }),

  /**
   * Performs a PUT request
   */
  put: <T>(route: string, data?: unknown, config?: ApiRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T>(route, data, {
      signal: config?.signal,
      params: config?.params,
      withCredentials: true,
    }),

  /**
   * Performs a PATCH request
   */
  patch: <T>(route: string, data?: unknown, config?: ApiRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.patch<T>(route, data, {
      signal: config?.signal,
      params: config?.params,
      withCredentials: true,
    }),

  /**
   * Performs a DELETE request
   */
  delete: <T>(route: string, config?: DeleteRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.delete<T>(route, {
      data: config?.data,
      withCredentials: true,
    }),

  /**
   * Performs a GET request for images
   */
  image: <T>(route: string, config?: ImageRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(route, {
      ...config,
      withCredentials: true,
    }),
};
