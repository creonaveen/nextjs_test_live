import { serverApiClient } from '@/lib/server-axios';
import { MarketCommentary } from '@/lib/types/market-commentary';

import { apiUrls, buildApiUrl } from '../api-urls';

export interface MarketCommentaryQueryParams {
  market_id?: string;
  lang: string;
}

export const marketCommentaryApiService = {
  getMarketCommentary: async (params?: MarketCommentaryQueryParams): Promise<MarketCommentary> => {
    const url = buildApiUrl(apiUrls.getMarketCommentary);
    const response = await serverApiClient.get<MarketCommentary>(url, {
      params: params ? (params as unknown as Record<string, unknown>) : undefined,
    });
    return response.data;
  },
};
