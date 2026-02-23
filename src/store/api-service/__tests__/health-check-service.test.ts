import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { healthCheckApiService } from '../health-check-service';

jest.mock('@/lib/server-axios');

describe('health-check-service', () => {
  const mockResponseData = {
    meta: { title: 'Health', description: 'Health check' },
    health_data: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('healthCheckApiService.getHealthCheck', () => {
    it('should fetch health check data successfully', async () => {
      const mockParams = { lang: 'eng', market_id: '1', sections: 'health_data' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await healthCheckApiService.getHealthCheck(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getHealthCheck, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(healthCheckApiService.getHealthCheck()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await healthCheckApiService.getHealthCheck();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getHealthCheck, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });
});
