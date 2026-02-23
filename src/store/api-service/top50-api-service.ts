import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { Top50List } from '@/lib/types/top50';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface Top50QueryParams {
  page?: number;
  limit?: number;
  buyOrSell?: string | null;
  timespan?: string | null;
  market_id?: string;
  ordering?: string | null;
  lang: string;
}

export interface Top50ApiOptions {
  params?: Top50QueryParams;
}

export const top50ApiService = {
  getTop50: async (params?: Top50QueryParams): Promise<Top50List> => {
    const url = buildApiUrl(apiUrls.getTop50List);
    const response = await apiClient.get<Top50List>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

export function useGetTop50List(params?: Top50QueryParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.top50.list(params),
    queryFn: () => top50ApiService.getTop50(params),
    ...options,
  });
}
