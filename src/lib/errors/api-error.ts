/**
 * Error codes for API errors
 */
export enum ApiErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN = 'UNKNOWN',
}

export interface ApiErrorOptions {
  statusCode?: number;
  url?: string;
  params?: unknown;
  code?: ApiErrorCode;
}

/**
 * Base error class for API-related errors
 * Includes error code for better error categorization and handling
 */
export class ApiError extends Error {
  statusCode?: number;
  url?: string;
  params?: unknown;
  code: ApiErrorCode;

  constructor(message: string, options?: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.code = options?.code ?? ApiErrorCode.UNKNOWN;
    this.statusCode = options?.statusCode;
    this.url = options?.url;
    this.params = options?.params;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
