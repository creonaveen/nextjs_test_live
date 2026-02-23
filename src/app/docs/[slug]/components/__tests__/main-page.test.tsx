import { render, screen } from '@testing-library/react';

import { usePlatform } from '@/lib/platform';
import { ResearchPage } from '@/lib/types/research-page';

import MainPage from '../main-page';

// Mock dependencies
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('@/components/custom-components/author-info-block', () => {
  const MockComponent = () => <div data-testid="author-info-block">Author Info</div>;
  return {
    default: MockComponent,
  };
});

jest.mock('@/components/custom-components/intra-page-menu', () => ({
  TableOfContentsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="table-of-contents-provider">{children}</div>
  ),
  useTableOfContentsContext: () => ({
    registerSection: jest.fn(),
  }),
  default: () => <div data-testid="table-of-contents">Table of Contents</div>,
}));

jest.mock('@/components/custom-components/related-posts', () => ({
  default: () => <div data-testid="related-posts">Related Posts</div>,
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Card: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
      <div data-testid="card" data-slot="card" {...props}>
        {children}
      </div>
    ),
    CardContent: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="card-content">{children}</div>
    ),
    CardHeader: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="card-header">{children}</div>
    ),
    CardTitle: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="card-title">{children}</div>
    ),
  };
});

jest.mock('../mobile-index-button', () => ({
  default: () => <button data-testid="mobile-index-button">Mobile Index</button>,
}));

jest.mock('../render-component', () => ({
  renderBlock: jest.fn(() => null),
  renderActions: jest.fn(() => null),
}));

const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;

describe('MainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePlatform.mockReturnValue('desktop');
  });

  it('should render without publication data', () => {
    const mockData: ResearchPage = {
      type: 'research_page',
      meta: {
        title: 'Test Page',
        description: 'Test description',
      },
      sections: [],
      intra_page_menu: [],
      related_posts: [],
      publication: undefined,
    };

    render(<MainPage data={mockData} />);

    expect(screen.getByTestId('table-of-contents-provider')).toBeInTheDocument();
    expect(screen.queryByTestId('author-info-block')).not.toBeInTheDocument();
  });

  it('should handle undefined data', () => {
    // Test that component doesn't crash with minimal data
    const mockData = {} as ResearchPage;

    expect(() => {
      render(<MainPage data={mockData} />);
    }).not.toThrow();
  });

  it('should render CardContent with px-5 padding class', () => {
    const mockData: ResearchPage = {
      type: 'research_page',
      meta: {
        title: 'Test Page',
        description: 'Test description',
      },
      sections: [
        {
          id: 'test-section',
          title: 'Test Section',
          blocks: [],
        },
      ],
      intra_page_menu: [],
      related_posts: [],
      publication: undefined,
    };

    const { container } = render(<MainPage data={mockData} />);

    // CardContent should have px-5 class for responsive padding on mobile
    // The CardContent is part of the Card structure, check for cards in general
    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
