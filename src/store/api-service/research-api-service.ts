import { apiClient } from '@/lib/axios';

import { apiUrls, buildApiUrl } from '../api-urls';

export interface ResearchQueryParams {
  wp_post?: string;
  market_id?: string;
  lang: string;
}

export const researchApiService = {
  getResearch: async (slug?: string, params?: ResearchQueryParams) => {
    const url = buildApiUrl(apiUrls.getResearchList);

    // Add wp_post to params if slug is provided
    const queryParams = {
      ...params,
      ...(slug && { wp_post: slug }),
    };

    const response = await apiClient.get(url, { params: queryParams });
    return response.data;
  },
};
