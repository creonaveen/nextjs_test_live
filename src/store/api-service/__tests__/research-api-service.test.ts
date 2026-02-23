import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { researchApiService } from '../research-api-service';

// Mock dependencies
jest.mock('@/lib/axios');

describe('research-api-service', () => {
  const mockResponseData = {
    id: 1,
    title: 'Test Research',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('researchApiService.getResearch', () => {
    it('should fetch research successfully with slug', async () => {
      const mockSlug = 'test-slug';
      const mockParams = { lang: 'eng', market_id: '1' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await researchApiService.getResearch(mockSlug, mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: { ...mockParams, wp_post: mockSlug },
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should fetch research successfully without slug', async () => {
      const mockParams = { lang: 'eng', market_id: '1' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await researchApiService.getResearch(undefined, mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(researchApiService.getResearch()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await researchApiService.getResearch();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: {},
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should merge slug into params when both are provided', async () => {
      const mockSlug = 'test-slug';
      const mockParams = { lang: 'eng', wp_post: 'existing' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await researchApiService.getResearch(mockSlug, mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getResearchList, {
        params: { ...mockParams, wp_post: mockSlug },
      });
    });
  });
});
