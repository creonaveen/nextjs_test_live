import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { HomePageData } from '@/lib/types/home';

import HomeTab from '../home-tab';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock window.open for external links
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: (string | boolean | null | undefined)[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    getBadgeVariant: jest.fn(() => 'success'),
    getMarketIDFromStorage: jest.fn(() => '1'),
  };
});

jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

jest.mock('@/components/custom-components/svg-renderer', () => ({
  __esModule: true,
  default: ({ alt, svg_id }: { alt?: string; svg_id?: string }) => (
    <div data-testid="svg-renderer">
      SVG: {alt} - {svg_id}
    </div>
  ),
}));

jest.mock('@/components/custom-components/tooltip-or-sheet', () => ({
  TooltipOrSheet: ({
    text,
    triggerElement,
  }: {
    text?: string;
    triggerElement?: React.ReactNode;
  }) => (
    <div data-testid="tooltip-or-sheet">
      {triggerElement}
      <span>{text}</span>
    </div>
  ),
}));

jest.mock('@/utils/common-functions', () => ({
  TextTagWithArrowIcon: ({
    content,
    icon,
    color,
    className,
  }: {
    content?: string;
    icon?: React.ReactNode;
    color?: string;
    className?: string;
  }) => (
    <div data-testid="text-tag-arrow" className={className}>
      {content} - {icon} - {color}
    </div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
    className,
  }: {
    src?: string;
    alt?: string;
    fill?: boolean;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-testid="next-image"
      className={className}
      style={{ position: fill ? 'absolute' : 'relative' }}
    />
  ),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockWindowOpen = jest.fn();

describe('HomeTab', () => {
  const mockPush = jest.fn();
  const mockData: HomePageData = {
    market_commentary: {
      help_text: 'Market commentary help',
      label: { content: 'Market', is_badge: true, sign: 0 },
      text: 'Market commentary text',
      company: {
        name: 'Test Company',
        ticker: 'TEST',
        company_id: 1,
        market_id: '1',
        close: '100',
        price_label: 'Price',
        price_change: { change: { value: '+5', sign: 1, is_badge: true } },
        badge: {
          title: 'Badge Title',
          text: 'Badge Text',
          sign: 0,
          risk_level: { text: 'Low', sign: 1, is_badge: true },
          popup: { title: 'Popup', text: 'Popup text' },
        },
        chart_spec: {
          chart_param: 'param1',
          img_param: { id: 'svg1', show_image_border: 0 },
        },
      },
      see_more: { text: 'See More', url: '/marketcommentary' },
    },
    todays_case: {
      help_text: 'Todays case help',
      label: { content: 'Today', is_badge: true, sign: 0 },
      recommendation: {
        status: 'Buy',
        icon: 'arrow-up',
        color: 'green',
      },
      company: {
        name: 'Today Company',
        ticker: 'TODAY',
        id: 2,
        market_id: '1',
        chart_spec: {
          chart_param: 'param2',
          img_param: { id: 'svg2', show_image_border: 0 },
          caption: 'Chart caption',
        },
      },
      see_more: { text: 'See More', url: '/todayscase' },
    },
    news: {
      help_text: 'News help',
      label: { content: 'News', is_badge: true, sign: 0 },
      news_type: 'article',
      data: {
        image_param: {
          url: '/news-image.jpg',
          alt: 'News image',
        },
      },
      description: {
        caption_title: 'News Title',
        caption_description: 'News description',
      },
      see_more: { text: 'See More', url: 'https://external.com/news' },
    },
    watchlist: {
      help_text: 'Watchlist help',
      label: { content: 'Watchlist', is_badge: true, sign: 0 },
      table_data: {
        num_columns: 2,
        table_definition: [],
        data: [
          {
            company: { name: 'Watch Company', ticker: 'WATCH', id: 3, market_id: '1' },
            score_arrow: {
              score: 85,
              arrow: { icon: 'arrow-up', color: 'green' },
            },
          },
        ],
      },
      see_more: { text: 'See More', url: '/watchlist' },
    },
    top_50: {
      help_text: 'Top50 help',
      label: { content: 'Top50', is_badge: true, sign: 0 },
      table_data: {
        num_columns: 3,
        table_definition: [],
        data: [
          {
            company: { name: 'Top Company', ticker: 'TOP', id: 4, market_id: '1' },
            profit_loss_percent: { value: '+10%', sign: 1, is_badge: true },
          },
        ],
      },
      see_more: { text: 'See More', url: '/top50' },
    },
    model_portfolio: {
      help_text: 'Model portfolio help',
      label: { content: 'Portfolio', is_badge: true, sign: 0 },
      table_data: {
        num_columns: 2,
        table_definition: [],
        data: [
          {
            company: { name: 'Portfolio Company', ticker: 'PORT', id: 5, market_id: '1' },
            profit_loss_percent: { value: '+5%', sign: 1, is_badge: true },
          },
        ],
      },
      see_more: { text: 'See More', url: '/modelportfolio' },
    },
    meta: {
      title: 'Home Page',
      description: 'Home page description',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.open
    global.window.open = mockWindowOpen;
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it('should render market commentary card', () => {
    render(<HomeTab data={mockData} />);

    expect(screen.getByText('marketCommentary')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  it('should render todays case card', () => {
    render(<HomeTab data={mockData} />);

    expect(screen.getByText('todaysCase')).toBeInTheDocument();
    expect(screen.getByText('Today Company')).toBeInTheDocument();
    expect(screen.getByText('TODAY')).toBeInTheDocument();
  });

  it('should render news card', () => {
    render(<HomeTab data={mockData} />);

    expect(screen.getByText('News Title')).toBeInTheDocument();
    expect(screen.getByText('News description')).toBeInTheDocument();
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/news-image.jpg');
  });

  it('should render watchlist card with table data', () => {
    render(<HomeTab data={mockData} />);

    expect(screen.getByText('watchlist')).toBeInTheDocument();
    expect(screen.getByText('Watch Company')).toBeInTheDocument();
  });

  it('should render watchlist card with empty state', () => {
    const dataWithEmptyWatchlist = {
      ...mockData,
      watchlist: {
        ...mockData.watchlist,
        table_data: undefined,
        caption_title: 'Empty Watchlist',
        caption_description: 'No items in watchlist',
        see_more: { text: 'Add Items', url: '/watchlist' },
      },
    };

    render(<HomeTab data={dataWithEmptyWatchlist} />);

    expect(screen.getByText('Empty Watchlist')).toBeInTheDocument();
    expect(screen.getByText('No items in watchlist')).toBeInTheDocument();
  });

  it('should render top50 card', () => {
    render(<HomeTab data={mockData} />);

    expect(screen.getByText('top50')).toBeInTheDocument();
    expect(screen.getByText('Top Company')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Row number
  });

  it('should render model portfolio card', () => {
    render(<HomeTab data={mockData} />);

    expect(screen.getByText('modelPortfolio')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Company')).toBeInTheDocument();
  });

  it('should render see more buttons', () => {
    render(<HomeTab data={mockData} />);

    const seeMoreButtons = screen.getAllByText('See More');
    expect(seeMoreButtons.length).toBeGreaterThan(0);
  });

  it('should navigate to market commentary when card is clicked', async () => {
    const user = userEvent.setup();

    render(<HomeTab data={mockData} />);

    const marketCard = screen.getByLabelText('Market commentary - click to see more');
    await user.click(marketCard);

    expect(mockPush).toHaveBeenCalledWith('/marketcommentary');
  });

  it('should navigate to todays case when card is clicked', async () => {
    const user = userEvent.setup();

    render(<HomeTab data={mockData} />);

    const todaysCard = screen.getByLabelText('Todays case - click to see more');
    await user.click(todaysCard);

    expect(mockPush).toHaveBeenCalledWith('/todayscase');
  });

  it('should navigate to news when news card is clicked', async () => {
    const user = userEvent.setup();
    const mockWindowOpen = jest.spyOn(window, 'open').mockImplementation();

    render(<HomeTab data={mockData} />);

    const newsCard = screen.getByLabelText('News section - click to see more');
    await user.click(newsCard);

    // News navigates to external URL in new window
    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://external.com/news',
      '_blank',
      'noopener,noreferrer'
    );

    mockWindowOpen.mockRestore();
  });

  it('should handle keyboard navigation on market commentary card', async () => {
    const user = userEvent.setup();

    render(<HomeTab data={mockData} />);

    const marketCard = screen.getByLabelText('Market commentary - click to see more');
    marketCard.focus();

    await user.keyboard('{Enter}');

    expect(mockPush).toHaveBeenCalledWith('/marketcommentary');
  });

  it('should handle Space key on todays case card', async () => {
    const user = userEvent.setup();

    render(<HomeTab data={mockData} />);

    const todaysCard = screen.getByLabelText('Todays case - click to see more');
    todaysCard.focus();

    await user.keyboard(' ');

    expect(mockPush).toHaveBeenCalledWith('/todayscase');
  });

  it('should navigate to watchlist when empty watchlist button is clicked', async () => {
    const user = userEvent.setup();
    const dataWithEmptyWatchlist = {
      ...mockData,
      watchlist: {
        ...mockData.watchlist,
        table_data: undefined,
        caption_title: 'Empty Watchlist',
        caption_description: 'No items',
        see_more: { text: 'Go to Watchlist', url: '/watchlist' },
      },
    };

    render(<HomeTab data={dataWithEmptyWatchlist} />);

    const button = screen.getByText('Go to Watchlist');
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith('/watchlist');
  });

  it('should render recommendation badge in todays case', () => {
    render(<HomeTab data={mockData} />);

    const recommendations = screen.getAllByTestId('text-tag-arrow');
    const todaysCaseRecommendation = recommendations.find((el) => el.textContent?.includes('Buy'));
    expect(todaysCaseRecommendation).toBeInTheDocument();
  });

  it('should render chart images', () => {
    render(<HomeTab data={mockData} />);

    const svgRenderers = screen.getAllByTestId('svg-renderer');
    expect(svgRenderers.length).toBeGreaterThan(0);
  });

  it('should render help tooltips', () => {
    render(<HomeTab data={mockData} />);

    const tooltips = screen.getAllByTestId('tooltip-or-sheet');
    expect(tooltips.length).toBeGreaterThan(0);
  });

  it('should render badges when label is badge', () => {
    render(<HomeTab data={mockData} />);

    // Badges should be rendered for sections with is_badge: true
    const badges = screen.getAllByText('Market');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should not render section when data is missing', () => {
    const dataWithoutMarketCommentary = {
      ...mockData,
      market_commentary: null,
    };

    render(<HomeTab data={dataWithoutMarketCommentary} />);

    expect(screen.queryByText('marketCommentary')).not.toBeInTheDocument();
  });

  it('should render multiple table rows in watchlist', () => {
    const dataWithMultipleWatchlistItems = {
      ...mockData,
      watchlist: {
        ...mockData.watchlist,
        table_data: {
          ...mockData.watchlist.table_data!,
          data: [
            ...mockData.watchlist.table_data!.data,
            {
              company: { name: 'Company 2', ticker: 'COMP2', id: 6, market_id: '1' },
              score_arrow: {
                score: 90,
                arrow: { icon: 'arrow-up', color: 'green' },
              },
            },
          ],
        },
      },
    };

    render(<HomeTab data={dataWithMultipleWatchlistItems} />);

    expect(screen.getByText('Watch Company')).toBeInTheDocument();
    expect(screen.getByText('Company 2')).toBeInTheDocument();
  });

  it('should render correct grid layout', () => {
    const { container } = render(<HomeTab data={mockData} />);

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('should handle missing chart_spec in todays_case', () => {
    const dataWithoutChartSpec = {
      ...mockData,
      todays_case: {
        ...mockData.todays_case,
        company: {
          ...mockData.todays_case.company,
          chart_spec: undefined,
        },
      },
    };

    render(<HomeTab data={dataWithoutChartSpec} />);

    expect(screen.getByText('Today Company')).toBeInTheDocument();
  });

  it('should render watchlist without label when no data', () => {
    const dataWithWatchlistNoLabel = {
      ...mockData,
      watchlist: {
        ...mockData.watchlist,
        label: undefined,
        table_data: undefined,
        caption_title: 'Empty',
        caption_description: 'No data',
        see_more: { text: 'Add', url: '/watchlist' },
      },
    };

    render(<HomeTab data={dataWithWatchlistNoLabel} />);

    expect(screen.getByText('watchlist')).toBeInTheDocument();
  });
});
