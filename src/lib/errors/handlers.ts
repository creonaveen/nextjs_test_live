import { ApiError, ApiErrorCode } from './api-error';
import { NetworkError } from './network-error';
import { ValidationError } from './validation-error';

function getErrorMessage(
  error: unknown,
  context?: string,
  fallback: string = 'Unknown error'
): string {
  const msg = error instanceof Error ? error.message : fallback;
  return context ? `API Error in ${context}: ${msg}` : msg;
}

function getUnknownErrorMessage(error: unknown, context?: string): string {
  if (context) {
    const suffix = error instanceof Error ? error.message : 'Unknown error';
    return `Unexpected error in ${context}: ${suffix}`;
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred';
}

function statusToErrorCode(statusCode: number): ApiErrorCode {
  if (statusCode === 401) return ApiErrorCode.UNAUTHORIZED;
  if (statusCode === 403) return ApiErrorCode.FORBIDDEN;
  if (statusCode === 404) return ApiErrorCode.NOT_FOUND;
  if (statusCode >= 400 && statusCode < 500) return ApiErrorCode.BAD_REQUEST;
  if (statusCode >= 500) return ApiErrorCode.SERVER_ERROR;
  return ApiErrorCode.UNKNOWN;
}

function handleAxiosError(
  error: { response?: { status?: number; data?: unknown } },
  context?: string
): ApiError {
  const statusCode = error.response?.status;
  const message = getErrorMessage(error, context, 'Unknown API error');
  const code = statusCode ? statusToErrorCode(statusCode) : ApiErrorCode.UNKNOWN;
  return new ApiError(message, { statusCode, code });
}

function handleNetworkOrTimeout(error: Error, context?: string): Error {
  if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
    return new NetworkError(error.message, error);
  }
  if (error.message.includes('timeout') || error.message.includes('timed out')) {
    return new ApiError(error.message, { code: ApiErrorCode.TIMEOUT });
  }
  return new Error(getUnknownErrorMessage(error, context));
}

/**
 * Helper function to handle API errors and convert to appropriate error type
 */
export function handleApiError(error: unknown, context?: string): Error {
  if (
    error instanceof ApiError ||
    error instanceof ValidationError ||
    error instanceof NetworkError
  ) {
    return error;
  }

  if (error && typeof error === 'object' && 'response' in error) {
    return handleAxiosError(error as { response?: { status?: number; data?: unknown } }, context);
  }

  if (error instanceof Error) {
    return handleNetworkOrTimeout(error, context);
  }

  return new Error(getUnknownErrorMessage(error, context));
}

/**
 * Helper function to check if an error is a 404 (Not Found) error
 *
 * Checks for:
 * - ApiError with statusCode 404 or code NOT_FOUND
 * - Axios errors with response.status === 404
 *
 * @param error - The error to check
 * @returns true if the error is a 404 error
 */
export function is404Error(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.statusCode === 404 || error.code === ApiErrorCode.NOT_FOUND;
  }

  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { status?: number } };
    return axiosError.response?.status === 404;
  }

  return false;
}
