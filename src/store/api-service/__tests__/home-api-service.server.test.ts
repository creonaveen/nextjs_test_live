import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { getHomePageServerSide } from '../home-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('home-api-service.server', () => {
  const mockResponseData = {
    id: 1,
    title: 'Home Page',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getHomePageServerSide', () => {
    it('should fetch home page data successfully', async () => {
      const mockParams = { market_id: '1', lang: 'eng' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await getHomePageServerSide(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getHomePage, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(getHomePageServerSide({ market_id: '1', lang: 'eng' })).rejects.toThrow(
        'API Error'
      );
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await getHomePageServerSide();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getHomePage, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });
});
