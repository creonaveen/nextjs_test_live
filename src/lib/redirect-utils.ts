/**
 * Type guard to check if an error has a digest property
 */
function hasDigest(error: unknown): error is { digest?: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest?: unknown }).digest === 'string'
  );
}

/**
 * Type guard to check if an error has a message property
 */
function hasMessage(error: unknown): error is { message?: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  );
}

/**
 * Helper to check if an error is a Next.js redirect error
 *
 * Next.js redirect() throws a special error that needs to be re-thrown
 * to allow the redirect to happen. This utility helps identify those errors.
 *
 * @param error - The error to check
 * @returns true if the error is a Next.js redirect error
 */
export function isRedirectError(error: unknown): boolean {
  if (hasDigest(error)) {
    return error.digest?.includes('NEXT_REDIRECT') ?? false;
  }
  if (hasMessage(error)) {
    return error.message === 'NEXT_REDIRECT';
  }
  return false;
}

/**
 * Helper to check if an error is a Next.js notFound error
 *
 * @param error - The error to check
 * @returns true if the error is a Next.js notFound error
 */
export function isNotFoundError(error: unknown): boolean {
  if (hasDigest(error)) {
    return (
      (error.digest?.includes('NEXT_NOT_FOUND') ||
        error.digest?.includes('NEXT_HTTP_ERROR_FALLBACK')) ??
      false
    );
  }
  if (hasMessage(error)) {
    return error.message === 'NEXT_NOT_FOUND' || error.message === 'NEXT_HTTP_ERROR_FALLBACK';
  }
  return false;
}
