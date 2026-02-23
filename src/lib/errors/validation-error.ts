/**
 * Error codes for validation errors
 */
export enum ValidationErrorCode {
  INVALID_FORMAT = 'INVALID_FORMAT',
  MISSING_REQUIRED = 'MISSING_REQUIRED',
  OUT_OF_RANGE = 'OUT_OF_RANGE',
  INVALID_TYPE = 'INVALID_TYPE',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Validation error for invalid input parameters
 * Includes error code for better error categorization and handling
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code: ValidationErrorCode = ValidationErrorCode.UNKNOWN
  ) {
    super(message);
    this.name = 'ValidationError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}
