import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { researchApiServiceServer } from '../research-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('research-api-service.server', () => {
  const mockResponseData = {
    id: 1,
    title: 'Test Research',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('researchApiServiceServer.getResearch', () => {
    it('should fetch research successfully with slug', async () => {
      const mockSlug = 'test-slug';
      const mockParams = { lang: 'eng', market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await researchApiServiceServer.getResearch(mockSlug, mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: { ...mockParams, wp_post: mockSlug },
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should fetch research successfully without slug', async () => {
      const mockParams = { lang: 'eng', market_id: '1' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await researchApiServiceServer.getResearch(undefined, mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(researchApiServiceServer.getResearch()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await researchApiServiceServer.getResearch();

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: {},
      });
      expect(result).toEqual(mockResponseData);
    });
  });
});
