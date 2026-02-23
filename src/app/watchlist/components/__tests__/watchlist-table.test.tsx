import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import { usePlatform } from '@/lib/platform';
import { useGetWatchlist } from '@/store/api-service/watchlist-api-service';
import { renderWithQueryClient, screen } from '@/test/utils/render-with-query-client';

import { WatchlistTable } from '../watchlist-table';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/store/api-service/watchlist-api-service', () => ({
  useGetWatchlist: jest.fn(),
  useModifyWatchlist: jest.fn(() => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isLoading: false,
  })),
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
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

jest.mock('../add-company-dialog', () => ({
  AddCompanyDialog: ({ handleCompanyChange }: unknown) => (
    <button onClick={() => handleCompanyChange('1')} data-testid="add-company-dialog">
      Add Company
    </button>
  ),
}));

jest.mock('../delete-company-dialog', () => ({
  DeleteCompanyDialog: ({ selectedCompany, deleteCompany }: unknown) => (
    <button onClick={() => deleteCompany(selectedCompany?.id)} data-testid="delete-company-dialog">
      Delete
    </button>
  ),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUseQueryState = useQueryState as jest.MockedFunction<typeof useQueryState>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;
const mockUseGetWatchlist = useGetWatchlist as jest.MockedFunction<typeof useGetWatchlist>;

describe('WatchlistTable', () => {
  const mockSetPage = jest.fn();
  const mockSetLimit = jest.fn();
  const mockSetOrdering = jest.fn();
  const mockRefetch = jest.fn();

  const mockData = {
    results: [
      {
        id: '1',
        name: 'Test Company',
        ticker: 'TEST',
        close: '100.00',
        change: { value: '+5.00', sign: 1 },
        profit_loss_percent: { value: '+5%', sign: 1 },
        analysis_date: '2024-01-01',
      },
    ],
    count: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [1, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      return [null, jest.fn()];
    });
    mockUsePlatform.mockReturnValue('desktop');
    mockUseGetWatchlist.mockReturnValue({
      data: mockData,
      isLoading: false,
      refetch: mockRefetch,
      isRefetching: false,
    } as unknown);
  });

  it('should render watchlist table', () => {
    renderWithQueryClient(<WatchlistTable />);

    expect(screen.getByText('watchlist')).toBeInTheDocument();
  });

  it('should render watchlist data', () => {
    renderWithQueryClient(<WatchlistTable />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should render add company dialog', () => {
    renderWithQueryClient(<WatchlistTable />);

    expect(screen.getByTestId('add-company-dialog')).toBeInTheDocument();
  });

  it('should render loading skeleton when loading', () => {
    mockUseGetWatchlist.mockReturnValue({
      data: null,
      isLoading: true,
      refetch: mockRefetch,
      isRefetching: false,
    } as unknown);

    const { container } = renderWithQueryClient(<WatchlistTable />);

    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
  });

  it('should render no data message when results are empty', () => {
    mockUseGetWatchlist.mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      refetch: mockRefetch,
      isRefetching: false,
    } as unknown);

    renderWithQueryClient(<WatchlistTable />);

    expect(screen.getByText('noData')).toBeInTheDocument();
  });
});
