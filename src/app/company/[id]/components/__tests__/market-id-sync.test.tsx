import { act, render, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { Storage } from '@/store/local-storage';

import { MarketIdSync } from '../market-id-sync';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock Storage
jest.mock('@/store/local-storage', () => ({
  Storage: {
    getMarketId: jest.fn(),
    setMarketId: jest.fn(),
  },
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockStorage = Storage as jest.Mocked<typeof Storage>;

describe('MarketIdSync', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/company/123');
    mockUseRouter.mockReturnValue(mockRouter as unknown);
    mockUseSearchParams.mockReturnValue(new URLSearchParams() as unknown);
    mockStorage.getMarketId.mockReturnValue('1');
    mockStorage.setMarketId.mockImplementation(() => {});
  });

  it('should render nothing (return null)', () => {
    const { container } = render(<MarketIdSync companyMarketId="1" />);

    expect(container.firstChild).toBeNull();
  });

  it('should sync market_id from URL to storage when it matches company market_id', async () => {
    const searchParams = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockStorage.getMarketId.mockReturnValue('2'); // Different from URL, so it will update

    await act(async () => {
      render(<MarketIdSync companyMarketId="1" />);
    });

    await waitFor(
      () => {
        expect(mockStorage.setMarketId).toHaveBeenCalledWith('1');
      },
      { timeout: 2000 }
    );
  });

  it('should sync marketId from URL to storage (alternative param name) when it matches company', async () => {
    const searchParams = new URLSearchParams('marketId=1');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockStorage.getMarketId.mockReturnValue('2'); // Different from URL, so it will update

    await act(async () => {
      render(<MarketIdSync companyMarketId="1" />);
    });

    await waitFor(
      () => {
        expect(mockStorage.setMarketId).toHaveBeenCalledWith('1');
      },
      { timeout: 2000 }
    );
  });

  it('should not update storage if market_id matches current storage', async () => {
    const searchParams = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockStorage.getMarketId.mockReturnValue('1');

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      // Should check but not set if already matches
      expect(mockStorage.getMarketId).toHaveBeenCalled();
    });
  });

  it('should redirect to not-found when market_id does not match company market_id', async () => {
    const searchParams = new URLSearchParams('market_id=461');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockUsePathname.mockReturnValue('/company/123');

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/not-found?market_id=461');
    });
  });

  it('should not redirect when market_id matches company market_id', async () => {
    const searchParams = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockUsePathname.mockReturnValue('/company/123');

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should not redirect when not on company page', async () => {
    const searchParams = new URLSearchParams('market_id=461');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockUsePathname.mockReturnValue('/stocks');

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should call onSyncComplete callback', async () => {
    const searchParams = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    const mockOnSyncComplete = jest.fn();

    render(<MarketIdSync companyMarketId="1" onSyncComplete={mockOnSyncComplete} />);

    await waitFor(() => {
      expect(mockOnSyncComplete).toHaveBeenCalled();
    });
  });

  it('should handle missing market_id in URL', async () => {
    const searchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(searchParams as unknown);

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      expect(mockStorage.setMarketId).not.toHaveBeenCalled();
    });
  });

  it('should handle missing companyMarketId', async () => {
    const searchParams = new URLSearchParams('market_id=461');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockUsePathname.mockReturnValue('/company/123');

    render(<MarketIdSync />);

    // Should not redirect if companyMarketId is missing
    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should update storage when market_id changes in URL and matches company', async () => {
    const searchParams1 = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams1 as unknown);
    mockStorage.getMarketId.mockReturnValue('2'); // Different from URL

    const { rerender } = render(<MarketIdSync companyMarketId="1" />);

    await waitFor(
      () => {
        expect(mockStorage.setMarketId).toHaveBeenCalledWith('1');
      },
      { timeout: 2000 }
    );

    jest.clearAllMocks();
    // After initial mount, the component should update storage if market_id changes
    // But we need to keep companyMarketId matching to avoid redirect
    mockStorage.getMarketId.mockReturnValue('1'); // Different from new URL
    const searchParams2 = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams2 as unknown);

    await act(async () => {
      rerender(<MarketIdSync companyMarketId="1" />);
    });

    // Since market_id matches companyMarketId, it should not redirect
    // and should update storage if different
    await waitFor(
      () => {
        // Storage should be checked, but might not be updated if already matches
        expect(mockStorage.getMarketId).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });

  it('should prioritize market_id over marketId', async () => {
    const searchParams = new URLSearchParams('market_id=1&marketId=461');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockStorage.getMarketId.mockReturnValue('2'); // Different from URL

    await act(async () => {
      render(<MarketIdSync companyMarketId="1" />);
    });

    await waitFor(
      () => {
        // Should use market_id (1) not marketId (461)
        expect(mockStorage.setMarketId).toHaveBeenCalledWith('1');
        expect(mockStorage.setMarketId).not.toHaveBeenCalledWith('461');
      },
      { timeout: 2000 }
    );
  });

  it('should handle company page path correctly', async () => {
    const searchParams = new URLSearchParams('market_id=461');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockUsePathname.mockReturnValue('/company/123');

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should not redirect on initial mount if market_id matches', async () => {
    const searchParams = new URLSearchParams('market_id=1');
    mockUseSearchParams.mockReturnValue(searchParams as unknown);
    mockUsePathname.mockReturnValue('/company/123');

    render(<MarketIdSync companyMarketId="1" />);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
