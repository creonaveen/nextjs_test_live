/**
 * Default query options for TanStack Query
 * Provides consistent configuration across all queries
 */

/**
 * Default query options for all API queries
 * These options will be spread into useQuery calls
 */
export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime) - cache is kept for 10 minutes
  retry: 3, // Retry failed requests 3 times
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
  refetchOnWindowFocus: false, // Don't refetch when window regains focus
  refetchOnMount: false, // Don't refetch on component mount if data exists
  refetchOnReconnect: true, // Refetch when network reconnects
};

/**
 * Default mutation options
 */
export const defaultMutationOptions = {
  retry: 1, // Only retry once for mutations
  retryDelay: 1000, // Wait 1 second before retry
};
