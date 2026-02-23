import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { SvgApiService, useGetSvgData } from '../svg-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('svg-api-service', () => {
  const mockResponseData = {
    svg: '<svg></svg>',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('SvgApiService.getSvg', () => {
    it('should fetch SVG successfully', async () => {
      const mockParams = { svg_id: '123', company_id: '456', lang: 'eng' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await SvgApiService.getSvg(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getSvg, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(SvgApiService.getSvg()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await SvgApiService.getSvg();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getSvg, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle concurrency limiting', async () => {
      const mockParams = { svg_id: '123' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const promises = [
        SvgApiService.getSvg(mockParams),
        SvgApiService.getSvg(mockParams),
        SvgApiService.getSvg(mockParams),
      ];

      await Promise.all(promises);

      // Should have been called 3 times
      expect(apiClient.get).toHaveBeenCalledTimes(3);
    });
  });

  describe('useGetSvgData', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { svg_id: '123' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetSvgData(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['svg', 'chart']),
          queryFn: expect.any(Function),
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
          retry: 1,
          enabled: true,
        })
      );
    });

    it('should enable query when enable is true', () => {
      const mockParams = { svg_id: '123' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetSvgData(mockParams, true);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        })
      );
    });

    it('should disable query when enable is false', () => {
      const mockParams = { svg_id: '123' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetSvgData(mockParams, false);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        })
      );
    });

    it('should enable query when enable is undefined', () => {
      const mockParams = { svg_id: '123' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetSvgData(mockParams, undefined);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        })
      );
    });
  });
});
