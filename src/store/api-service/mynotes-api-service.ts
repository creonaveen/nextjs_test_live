/**
 * My Notes API Service - Refactored to use BaseApiService
 * Provides type-safe API methods and React Query hooks for my notes functionality
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { BaseApiService } from '@/lib/services/base-api-service';
import { NoteAction, MyNotesList } from '@/lib/types/my-notes';

// Standard parameter types
export interface MyNotesQueryParams {
  page?: number;
  limit?: number;
  ordering?: string | null;
  lang: string;
}

export interface MyNotesDeleteParams {
  company_id: string;
  action: string;
}

export interface MyNotesCreateParams {
  company_id: string;
  action: string;
  note: string;
}

/**
 * My Notes API Service class extending BaseApiService
 */
class MyNotesApiService extends BaseApiService {
  /**
   * Get my notes list
   */
  async getMyNotes(params?: MyNotesQueryParams): Promise<MyNotesList> {
    return this.get<MyNotesList>('getMyNotes', {
      params: params ? (params as unknown as Record<string, unknown>) : undefined,
    });
  }

  /**
   * Delete a note
   * Note: This uses GET with params (API design) but is a mutation operation
   */
  async deleteMyNotes(params: MyNotesDeleteParams): Promise<NoteAction> {
    return this.get<NoteAction>('getMyNotes', {
      params: params as unknown as Record<string, unknown>,
    });
  }

  /**
   * Create a new note
   * Note: This uses GET with params (API design) but is a mutation operation
   */
  async createMyNotes(params: MyNotesCreateParams): Promise<NoteAction> {
    return this.get<NoteAction>('getMyNotes', {
      params: params as unknown as Record<string, unknown>,
    });
  }
}

const myNotesServiceInstance = new MyNotesApiService(apiClient);

/**
 * Legacy export for backward compatibility
 * @deprecated Use the service class directly or use the hooks
 */
export const myNotesApiService = {
  getMyNotes: async (params?: MyNotesQueryParams): Promise<MyNotesList> => {
    return myNotesServiceInstance.getMyNotes(params);
  },
  deleteMyNotes: async (params?: MyNotesDeleteParams): Promise<NoteAction> => {
    return myNotesServiceInstance.deleteMyNotes(params!);
  },
  createMyNotes: async (params?: MyNotesCreateParams): Promise<NoteAction> => {
    return myNotesServiceInstance.createMyNotes(params!);
  },
};

/**
 * React Query hook to fetch my notes
 */
export function useGetMyNotes(params?: MyNotesQueryParams) {
  return useQuery<MyNotesList>({
    queryKey: queryKeys.myNotes.list(params),
    queryFn: () => myNotesApiService.getMyNotes(params),
    enabled: !!params?.lang,
    refetchOnMount: true,
  });
}

/**
 * React Query mutation hook to delete a note
 * Uses useMutation instead of useQuery for state-changing operations
 */
export function useDeleteMyNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: MyNotesDeleteParams) => myNotesApiService.deleteMyNotes(params),
    onSuccess: () => {
      // Invalidate and refetch my notes list with refetchType: 'all' to ensure immediate update
      const invalidationPromise = queryClient.invalidateQueries({
        queryKey: queryKeys.myNotes.lists(),
        refetchType: 'all', // Force immediate refetch to update table immediately
      });

      // Handle both Promise and non-Promise returns (for test compatibility)
      if (typeof invalidationPromise?.catch === 'function') {
        invalidationPromise.catch(() => {
          // Ignore errors in query invalidation - not critical for user experience
        });
      }
    },
  });
}

/**
 * React Query mutation hook to create a new note
 * Uses useMutation instead of useQuery for state-changing operations
 */
export function useCreateMyNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: MyNotesCreateParams) => myNotesApiService.createMyNotes(params),
    onSuccess: () => {
      // Invalidate and refetch my notes list with refetchType: 'all' to ensure immediate update
      const invalidationPromise = queryClient.invalidateQueries({
        queryKey: queryKeys.myNotes.lists(),
        refetchType: 'all', // Force immediate refetch to update table immediately
      });

      // Handle both Promise and non-Promise returns (for test compatibility)
      if (typeof invalidationPromise?.catch === 'function') {
        invalidationPromise.catch(() => {
          // Ignore errors in query invalidation - not critical for user experience
        });
      }
    },
  });
}
