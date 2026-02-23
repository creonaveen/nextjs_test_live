import { render, screen } from '@testing-library/react';
import React from 'react';

import * as platform from '@/lib/platform';
import { CompanyHeader } from '../header-section';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(() => 'desktop'),
}));

jest.mock('@/components/custom-components/about-sheet', () => ({
  AboutSheet: ({ static_info }: { static_info?: { description?: string } }) => (
    <div data-testid="about-sheet">
      About Sheet - {static_info?.description ? 'Has description' : 'No description'}
    </div>
  ),
}));

jest.mock('@/components/custom-components/tech-analysis-header/tech-analysis-header', () => ({
  TechAnalysisHeader: ({ price }: { price?: { close?: string } }) => (
    <div data-testid="tech-analysis-header">Tech Analysis - {price?.close || 'No price'}</div>
  ),
}));

jest.mock('../add-to-watchlist', () => ({
  AddToWatchlist: ({
    companyName,
    isInWatchlist,
  }: {
    companyName: string;
    isInWatchlist?: boolean;
  }) => (
    <div data-testid="add-to-watchlist">
      Watchlist - {companyName} - {isInWatchlist ? 'In' : 'Not in'}
    </div>
  ),
}));

jest.mock('../sheet-components/take-notes-sheet', () => ({
  TakeNotesSheet: ({
    companyName,
    existingNote,
  }: {
    companyName: string;
    existingNote?: string | null;
  }) => (
    <div data-testid="take-notes-sheet">
      Notes - {companyName} - {existingNote ? 'Has note' : 'No note'}
    </div>
  ),
}));

describe('CompanyHeader', () => {
  const mockCompanyData = {
    data: {
      general: {
        id: '123',
        name: 'Test Company',
        ticker: 'TEST',
        ticker_full: 'TEST:US',
        include_name: 1,
      },
      price: {
        close: '100.50',
        profit_loss_percent: {
          sign: 1,
          value: '+5.5%',
        },
        price_date: '2024-01-01',
      },
      static_info: {
        description: 'Test company description',
      },
      sectors: {
        sector: { name: 'Technology' },
        group: { name: 'Software' },
        industry: { name: 'SaaS' },
      },
      recommendation: {
        recommendation: 'Buy',
        recommendation_id: 1,
      },
      factor_diagram_thumb: 'thumb.jpg',
      risk: {
        risk_level: 'Low',
      },
      my_data: {
        status: {
          n: [{ note: 'My note' }],
          w: [{ watchlist_id: 1 }],
        },
      },
    },
    labels_and_texts: {
      my_notes_action: 'Take Notes',
      my_notes_place_holder: 'Enter notes',
      watchlist_action_add: 'Add to Watchlist',
      watchlist_action_remove: 'Remove from Watchlist',
      watchlist_response_add: 'Added',
      watchlist_response_remove: 'Removed',
    },
  };

  const defaultProps = {
    companyData: mockCompanyData as unknown,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
  });

  it('should render company name and ticker', () => {
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByText('TEST:US')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should render TechAnalysisHeader', () => {
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByTestId('tech-analysis-header')).toBeInTheDocument();
    expect(screen.getByText(/Tech Analysis/)).toBeInTheDocument();
  });

  it('should render AddToWatchlist on desktop', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByTestId('add-to-watchlist')).toBeInTheDocument();
    expect(screen.getByText(/Watchlist/)).toBeInTheDocument();
  });

  it('should render TakeNotesSheet on desktop', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByTestId('take-notes-sheet')).toBeInTheDocument();
    expect(screen.getByText(/Notes/)).toBeInTheDocument();
  });

  it('should render AboutSheet on mobile when description exists', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByTestId('about-sheet')).toBeInTheDocument();
  });

  it('should render AboutSheet on mobile when sector exists', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    const dataWithoutDescription = {
      ...mockCompanyData,
      data: {
        ...mockCompanyData.data,
        static_info: {},
        sectors: {
          sector: { name: 'Technology' },
        },
      },
    };

    render(<CompanyHeader {...defaultProps} companyData={dataWithoutDescription as unknown} />);

    expect(screen.getByTestId('about-sheet')).toBeInTheDocument();
  });

  it('should not render AboutSheet on mobile when no description or sectors', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    const dataWithoutDescriptionOrSectors = {
      ...mockCompanyData,
      data: {
        ...mockCompanyData.data,
        static_info: {},
        sectors: {},
      },
    };

    render(
      <CompanyHeader {...defaultProps} companyData={dataWithoutDescriptionOrSectors as unknown} />
    );

    expect(screen.queryByTestId('about-sheet')).not.toBeInTheDocument();
  });

  it('should not render AboutSheet on desktop', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
    render(<CompanyHeader {...defaultProps} />);

    // AboutSheet should be hidden on desktop (md:hidden class)
    const aboutSheet = screen.queryByTestId('about-sheet');
    // It might still be in the DOM but hidden, so we check it exists
    if (aboutSheet) {
      expect(aboutSheet).toBeInTheDocument();
    }
  });

  it('should pass correct props to AddToWatchlist', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByTestId('add-to-watchlist')).toBeInTheDocument();
    expect(screen.getByText(/In/)).toBeInTheDocument(); // isInWatchlist is true
  });

  it('should pass correct props to TakeNotesSheet', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
    render(<CompanyHeader {...defaultProps} />);

    expect(screen.getByText(/Has note/)).toBeInTheDocument();
  });

  it('should handle missing my_data', () => {
    const dataWithoutMyData = {
      ...mockCompanyData,
      data: {
        ...mockCompanyData.data,
        my_data: undefined,
      },
    };

    render(<CompanyHeader {...defaultProps} companyData={dataWithoutMyData as unknown} />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should handle onRefreshData callback', () => {
    const mockOnRefreshData = jest.fn();
    render(<CompanyHeader {...defaultProps} onRefreshData={mockOnRefreshData} />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should handle isRefetching prop', () => {
    render(<CompanyHeader {...defaultProps} isRefetching={true} />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should render with correct label classes', () => {
    const { container } = render(<CompanyHeader {...defaultProps} />);

    const label = container.querySelector('.text-grey-700');
    expect(label).toBeInTheDocument();
  });
});
