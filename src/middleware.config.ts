import { NextRequest, NextResponse } from 'next/server';

import { configuration } from '@/environment/configuration';
import logger from '@/utils/logger-server';
import { validateMarketIdAgainstList, validateLanguageAgainstList } from '@/utils/validation-utils';

import { authApiServiceEdge } from './store/api-service/auth-api-service-edge';

// Configuration for middleware
export const middlewareConfig = {
  // Cookie settings
  cookieSettings: {
    httpOnly: configuration.COOKIE_HTTP_ONLY, // Prevent JavaScript access for security
    secure: configuration.COOKIE_SECURE, // HTTPS only in production
    sameSite: configuration.COOKIE_SAME_SITE as boolean | 'lax' | 'strict' | 'none' | undefined,
    maxAge: configuration.COOKIE_MAX_AGE, // 30 days
    path: '/',
  },

  // Default values
  defaults: {
    marketId: configuration.DEFAULT_MARKET_ID,
    language: configuration.DEFAULT_LANGUAGE,
  },

  // Routes that should be excluded from middleware
  excludedPaths: ['/_next/static', '/_next/image', '/favicon.ico', '/api/health', '/api/status'],

  // File extensions to exclude
  excludedExtensions: [
    '.svg',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.ico',
    '.css',
    '.js',
    '.ts',
    '.tsx',
    '.json',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.map',
  ],
};

// Helper function to check if path should be excluded
export function shouldExcludePath(pathname: string): boolean {
  return (
    middlewareConfig.excludedPaths.some((path) => pathname.startsWith(path)) ||
    middlewareConfig.excludedExtensions.some((ext) => pathname.endsWith(ext))
  );
}

// Helper function to extract market ID from URL
export function extractMarketId(request: NextRequest): string | null {
  const { searchParams } = request.nextUrl;
  return searchParams.get('market_id') || searchParams.get('marketId');
}

// Helper function to validate market ID from URL (without setting cookies)
// Throws error if URL contains invalid market_id
export function validateUrlMarketId(request: NextRequest): void {
  const queryMarketId = extractMarketId(request);
  if (queryMarketId) {
    const validation = validateMarketIdAgainstList(queryMarketId);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid market ID');
    }
  }
}

// Helper function to validate language from URL (without setting cookies)
// Throws error if URL contains invalid language
export function validateUrlLanguage(request: NextRequest): void {
  const queryLanguage = extractLanguage(request);
  if (queryLanguage) {
    const validation = validateLanguageAgainstList(queryLanguage);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid language');
    }
  }
}

// Helper function to extract language from URL
export function extractLanguage(request: NextRequest): string | null {
  const { searchParams } = request.nextUrl;
  return searchParams.get('language') || searchParams.get('lang');
}

// Helper function to extract limit from URL
export function extractLimit(request: NextRequest): number | null {
  const { searchParams } = request.nextUrl;
  const limitStr = searchParams.get('limit');
  if (!limitStr) return null;
  const limit = parseInt(limitStr, 10);
  return isNaN(limit) ? null : limit;
}

// Helper function to check if pathname is a table page
export function isTablePage(pathname: string): boolean {
  return (
    pathname.includes('/stocks') ||
    pathname.includes('/indices') ||
    pathname.includes('/watchlist') ||
    pathname.includes('/mynotes') ||
    pathname.includes('/top50')
  );
}

// Helper function to validate limit from URL (only for table pages)
// Throws error if URL contains limit > 9999
export function validateUrlLimit(request: NextRequest): void {
  const { pathname } = request.nextUrl;

  // Only validate limit for table pages
  if (!isTablePage(pathname)) {
    return;
  }

  const queryLimit = extractLimit(request);
  if (queryLimit !== null && queryLimit > 9999) {
    throw new Error(`Invalid limit "${queryLimit}". Maximum allowed limit is 9999.`);
  }
}

/**
 * Sets the market ID cookie on the response with secure settings.
 * Cookie is httpOnly, secure in production, and has 30-day expiration.
 *
 * @param response - Next.js response object to set cookie on
 * @param marketId - Market ID value to store (e.g., '1', '451')
 */
export function setMarketIdCookie(response: NextResponse, marketId: string): void {
  response.cookies.set('market_id', marketId, middlewareConfig.cookieSettings);
}

/**
 * Sets the language cookie on the response with secure settings.
 * Cookie is httpOnly, secure in production, and has 30-day expiration.
 *
 * @param response - Next.js response object to set cookie on
 * @param language - Language code to store (e.g., 'eng', 'nor', 'swe', 'dan')
 */
export function setLanguageCookie(response: NextResponse, language: string): void {
  response.cookies.set('language', language, middlewareConfig.cookieSettings);
}

/**
 * Gets market ID from request with fallback priority: URL param → Cookie → Default.
 * URL parameter takes highest priority if present and validated.
 *
 * @param request - Next.js request object
 * @returns Market ID string (e.g., '1' for Norway)
 *
 * @remarks
 * This function assumes URL market_id has already been validated by validateUrlMarketId()
 * before being called. The priority order ensures user preferences are respected.
 */
export function getMarketIdWithDefault(request: NextRequest): string {
  // Priority 1: URL query parameter (already validated)
  const queryMarketId = extractMarketId(request);
  if (queryMarketId) {
    return queryMarketId;
  }

  // Priority 2: Existing cookie
  const cookieMarketId = request.cookies.get('market_id')?.value;
  if (cookieMarketId && cookieMarketId.trim() !== '') return cookieMarketId;

  // Priority 3: Default value
  return middlewareConfig.defaults.marketId;
}

/**
 * Gets language from request with fallback priority: URL param → Cookie → Default.
 * URL parameter takes highest priority if present.
 *
 * @param request - Next.js request object
 * @returns Language code string (e.g., 'eng', 'nor', 'swe', 'dan')
 *
 * @remarks
 * The priority order ensures user preferences (URL) override stored preferences (cookie),
 * with a safe default fallback.
 */
export function getLanguageWithDefault(request: NextRequest): string {
  // Priority 1: URL query parameter
  const queryLanguage = extractLanguage(request);
  if (queryLanguage) return queryLanguage;

  // Priority 2: Existing cookie
  const cookieLanguage = request.cookies.get('language')?.value;
  if (cookieLanguage && cookieLanguage.trim() !== '') return cookieLanguage;

  // Priority 3: Default value
  return middlewareConfig.defaults.language;
}

function logAuthErrorAndDeny(error: unknown): void {
  void logger.error(
    'Middleware: Failed to get authorization',
    error instanceof Error ? error : new Error(String(error)),
    {
      component: 'middleware-auth',
      authEnabled: configuration.AUTH_ENABLED,
      authServiceAvailable: false,
      timestamp: new Date().toISOString(),
    }
  );
  if (!configuration.AUTH_ENABLED) {
    void logger.debug('Middleware: Auth disabled, allowing access despite auth service failure', {
      component: 'middleware-auth-dev-mode',
    });
    return;
  }
  const errorDetails = {
    component: 'middleware-auth-security-denial',
    severity: 'high',
    userImpact: 'access-denied',
    errorType: error instanceof Error ? error.constructor.name : 'UnknownError',
    errorMessage: error instanceof Error ? error.message : String(error),
    timestamp: new Date().toISOString(),
  };
  void logger.error(
    'SECURITY: Authentication enabled but auth service unavailable - denying access',
    error instanceof Error ? error : new Error(String(error)),
    errorDetails
  );
}

export async function setAuthCookie(response: NextResponse): Promise<void> {
  try {
    const { websid } = await authApiServiceEdge.getAuthorization();
    if (!websid || typeof websid !== 'string' || websid.trim() === '') {
      void logger.error('Middleware: Invalid websid received from auth service', undefined, {
        component: 'middleware-auth-validation',
      });
      return;
    }
    response.cookies.set('websid', websid, {
      httpOnly: false,
      secure: configuration.COOKIE_SECURE,
      sameSite: configuration.COOKIE_SAME_SITE as boolean | 'lax' | 'strict' | 'none' | undefined,
      maxAge: configuration.COOKIE_MAX_AGE,
      path: '/',
    });
    void logger.debug('Middleware: Set websid cookie');
  } catch (error) {
    logAuthErrorAndDeny(error);
  }
}

// Helper function to ensure default cookies are set
// NOTE: This assumes URL market_id and language have already been validated
export function ensureDefaultCookies(response: NextResponse, request: NextRequest): void {
  let marketId = getMarketIdWithDefault(request);

  // Validate market ID before setting cookie - fallback to default if invalid
  const marketIdValidation = validateMarketIdAgainstList(marketId);
  if (!marketIdValidation.isValid) {
    void logger.warn('Middleware: Invalid market ID detected, falling back to default', {
      invalidMarketId: marketId,
      error: marketIdValidation.error,
      defaultMarketId: middlewareConfig.defaults.marketId,
    });
    marketId = middlewareConfig.defaults.marketId;
  }

  let language = getLanguageWithDefault(request);
  // Validate language before setting cookie - fallback to default if invalid
  const languageValidation = validateLanguageAgainstList(language);
  if (!languageValidation.isValid) {
    void logger.warn('Middleware: Invalid language detected, falling back to default', {
      invalidLanguage: language,
      error: languageValidation.error,
      defaultLanguage: middlewareConfig.defaults.language,
    });
    language = middlewareConfig.defaults.language;
  }

  // Set market_id cookie if not present or different
  const existingMarketId = request.cookies.get('market_id')?.value;
  if (!existingMarketId || existingMarketId !== marketId) {
    setMarketIdCookie(response, marketId);
  }

  // Set language cookie if not present or different
  const existingLanguage = request.cookies.get('language')?.value;
  if (!existingLanguage || existingLanguage !== language) {
    setLanguageCookie(response, language);
  }

  void logger.debug('Middleware: Ensured default cookies', { marketId, language });
}

// Helper function to add debugging headers (development only)
export function addDebugHeaders(response: NextResponse, request: NextRequest): void {
  // Only add debug headers in development to avoid information disclosure
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('x-pathname', request.nextUrl.pathname);
    response.headers.set('x-timestamp', new Date().toISOString());
    response.headers.set('x-market-id', getMarketIdWithDefault(request));
    response.headers.set('x-language', getLanguageWithDefault(request));
  }
}
