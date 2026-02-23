import { serverApiClient } from '@/lib/server-axios';
import { Top50List } from '@/lib/types/top50';

import { apiUrls, buildApiUrl } from '../api-urls';

export interface Top50QueryParams {
  page?: number;
  limit?: number;
  buyOrSell?: string | null;
  timespan?: string | null;
  market_id?: string;
  ordering?: string | null;
  lang: string;
}

export const top50ApiService = {
  getTop50List: async (params?: Top50QueryParams): Promise<Top50List> => {
    const url = buildApiUrl(apiUrls.getTop50List);
    const response = await serverApiClient.get<Top50List>(url, {
      params: params ? (params as unknown as Record<string, unknown>) : undefined,
    });
    return response.data;
  },
};
