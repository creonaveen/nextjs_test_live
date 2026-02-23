/**
 * Base API service class to reduce code duplication across all API services
 * Provides common functionality like validation, error handling, and request methods
 *
 * Note: This is the client-side version. For server-side services, use the server API client
 * directly or create a separate server base service.
 */

import { AxiosResponse } from 'axios';

import { apiClient } from '@/lib/axios';
import { ApiUrlKey, apiUrls, buildApiUrl } from '@/store/api-urls';

import { handleApiError } from '../errors';

/**
 * Configuration for API request
 */
export interface ApiRequestConfig {
  params?: Record<string, unknown>;
  signal?: AbortSignal;
}

/**
 * Interface defining the shape of an API client
 * Both client and server API clients conform to this interface
 */
export interface ApiClient {
  get: <T>(
    route: string,
    config?: { params?: Record<string, unknown>; signal?: AbortSignal }
  ) => Promise<AxiosResponse<T>>;
  post: <T>(
    route: string,
    data?: unknown,
    config?: { params?: Record<string, unknown>; signal?: AbortSignal }
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    route: string,
    data?: unknown,
    config?: { params?: Record<string, unknown>; signal?: AbortSignal }
  ) => Promise<AxiosResponse<T>>;
  patch: <T>(
    route: string,
    data?: unknown,
    config?: { params?: Record<string, unknown>; signal?: AbortSignal }
  ) => Promise<AxiosResponse<T>>;
  delete: <T>(route: string, config?: { data?: unknown }) => Promise<AxiosResponse<T>>;
}

/**
 * Type for API client (client or server)
 */
type ApiClientType = ApiClient;

/**
 * Base class for all API services
 * Provides common functionality to reduce code duplication
 */
export abstract class BaseApiService {
  /**
   * @param apiClient - The API client to use (client-side or server-side)
   */
  constructor(protected apiClient: ApiClientType) {}

  /**
   * Builds a URL from a template
   * @param urlKey - The key for the API URL template
   * @returns The built URL string
   */
  protected buildUrl(urlKey: ApiUrlKey): string {
    return buildApiUrl(apiUrls[urlKey]);
  }

  /**
   * Performs a GET request
   * @param urlKey - The key for the API URL template
   * @param config - Request configuration (params, signal, etc.)
   * @returns Promise resolving to the response data
   * @throws ApiError if the request fails
   */
  protected async get<T>(urlKey: ApiUrlKey, config?: ApiRequestConfig): Promise<T> {
    try {
      const url = this.buildUrl(urlKey);
      const response = await this.apiClient.get<T>(url, {
        params: config?.params,
        signal: config?.signal,
      });
      return response.data;
    } catch (error) {
      const url = this.buildUrl(urlKey);
      throw handleApiError(error, `GET ${url}`);
    }
  }

  /**
   * Performs a POST request
   * @param urlKey - The key for the API URL template
   * @param data - Request body data
   * @param config - Request configuration (params, signal, etc.)
   * @returns Promise resolving to the response data
   * @throws ApiError if the request fails
   */
  protected async post<T>(
    urlKey: ApiUrlKey,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    try {
      const url = this.buildUrl(urlKey);
      const response = await this.apiClient.post<T>(url, data, {
        params: config?.params,
        signal: config?.signal,
      });
      return response.data;
    } catch (error) {
      const url = this.buildUrl(urlKey);
      throw handleApiError(error, `POST ${url}`);
    }
  }

  /**
   * Performs a PUT request
   * @param urlKey - The key for the API URL template
   * @param data - Request body data
   * @param config - Request configuration (params, signal, etc.)
   * @returns Promise resolving to the response data
   * @throws ApiError if the request fails
   */
  protected async put<T>(urlKey: ApiUrlKey, data?: unknown, config?: ApiRequestConfig): Promise<T> {
    try {
      const url = this.buildUrl(urlKey);
      const response = await this.apiClient.put<T>(url, data, {
        params: config?.params,
        signal: config?.signal,
      });
      return response.data;
    } catch (error) {
      const url = this.buildUrl(urlKey);
      throw handleApiError(error, `PUT ${url}`);
    }
  }

  /**
   * Performs a PATCH request
   * @param urlKey - The key for the API URL template
   * @param data - Request body data
   * @param config - Request configuration (params, signal, etc.)
   * @returns Promise resolving to the response data
   * @throws ApiError if the request fails
   */
  protected async patch<T>(
    urlKey: ApiUrlKey,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    try {
      const url = this.buildUrl(urlKey);
      const response = await this.apiClient.patch<T>(url, data, {
        params: config?.params,
        signal: config?.signal,
      });
      return response.data;
    } catch (error) {
      const url = this.buildUrl(urlKey);
      throw handleApiError(error, `PATCH ${url}`);
    }
  }

  /**
   * Performs a DELETE request
   * @param urlKey - The key for the API URL template
   * @param config - Request configuration with optional data
   * @returns Promise resolving to the response data
   * @throws ApiError if the request fails
   */
  protected async delete<T>(urlKey: ApiUrlKey, config?: { data?: unknown }): Promise<T> {
    try {
      const url = this.buildUrl(urlKey);
      const response = await this.apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      const url = this.buildUrl(urlKey);
      throw handleApiError(error, `DELETE ${url}`);
    }
  }
}

/**
 * Factory function to create a base service instance with client-side API client
 */
export function createClientApiService<T extends BaseApiService>(
  ServiceClass: new (apiClient: ApiClient) => T
): T {
  return new ServiceClass(apiClient);
}

/**
 * Factory function to create a base service instance with server-side API client
 * Note: This function should be used in server components only
 * The serverApiClient should be passed as a parameter to avoid importing server-only code
 */
export function createServerApiService<T extends BaseApiService>(
  ServiceClass: new (apiClient: ApiClient) => T,
  serverApiClient: ApiClient
): T {
  return new ServiceClass(serverApiClient);
}
