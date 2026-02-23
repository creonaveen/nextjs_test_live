import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { marketCommentaryApiService } from '../market-commentary-api-service';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('market-commentary-api-service', () => {
  const mockResponseData = {
    id: 1,
    title: 'Test Commentary',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('marketCommentaryApiService.getMarketCommentary', () => {
    it('should fetch market commentary successfully', async () => {
      const mockParams = { lang: 'eng', market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await marketCommentaryApiService.getMarketCommentary(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getMarketCommentary, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(marketCommentaryApiService.getMarketCommentary()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await marketCommentaryApiService.getMarketCommentary();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getMarketCommentary, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });
});
