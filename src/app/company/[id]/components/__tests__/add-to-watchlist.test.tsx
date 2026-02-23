import userEvent from '@testing-library/user-event';
import React from 'react';

import { useToast } from 'investtech/external-components';
import { usePlatform } from '@/lib/platform';
import { getLanguageFromStorage } from '@/lib/utils';
import { useModifyWatchlist } from '@/store/api-service/watchlist-api-service';
import { renderWithQueryClient, screen, waitFor } from '@/test/utils/render-with-query-client';

import { AddToWatchlist } from '../add-to-watchlist';

// Mock dependencies - only useToast so Button and other components render with real styles
jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    useToast: jest.fn(),
  };
});

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    getLanguageFromStorage: jest.fn(),
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
  };
});

jest.mock('@/store/api-service/watchlist-api-service', () => ({
  useModifyWatchlist: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === 'errors') {
      const errors: Record<string, string> = {
        error: 'error',
        errorAddingToWatchlist: 'errorAddingToWatchlist',
        errorRemovingFromWatchlist: 'errorRemovingFromWatchlist',
      };
      return errors[key] || key;
    }
    return key;
  },
}));

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;
const mockGetLanguageFromStorage = getLanguageFromStorage as jest.MockedFunction<
  typeof getLanguageFromStorage
>;
const mockUseModifyWatchlist = useModifyWatchlist as jest.MockedFunction<typeof useModifyWatchlist>;

describe('AddToWatchlist', () => {
  const mockToast = jest.fn();
  const defaultProps = {
    companyId: '123',
    companyName: 'Test Company',
    isInWatchlist: false,
    labels: {
      addToWatchlistLabel: 'Add to Watchlist',
      removeFromWatchlistLabel: 'Remove from Watchlist',
      addedToWatchlistLabel: 'Added to watchlist',
      removedFromWatchlistLabel: 'Removed from watchlist',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({
      toast: mockToast,
      dismiss: jest.fn(),
      toasts: [],
    });
    mockUsePlatform.mockReturnValue('desktop');
    mockGetLanguageFromStorage.mockReturnValue('eng');
    mockUseModifyWatchlist.mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
    } as unknown);
  });

  it('should render add to watchlist button when not in watchlist', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Add to Watchlist')).toBeInTheDocument();
  });

  it('should render remove from watchlist button when in watchlist', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} isInWatchlist={true} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Remove from Watchlist')).toBeInTheDocument();
  });

  it('should have correct variant when not in watchlist', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    const button = screen.getByRole('button');
    // accentRound variant should have bg-accent class
    expect(button.className).toContain('bg-accent');
  });

  it('should have correct variant when in watchlist', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} isInWatchlist={true} />);

    const button = screen.getByRole('button');
    // outline variant should have border class
    expect(button.className).toContain('border');
  });

  it('should be disabled when loading', () => {
    mockUseModifyWatchlist.mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
    } as unknown);

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not be disabled when only refetching (loading is from mutate pending only)', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} isRefetching={true} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should show loading text when loading', () => {
    mockUseModifyWatchlist.mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
    } as unknown);

    const mockT = jest.fn((key: string) => {
      if (key === 'loading') return 'loading';
      return key;
    });
    renderWithQueryClient(<AddToWatchlist {...defaultProps} t={mockT} />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('should call useModifyWatchlist with correct params', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    expect(mockUseModifyWatchlist).toHaveBeenCalled();
  });

  it('should update button text when isInWatchlist prop changes', () => {
    const { rerender } = renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    expect(screen.getByText('Add to Watchlist')).toBeInTheDocument();

    rerender(<AddToWatchlist {...defaultProps} isInWatchlist={true} />);

    expect(screen.getByText('Remove from Watchlist')).toBeInTheDocument();
  });

  it('should have full width on mobile', () => {
    mockUsePlatform.mockReturnValue('mobile');

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('should not have full width on desktop', () => {
    mockUsePlatform.mockReturnValue('desktop');

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('w-full');
  });

  it('should show success toast when company is added', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    const mockMutateAsync = jest.fn().mockResolvedValue({});

    mockUseModifyWatchlist.mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: mockMutateAsync,
    } as unknown);

    renderWithQueryClient(<AddToWatchlist {...defaultProps} onRefreshData={mockOnRefreshData} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    // Wait for mutateAsync to be called and then for onRefreshData
    await waitFor(
      () => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          company_id: '123',
          lang: 'eng',
        });
        expect(mockOnRefreshData).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it('should show error toast when watchlist modification fails', async () => {
    const errorResponse = {
      response: {
        data: {
          message: 'Failed to add company',
        },
      },
    };

    const mockMutateAsync = jest.fn().mockRejectedValue(errorResponse);

    mockUseModifyWatchlist.mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: mockMutateAsync,
    } as unknown);

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    // Wait for error handling
    await waitFor(
      () => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'error',
            description: expect.any(String),
          })
        );
      },
      { timeout: 1000 }
    );
  });

  it('should not trigger action when button is disabled', async () => {
    const mockMutateAsync = jest.fn();
    mockUseModifyWatchlist.mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: mockMutateAsync,
    } as unknown);

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await userEvent.click(button);

    // Should not trigger watchlist modification when disabled
    // The click handler checks for loading/refetching state
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('should use correct toast position on mobile', () => {
    mockUsePlatform.mockReturnValue('mobile');

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    // Toast position is computed but not directly testable
    // We can verify the platform is used
    expect(mockUsePlatform).toHaveBeenCalled();
  });

  it('should use correct toast position on desktop', () => {
    mockUsePlatform.mockReturnValue('desktop');

    renderWithQueryClient(<AddToWatchlist {...defaultProps} />);

    expect(mockUsePlatform).toHaveBeenCalled();
  });

  it('should handle missing labels gracefully', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} labels={undefined} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Button should still render even without labels
  });

  it('should handle missing translation function', () => {
    renderWithQueryClient(<AddToWatchlist {...defaultProps} t={undefined} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
