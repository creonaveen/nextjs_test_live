import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../apiUrls';

// Standard parameter types
export interface IndicesQueryParams {
  page?: number;
  limit?: number;
  market_id?: string;
  ordering?: string | null;
}

export interface IndicesApiOptions {
  partner_slug: string;
  params?: IndicesQueryParams;
}

export const indicesApiService = {
  getIndices: async (partner_slug: string, params?: IndicesQueryParams): Promise<any> => {
    try {
      if (!partner_slug) {
        throw new Error('partner_slug is required');
      }

      const url = apiUrls.getIndicesList.replace('{partner_slug}', partner_slug);

      const response = await apiClient.get(url, { params: params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export function useGetIndicesList(partner_slug: string, params?: IndicesQueryParams) {
  return useQuery({
    queryKey: ['indicesList', partner_slug, params],
    queryFn: () => indicesApiService.getIndices(partner_slug, params),
  });
}
