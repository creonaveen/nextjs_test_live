import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { CompanyList, CompanyDetail, MainChartSectionData } from '@/lib/types/company';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface CompanyQueryParams {
  page?: number;
  limit?: number;
  market_id?: string | null;
  q?: string | null;
  ordering?: string | null;
  id?: string | null;
}
export interface CompanyDetailsQueryParams {
  company_id?: string | null;
  lang?: string;
  section?: string;
  product?: number;
}

export interface CompanyDetailsApiOptions {
  params?: CompanyDetailsQueryParams;
}

/**
 * API service for company-related operations.
 * Handles fetching company lists and details from the backend API.
 */
export const companyApiService = {
  /**
   * Fetches a paginated list of companies with optional filtering.
   *
 
   * @param params - Optional query parameters for filtering and pagination
   * @returns Promise resolving to a CompanyList containing companies and pagination metadata
 
   *
   * @example
   * ```ts
   * const companies = await companyApiService.getCompanies({
   *   page: 1,
   *   limit: 20,
   *   market_id: 'nor',
   *   q: 'apple'
   * });
   * ```
   */
  getCompanies: async (params?: CompanyQueryParams): Promise<CompanyList> => {
    const url = buildApiUrl(apiUrls.getCompanyList);
    const response = await apiClient.get<CompanyList>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

/**
 * React Query hook to fetch company list with search functionality.
 * Only enabled when a search query (q) is provided.
 *
 
 * @param params - Optional query parameters for filtering and pagination
 * @returns React Query hook result with company list data
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useGetCompanyList({ q: 'apple' });
 * ```
 */
export function useGetCompanyList(params?: CompanyQueryParams) {
  return useQuery({
    queryKey: ['companyList', params],
    queryFn: () => companyApiService.getCompanies(params),
    enabled: !!params?.q,
  });
}

/**
 * API service for fetching detailed company information.
 */
export const companyDetailsApiService = {
  /**
   * Fetches detailed information about a specific company.
   *
 
   * @param params - Query parameters including company_id, language, and optional section
   * @returns Promise resolving to CompanyDetail with comprehensive company data
 
   *
   * @example
   * ```ts
   * const company = await companyDetailsApiService.getCompanyDetails({
   *   company_id: '12345',
   *   lang: 'eng',
   *   section: 'main_chart'
   * });
   * ```
   */
  getCompanyDetails: async (params?: CompanyDetailsQueryParams): Promise<CompanyDetail> => {
    const url = buildApiUrl(apiUrls.getCompanyDetails);
    const response = await apiClient.get<CompanyDetail>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};
/**
 * API service for fetching specific sections of company details (e.g., main chart section).
 */
export const companyDetailsApiServiceSection = {
  /**
   * Fetches a specific section of company details, typically used for chart data.
   *
 
   * @param params - Query parameters including company_id, language, and section
   * @returns Promise resolving to MainChartSectionData
 
   */
  getCompanyDetailsSection: async (
    params?: CompanyDetailsQueryParams
  ): Promise<MainChartSectionData> => {
    const url = buildApiUrl(apiUrls.getCompanyDetails);
    const response = await apiClient.get<MainChartSectionData>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

/**
 * Server-side function to fetch company details.
 *
 * @param params - Query parameters including company_id
 * @returns Promise resolving to CompanyDetail or null if parameters are invalid
 */
export async function getCompanyDetailsServer(
  params?: CompanyDetailsQueryParams
): Promise<CompanyDetail | null> {
  if (!params?.company_id) return null;
  return companyDetailsApiService.getCompanyDetails(params);
}

/**
 * Server-side function to fetch a specific section of company details.
 *
 * @param params - Query parameters including company_id
 * @returns Promise resolving to MainChartSectionData or null if parameters are invalid
 */
export async function getCompanyDetailsServerSection(
  params?: CompanyDetailsQueryParams
): Promise<MainChartSectionData | null> {
  if (!params?.company_id) return null;
  return companyDetailsApiServiceSection.getCompanyDetailsSection(params);
}
