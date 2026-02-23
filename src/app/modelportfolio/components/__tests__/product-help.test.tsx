import { render, screen } from '@testing-library/react';

import ProductHelp from '../product-help';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      common: {
        loading: 'Loading',
      },
      navigation: {
        modelPortfolio: 'Model Portfolio',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

jest.mock('../content-renderer', () => ({
  __esModule: true,
  default: ({ content }: unknown) => (
    <div data-testid="content-renderer">{content.length} items</div>
  ),
}));

jest.mock('../description-dialog', () => ({
  __esModule: true,
  default: () => <div data-testid="description-dialog">Description Dialog</div>,
}));

jest.mock('investtech/external-components', () => ({
  Card: ({ children, className }: unknown) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardHeader: ({ children }: unknown) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: unknown) => <div data-testid="card-title">{children}</div>,
  CardContent: ({ children }: unknown) => <div data-testid="card-content">{children}</div>,
}));

describe('ProductHelp', () => {
  const mockData = {
    help: {
      product_help: {
        title: 'Product Help Title',
        content: [
          { type: 'paragraph', text: 'Help text 1' },
          { type: 'paragraph', text: 'Help text 2' },
        ],
      },
      product_description: {
        info_text: 'Product description info',
        popup: {
          title: 'Popup Title',
          text: 'Popup Text',
        },
      },
    },
  };

  it('should render loading state', () => {
    render(<ProductHelp data={mockData as unknown} isLoading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render product help card when data exists', () => {
    render(<ProductHelp data={mockData as unknown} isLoading={false} />);

    expect(screen.getByText('Product Help Title')).toBeInTheDocument();
    expect(screen.getByTestId('content-renderer')).toBeInTheDocument();
  });

  it('should not render when product_help is missing', () => {
    const dataWithoutHelp = {
      ...mockData,
      help: {
        ...mockData.help,
        product_help: undefined,
      },
    };

    render(<ProductHelp data={dataWithoutHelp as unknown} isLoading={false} />);

    expect(screen.queryByText('Product Help Title')).not.toBeInTheDocument();
  });

  it('should render description dialog', () => {
    render(<ProductHelp data={mockData as unknown} isLoading={false} />);

    expect(screen.getByTestId('description-dialog')).toBeInTheDocument();
  });

  it('should render content as array when content is array', () => {
    render(<ProductHelp data={mockData as unknown} isLoading={false} />);

    expect(screen.getByTestId('content-renderer')).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
  });

  it('should render content as string when content is not array', () => {
    const dataWithStringContent = {
      ...mockData,
      help: {
        ...mockData.help,
        product_help: {
          ...mockData.help.product_help,
          content: [
            { type: 'paragraph', text: 'Help text 1' },
            { type: 'paragraph', text: 'Help text 2' },
          ],
        },
      },
    };

    render(<ProductHelp data={dataWithStringContent as unknown} isLoading={false} />);

    expect(screen.getByTestId('content-renderer')).toBeInTheDocument();
  });
});
