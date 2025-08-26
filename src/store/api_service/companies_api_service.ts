import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../apiUrls';

// Standard parameter types
export interface CompanyQueryParams {
  page?: number;
  limit?: number;
  q?: string | null;
  ordering?: string | null;
}

export interface CompanyApiOptions {
  partner_slug: string;
  params?: CompanyQueryParams;
}

export const companyApiService = {
  getCompanies: async (partner_slug: string, params?: CompanyQueryParams): Promise<any> => {
    try {
      if (!partner_slug) {
        throw new Error('partner_slug is required');
      }

      const url = apiUrls.getCompanyList.replace('{partner_slug}', partner_slug);

      const response = await apiClient.get(url, { params: params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export function useGetCompanyList(partner_slug: string, params?: CompanyQueryParams) {
  return useQuery({
    queryKey: ['companyList', partner_slug, params],
    queryFn: () => companyApiService.getCompanies(partner_slug, params),
  });
}
