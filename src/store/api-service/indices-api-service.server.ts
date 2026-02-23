import { serverApiClient } from '@/lib/server-axios';
import { IndicesList } from '@/lib/types/indices';

import { apiUrls, buildApiUrl } from '../api-urls';

export interface IndicesQueryParams {
  page?: number;
  limit?: number;
  market_id?: string;
  ordering?: string | null;
  lang: string;
}

export const indicesApiService = {
  getIndicesList: async (params?: IndicesQueryParams): Promise<IndicesList> => {
    const url = buildApiUrl(apiUrls.getIndicesList);
    const response = await serverApiClient.get<IndicesList>(url, {
      params: params ? (params as unknown as Record<string, unknown>) : undefined,
    });
    return response.data;
  },
};
