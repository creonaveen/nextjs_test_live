import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { Svg } from '@/lib/types/svg';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface SvgQueryParams {
  w?: number;
  h?: number;
  svg_id?: string;
  company_id?: string;
  chart_tooltip_id?: number;
  chart_param?: string;
  show_image_border?: number;
  chart_maximize?: number;
  size?: string;
  lang?: string;
}

const MAX_CONCURRENCY = 2;
let activeCount = 0;
const taskQueue: Array<() => void> = [];

function runNext() {
  while (activeCount < MAX_CONCURRENCY && taskQueue.length > 0) {
    const startTask = taskQueue.shift()!;
    startTask();
  }
}

/**
 * Enqueues an SVG request with concurrency control.
 * Limits concurrent SVG requests to MAX_CONCURRENCY (2) to prevent overwhelming the server.
 *
 * @param fn - Async function that performs the SVG request
 * @returns Promise that resolves when the request completes
 */
function enqueueSvgRequest<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const start = () => {
      activeCount += 1;
      fn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeCount -= 1;
          runNext();
        });
    };

    taskQueue.push(start);
    runNext();
  });
}

/**
 * API service for SVG chart generation.
 * Handles fetching SVG charts with concurrency control to prevent server overload.
 */
export const SvgApiService = {
  /**
   * Fetches an SVG chart with specified parameters.
   * Requests are automatically queued and rate-limited to prevent server overload.
   *
   * @param params - Query parameters for chart generation (dimensions, chart_id, tooltip settings, etc.)
   * @returns Promise resolving to Svg containing the chart SVG data
   *
   * @example
   * ```ts
   * const svg = await SvgApiService.getSvg({
   *   svg_id: 'chart123',
   *   company_id: '12345',
   *   w: 1200,
   *   h: 600,
   *   chart_tooltip_id: 1,
   *   lang: 'eng'
   * });
   * ```
   */
  getSvg: async (params?: SvgQueryParams): Promise<Svg> => {
    const url = buildApiUrl(apiUrls.getSvg);

    return enqueueSvgRequest(async () => {
      const response = await apiClient.get<Svg>(url, {
        params: params as unknown as Record<string, unknown>,
      });
      return response.data;
    });
  },
};

/**
 * React Query hook to fetch SVG chart data.
 * Includes caching (60s stale time) and retry logic.
 *
 * @param params - Query parameters for chart generation
 * @param enable - Optional flag to enable/disable the query (defaults to true)
 * @returns React Query hook result with SVG data
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useGetSvgData({
 *   svg_id: 'chart123',
 *   company_id: '12345'
 * });
 * ```
 */
export function useGetSvgData(params?: SvgQueryParams, enable?: boolean) {
  return useQuery({
    queryKey: queryKeys.svg.chart(params),
    queryFn: () => SvgApiService.getSvg(params),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: enable === true || enable === undefined ? true : false,
  });
}
