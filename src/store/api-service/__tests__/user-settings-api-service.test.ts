import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { userSettingsApiService, useGetUserSettingsData } from '../user-settings-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('user-settings-service', () => {
  const mockResponseData = {
    id: 1,
    settings: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('userSettingsApiService.getUserSettings', () => {
    it('should fetch user settings successfully', async () => {
      const mockParams = { company_id: '123', lang: 'eng', chart_tooltip_id: 1 };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await userSettingsApiService.getUserSettings(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getUserSettings, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(userSettingsApiService.getUserSettings()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await userSettingsApiService.getUserSettings();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getUserSettings, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle indicator_update param', async () => {
      const mockParams = { indicator_update: 1, lang: 'eng' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await userSettingsApiService.getUserSettings(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getUserSettings, {
        params: mockParams,
      });
    });

    it('should handle product param', async () => {
      const mockParams = { product: 2, lang: 'eng' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await userSettingsApiService.getUserSettings(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getUserSettings, {
        params: mockParams,
      });
    });
  });

  describe('useGetUserSettingsData', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { lang: 'eng' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetUserSettingsData(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['userSettings']),
          queryFn: expect.any(Function),
        })
      );
    });

    it('should work without params', () => {
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetUserSettingsData();

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryFn: expect.any(Function),
        })
      );
    });
  });
});
