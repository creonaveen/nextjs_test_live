import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { indicesApiService } from '../indices-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('indices-api-service.server', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('indicesApiService.getIndicesList', () => {
    it('should fetch indices list successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10, market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await indicesApiService.getIndicesList(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getIndicesList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(indicesApiService.getIndicesList()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await indicesApiService.getIndicesList();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getIndicesList, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });
});
