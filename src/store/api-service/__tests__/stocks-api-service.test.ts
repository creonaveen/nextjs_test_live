import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { stockApiService, useGetStocksList } from '../stocks-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('stocks-api-service', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('stockApiService.getStocks', () => {
    it('should fetch stocks successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10, market_id: '1' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await stockApiService.getStocks(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getStocksList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(stockApiService.getStocks()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await stockApiService.getStocks();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getStocksList, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle alphabetic_filter param', async () => {
      const mockParams = { lang: 'eng', alphabetic_filter: 'A' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await stockApiService.getStocks(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getStocksList, {
        params: mockParams,
      });
    });
  });

  describe('useGetStocksList', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { lang: 'eng' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetStocksList(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['stocks', 'list']),
          queryFn: expect.any(Function),
        })
      );
    });

    it('should pass options to useQuery', () => {
      const mockParams = { lang: 'eng' };
      const mockOptions = { enabled: false };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetStocksList(mockParams, mockOptions);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockOptions,
        })
      );
    });
  });
});
