import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import { Top50List } from '@/lib/types/top50';
import { useGetTop50List } from '@/store/api-service/top50-api-service';

import { Top50Table } from '../top50-table';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/hooks/use-market-id', () => ({
  useMarketId: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/store/api-service/top50-api-service', () => ({
  useGetTop50List: jest.fn(),
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
    getResponsiveHideClass: jest.fn(() => ''),
  };
});

jest.mock('@/components/custom-components/icon', () => ({
  arrowUp: jest.fn(() => <span data-testid="arrow-up">↑</span>),
  arrowDown: jest.fn(() => <span data-testid="arrow-down">↓</span>),
}));

jest.mock('@/components/custom-components/dropdown-menu', () => ({
  DropdownMenuComponent: ({ selectedOption, onSelect, options }: unknown) => (
    <select
      data-testid="dropdown"
      value={selectedOption?.value || ''}
      onChange={(e) => {
        const option = options.find((o: unknown) => o.value === e.target.value);
        onSelect(option);
      }}
    >
      {options.map((opt: unknown) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUseQueryState = useQueryState as jest.MockedFunction<typeof useQueryState>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
const mockUseMarketId = useMarketId as jest.MockedFunction<typeof useMarketId>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;
const mockUseGetTop50List = useGetTop50List as jest.MockedFunction<typeof useGetTop50List>;

describe('Top50Table', () => {
  const mockSetPage = jest.fn();
  const mockSetLimit = jest.fn();
  const mockSetOrdering = jest.fn();
  const mockSetBuyOrSell = jest.fn();
  const mockSetTimeSpan = jest.fn();

  const mockServerData: Top50List = {
    results: [
      {
        id: 1,
        name: 'Test Stock 1',
        ticker: 'TST1',
        score: 85,
        close: '100.00',
        change: { value: '+5.00', sign: 1 },
        profit_loss_percent: { value: '+5%', sign: 1 },
        analysis_date: '2024-01-01',
      },
    ],
    count: 1,
    meta: {
      title: 'Top 50',
      description: 'Top 50 list',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [1, mockSetPage];
      if (key === 'limit') return [50, mockSetLimit];
      if (key === 'ordering') return ['-score', mockSetOrdering];
      if (key === 'buy_or_sell') return [{ value: 'buy', label: 'Buy' }, mockSetBuyOrSell];
      if (key === 'time_span') return [{ value: 'medium', label: 'Medium' }, mockSetTimeSpan];
      return [null, jest.fn()];
    });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUseMarketId.mockReturnValue('1');
    mockUsePlatform.mockReturnValue('desktop');
    mockUseGetTop50List.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown);
  });

  it('should render top50 table with server data', async () => {
    const { container } = render(<Top50Table serverData={mockServerData} />);

    // Wait for Suspense to resolve
    await screen.findByText('top50');
    expect(screen.getByText('top50')).toBeInTheDocument();
    // The table content might be in the table body
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
  });

  it('should render loading skeleton when loading', () => {
    mockUseGetTop50List.mockReturnValue({
      data: null,
      isLoading: true,
    } as unknown);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [2, mockSetPage];
      if (key === 'limit') return [50, mockSetLimit];
      if (key === 'ordering') return ['-score', mockSetOrdering];
      if (key === 'buy_or_sell') return [{ value: 'buy', label: 'Buy' }, mockSetBuyOrSell];
      if (key === 'time_span') return [{ value: 'medium', label: 'Medium' }, mockSetTimeSpan];
      return [null, jest.fn()];
    });

    const { container } = render(<Top50Table serverData={mockServerData} />);

    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
  });

  it('should render no data message when results are empty', async () => {
    const emptyData: Top50List = {
      results: [],
      count: 0,
      meta: {
        title: 'Top 50',
        description: 'Top 50 list',
      },
    };

    // Set hasActiveFilters to false so it uses serverData
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [1, mockSetPage];
      if (key === 'limit') return [50, mockSetLimit];
      if (key === 'ordering') return ['-score', mockSetOrdering];
      if (key === 'buy_or_sell') return [null, mockSetBuyOrSell];
      if (key === 'time_span') return [null, mockSetTimeSpan];
      return [null, jest.fn()];
    });

    const { container } = render(<Top50Table serverData={emptyData} />);

    // Wait for Suspense to resolve
    await screen.findByText('top50');

    // Check for noData in the table body
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
    expect(screen.getByText('noData')).toBeInTheDocument();
  });
});
