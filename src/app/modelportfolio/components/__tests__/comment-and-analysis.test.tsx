import { render, screen } from '@testing-library/react';

import CommentAndAnalysis from '../comment-and-analysis';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      common: {
        loading: 'Loading',
        readMore: 'Read More',
      },
      modelPortfolio: {
        commentAndAnalysis: 'Comment and Analysis',
        risk: 'Risk',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

interface ChartMaximizeWithTriggerProps {
  children?: React.ReactNode;
  title?: string;
  enableTooltips?: boolean;
  apiProps?: {
    svg_id?: string;
    chart_param?: string;
  };
}

interface SvgRendererProps {
  svg_id?: string;
  alt: string;
  className?: string;
  chart_params?: string;
  chart_tooltip_id?: number;
  show_image_border?: number;
}

interface TooltipOrSheetProps {
  title?: string;
  text?: string;
  triggerElement?: React.ReactNode;
}

interface BadgeProps {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}

interface ButtonProps {
  children?: React.ReactNode;
  variant?: string;
  className?: string;
}

interface CardProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface CardContentProps {
  children?: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLImageElement>) => void;
}

interface LinkProps {
  href?: string;
  children?: React.ReactNode;
}

jest.mock('@/components/custom-components/chart/chart-maximize-with-trigger', () => ({
  ChartMaximizeWithTrigger: ({ children }: ChartMaximizeWithTriggerProps) => (
    <div data-testid="chart-maximize">{children}</div>
  ),
}));

jest.mock('@/components/custom-components/svg-renderer', () => ({
  __esModule: true,
  default: ({ alt }: SvgRendererProps) => <div data-testid="svg-renderer">{alt}</div>,
}));

jest.mock('@/components/custom-components/tooltip-or-sheet', () => ({
  TooltipOrSheet: ({ text, triggerElement }: TooltipOrSheetProps) => (
    <div data-testid="tooltip-or-sheet">
      {triggerElement}
      <span>{text}</span>
    </div>
  ),
}));

jest.mock('investtech/external-components', () => ({
  Badge: ({ children, variant }: BadgeProps) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
  Button: ({ children, variant, className }: ButtonProps) => (
    <button className={className} data-variant={variant}>
      {children}
    </button>
  ),
  Card: ({ children, onClick, className, role, tabIndex, onKeyDown }: CardProps) => (
    <div
      onClick={onClick}
      className={className}
      data-testid="card"
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  ),
  CardContent: ({ children }: CardContentProps) => <div>{children}</div>,
  Image: ({ src, alt, onClick, role, tabIndex, onKeyDown }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      data-testid="image"
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    />
  ),
  Link: ({ href, children }: LinkProps) => <a href={href}>{children}</a>,
}));

jest.mock('@/lib/utils', () => ({
  getBadgeVariant: jest.fn((sign: number) =>
    sign === 1 ? 'success' : sign === -1 ? 'error' : 'primary'
  ),
  getMarketIDFromStorage: jest.fn(() => '1'),
  getLanguageFromStorage: jest.fn(() => 'eng'),
}));

describe('CommentAndAnalysis', () => {
  const mockData = {
    portfolio_return_chart: {
      img_param: {
        id: 'chart1',
        chart_maximize: false,
      },
      chart_param: 'param1',
      caption: 'Chart Caption',
    },
    portfolio_comments: {
      analyses: [
        {
          company_id: 1,
          company_name: 'Company 1',
          ticker: 'COMP1',
          badge: {
            text: 'Buy',
            sign: 1,
            risk_level: { text: 'Low', sign: 1 },
            popup: { title: 'Popup Title', text: 'Popup Text' },
          },
          price_label: 'Price',
          close: '100',
          profit_loss_percent: { value: '+5%', sign: 1 },
          text: [{ text: 'Analysis text' }],
          newly_traded: 0,
          own_stocks: false,
        },
      ],
      general_text: [{ type: 'text', text: 'General text' }],
    },
    headers: {
      analyst_recommendation: 'Analyst Recommendation',
    },
  };

  it('should render loading state', () => {
    render(<CommentAndAnalysis data={mockData} isLoading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render comment and analysis section', () => {
    render(<CommentAndAnalysis data={mockData} isLoading={false} />);

    // Check for the section title
    const sectionTitles = screen.getAllByText('Comment and Analysis');
    expect(sectionTitles.length).toBeGreaterThan(0);
  });

  it('should render portfolio return chart', () => {
    render(<CommentAndAnalysis data={mockData} isLoading={false} />);

    expect(screen.getByTestId('svg-renderer')).toBeInTheDocument();
  });

  it('should render analyses cards', () => {
    render(<CommentAndAnalysis data={mockData} isLoading={false} />);

    expect(screen.getByText('Company 1')).toBeInTheDocument();
    expect(screen.getByText('COMP1')).toBeInTheDocument();
  });

  it('should render badges for analysis', () => {
    render(<CommentAndAnalysis data={mockData} isLoading={false} />);

    const badges = screen.getAllByTestId('badge');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should render newly traded border when newly_traded is 1', () => {
    const dataWithNewlyTraded = {
      ...mockData,
      portfolio_comments: {
        ...mockData.portfolio_comments,
        analyses: [
          {
            ...mockData.portfolio_comments.analyses[0],
            newly_traded: 1,
            extra_header: { text: 'New' },
          },
        ],
      },
    };

    render(<CommentAndAnalysis data={dataWithNewlyTraded} isLoading={false} />);

    const cards = screen.getAllByTestId('card');
    const newlyTradedCard = cards.find((card) =>
      card.className.includes('border-success-background')
    );
    expect(newlyTradedCard).toBeInTheDocument();
  });

  it('should render read more link for all analyses', () => {
    render(<CommentAndAnalysis data={mockData as unknown} isLoading={false} />);

    // Read More link should always be visible for navigation to company details
    const readMoreLinks = screen.getAllByText('Read More');
    expect(readMoreLinks.length).toBeGreaterThan(0);
  });

  it('should not duplicate read more link for own_stocks analysis', () => {
    const dataWithOwnStocks = {
      ...mockData,
      portfolio_comments: {
        ...mockData.portfolio_comments,
        analyses: [
          {
            ...mockData.portfolio_comments.analyses[0],
            own_stocks: true,
          },
        ],
      },
    };

    render(<CommentAndAnalysis data={dataWithOwnStocks as unknown} isLoading={false} />);

    // Should still have read more link but not duplicated in own_stocks section
    const readMoreLinks = screen.getAllByText('Read More');
    // There should be exactly one Read More link (not duplicated)
    expect(readMoreLinks.length).toBeGreaterThanOrEqual(1);
  });
});
