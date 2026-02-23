import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import { watchlistApiService, useGetWatchlist, useModifyWatchlist } from '../watchlist-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('watchlist-api-service', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('watchlistApiService.getWatchlist', () => {
    it('should fetch watchlist successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10 };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await watchlistApiService.getWatchlist(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getWatchList, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(watchlistApiService.getWatchlist()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await watchlistApiService.getWatchlist();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getWatchList, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle company_id for deletion (negative value)', async () => {
      const mockParams = { lang: 'eng', company_id: '-123' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await watchlistApiService.getWatchlist(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getWatchList, {
        params: mockParams,
      });
    });
  });

  describe('useGetWatchlist', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { lang: 'eng' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetWatchlist(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: expect.arrayContaining(['watchlist', 'list']),
        queryFn: expect.any(Function),
        enabled: true,
        refetchOnMount: true,
      });
    });

    it('should disable query when lang is missing', () => {
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetWatchlist();

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        })
      );
    });
  });

  describe('useModifyWatchlist', () => {
    it('should call useMutation with correct parameters', () => {
      const mockUseMutation = useMutation as jest.Mock;
      const mockInvalidateQueries = jest.fn();
      const mockQueryClient = {
        invalidateQueries: mockInvalidateQueries,
      };
      const mockUseQueryClient = useQueryClient as jest.Mock;
      mockUseQueryClient.mockReturnValue(mockQueryClient);

      mockUseMutation.mockReturnValue({
        mutate: jest.fn(),
        mutateAsync: jest.fn(),
        isLoading: false,
      });

      useModifyWatchlist();

      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      });
    });

    it('should invalidate watchlist queries on mutation success', () => {
      const mockUseMutation = useMutation as jest.Mock;
      const mockInvalidateQueries = jest.fn();
      const mockQueryClient = {
        invalidateQueries: mockInvalidateQueries,
      };
      const mockUseQueryClient = useQueryClient as jest.Mock;
      mockUseQueryClient.mockReturnValue(mockQueryClient);

      let onSuccessCallback: (() => void) | undefined;
      mockUseMutation.mockImplementation(({ onSuccess }: { onSuccess: () => void }) => {
        onSuccessCallback = onSuccess;
        return {
          mutate: jest.fn(),
          mutateAsync: jest.fn(),
          isLoading: false,
        };
      });

      useModifyWatchlist();

      if (onSuccessCallback) {
        void onSuccessCallback();
      }

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: expect.arrayContaining(['watchlist', 'list']),
        refetchType: 'all',
      });
    });
  });
});
