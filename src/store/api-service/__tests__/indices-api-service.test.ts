import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { indicesApiService, useGetIndicesList } from '../indices-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('indices-api-service', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('indicesApiService.getIndices', () => {
    it('should fetch indices successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10, market_id: '1' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await indicesApiService.getIndices(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getIndicesList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(indicesApiService.getIndices()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await indicesApiService.getIndices();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getIndicesList, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('useGetIndicesList', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { lang: 'eng' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetIndicesList(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['indicesList']),
          queryFn: expect.any(Function),
        })
      );
    });

    it('should pass options to useQuery', () => {
      const mockParams = { lang: 'eng' };
      const mockOptions = { enabled: false };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetIndicesList(mockParams, mockOptions);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockOptions,
        })
      );
    });
  });
});
