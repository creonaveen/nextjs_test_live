import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { getTodaysCaseServerSide } from '../todays-case-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('todays-case-api-service.server', () => {
  const mockResponseData = {
    id: 1,
    title: 'Test Case',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodaysCaseServerSide', () => {
    it('should fetch todays case successfully', async () => {
      const mockParams = { market_id: '1', lang: 'eng' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await getTodaysCaseServerSide(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTodaysCase, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(getTodaysCaseServerSide({ market_id: '1' })).rejects.toThrow('API Error');
    });

    it('should work without optional params', async () => {
      const mockParams = { market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await getTodaysCaseServerSide(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTodaysCase, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle price_date parameter', async () => {
      const mockParams = { market_id: '1', lang: 'eng', price_date: '2024-01-01' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await getTodaysCaseServerSide(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getTodaysCase, {
        params: mockParams,
      });
    });
  });
});
