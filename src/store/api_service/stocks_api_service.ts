import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../apiUrls';

// Standard parameter types
export interface StocksQueryParams {
  page?: number;
  limit?: number;
  alphabetic_filter?: string | null;
  market_id?: string;
  ordering?: string | null;
}

export interface StocksApiOptions {
  partner_slug: string;
  params?: StocksQueryParams;
}

export const stockApiService = {
  getStocks: async (partner_slug: string, params?: StocksQueryParams): Promise<any> => {
    try {
      if (!partner_slug) {
        throw new Error('partner_slug is required');
      }

      const url = apiUrls.getStocksList.replace('{partner_slug}', partner_slug);

      const response = await apiClient.get(url, { params: params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export function useGetStocksList(partner_slug: string, params?: StocksQueryParams) {
  return useQuery({
    queryKey: ['stocksList', partner_slug, params],
    queryFn: () => stockApiService.getStocks(partner_slug, params),
  });
}
