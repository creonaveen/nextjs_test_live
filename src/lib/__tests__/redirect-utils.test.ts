import { isRedirectError, isNotFoundError } from '@/lib/redirect-utils';

describe('isRedirectError', () => {
  it('should return true for error with NEXT_REDIRECT in digest', () => {
    const error = {
      digest: 'NEXT_REDIRECT;replace;http://example.com',
    };

    expect(isRedirectError(error)).toBe(true);
  });

  it('should return true for error with NEXT_REDIRECT message', () => {
    const error = {
      message: 'NEXT_REDIRECT',
    };

    expect(isRedirectError(error)).toBe(true);
  });

  it('should return false for error without NEXT_REDIRECT', () => {
    const error = {
      message: 'Some other error',
    };

    expect(isRedirectError(error)).toBe(false);
  });

  it('should return false for error with different digest', () => {
    const error = {
      digest: 'SOME_OTHER_DIGEST',
    };

    expect(isRedirectError(error)).toBe(false);
  });

  it('should return false for null error', () => {
    expect(isRedirectError(null)).toBe(false);
  });

  it('should return false for undefined error', () => {
    expect(isRedirectError(undefined)).toBe(false);
  });

  it('should return false for error without digest or message', () => {
    const error = {};

    expect(isRedirectError(error)).toBe(false);
  });

  it('should handle error with both digest and message containing NEXT_REDIRECT', () => {
    const error = {
      digest: 'NEXT_REDIRECT;replace;http://example.com',
      message: 'NEXT_REDIRECT',
    };

    expect(isRedirectError(error)).toBe(true);
  });
});

describe('isNotFoundError', () => {
  it('should return true for error with NEXT_NOT_FOUND in digest', () => {
    const error = {
      digest: 'NEXT_NOT_FOUND',
    };

    expect(isNotFoundError(error)).toBe(true);
  });

  it('should return true for error with NEXT_NOT_FOUND message', () => {
    const error = {
      message: 'NEXT_NOT_FOUND',
    };

    expect(isNotFoundError(error)).toBe(true);
  });

  it('should return false for error without NEXT_NOT_FOUND', () => {
    const error = {
      message: 'Some other error',
    };

    expect(isNotFoundError(error)).toBe(false);
  });

  it('should return false for error with different digest', () => {
    const error = {
      digest: 'SOME_OTHER_DIGEST',
    };

    expect(isNotFoundError(error)).toBe(false);
  });

  it('should return false for null error', () => {
    expect(isNotFoundError(null)).toBe(false);
  });

  it('should return false for undefined error', () => {
    expect(isNotFoundError(undefined)).toBe(false);
  });

  it('should return false for error without digest or message', () => {
    const error = {};

    expect(isNotFoundError(error)).toBe(false);
  });

  it('should handle error with both digest and message containing NEXT_NOT_FOUND', () => {
    const error = {
      digest: 'NEXT_NOT_FOUND',
      message: 'NEXT_NOT_FOUND',
    };

    expect(isNotFoundError(error)).toBe(true);
  });

  it('should distinguish between redirect and not found errors', () => {
    const redirectError = {
      digest: 'NEXT_REDIRECT;replace;http://example.com',
    };

    const notFoundError = {
      digest: 'NEXT_NOT_FOUND',
    };

    expect(isRedirectError(redirectError)).toBe(true);
    expect(isNotFoundError(redirectError)).toBe(false);

    expect(isRedirectError(notFoundError)).toBe(false);
    expect(isNotFoundError(notFoundError)).toBe(true);
  });
});
