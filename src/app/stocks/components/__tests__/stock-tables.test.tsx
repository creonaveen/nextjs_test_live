import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import { StockList } from '@/lib/types/stocks';
import { useGetStocksList } from '@/store/api-service/stocks-api-service';

import StocksTable from '../stock-tables';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('@/lib/hooks/use-market-id', () => ({
  useMarketId: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/store/api-service/stocks-api-service', () => ({
  useGetStocksList: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    getLanguageFromStorage: jest.fn(() => 'eng'),
    getColorClass: jest.fn(() => 'text-success'),
    getResponsiveHideClass: jest.fn(() => ''),
  };
});

jest.mock('@/components/custom-components/icon', () => ({
  arrowUp: jest.fn(() => <span data-testid="arrow-up">↑</span>),
  arrowDown: jest.fn(() => <span data-testid="arrow-down">↓</span>),
}));

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
const mockUseQueryState = useQueryState as jest.MockedFunction<typeof useQueryState>;
const mockUseMarketId = useMarketId as jest.MockedFunction<typeof useMarketId>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;
const mockUseGetStocksList = useGetStocksList as jest.MockedFunction<typeof useGetStocksList>;

describe('StocksTable', () => {
  const mockSetPage = jest.fn();
  const mockSetLimit = jest.fn();
  const mockSetOrdering = jest.fn();
  const mockSetAlphabeticFilter = jest.fn();

  const mockServerData: StockList = {
    results: [
      {
        id: 1,
        name: 'Test Stock 1',
        ticker: 'TST1',
        close: '100.00',
        change: { value: '+5.00', sign: 1 },
        profit_loss_percent: { value: '+5%', sign: 1 },
        analysis_date: '2024-01-01',
      },
    ],
    count: 1,
    meta: {
      title: 'Stocks',
      description: 'Stocks list',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [1, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      if (key === 'alphabetic') return [null, mockSetAlphabeticFilter];
      return [null, jest.fn()];
    });
    mockUseMarketId.mockReturnValue('1');
    mockUsePlatform.mockReturnValue('desktop');
    mockUseGetStocksList.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown);
  });

  it('should render stocks table with server data', () => {
    render(<StocksTable serverData={mockServerData} />);

    expect(screen.getByText('stocks')).toBeInTheDocument();
    expect(screen.getByText('Test Stock 1')).toBeInTheDocument();
  });

  it('should render loading skeleton when loading', () => {
    mockUseGetStocksList.mockReturnValue({
      data: null,
      isLoading: true,
    } as unknown);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [2, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      if (key === 'alphabetic') return ['A', mockSetAlphabeticFilter];
      return [null, jest.fn()];
    });

    const { container } = render(<StocksTable serverData={mockServerData} />);

    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
  });

  it('should render no data message when results are empty', () => {
    const emptyData: StockList = {
      results: [],
      count: 0,
      meta: {
        title: 'Stocks',
        description: 'Stocks list',
      },
    };

    render(<StocksTable serverData={emptyData} />);

    expect(screen.getByText('noData')).toBeInTheDocument();
  });

  it('should render table headers with text-center class', () => {
    const { container } = render(<StocksTable serverData={mockServerData} />);

    // Column headers should have text-center class instead of whitespace-nowrap
    const columnHeaders = container.querySelectorAll('.column-header');
    expect(columnHeaders.length).toBeGreaterThan(0);
    // At least one header should have text-center class
    const hasCenteredHeaders = Array.from(columnHeaders).some((header) =>
      header.className.includes('text-center')
    );
    expect(hasCenteredHeaders).toBe(true);
  });
});
