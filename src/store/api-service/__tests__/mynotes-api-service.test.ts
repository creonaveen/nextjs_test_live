import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import {
  myNotesApiService,
  useGetMyNotes,
  useDeleteMyNotes,
  useCreateMyNotes,
} from '../mynotes-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('mynotes-api-service', () => {
  const mockResponseData = {
    results: [],
    count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('myNotesApiService.getMyNotes', () => {
    it('should fetch my notes successfully', async () => {
      const mockParams = { lang: 'eng', page: 1, limit: 10 };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await myNotesApiService.getMyNotes(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getMyNotes, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(myNotesApiService.getMyNotes()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await myNotesApiService.getMyNotes();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getMyNotes, {
        params: undefined,
      });
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('myNotesApiService.deleteMyNotes', () => {
    it('should delete my notes successfully', async () => {
      const mockParams = { company_id: '123', action: 'delete' };
      const mockDeleteResponse = { success: true };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockDeleteResponse });

      const result = await myNotesApiService.deleteMyNotes(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getMyNotes, {
        params: mockParams,
      });
      expect(result).toEqual(mockDeleteResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('Delete failed');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(
        myNotesApiService.deleteMyNotes({ company_id: '123', action: 'delete' })
      ).rejects.toThrow('Delete failed');
    });
  });

  describe('myNotesApiService.createMyNotes', () => {
    it('should create my notes successfully', async () => {
      const mockParams = { company_id: '123', action: 'create', note: 'Test note' };
      const mockCreateResponse = { success: true };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCreateResponse });

      const result = await myNotesApiService.createMyNotes(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getMyNotes, {
        params: mockParams,
      });
      expect(result).toEqual(mockCreateResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('Create failed');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(
        myNotesApiService.createMyNotes({
          company_id: '123',
          action: 'create',
          note: 'Test note',
        })
      ).rejects.toThrow('Create failed');
    });
  });

  describe('useGetMyNotes', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { lang: 'eng' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetMyNotes(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['mynotes', 'list']),
          queryFn: expect.any(Function),
          enabled: true,
          refetchOnMount: true,
        })
      );
    });
  });

  describe('useDeleteMyNotes', () => {
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

      useDeleteMyNotes();

      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      });
    });

    it('should invalidate my notes queries on mutation success', () => {
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

      useDeleteMyNotes();

      // Simulate mutation success
      if (onSuccessCallback) {
        void onSuccessCallback();
      }

      // Verify invalidateQueries was called with correct parameters
      expect(mockInvalidateQueries).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['mynotes', 'list']),
          refetchType: 'all',
        })
      );
    });
  });

  describe('useCreateMyNotes', () => {
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

      useCreateMyNotes();

      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      });
    });

    it('should invalidate my notes queries on mutation success', () => {
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

      useCreateMyNotes();

      // Simulate mutation success
      if (onSuccessCallback) {
        void onSuccessCallback();
      }

      // Verify invalidateQueries was called with correct parameters
      expect(mockInvalidateQueries).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['mynotes', 'list']),
          refetchType: 'all',
        })
      );
    });
  });
});
