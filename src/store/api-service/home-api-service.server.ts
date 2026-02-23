import { serverApiClient } from '@/lib/server-axios';
import { HomePageData } from '@/lib/types/home';

import { apiUrls, buildApiUrl } from '../api-urls';

/**
 * Server-only function to fetch home page data using server-side axios
 * This function handles cookies automatically on the server side
 */

export interface HomePageQueryParams {
  market_id: string;
  lang: string;
}

export async function getHomePageServerSide(
  params?: HomePageQueryParams
): Promise<HomePageData | null> {
  const url = buildApiUrl(apiUrls.getHomePage);
  const response = await serverApiClient.get<HomePageData>(url, {
    params: params ? (params as unknown as Record<string, unknown>) : undefined,
  });
  return response.data;
}
