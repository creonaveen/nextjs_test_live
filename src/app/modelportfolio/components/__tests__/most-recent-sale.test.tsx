import { render, screen } from '@testing-library/react';

import MostRecentSale from '../most-recent-sale';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      errors: {
        noData: 'No data available',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

jest.mock('@/components/custom-components/table-skeleton', () => ({
  __esModule: true,
  default: () => (
    <>
      <tr data-testid="table-skeleton">
        <td>Table Skeleton</td>
      </tr>
    </>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: unknown) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="image" />
  ),
}));

jest.mock('investtech/external-components', () => ({
  Badge: ({ children }: unknown) => <span data-testid="badge">{children}</span>,
  Card: ({ children }: unknown) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: unknown) => <div data-testid="card-content">{children}</div>,
  Link: ({ href, children }: unknown) => <a href={href}>{children}</a>,
  Table: ({ children }: unknown) => <table>{children}</table>,
  TableHeader: ({ children }: unknown) => <thead>{children}</thead>,
  TableBody: ({ children }: unknown) => <tbody>{children}</tbody>,
  TableRow: ({ children }: unknown) => <tr>{children}</tr>,
  TableHead: ({ children }: unknown) => <th>{children}</th>,
  TableCell: ({ children }: unknown) => <td>{children}</td>,
  TooltipProvider: ({ children }: unknown) => <div>{children}</div>,
  Tooltip: ({ children }: unknown) => <div>{children}</div>,
  TooltipTrigger: ({ children }: unknown) => <div>{children}</div>,
  TooltipContent: ({ children }: unknown) => <div>{children}</div>,
}));

jest.mock('@/lib/utils', () => ({
  getBadgeVariant: jest.fn((sign) => (sign === 1 ? 'success' : sign === -1 ? 'error' : 'default')),
  toKebabCase: jest.fn((str) => str?.toLowerCase().replace(/\s+/g, '-')),
  getMarketIDFromStorage: jest.fn(() => '1'),
  getLanguageFromStorage: jest.fn(() => 'eng'),
}));

describe('MostRecentSale', () => {
  const mockData = {
    headers: {
      most_recent_sales: 'Most Recent Sales',
    },
    latest_sales: {
      table_definition: [
        { key: 'name', column_name: 'Company' },
        { key: 'date_out', column_name: 'Date Out' },
        { key: 'profit_loss_percent', column_name: 'Profit/Loss' },
      ],
      content: [
        {
          id: 1,
          name: 'Company 1',
          date_out: '2024-01-01',
          profit_loss_percent: { value: '+10%', sign: 1 },
          own_stocks: 0,
        },
      ],
    },
    additional_texts: {
      own_stocks_info: 'Own stocks info',
    },
  };

  it('should render most recent sales table', () => {
    render(<MostRecentSale data={mockData as unknown} isLoading={false} />);

    expect(screen.getByText('Most Recent Sales')).toBeInTheDocument();
    expect(screen.getByText('Company 1')).toBeInTheDocument();
  });

  it('should render loading skeleton when isLoading is true', () => {
    render(<MostRecentSale data={mockData as unknown} isLoading={true} />);

    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
  });

  it('should render empty state when no content', () => {
    const dataWithEmptyContent = {
      ...mockData,
      latest_sales: {
        ...mockData.latest_sales,
        content: [],
      },
    };

    render(<MostRecentSale data={dataWithEmptyContent as unknown} isLoading={false} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render own stocks indicator when own_stocks is 1', () => {
    const dataWithOwnStocks = {
      ...mockData,
      latest_sales: {
        ...mockData.latest_sales,
        content: [
          {
            ...mockData.latest_sales.content[0],
            own_stocks: 1,
          },
        ],
      },
    };

    render(<MostRecentSale data={dataWithOwnStocks as unknown} isLoading={false} />);

    const images = screen.getAllByTestId('image');
    expect(images.length).toBeGreaterThan(0);
  });
});
