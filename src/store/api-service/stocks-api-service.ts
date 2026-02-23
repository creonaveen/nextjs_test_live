import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { StockList } from '@/lib/types/stocks';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface StocksQueryParams {
  page?: number;
  limit?: number;
  alphabetic_filter?: string | null;
  market_id?: string;
  ordering?: string | null;
  lang: string;
}

export interface StocksApiOptions {
  params?: StocksQueryParams;
}

/**
 * API service for stock-related operations.
 * Handles fetching stock lists with filtering and pagination.
 */
export const stockApiService = {
  /**
   * Fetches a paginated list of stocks with optional filtering.
   *
   * @param params - Optional query parameters for filtering (market_id, alphabetic_filter) and pagination
   * @returns Promise resolving to StockList containing stocks and pagination metadata
   *
   * @example
   * ```ts
   * const stocks = await stockApiService.getStocks({
   *   page: 1,
   *   limit: 50,
   *   market_id: 'nor',
   *   alphabetic_filter: 'A',
   *   lang: 'eng'
   * });
   * ```
   */
  getStocks: async (params?: StocksQueryParams): Promise<StockList> => {
    const url = buildApiUrl(apiUrls.getStocksList);
    const response = await apiClient.get<StockList>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

/**
 * React Query hook to fetch stocks list.
 *
 * @param params - Optional query parameters for filtering and pagination
 * @param options - Additional React Query options (e.g., enabled flag)
 * @returns React Query hook result with stocks list data
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useGetStocksList({
 *   market_id: 'nor',
 *   lang: 'eng'
 * });
 * ```
 */
export function useGetStocksList(params?: StocksQueryParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.stocks.list(params),
    queryFn: () => stockApiService.getStocks(params),
    ...options,
  });
}
