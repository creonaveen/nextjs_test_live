import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { Svg } from '@/lib/types/svg';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface StaticContentQueryParams {
  w?: number;
  h?: number;
  svg_id?: string;
  company_id?: string;
  chart_tooltip_id?: number;
  chart_param?: string;
  show_image_border?: number;
  chart_maximize?: number;
  reference: string;
  parameters: string;
  size?: string;
}

export const StaticContentService = {
  getStaticContent: async (params?: StaticContentQueryParams): Promise<Svg> => {
    const url = buildApiUrl(apiUrls.getStaticContent);
    const response = await apiClient.get<Svg>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

export function useGetStaticContent(params?: StaticContentQueryParams, enable?: boolean) {
  return useQuery({
    queryKey: queryKeys.staticContent.content(params),
    queryFn: () => StaticContentService.getStaticContent(params),
    staleTime: 60 * 1000,
    enabled: enable === true || enable === undefined ? true : false,
  });
}
