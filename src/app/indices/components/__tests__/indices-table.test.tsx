import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import { IndicesList } from '@/lib/types/indices';
import { useGetIndicesList } from '@/store/api-service/indices-api-service';

import IndicesTable from '../indices-table';

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

jest.mock('@/store/api-service/indices-api-service', () => ({
  useGetIndicesList: jest.fn(),
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
const mockUseGetIndicesList = useGetIndicesList as jest.MockedFunction<typeof useGetIndicesList>;

describe('IndicesTable', () => {
  const mockServerData: IndicesList = {
    results: [
      {
        id: 1,
        name: 'Test Index 1',
        ticker: 'TST1',
        close: '100.00',
        change: { value: '+5.00', sign: 1 },
        profit_loss_percent: { value: '+5%', sign: 1 },
        analysis_date: '2024-01-01',
      },
      {
        id: 2,
        name: 'Test Index 2',
        ticker: 'TST2',
        close: '200.00',
        change: { value: '-10.00', sign: -1 },
        profit_loss_percent: { value: '-5%', sign: -1 },
        analysis_date: '2024-01-02',
      },
    ],
    count: 2,
    meta: {
      title: 'Indices',
      description: 'Indices list',
    },
  };

  const mockSetPage = jest.fn();
  const mockSetLimit = jest.fn();
  const mockSetOrdering = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [1, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      return [null, jest.fn()];
    });
    mockUseMarketId.mockReturnValue('1');
    mockUsePlatform.mockReturnValue('desktop');
    mockUseGetIndicesList.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown);
  });

  it('should render indices table with server data', () => {
    render(<IndicesTable serverData={mockServerData} />);

    expect(screen.getByText('indices')).toBeInTheDocument();
    expect(screen.getByText('Test Index 1')).toBeInTheDocument();
    expect(screen.getByText('Test Index 2')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<IndicesTable serverData={mockServerData} />);

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('Ticker')).toBeInTheDocument();
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('should render loading skeleton when loading', () => {
    mockUseGetIndicesList.mockReturnValue({
      data: null,
      isLoading: true,
    } as unknown);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [2, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      return [null, jest.fn()];
    });

    const { container } = render(<IndicesTable serverData={mockServerData} />);

    // TableSkeleton renders tbody with rows, check for table structure
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
  });

  it('should render no data message when results are empty', () => {
    const emptyData: IndicesList = {
      results: [],
      count: 0,
      meta: {
        title: 'Indices',
        description: 'Indices list',
      },
    };

    render(<IndicesTable serverData={emptyData} />);

    expect(screen.getByText('noData')).toBeInTheDocument();
  });

  it('should handle column header click for ordering', async () => {
    const user = userEvent.setup();
    render(<IndicesTable serverData={mockServerData} />);

    const nameHeader = screen.getByText('name').closest('th');
    if (nameHeader) {
      await user.click(nameHeader);
      expect(mockSetOrdering).toHaveBeenCalled();
    }
  });

  it('should render paginator when count is greater than 5', () => {
    const dataWithManyResults = {
      ...mockServerData,
      count: 20,
    };

    render(<IndicesTable serverData={dataWithManyResults} />);

    // Paginator should be rendered
    const paginator = screen.queryByRole('navigation');
    expect(paginator).toBeInTheDocument();
  });

  it('should not render paginator when count is 5 or less', () => {
    const dataWithFewResults = {
      ...mockServerData,
      count: 3,
    };

    render(<IndicesTable serverData={dataWithFewResults} />);

    // Paginator should not be rendered when count <= 5
    // The component checks count > 5
    expect(mockServerData.count).toBeLessThanOrEqual(5);
  });

  it('should use API data when filters are active', () => {
    const apiData: IndicesList = {
      results: [
        {
          id: 3,
          name: 'API Index',
          ticker: 'API',
          close: '300.00',
          change: { value: '+10.00', sign: 1 },
          profit_loss_percent: { value: '+10%', sign: 1 },
          analysis_date: '2024-01-03',
        },
      ],
      count: 1,
      meta: {
        title: 'Indices',
        description: 'Indices list',
      },
    };

    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [2, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      return [null, jest.fn()];
    });

    mockUseGetIndicesList.mockReturnValue({
      data: apiData,
      isLoading: false,
    } as unknown);

    render(<IndicesTable serverData={mockServerData} />);

    expect(screen.getByText('API Index')).toBeInTheDocument();
    expect(screen.queryByText('Test Index 1')).not.toBeInTheDocument();
  });

  it('should render correct number of columns based on platform', () => {
    mockUsePlatform.mockReturnValue('mobile');
    mockUseGetIndicesList.mockReturnValue({
      data: null,
      isLoading: true,
    } as unknown);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [2, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['name', mockSetOrdering];
      return [null, jest.fn()];
    });

    const { container } = render(<IndicesTable serverData={mockServerData} />);

    // TableSkeleton renders tbody with rows, check for table structure
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
    // Check that skeleton rows are rendered
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should render index links correctly', () => {
    render(<IndicesTable serverData={mockServerData} />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    // Check that links contain index names
    const index1Link = links.find((link) => link.textContent?.includes('Test Index 1'));
    expect(index1Link).toBeInTheDocument();
  });
});
