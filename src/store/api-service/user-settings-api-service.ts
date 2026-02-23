import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { UserSettingsData } from '@/lib/types/user-settings';

import { apiUrls, buildApiUrl } from '../api-urls';

// Standard parameter types
export interface UserSettingsQueryParams {
  company_id?: string;
  indicator_update?: number;
  product?: number;
  chart_tooltip_id?: number;
  lang?: string;
}

export const userSettingsApiService = {
  getUserSettings: async (params?: UserSettingsQueryParams): Promise<UserSettingsData> => {
    const url = buildApiUrl(apiUrls.getUserSettings);
    const response = await apiClient.get<UserSettingsData>(url, {
      params: params as unknown as Record<string, unknown>,
    });
    return response.data;
  },
};

export function useGetUserSettingsData(params?: UserSettingsQueryParams) {
  return useQuery({
    queryKey: queryKeys.userSettings.settings(params),
    queryFn: () => userSettingsApiService.getUserSettings(params),
  });
}
