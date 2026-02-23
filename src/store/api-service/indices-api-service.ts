import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { IndicesList } from '@/lib/types/indices';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface IndicesQueryParams {
  page?: number;
  limit?: number;
  market_id?: string;
  ordering?: string | null;
  lang: string;
}

export interface IndicesApiOptions {
  params?: IndicesQueryParams;
}

export const indicesApiService = {
  getIndices: async (params?: IndicesQueryParams): Promise<IndicesList> => {
    const url = buildApiUrl(apiUrls.getIndicesList);
    const response = await apiClient.get<IndicesList>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

export function useGetIndicesList(params?: IndicesQueryParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['indicesList', params],
    queryFn: () => indicesApiService.getIndices(params),
    ...options,
  });
}
