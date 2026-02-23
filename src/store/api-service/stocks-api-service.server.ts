import { serverApiClient } from '@/lib/server-axios';
import { StockList } from '@/lib/types/stocks';

import { apiUrls, buildApiUrl } from '../api-urls';

export interface StocksQueryParams {
  page?: number;
  limit?: number;
  alphabetic_filter?: string | null;
  market_id?: string;
  ordering?: string | null;
  lang: string;
}

export const stocksApiService = {
  getStocksList: async (params?: StocksQueryParams): Promise<StockList> => {
    const url = buildApiUrl(apiUrls.getStocksList);
    const response = await serverApiClient.get<StockList>(url, {
      params: params ? (params as unknown as Record<string, unknown>) : undefined,
    });
    return response.data;
  },
};
