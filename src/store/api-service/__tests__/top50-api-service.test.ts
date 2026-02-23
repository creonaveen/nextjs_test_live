import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { top50ApiService, useGetTop50List } from '../top50-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('top50-api-service', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('top50ApiService.getTop50', () => {
    it('should fetch top50 successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10, market_id: '1' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await top50ApiService.getTop50(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(top50ApiService.getTop50()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await top50ApiService.getTop50();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle buyOrSell param', async () => {
      const mockParams = { lang: 'eng', buyOrSell: 'buy' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await top50ApiService.getTop50(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: mockParams,
      });
    });

    it('should handle timespan param', async () => {
      const mockParams = { lang: 'eng', timespan: '1d' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await top50ApiService.getTop50(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: mockParams,
      });
    });
  });

  describe('useGetTop50List', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { lang: 'eng' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetTop50List(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['top50', 'list']),
          queryFn: expect.any(Function),
        })
      );
    });

    it('should pass options to useQuery', () => {
      const mockParams = { lang: 'eng' };
      const mockOptions = { enabled: false };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetTop50List(mockParams, mockOptions);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockOptions,
        })
      );
    });
  });
});
