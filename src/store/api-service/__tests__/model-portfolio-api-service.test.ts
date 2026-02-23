import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { modelPortfolioApiService } from '../model-portfolio-api-service';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('model-portfolio-api-service', () => {
  const mockResponseData = {
    id: 1,
    name: 'Test Portfolio',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('modelPortfolioApiService.getModelPortfolio', () => {
    it('should fetch model portfolio successfully', async () => {
      const mockParams = { lang: 'eng', market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await modelPortfolioApiService.getModelPortfolio(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getModelPortfolio, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(modelPortfolioApiService.getModelPortfolio()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await modelPortfolioApiService.getModelPortfolio();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getModelPortfolio, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });
});
