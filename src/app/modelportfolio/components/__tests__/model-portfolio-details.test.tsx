import { render, screen } from '@testing-library/react';

import ModelPortfolioDetails from '../model-portfolio-details';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      navigation: {
        modelPortfolio: 'Model Portfolio',
      },
      modelPortfolio: {
        commentAndAnalysis: 'Comment and Analysis',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

jest.mock('@/components/custom-components/author-info-block', () => ({
  __esModule: true,
  default: ({ authorName, publishedDate }: unknown) => (
    <div data-testid="author-info">
      {authorName} - {publishedDate}
    </div>
  ),
}));

jest.mock('../comment-and-analysis', () => ({
  __esModule: true,
  default: () => <div data-testid="comment-analysis">Comment and Analysis</div>,
}));

jest.mock('../description-dialog', () => ({
  __esModule: true,
  default: () => <div data-testid="description-dialog">Description Dialog</div>,
}));

jest.mock('../most-recent-sale', () => ({
  __esModule: true,
  default: () => <div data-testid="most-recent-sale">Most Recent Sale</div>,
}));

jest.mock('../portfolio-holdings', () => ({
  __esModule: true,
  default: () => <div data-testid="portfolio-holdings">Portfolio Holdings</div>,
}));

jest.mock('../product-help', () => ({
  __esModule: true,
  default: () => <div data-testid="product-help">Product Help</div>,
}));

jest.mock('../return', () => ({
  __esModule: true,
  default: () => <div data-testid="return">Return</div>,
}));

describe('ModelPortfolioDetails', () => {
  const mockData = {
    help: {
      product_description: {
        info_text: 'Product description info',
        popup: {
          title: 'Popup Title',
          text: 'Popup Text',
        },
      },
    },
    publication: {
      author_name: 'Test Author',
      author_title: 'Author Title',
      author_image: '/author.png',
      published_date: '2024-01-01',
      author_email: 'author@test.com',
    },
    portfolio_comments: {
      ingress: [{ text: 'Ingress text' }],
      analyses: [{ company_id: 1, company_name: 'Test Company' }],
      general_text: [{ type: 'text', text: 'General text' }],
    },
    current_holdings: {
      content: [],
      table_definition: [],
    },
    latest_sales: {
      content: [],
      table_definition: [],
    },
    annualized_return: {
      content: [],
      table_definition: [],
    },
    headers: {
      portfolio_holdings: 'Portfolio Holdings',
    },
  };

  it('should render page header', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByText('Model Portfolio')).toBeInTheDocument();
  });

  it('should render author info when publication exists', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByTestId('author-info')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it('should render portfolio comments ingress', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByText('Ingress text')).toBeInTheDocument();
  });

  it('should render portfolio holdings when data exists', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByTestId('portfolio-holdings')).toBeInTheDocument();
  });

  it('should render comment and analysis when data exists', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByTestId('comment-analysis')).toBeInTheDocument();
  });

  it('should render most recent sale when data exists', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByTestId('most-recent-sale')).toBeInTheDocument();
  });

  it('should render return when data exists', () => {
    render(<ModelPortfolioDetails data={mockData as unknown} isError={false} />);

    expect(screen.getByTestId('return')).toBeInTheDocument();
  });

  it('should render product help when data exists', () => {
    const dataWithHelp = {
      ...mockData,
      help: {
        ...mockData.help,
        product_help: {
          title: 'Product Help Title',
          content: [],
        },
      },
    };

    render(<ModelPortfolioDetails data={dataWithHelp as unknown} isError={false} />);

    expect(screen.getByTestId('product-help')).toBeInTheDocument();
  });

  it('should throw error when isError is true', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      render(<ModelPortfolioDetails data={mockData as unknown} isError={true} />);
    }).toThrow('Model Portfolio failed to load');
    consoleError.mockRestore();
  });

  it('should not render author info when publication is missing', () => {
    const dataWithoutPublication = {
      ...mockData,
      publication: undefined,
    };

    render(<ModelPortfolioDetails data={dataWithoutPublication as unknown} isError={false} />);

    expect(screen.queryByTestId('author-info')).not.toBeInTheDocument();
  });
});
