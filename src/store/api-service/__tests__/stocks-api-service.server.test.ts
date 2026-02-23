import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { stocksApiService } from '../stocks-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('stocks-api-service.server', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('stocksApiService.getStocksList', () => {
    it('should fetch stocks list successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10, market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await stocksApiService.getStocksList(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getStocksList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(stocksApiService.getStocksList()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await stocksApiService.getStocksList();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getStocksList, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle alphabetic_filter param', async () => {
      const mockParams = { lang: 'eng', alphabetic_filter: 'A' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await stocksApiService.getStocksList(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getStocksList, {
        params: mockParams,
      });
    });
  });
});
