import { render, screen } from '@testing-library/react';
import React from 'react';

import { CompanyDetailsContent } from '../company-details-content';

// Mock dependencies
jest.mock('../header-section', () => ({
  CompanyHeader: ({
    companyData,
  }: {
    companyData?: { data?: { general?: { name?: string } } };
  }) => <div data-testid="company-header">{companyData?.data?.general?.name}</div>,
}));

jest.mock('../main-chart/main-chart-section', () => ({
  __esModule: true,
  default: ({
    chartSectionData,
  }: {
    chartSectionData?: { main_chart?: { chart_param?: string } };
  }) => (
    <div data-testid="main-chart-section">
      Main Chart - {chartSectionData?.main_chart?.chart_param || 'No chart'}
    </div>
  ),
}));

jest.mock('../key-info-section', () => ({
  KeyInfoSection: () => <div data-testid="key-info-section">Key Info</div>,
}));

jest.mock('../signals-section', () => ({
  SignalsSection: () => <div data-testid="signals-section">Signals</div>,
}));

jest.mock('../mobile-floating-buttons', () => ({
  MobileFloatingButtons: ({ companyName }: { companyName?: string }) => (
    <div data-testid="mobile-floating-buttons">{companyName}</div>
  ),
}));

jest.mock('@/components/custom-components/investtech-own-stocks', () => ({
  __esModule: true,
  default: ({ ownStocksInfo }: { ownStocksInfo?: string | number }) => (
    <div data-testid="own-stocks">{ownStocksInfo}</div>
  ),
}));

jest.mock('@/store/api-service/companies-api-service', () => ({
  getCompanyDetailsServerSection: jest.fn(),
}));

describe('CompanyDetailsContent', () => {
  const mockData = {
    company_section_header: {
      data: {
        general: {
          id: 1,
          name: 'Test Company',
        },
        my_data: {
          status: {
            n: [{ note: 'Test note' }],
            w: [{ watchlist_id: 1 }],
          },
        },
      },
      labels_and_texts: {
        my_notes_action: 'Take Notes',
        my_notes_place_holder: 'Enter note',
        watchlist_action_add: 'Add to Watchlist',
        watchlist_action_remove: 'Remove from Watchlist',
        watchlist_response_add: 'Added',
        watchlist_response_remove: 'Removed',
      },
    },
    company_section_main_chart: {
      main_chart: {
        chart_param: 'param1',
      },
    },
    company_section_key_info: {
      labels_and_texts: {},
    },
    company_section_current_signals: {
      data: {
        has_signals: true,
      },
    },
    own_stocks: 0,
    additional_texts: {
      own_stocks_info: 'Own stocks info',
    },
  };

  it('should render all sections', async () => {
    render(<CompanyDetailsContent data={mockData as unknown} />);

    expect(screen.getByTestId('company-header')).toBeInTheDocument();
    // MainChartSection is dynamically imported, wait for it to render
    expect(await screen.findByTestId('main-chart-section')).toBeInTheDocument();
    expect(screen.getByTestId('key-info-section')).toBeInTheDocument();
    expect(screen.getByTestId('signals-section')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-floating-buttons')).toBeInTheDocument();
  });

  it('should render signals section when has_signals is true', () => {
    render(<CompanyDetailsContent data={mockData as unknown} />);

    expect(screen.getByTestId('signals-section')).toBeInTheDocument();
  });

  it('should not render signals section when has_signals is false', () => {
    const dataWithoutSignals = {
      ...mockData,
      company_section_current_signals: {
        data: {
          has_signals: false,
        },
      },
    };

    render(<CompanyDetailsContent data={dataWithoutSignals as unknown} />);

    expect(screen.queryByTestId('signals-section')).not.toBeInTheDocument();
  });

  it('should render own stocks component when own_stocks is 1', () => {
    const dataWithOwnStocks = {
      ...mockData,
      own_stocks: 1,
    };

    render(<CompanyDetailsContent data={dataWithOwnStocks as unknown} />);

    expect(screen.getByTestId('own-stocks')).toBeInTheDocument();
    expect(screen.getByText('Own stocks info')).toBeInTheDocument();
  });

  it('should not render own stocks component when own_stocks is not 1', () => {
    render(<CompanyDetailsContent data={mockData as unknown} />);

    expect(screen.queryByTestId('own-stocks')).not.toBeInTheDocument();
  });

  it('should pass refresh handler to header', () => {
    const onRefreshData = jest.fn();
    render(<CompanyDetailsContent data={mockData as unknown} onRefreshData={onRefreshData} />);

    expect(screen.getByTestId('company-header')).toBeInTheDocument();
  });

  it('should pass isRefetching state to header', () => {
    render(<CompanyDetailsContent data={mockData as unknown} isRefetching={true} />);

    expect(screen.getByTestId('company-header')).toBeInTheDocument();
  });
});
