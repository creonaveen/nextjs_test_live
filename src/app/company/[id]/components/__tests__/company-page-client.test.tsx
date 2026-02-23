import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { CompanyPageClient } from '../company-page-client';

// Mock dependencies
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
}));

let mockOnSyncComplete: (() => void) | null = null;
jest.mock('../market-id-sync', () => ({
  MarketIdSync: ({ onSyncComplete }: { onSyncComplete?: () => void }) => {
    // Store the callback and call it immediately
    if (onSyncComplete) {
      mockOnSyncComplete = onSyncComplete;
      // Call it after a microtask to simulate async behavior
      Promise.resolve().then(() => {
        if (mockOnSyncComplete) {
          mockOnSyncComplete();
        }
      });
    }
    return <div data-testid="market-id-sync">MarketIdSync</div>;
  },
}));

jest.mock('../company-details-content', () => ({
  CompanyDetailsContent: ({
    data,
    isRefetching,
  }: {
    data?: { company_section_header?: { data?: { general?: { name?: string } } } };
    isRefetching?: boolean;
  }) => (
    <div data-testid="company-details-content">
      Company Details - {data?.company_section_header?.data?.general?.name}
      {isRefetching && <span>Refetching...</span>}
    </div>
  ),
}));

jest.mock('../../loading', () => ({
  __esModule: true,
  default: () => <div data-testid="company-page-loading">Loading...</div>,
}));

jest.mock('@/lib/utils', () => ({
  getLanguageFromStorage: jest.fn(() => 'eng'),
}));

jest.mock('@/store/api-service/companies-api-service', () => ({
  getCompanyDetailsServer: jest.fn(),
}));

describe('CompanyPageClient', () => {
  const mockData = {
    company_section_header: {
      data: {
        general: {
          id: 1,
          name: 'Test Company',
        },
      },
    },
    market: {
      market_id: '1',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSyncComplete = null;
  });

  it('should render MarketIdSync', () => {
    render(<CompanyPageClient data={mockData as unknown} />);

    expect(screen.getByTestId('market-id-sync')).toBeInTheDocument();
  });

  it('should render CompanyDetailsContent after sync completes', async () => {
    render(<CompanyPageClient data={mockData as unknown} />);

    // Wait for sync to complete
    await waitFor(() => {
      expect(screen.getByTestId('company-details-content')).toBeInTheDocument();
    });

    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
  });
});
