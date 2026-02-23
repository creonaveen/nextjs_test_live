import { serverApiClient } from '@/lib/server-axios';
import { ModelPortfolio } from '@/lib/types/model-portfolio';

import { apiUrls, buildApiUrl } from '../api-urls';

export interface ModelPortfolioQueryParams {
  market_id?: string;
  lang: string;
}

export const modelPortfolioApiService = {
  getModelPortfolio: async (params?: ModelPortfolioQueryParams): Promise<ModelPortfolio> => {
    const url = buildApiUrl(apiUrls.getModelPortfolio);
    const response = await serverApiClient.get<ModelPortfolio>(url, {
      params: params ? (params as unknown as Record<string, unknown>) : undefined,
    });
    return response.data;
  },
};
