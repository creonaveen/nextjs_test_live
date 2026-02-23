/**
 * Centralized logging utility for the application.
 * Handles logging in both development and production environments.
 */

import { configuration } from '@/environment/configuration';
interface Logger {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => void;
  warn: (message: string, context?: Record<string, unknown>) => void;
  info: (message: string, context?: Record<string, unknown>) => void;
  debug: (message: string, context?: Record<string, unknown>) => void;
}

/**
 * Checks if we're in development mode
 */
const isDevelopment = (): boolean => {
  return configuration.ERROR_TRACKING_ENABLED;
};

/**
 * Extended Window interface for error tracking services
 */
interface WindowWithSentry extends Window {
  Sentry?: {
    captureException: (error: unknown, options?: Record<string, unknown>) => void;
    setContext: (name: string, context: Record<string, unknown>) => void;
  };
}

/**
 * Checks if error tracking service (e.g., Sentry) is available
 */
const hasErrorTracking = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  // Check for Sentry or other error tracking services
  return typeof (window as WindowWithSentry).Sentry !== 'undefined';
};

/**
 * Captures exception to error tracking service if available
 */
const captureException = (error: unknown, context?: Record<string, unknown>): void => {
  if (typeof window !== 'undefined') {
    const windowWithSentry = window as WindowWithSentry;
    if (windowWithSentry.Sentry) {
      try {
        if (context) {
          windowWithSentry.Sentry.setContext('additional', context);
        }
        windowWithSentry.Sentry.captureException(error);
      } catch (e) {
        // Silently fail if error tracking fails
        console.warn('[Logger] Failed to capture exception to error tracking service', e);
      }
    }
  }
};

/**
 * Logger implementation
 */
const logger: Logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    if (isDevelopment()) {
      console.error(`[ERROR] ${message}`, error || '', context || '');
    }

    // In production, send to error tracking service
    if (hasErrorTracking() && error) {
      captureException(error, { message, ...context });
    }
  },

  warn: (message: string, context?: Record<string, unknown>) => {
    if (isDevelopment()) {
      console.warn(`[WARN] ${message}`, context || '');
    }
    // Optionally send warnings to error tracking in production
  },

  info: (message: string, context?: Record<string, unknown>) => {
    if (isDevelopment()) {
      console.info(`[INFO] ${message}`, context || '');
    }
  },

  debug: (message: string, context?: Record<string, unknown>) => {
    if (isDevelopment()) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  },
};

export default logger;
