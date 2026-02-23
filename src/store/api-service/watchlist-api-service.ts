import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { Watchlists } from '@/lib/types/watchlist';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface WatchlistQueryParams {
  page?: number;
  limit?: number;
  ordering?: string | null;
  company_id?: string | null; //can be negative for deletion
  lang: string;
}

/**
 * API service for watchlist operations.
 * Handles fetching and modifying user watchlists.
 */
export const watchlistApiService = {
  /**
   * Fetches the user's watchlist with optional pagination and filtering.
   * Can also be used to add/remove companies by providing company_id in params.
   *
   * @param params - Query parameters including language, pagination, and optional company_id
   * @returns Promise resolving to Watchlists containing watchlist companies
   *
   * @example
   * ```ts
   * // Fetch watchlist
   * const watchlist = await watchlistApiService.getWatchlist({
   *   lang: 'eng',
   *   page: 1,
   *   limit: 20
   * });
   *
   * // Add company to watchlist
   * await watchlistApiService.getWatchlist({
   *   lang: 'eng',
   *   company_id: '12345'
   * });
   *
   * // Remove company from watchlist (negative company_id)
   * await watchlistApiService.getWatchlist({
   *   lang: 'eng',
   *   company_id: '-12345'
   * });
   * ```
   */
  getWatchlist: async (params?: WatchlistQueryParams): Promise<Watchlists> => {
    const url = buildApiUrl(apiUrls.getWatchList);
    const response = await apiClient.get<Watchlists>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

/**
 * React Query hook to fetch watchlist data
 * Uses useQuery for read operations
 */
export function useGetWatchlist(params?: WatchlistQueryParams) {
  return useQuery({
    queryKey: queryKeys.watchlist.list(params),
    queryFn: () => watchlistApiService.getWatchlist(params),
    enabled: !!params?.lang,
    refetchOnMount: true,
  });
}

/**
 * React Query mutation hook to modify watchlist (add/delete companies)
 * Uses useMutation instead of useQuery for state-changing operations
 *
 * Invalidates watchlist queries to ensure the watchlist table updates immediately
 * when companies are added or removed.
 */
export function useModifyWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: WatchlistQueryParams) => watchlistApiService.getWatchlist(params),
    onSuccess: () => {
      // Invalidate all watchlist queries to trigger refetch with updated data
      // Using refetchType: 'all' to refetch even if the query is inactive (e.g., user on company page)
      // Using queryKeys.watchlist.lists() to ensure we match all watchlist list queries
      // regardless of their parameters (pagination, filtering, etc.)
      const invalidationPromise = queryClient.invalidateQueries({
        queryKey: queryKeys.watchlist.lists(),
        refetchType: 'all', // Force immediate refetch even if query is not currently active
      });

      // Handle both Promise and non-Promise returns (for test compatibility)
      if (typeof invalidationPromise?.catch === 'function') {
        invalidationPromise.catch(() => {
          // Ignore errors in query invalidation - not critical for user experience
        });
      }
    },
  });
}
