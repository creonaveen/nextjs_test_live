import { render, screen } from '@testing-library/react';

import TodaysCaseDetails from '../todays-case-details';

// Mock dependencies
jest.mock('../header-section', () => ({
  __esModule: true,
  default: ({ publication, todays_case_section_header }: unknown) => (
    <div data-testid="header-section">
      Header: {publication?.author_name} - {todays_case_section_header?.data?.general?.date}
    </div>
  ),
}));

jest.mock('../chart-section/chart-section', () => ({
  __esModule: true,
  default: ({ company_section_main_chart }: unknown) => (
    <div data-testid="chart-section">
      Chart: {company_section_main_chart?.data?.main_chart?.svg_id || 'no-chart'}
    </div>
  ),
}));

jest.mock('../latest-report/latest-reports', () => ({
  __esModule: true,
  default: ({ latest_reports }: unknown) => (
    <div data-testid="latest-reports">Latest Reports: {latest_reports?.title || 'No reports'}</div>
  ),
}));

jest.mock('@/components/custom-components/investtech-own-stocks', () => ({
  __esModule: true,
  default: ({ ownStocksInfo }: unknown) => (
    <div data-testid="own-stocks">{ownStocksInfo || 'No info'}</div>
  ),
}));

describe('TodaysCaseDetails', () => {
  const mockData = {
    publication: {
      author_name: 'Test Author',
      author_image: 'test.jpg',
      author_title: 'Analyst',
      published_date: '2024-01-01',
      author_email: 'test@example.com',
    },
    todays_case_section_header: {
      data: {
        general: {
          id: '1',
          date: '2024-01-01',
        },
        own_stocks: 0,
        additional_texts: {
          own_stocks_info: null,
        },
      },
    },
    company_section_main_chart: {
      data: {
        main_chart: {
          svg_id: 'chart1',
        },
      },
    },
    labels_and_texts: {
      title: 'Test Title',
    },
    latest_reports: {
      title: 'Latest Reports',
      table_definition: [],
      content: [],
    },
  };

  it('should render header section', () => {
    render(<TodaysCaseDetails data={mockData} />);

    expect(screen.getByTestId('header-section')).toBeInTheDocument();
  });

  it('should render chart section', () => {
    render(<TodaysCaseDetails data={mockData} />);

    expect(screen.getByTestId('chart-section')).toBeInTheDocument();
  });

  it('should render latest reports when available', () => {
    render(<TodaysCaseDetails data={mockData} />);

    expect(screen.getByTestId('latest-reports')).toBeInTheDocument();
  });

  it('should render own stocks when own_stocks is 1', () => {
    const dataWithOwnStocks = {
      ...mockData,
      todays_case_section_header: {
        ...mockData.todays_case_section_header,
        data: {
          ...mockData.todays_case_section_header.data,
          own_stocks: 1,
          additional_texts: {
            own_stocks_info: 'Own stocks info',
          },
        },
      },
    };

    render(<TodaysCaseDetails data={dataWithOwnStocks} />);

    expect(screen.getByTestId('own-stocks')).toBeInTheDocument();
  });

  it('should not render own stocks when own_stocks is not 1', () => {
    render(<TodaysCaseDetails data={mockData} />);

    expect(screen.queryByTestId('own-stocks')).not.toBeInTheDocument();
  });
});
