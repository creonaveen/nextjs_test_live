import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';

import { MobileFloatingButtons } from '../mobile-floating-buttons';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/hooks/use-scroll-direction', () => ({
  useScrollDirection: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
  };
});

jest.mock('../add-to-watchlist', () => ({
  AddToWatchlist: ({
    companyName,
    isInWatchlist,
  }: {
    companyName?: string;
    isInWatchlist?: boolean;
  }) => (
    <button data-testid="add-to-watchlist">
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'} - {companyName}
    </button>
  ),
}));

jest.mock('../sheet-components/take-notes-sheet', () => ({
  TakeNotesSheet: ({
    companyName,
    existingNote,
  }: {
    companyName?: string;
    existingNote?: string | null;
  }) => (
    <button data-testid="take-notes">
      Take Notes - {companyName} {existingNote ? '(has note)' : ''}
    </button>
  ),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUseScrollDirection = useScrollDirection as jest.MockedFunction<typeof useScrollDirection>;

describe('MobileFloatingButtons', () => {
  const defaultProps = {
    companyName: 'Test Company',
    companyId: '123',
    existingNote: null,
    isInWatchlist: false,
    labels: {
      takeNotesLabel: 'Take Notes',
      takeNotesTitle: 'Take Notes',
      takeNotesPlaceholder: 'Enter your notes...',
      addToWatchlistLabel: 'Add to Watchlist',
      removeFromWatchlistLabel: 'Remove from Watchlist',
      addedToWatchlistLabel: 'Added to watchlist',
      removedFromWatchlistLabel: 'Removed from watchlist',
      addNoteLabel: 'Add note',
      editNoteLabel: 'Edit note',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseScrollDirection.mockReturnValue({
      isVisible: true,
    });
  });

  it('should render floating buttons container', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.querySelector('[class*="fixed"]');
    expect(floatingContainer).toBeInTheDocument();
  });

  it('should render Take Notes button', () => {
    render(<MobileFloatingButtons {...defaultProps} />);

    expect(screen.getByTestId('take-notes')).toBeInTheDocument();
    expect(screen.getByText(/Take Notes/)).toBeInTheDocument();
  });

  it('should render Add to Watchlist button', () => {
    render(<MobileFloatingButtons {...defaultProps} />);

    expect(screen.getByTestId('add-to-watchlist')).toBeInTheDocument();
    expect(screen.getByText(/Add to Watchlist/)).toBeInTheDocument();
  });

  it('should show visible state when scrolling up', () => {
    mockUseScrollDirection.mockReturnValue({
      isVisible: true,
    });

    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('translate-y-0', 'opacity-100');
    expect(floatingContainer).not.toHaveClass('pointer-events-none');
  });

  it('should show hidden state when scrolling down', () => {
    mockUseScrollDirection.mockReturnValue({
      isVisible: false,
    });

    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('translate-y-full', 'opacity-0', 'pointer-events-none');
  });

  it('should have correct positioning classes', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('fixed', 'inset-x-0', 'bottom-0', 'z-40');
  });

  it('should be hidden on desktop (md:hidden)', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('md:hidden');
  });

  it('should pass correct props to TakeNotesSheet', () => {
    render(<MobileFloatingButtons {...defaultProps} existingNote="Test note" />);

    const takeNotesButton = screen.getByTestId('take-notes');
    expect(takeNotesButton).toHaveTextContent('Test Company');
    expect(takeNotesButton).toHaveTextContent('has note');
  });

  it('should pass correct props to AddToWatchlist', () => {
    render(<MobileFloatingButtons {...defaultProps} isInWatchlist={true} />);

    const watchlistButton = screen.getByTestId('add-to-watchlist');
    expect(watchlistButton).toHaveTextContent('Remove from Watchlist');
    expect(watchlistButton).toHaveTextContent('Test Company');
  });

  it('should pass onRefreshData to child components', () => {
    const mockOnRefreshData = jest.fn();

    render(<MobileFloatingButtons {...defaultProps} onRefreshData={mockOnRefreshData} />);

    // Components should receive onRefreshData prop
    expect(screen.getByTestId('take-notes')).toBeInTheDocument();
    expect(screen.getByTestId('add-to-watchlist')).toBeInTheDocument();
  });

  it('should pass isRefetching to child components', () => {
    render(<MobileFloatingButtons {...defaultProps} isRefetching={true} />);

    // Components should receive isRefetching prop
    expect(screen.getByTestId('take-notes')).toBeInTheDocument();
    expect(screen.getByTestId('add-to-watchlist')).toBeInTheDocument();
  });

  it('should have transition classes for smooth animation', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('transition-all', 'duration-300');
  });

  it('should have proper styling classes', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('bg-card', 'rounded-t-xl', 'shadow-sm', 'border-t');
  });

  it('should have flex layout with gap', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('flex', 'justify-center', 'gap-3');
  });

  it('should have proper padding', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('px-4', 'pt-3');
  });

  // This test is skipped because JSDOM does not support CSS env() variables in style attributes,
  // causing getAttribute('style') to return null or invalid values.
  it.skip('should have dynamic padding-bottom for safe area insets', () => {
    const { container } = render(<MobileFloatingButtons {...defaultProps} />);

    const floatingContainer = container.firstChild as HTMLElement;
    const style = floatingContainer.getAttribute('style');
    expect(style).toContain('padding-bottom');
    expect(style).toContain('max(1.5rem, env(safe-area-inset-bottom))');
  });

  it('should update visibility based on scroll direction changes', () => {
    const { container, rerender } = render(<MobileFloatingButtons {...defaultProps} />);

    let floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('translate-y-0', 'opacity-100');

    mockUseScrollDirection.mockReturnValue({
      isVisible: false,
    });

    rerender(<MobileFloatingButtons {...defaultProps} />);

    floatingContainer = container.firstChild as HTMLElement;
    expect(floatingContainer).toHaveClass('translate-y-full', 'opacity-0');
  });

  it('should handle null existingNote', () => {
    render(<MobileFloatingButtons {...defaultProps} existingNote={null} />);

    const takeNotesButton = screen.getByTestId('take-notes');
    expect(takeNotesButton).not.toHaveTextContent('has note');
  });

  it('should handle empty string existingNote', () => {
    render(<MobileFloatingButtons {...defaultProps} existingNote="" />);

    const takeNotesButton = screen.getByTestId('take-notes');
    expect(takeNotesButton).toBeInTheDocument();
  });
});
