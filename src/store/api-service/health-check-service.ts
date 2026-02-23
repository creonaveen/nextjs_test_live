import { serverApiClient } from '@/lib/server-axios';
import { HealthCheckResponse } from '@/lib/types/health-check';

import { apiUrls, buildApiUrl } from '../api-urls';
export interface HealthCheckQueryParams {
  portfolio_id?: string | null;
  watchlist_id?: string | null;
  company_ids?: string | null;
  portfolio_tickers?: string | null;
  portfolio_num_shares?: string | null;
  ref_index_ticker?: string | null;
  ref_index_company_id?: string | null;
  sections?: string | null;
  lang?: string | null;
  market_id?: string | null;
}

/**
 * API service for health check-related operations.
 * Handles fetching health check data from the backend API.
 */
export const healthCheckApiService = {
  /**
   * Fetches a health check with optional filtering.
   *
   * @param params - Optional query parameters for filtering and pagination
   * @returns Promise resolving to a HealthCheckResponse containing health check data
   *
   * @example
   * ```ts
   * const healthCheck = await healthCheckApiService.getHealthCheck({
   *   portfolio_id: '12345',
   *   sections: 'health_data,pies,kpis,correlation_analysis'
   * });
   * ```
   */
  getHealthCheck: async (params?: HealthCheckQueryParams): Promise<HealthCheckResponse> => {
    const url = buildApiUrl(apiUrls.getHealthCheck);
    const response = await serverApiClient.get<HealthCheckResponse>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};
