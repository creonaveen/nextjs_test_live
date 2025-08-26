import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../apiUrls';

// Standard parameter types
export interface Top50QueryParams {
  page?: number;
  limit?: number;
  buyOrSell?: string | null;
  timespan?: string | null;
  market_id?: string;
  ordering?: string | null;
}

export interface Top50ApiOptions {
  partner_slug: string;
  params?: Top50QueryParams;
}

export const top50ApiService = {
  getTop50: async (partner_slug: string, params?: Top50QueryParams): Promise<any> => {
    try {
      if (!partner_slug) {
        throw new Error('partner_slug is required');
      }

      const url = apiUrls.getTop50List.replace('{partner_slug}', partner_slug);

      const response = await apiClient.get(url, { params: params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export function useGetTop50List(partner_slug: string, params?: Top50QueryParams) {
  return useQuery({
    queryKey: ['top50List', partner_slug, params],
    queryFn: () => top50ApiService.getTop50(partner_slug, params),
  });
}
