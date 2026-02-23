import { render, screen } from '@testing-library/react';

import PortfolioHoldings from '../portfolio-holdings';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      common: {
        loading: 'Loading',
      },
      modelPortfolio: {
        commentAndAnalysis: 'Comment and Analysis',
      },
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
  Badge: ({ children, variant }: unknown) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
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
  getResponsiveHideClass: jest.fn(() => ''),
  toKebabCase: jest.fn((str) => str?.toLowerCase().replace(/\s+/g, '-')),
  getMarketIDFromStorage: jest.fn(() => '1'),
  getLanguageFromStorage: jest.fn(() => 'eng'),
}));

describe('PortfolioHoldings', () => {
  const mockData = {
    headers: {
      portfolio_holdings: 'Portfolio Holdings',
      return_port_and_idx: 'Return',
    },
    current_holdings: {
      table_definition: [
        { key: 'name', column_name: 'Name' },
        { key: 'info', column_name: 'Info', hidden_on_desktop: false },
        { key: 'date_entered', column_name: 'Date' },
        { key: 'buying_price', column_name: 'Price' },
        { key: 'close', column_name: 'Close' },
        { key: 'profit_loss_percent', column_name: 'Profit/Loss' },
      ],
      content: [
        {
          id: 1,
          name: 'Company 1',
          info: 'Info 1',
          date_entered: '2024-01-01',
          buying_price: '100',
          close: '110',
          profit_loss_percent: { value: '+10%', sign: 1 },
          own_stocks: 0,
        },
      ],
    },
    portfolio_return: {
      table_definition: [
        { key: 'name', column_name: 'Name' },
        { key: 'profit_loss_percent', column_name: 'Return' },
      ],
      content: [
        {
          name: 'Portfolio',
          profit_loss_percent: { value: '+5%', sign: 1 },
        },
      ],
    },
    additional_texts: {
      own_stocks_info: 'Own stocks info',
    },
    portfolio_comments: {
      general_text: [{ type: 'text', text: 'General text' }],
    },
  };

  it('should render portfolio holdings table', () => {
    render(<PortfolioHoldings data={mockData as unknown} isLoading={false} />);

    expect(screen.getByText('Portfolio Holdings')).toBeInTheDocument();
    expect(screen.getByText('Company 1')).toBeInTheDocument();
  });

  it('should render loading skeleton when isLoading is true', () => {
    render(<PortfolioHoldings data={mockData as unknown} isLoading={true} />);

    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
  });

  it('should render empty state when no content', () => {
    const dataWithEmptyContent = {
      ...mockData,
      current_holdings: {
        ...mockData.current_holdings,
        content: [],
      },
    };

    render(<PortfolioHoldings data={dataWithEmptyContent as unknown} isLoading={false} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render portfolio return table', () => {
    render(<PortfolioHoldings data={mockData as unknown} isLoading={false} />);

    // Check for return table - there might be multiple "Return" texts
    const returnTexts = screen.getAllByText('Return');
    expect(returnTexts.length).toBeGreaterThan(0);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should render own stocks indicator when own_stocks is 1', () => {
    const dataWithOwnStocks = {
      ...mockData,
      current_holdings: {
        ...mockData.current_holdings,
        content: [
          {
            ...mockData.current_holdings.content[0],
            own_stocks: 1,
          },
        ],
      },
    };

    render(<PortfolioHoldings data={dataWithOwnStocks as unknown} isLoading={false} />);

    const images = screen.getAllByTestId('image');
    expect(images.length).toBeGreaterThan(0);
  });
});
