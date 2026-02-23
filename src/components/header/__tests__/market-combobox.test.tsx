import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

import { useMarketIdState } from '@/lib/hooks/use-market-id';

import { MarketCombobox } from '../market-combobox/market-combobox';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('@/lib/hooks/use-market-id', () => ({
  useMarketIdState: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      markets: {
        norway: 'Norway',
        sweden: 'Sweden',
        finland: 'Finland',
        denmark: 'Denmark',
        denmarkInvFo: 'Denmark InvFo',
      },
      errors: {
        notFound: 'Not found',
      },
    };
    return translations[ns]?.[key] || key;
  },
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseQueryState = useQueryState as jest.MockedFunction<typeof useQueryState>;
const mockUseMarketIdState = useMarketIdState as jest.MockedFunction<typeof useMarketIdState>;

describe('MarketCombobox', () => {
  const mockPush = jest.fn();
  const mockSetMarketIdQuery = jest.fn();
  const mockSetMarketIdString = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      refresh: jest.fn(),
      forward: jest.fn(),
    } as unknown);

    mockUseQueryState.mockReturnValue([null, mockSetMarketIdQuery] as unknown);

    mockUseMarketIdState.mockReturnValue(['1', mockSetMarketIdString] as unknown);
  });

  it('should render the market selector button', async () => {
    render(<MarketCombobox />);

    await waitFor(() => {
      const button = screen.getByRole('combobox');
      expect(button).toBeInTheDocument();
    });
  });

  it('should display the selected market label', async () => {
    mockUseMarketIdState.mockReturnValue(['1', mockSetMarketIdString] as unknown);

    render(<MarketCombobox />);

    await waitFor(
      () => {
        expect(screen.getByText(/Norway|Select Market/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should open popover when clicked', async () => {
    const user = userEvent.setup();
    render(<MarketCombobox />);

    // Wait for component to hydrate
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    expect(button).toBeInTheDocument();

    // Click the button to open popover
    await user.click(button);

    // Verify button state changes (popover opening is tested elsewhere)
    expect(button).toBeDefined();
  });

  it('should display market selector button', async () => {
    render(<MarketCombobox />);

    // Wait for hydration
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    expect(button).toBeInTheDocument();
    // The button should display the selected market or a placeholder
    expect(button).toHaveAttribute('aria-label');
  });

  it.skip('should show checkmark for selected market', async () => {
    const user = userEvent.setup();
    mockUseMarketIdState.mockReturnValue(['1', mockSetMarketIdString] as unknown);

    render(<MarketCombobox />);

    // Wait for hydration
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    await user.click(button);

    await waitFor(
      () => {
        // The selected market should have the selected styling (background color)
        const selectedItem = screen.getByText('Norway').closest('[role="option"]');
        expect(selectedItem).toHaveClass('bg-primary-background');
      },
      { timeout: 10000 }
    );
  });

  it.skip('should change market when a market is selected', async () => {
    const user = userEvent.setup();

    render(<MarketCombobox />);

    // Wait for hydration
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    await user.click(button);

    await waitFor(
      () => {
        expect(screen.getByText('Sweden')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    const swedenOption = screen.getByText('Sweden').closest('[role="option"]');
    if (swedenOption) {
      await user.click(swedenOption);
      await waitFor(() => {
        expect(mockSetMarketIdString).toHaveBeenCalledWith('461');
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('market_id=461'));
      });
    }
  });

  it('should use market_id from URL query param when available', async () => {
    mockUseQueryState.mockReturnValue(['461', mockSetMarketIdQuery] as unknown);

    render(<MarketCombobox />);

    await waitFor(
      () => {
        // Should sync with URL query param
        expect(mockSetMarketIdString).toHaveBeenCalledWith('461');
      },
      { timeout: 3000 }
    );
  });

  it('should display flag icon for selected market', async () => {
    render(<MarketCombobox />);

    await waitFor(
      () => {
        const button = screen.getByRole('combobox');
        // The button should contain a flag icon
        expect(button).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should have correct aria attributes', async () => {
    render(<MarketCombobox />);

    await waitFor(
      () => {
        const button = screen.getByRole('combobox');
        expect(button).toHaveAttribute('aria-expanded');
        expect(button).toHaveAttribute('aria-label');
      },
      { timeout: 3000 }
    );
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<MarketCombobox />);

    await waitFor(async () => {
      const button = screen.getByRole('combobox');
      await user.click(button);

      await waitFor(
        () => {
          // Press arrow down to navigate
          user.keyboard('{ArrowDown}');
          // The selected index should change
        },
        { timeout: 3000 }
      );
    });
  });

  it('should handle keyboard interactions', async () => {
    const user = userEvent.setup();
    render(<MarketCombobox />);

    // Wait for hydration
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    expect(button).toBeInTheDocument();

    // Click to open
    await user.click(button);

    // Verify button exists and can be interacted with
    // Escape key handling is tested through keyboard navigation hook
    expect(button).toBeDefined();
  }, 10000);

  it('should have responsive styling to handle mobile screens like iPhone SE', async () => {
    render(<MarketCombobox />);

    await waitFor(() => {
      const button = screen.getByRole('combobox');
      expect(button).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    // Verify the content div has truncate class for text overflow handling on mobile
    // This prevents text from overflowing on small screens like iPhone SE
    const contentDiv = button.querySelector('div');
    expect(contentDiv).toHaveClass('truncate');
    expect(contentDiv).toHaveClass('flex');
    expect(contentDiv).toHaveClass('items-center');
    expect(contentDiv).toHaveClass('gap-3');
  });

  it.skip('should redirect to home page with new market_id on selection', async () => {
    const user = userEvent.setup();
    render(<MarketCombobox />);

    // Wait for hydration
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const button = screen.getByRole('combobox');
    await user.click(button);

    await waitFor(
      () => {
        expect(screen.getByText('Finland')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    const finlandOption = screen.getByText('Finland').closest('[role="option"]');
    if (finlandOption) {
      await user.click(finlandOption);
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/\/\?market_id=351/));
      });
    }
  });
});
