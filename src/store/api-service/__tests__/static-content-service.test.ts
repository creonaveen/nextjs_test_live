import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { StaticContentService, useGetStaticContent } from '../static-content-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('static-content-service', () => {
  const mockResponseData = {
    svg: '<svg></svg>',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('StaticContentService.getStaticContent', () => {
    it('should fetch static content successfully', async () => {
      const mockParams = {
        reference: 'test-ref',
        parameters: 'test-params',
        svg_id: '123',
        company_id: '456',
      };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await StaticContentService.getStaticContent(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getStaticContent, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(StaticContentService.getStaticContent()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await StaticContentService.getStaticContent();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getStaticContent, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle all optional params', async () => {
      const mockParams = {
        reference: 'test-ref',
        parameters: 'test-params',
        w: 800,
        h: 600,
        svg_id: '123',
        company_id: '456',
        chart_tooltip_id: 1,
        chart_param: 'test',
        show_image_border: 1,
        chart_maximize: 0,
        size: 'large',
      };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await StaticContentService.getStaticContent(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getStaticContent, {
        params: mockParams,
      });
    });
  });

  describe('useGetStaticContent', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { reference: 'test-ref', parameters: 'test-params' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetStaticContent(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['staticContent']),
          queryFn: expect.any(Function),
          staleTime: 60 * 1000,
          enabled: true,
        })
      );
    });

    it('should enable query when enable is true', () => {
      const mockParams = { reference: 'test-ref', parameters: 'test-params' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetStaticContent(mockParams, true);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        })
      );
    });

    it('should disable query when enable is false', () => {
      const mockParams = { reference: 'test-ref', parameters: 'test-params' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetStaticContent(mockParams, false);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        })
      );
    });

    it('should enable query when enable is undefined', () => {
      const mockParams = { reference: 'test-ref', parameters: 'test-params' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetStaticContent(mockParams, undefined);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        })
      );
    });
  });
});
