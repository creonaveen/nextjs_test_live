import { NextRequest, NextResponse } from 'next/server';

// import { configuration } from '@/environment/configuration';
import logger from '@/utils/logger-server';

import {
  shouldExcludePath,
  addDebugHeaders,
  ensureDefaultCookies,
  setAuthCookie,
  validateUrlMarketId,
  validateUrlLanguage,
  validateUrlLimit,
} from './middleware.config';
/**
 * Request deduplication cache with size limits.
 *
 * This in-memory cache provides request deduplication to prevent duplicate processing
 * of identical requests within a short time window (CACHE_DURATION).
 *
 * CACHE BEHAVIOR:
 * - Cache is scoped to a single proxy runtime instance
 * - Cache entries expire after CACHE_DURATION (1 second)
 * - Maximum cache size is limited to MAX_CACHE_SIZE (500 entries)
 * - Automatic cleanup removes expired entries every CLEANUP_INTERVAL requests (5 requests)
 * - Proactive cleanup triggers when cache reaches 80% capacity
 * - When cache reaches MAX_CACHE_SIZE, oldest entries are evicted using O(n) algorithm
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - Cache cleanup uses Map's insertion order (O(n)) instead of sorting (O(n log n))
 * - Proactive cleanup prevents cache from reaching capacity limit
 * - Reduced cache size and cleanup interval for better memory management
 *
 * LIMITATIONS:
 * - Cache does NOT persist across proxy function invocations in serverless environments
 * - In high-traffic scenarios with multiple instances, duplicate requests may occur
 * - Cache is not shared between function instances
 * - Cache metrics are logged but not exposed to external monitoring by default
 *
 * PRODUCTION RECOMMENDATIONS:
 * 1. Monitor cache hit rates via logs to assess effectiveness
 * 2. For critical deduplication requirements, consider using an external cache service (e.g., Redis)
 * 3. Monitor cache size in production logs to detect memory issues
 * 4. If cache hit rate is low, consider:
 *    - Increasing CACHE_DURATION for longer deduplication window
 *    - Implementing external cache (Redis) for shared state
 *    - Using request ID headers for better deduplication
 *
 * MONITORING:
 * - Cache metrics are logged every METRICS_LOG_INTERVAL (60 seconds)
 * - Metrics include: cache size, hit rate, entries removed
 * - Warning is logged when cache size exceeds 80% of MAX_CACHE_SIZE
 *
 * DEPLOYMENT NOTES:
 * - Next.js 16 proxy runs in Node.js runtime (not Edge).
 * - Self-hosted: Cache persists as long as the process is running
 */
const requestCache = new Map<string, number>();
const CACHE_DURATION = 1000; // 1 second
const MAX_CACHE_SIZE = 500; // Maximum cache entries (reduced from 1000 for better memory management)
const CACHE_WARNING_THRESHOLD = 0.8; // Trigger proactive cleanup at 80% capacity
let requestCount = 0;
const CLEANUP_INTERVAL = 5; // Cleanup every 5 requests (reduced from 10 for better memory management)
const AUTH_ENABLED = true;

// Cache metrics for monitoring
let cacheHits = 0;
let cacheMisses = 0;
let lastMetricsLog = Date.now();
const METRICS_LOG_INTERVAL = 60000; // Log metrics every 60 seconds

function buildRequestKey(request: NextRequest): string {
  const url = new URL(request.url);
  const stableParams = new URLSearchParams();
  const marketId = url.searchParams.get('market_id');
  const language = url.searchParams.get('language');
  if (marketId) stableParams.set('market_id', marketId);
  if (language) stableParams.set('language', language);
  const stableQuery = stableParams.toString();
  return `${request.method}:${url.pathname}${stableQuery ? `?${stableQuery}` : ''}`;
}

function removeExpiredCacheEntries(now: number): void {
  for (const [key, timestamp] of requestCache.entries()) {
    if (now - timestamp > CACHE_DURATION) requestCache.delete(key);
  }
}

function runCacheEviction(now: number): void {
  const cacheSizeThreshold = Math.floor(MAX_CACHE_SIZE * CACHE_WARNING_THRESHOLD);
  if (requestCache.size >= cacheSizeThreshold) removeExpiredCacheEntries(now);
  if (requestCache.size >= MAX_CACHE_SIZE) {
    removeExpiredCacheEntries(now);
    if (requestCache.size >= MAX_CACHE_SIZE) {
      const entriesToRemove = requestCache.size - MAX_CACHE_SIZE + 1;
      let count = 0;
      for (const key of requestCache.keys()) {
        if (count++ >= entriesToRemove) break;
        requestCache.delete(key);
      }
    }
  }
}

function runPeriodicCleanupAndMetrics(now: number): void {
  requestCount++;
  if (requestCount < CLEANUP_INTERVAL) return;
  requestCount = 0;
  const beforeSize = requestCache.size;
  removeExpiredCacheEntries(now);
  const afterSize = requestCache.size;
  if (now - lastMetricsLog >= METRICS_LOG_INTERVAL) {
    const total = cacheHits + cacheMisses;
    const hitRate = total > 0 ? ((cacheHits / total) * 100).toFixed(2) : '0.00';
    void logger.info('Proxy cache metrics', {
      cacheSize: afterSize,
      cacheSizeBeforeCleanup: beforeSize,
      entriesRemoved: beforeSize - afterSize,
      cacheHits,
      cacheMisses,
      hitRate: `${hitRate}%`,
      maxCacheSize: MAX_CACHE_SIZE,
    });
    cacheHits = 0;
    cacheMisses = 0;
    lastMetricsLog = now;
  }
  const warningThreshold = Math.floor(MAX_CACHE_SIZE * CACHE_WARNING_THRESHOLD);
  if (afterSize >= warningThreshold) {
    void logger.warn('Proxy cache approaching size limit', {
      currentSize: afterSize,
      maxSize: MAX_CACHE_SIZE,
      threshold: warningThreshold,
      utilizationPercent: ((afterSize / MAX_CACHE_SIZE) * 100).toFixed(2),
    });
  }
}

async function buildValidatedResponse(request: NextRequest): Promise<NextResponse> {
  validateUrlLanguage(request);
  validateUrlMarketId(request);
  validateUrlLimit(request);
  const response = NextResponse.next();
  ensureDefaultCookies(response, request);
  if (AUTH_ENABLED) await setAuthCookie(response);
  addDebugHeaders(response, request);
  return response;
}

function handleDuplicateOrUpdateCache(request: NextRequest): NextResponse | null {
  const requestKey = buildRequestKey(request);
  const now = Date.now();
  const lastRequestTime = requestCache.get(requestKey);
  if (lastRequestTime && now - lastRequestTime < CACHE_DURATION) {
    cacheHits++;
    void logger.info('Proxy: Duplicate request detected, skipping', {
      pathname: request.nextUrl.pathname,
    });
    return NextResponse.next();
  }
  cacheMisses++;
  runCacheEviction(now);
  requestCache.set(requestKey, now);
  runPeriodicCleanupAndMetrics(now);
  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (shouldExcludePath(pathname)) return NextResponse.next();
  if (request.headers.get('content-type') === 'application/json') return NextResponse.next();

  const cached = handleDuplicateOrUpdateCache(request);
  if (cached) return cached;

  void logger.info('Proxy called', { pathname, method: request.method, url: request.url });
  if (pathname === '/not-found') return NextResponse.next();

  try {
    return await buildValidatedResponse(request);
  } catch (error) {
    void logger.error(
      'Proxy: Validation failed',
      error instanceof Error ? error : new Error(String(error)),
      { pathname, url: request.url, method: request.method, component: 'proxy' }
    );
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = '/not-found';
    return NextResponse.redirect(notFoundUrl);
  }
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
