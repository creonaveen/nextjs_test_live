import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { top50ApiService } from '../top50-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('top50-api-service.server', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('top50ApiService.getTop50List', () => {
    it('should fetch top50 list successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10, market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await top50ApiService.getTop50List(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(top50ApiService.getTop50List()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await top50ApiService.getTop50List();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle buyOrSell param', async () => {
      const mockParams = { lang: 'eng', buyOrSell: 'buy' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await top50ApiService.getTop50List(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: mockParams,
      });
    });

    it('should handle timespan param', async () => {
      const mockParams = { lang: 'eng', timespan: '1d' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await top50ApiService.getTop50List(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTop50List, {
        params: mockParams,
      });
    });
  });
});
