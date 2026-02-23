import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import { usePlatform } from '@/lib/platform';

import LatestReportsTable from '../latest-report/latest-reports';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    getBadgeVariant: jest.fn(() => 'success'),
    getTableColumnHideClass: jest.fn(() => ''),
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
  };
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;

describe('LatestReportsTable', () => {
  const mockLatestReports = {
    title: 'Latest Reports',
    table_definition: [
      {
        key: 'date',
        column_name: 'Date',
        hidden_on_mobile: false,
        hidden_on_tablet: false,
        hidden_on_laptop: false,
        hidden_on_desktop: false,
      },
      {
        key: 'company',
        column_name: 'Company',
        hidden_on_mobile: false,
        hidden_on_tablet: false,
        hidden_on_laptop: false,
        hidden_on_desktop: false,
      },
      {
        key: 'buy_or_sell',
        column_name: 'Buy/Sell',
        hidden_on_mobile: false,
        hidden_on_tablet: false,
        hidden_on_laptop: false,
        hidden_on_desktop: false,
      },
    ],
    data: [
      {
        id: '1',
        date: '2024-01-01',
        company: 'Test Company',
        buy_or_sell: { value: 'Buy', is_badge: true },
      },
    ],
    num_columns: 3,
  } as unknown;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUsePlatform.mockReturnValue('desktop');
  });

  it('should render latest reports table', () => {
    render(<LatestReportsTable latest_reports={mockLatestReports} />);

    expect(screen.getByText('Latest Reports')).toBeInTheDocument();
  });

  it('should render table content', () => {
    render(<LatestReportsTable latest_reports={mockLatestReports} />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should render badges for badge values', () => {
    render(<LatestReportsTable latest_reports={mockLatestReports} />);

    expect(screen.getByText('Buy')).toBeInTheDocument();
  });
});
