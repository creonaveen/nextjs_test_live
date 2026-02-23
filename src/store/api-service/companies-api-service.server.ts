import { serverApiClient } from '@/lib/server-axios';
import { CompanyDetail } from '@/lib/types/company';

import { apiUrls, buildApiUrl } from '../api-urls';

import { CompanyDetailsQueryParams } from './companies-api-service';

/**
 * Server-only function to fetch company details using server-side axios
 * This function handles cookies automatically on the server side
 */
export async function getCompanyDetailsServerSide(
  params?: CompanyDetailsQueryParams
): Promise<CompanyDetail | null> {
  if (!params?.company_id) {
    throw new Error('company_id is required');
  }

  const url = buildApiUrl(apiUrls.getCompanyDetails);
  const response = await serverApiClient.get<CompanyDetail>(url, {
    params: params ? (params as unknown as Record<string, unknown>) : undefined,
  });
  return response.data;
}
