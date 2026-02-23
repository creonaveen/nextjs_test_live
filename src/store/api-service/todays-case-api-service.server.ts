import { serverApiClient } from '@/lib/server-axios';
import { TodaysCaseData } from '@/lib/types/todays-case';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface TodaysCaseQueryParams {
  market_id: string;
  lang?: string;
  price_date?: string;
}

export async function getTodaysCaseServerSide(
  params?: TodaysCaseQueryParams
): Promise<TodaysCaseData> {
  const url = buildApiUrl(apiUrls.getTodaysCase);
  const response = await serverApiClient.get<TodaysCaseData>(url, {
    params: params ? (params as unknown as Record<string, unknown>) : undefined,
  });
  return response.data;
}
