import { serverApiClient } from '@/lib/server-axios';

import { apiUrls, buildApiUrl } from '../api-urls';

import { ResearchQueryParams } from './research-api-service';

/**
 * Server-only function to fetch research data using server-side axios
 * This function handles cookies automatically on the server side
 */
export const researchApiServiceServer = {
  getResearch: async (slug?: string, params?: ResearchQueryParams) => {
    const url = buildApiUrl(apiUrls.getResearchList);

    // Add wp_post to params if slug is provided
    const queryParams = {
      ...params,
      ...(slug && { wp_post: slug }),
    };

    const response = await serverApiClient.get(url, {
      params: queryParams as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};
