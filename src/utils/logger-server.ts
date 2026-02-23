/**
 * Server-side logging utility for middleware and server components.
 * Handles logging in both development and production environments.
 *
 * Note: For production error tracking, integrate with a service like Sentry
 * by checking for environment variables or service availability.
 */

import { configuration } from '@/environment/configuration';

/**
 * Checks if we're in development mode
 */
const isDevelopment = (): boolean => {
  return configuration.ERROR_TRACKING_ENABLED;
};

/**
 * Checks if error tracking service is available (e.g., Sentry)
 * For server-side, check environment variables or service initialization
 */
const hasErrorTracking = (): boolean => {
  // Check for Sentry or other error tracking services
  // This can be enhanced to check for actual service availability
  // For now, we'll log in production if error tracking is configured
  return (
    typeof process !== 'undefined' &&
    (process.env.SENTRY_DSN !== undefined || process.env.ERROR_TRACKING_ENABLED === 'true')
  );
};

/**
 * Captures exception to error tracking service if available
 */
const captureException = (error: unknown, context?: Record<string, unknown>): void => {
  if (!hasErrorTracking()) {
    return;
  }

  try {
    // If Sentry is available, use it
    // This requires @sentry/nextjs to be installed
    // Example integration:
    // import * as Sentry from '@sentry/nextjs';
    // Sentry.captureException(error, { tags: context });

    // For now, log to console in production if error tracking is enabled
    // This allows monitoring via log aggregation services
    if (process.env.NODE_ENV === 'production') {
      console.error('[ERROR_TRACKING]', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        context,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (e) {
    // Silently fail if error tracking fails
    console.warn('[Logger] Failed to capture exception to error tracking service', e);
  }
};

/**
 * Server-side logger error function
 */
export async function logError(
  message: string,
  error?: unknown,
  context?: Record<string, unknown>
): Promise<void> {
  if (isDevelopment()) {
    console.error(`[ERROR] ${message}`, error || '', context || '');
  }

  // In production, send to error tracking service if available
  if (error) {
    captureException(error, { message, ...context });
  } else if (process.env.NODE_ENV === 'production' && hasErrorTracking()) {
    // Log error message even without error object
    console.error('[ERROR_TRACKING]', {
      message,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Server-side logger warn function
 */
export async function logWarn(message: string, context?: Record<string, unknown>): Promise<void> {
  if (isDevelopment()) {
    console.warn(`[WARN] ${message}`, context || '');
  }
  // Optionally send warnings to error tracking in production
  if (process.env.NODE_ENV === 'production' && hasErrorTracking()) {
    console.warn('[WARN_TRACKING]', {
      message,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Server-side logger info function
 */
export async function logInfo(message: string, context?: Record<string, unknown>): Promise<void> {
  if (isDevelopment()) {
    console.info(`[INFO] ${message}`, context || '');
  }
}

/**
 * Server-side logger debug function
 */
export async function logDebug(message: string, context?: Record<string, unknown>): Promise<void> {
  if (isDevelopment()) {
    console.debug(`[DEBUG] ${message}`, context || '');
  }
}

/**
 * Default export for backward compatibility
 * Note: This creates a wrapper object but doesn't use 'use server'
 */
const logger = {
  error: logError,
  warn: logWarn,
  info: logInfo,
  debug: logDebug,
};

export default logger;
