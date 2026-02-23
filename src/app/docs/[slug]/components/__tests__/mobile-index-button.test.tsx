import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';
import { RelatedPost } from '@/lib/types/research-page';

import MobileIndexButton from '../mobile-index-button';

interface ScrollDirectionResult {
  isVisible: boolean;
}

interface TableOfContentsProps {
  beforeScroll?: () => Promise<void>;
}

interface RelatedPostsProps {
  relatedPosts?: RelatedPost[];
}

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/hooks/use-scroll-direction', () => ({
  useScrollDirection: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: (string | boolean | null | undefined)[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
  };
});

jest.mock('@/components/custom-components/intra-page-menu', () => ({
  __esModule: true,
  useTableOfContentsContext: () => ({
    activeSection: '',
    scrollToSection: jest.fn(),
    setActiveNow: jest.fn(),
  }),
}));

jest.mock('@/components/custom-components/table-of-contents', () => ({
  __esModule: true,
  default: ({ beforeScroll }: TableOfContentsProps) => (
    <div data-testid="table-of-contents">
      Table of Contents
      <button
        data-testid="toc-navigate"
        onClick={() => beforeScroll && beforeScroll().then(() => {})}
      >
        Navigate
      </button>
    </div>
  ),
}));

jest.mock('@/components/custom-components/related-posts', () => ({
  __esModule: true,
  default: ({ relatedPosts }: RelatedPostsProps) => (
    <div data-testid="related-posts">
      {relatedPosts?.map((post: RelatedPost) => (
        <div key={post.id}>{post.post_title}</div>
      ))}
    </div>
  ),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<() => (key: string) => string>;
const mockUseScrollDirection = useScrollDirection as jest.MockedFunction<
  () => ScrollDirectionResult
>;

describe('MobileIndexButton', () => {
  const mockSections = [
    { id: '1', title: 'Section 1' },
    { id: '2', title: 'Section 2' },
  ];

  const mockRelatedPosts = [
    { id: '1', post_title: 'Related Post 1', post_name: 'related-post-1' },
    { id: '2', post_title: 'Related Post 2', post_name: 'related-post-2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseScrollDirection.mockReturnValue({
      isVisible: true,
    });
  });

  it('should render button with index text when sections are provided', () => {
    render(<MobileIndexButton sections={mockSections} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('index');
  });

  it('should render button with moreReports text when only relatedPosts are provided', () => {
    render(<MobileIndexButton relatedPosts={mockRelatedPosts} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('moreReports');
  });

  it('should open sheet when button is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileIndexButton sections={mockSections} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByTestId('table-of-contents')).toBeInTheDocument();
  });

  it('should render table of contents when sections are provided', async () => {
    const user = userEvent.setup();
    render(<MobileIndexButton sections={mockSections} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByTestId('table-of-contents')).toBeInTheDocument();
  });

  it('should render related posts when only relatedPosts are provided', async () => {
    const user = userEvent.setup();
    render(<MobileIndexButton relatedPosts={mockRelatedPosts} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByTestId('related-posts')).toBeInTheDocument();
  });

  it('should show visible state when scrolling up', () => {
    mockUseScrollDirection.mockReturnValue({
      isVisible: true,
    });

    const { container } = render(<MobileIndexButton sections={mockSections} />);

    const wrapper = container.firstChild as HTMLElement | null;
    expect(wrapper).toHaveClass('translate-y-0');
  });

  it('should show hidden state when scrolling down', () => {
    mockUseScrollDirection.mockReturnValue({
      isVisible: false,
    });

    const { container } = render(<MobileIndexButton sections={mockSections} />);

    const wrapper = container.firstChild as HTMLElement | null;
    expect(wrapper).toHaveClass('translate-y-24');
  });

  it('should have correct button styling', () => {
    render(<MobileIndexButton sections={mockSections} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-accent', 'rounded-full');
  });

  it('should have correct container classes', () => {
    const { container } = render(<MobileIndexButton sections={mockSections} />);

    const wrapper = container.firstChild as HTMLElement | null;
    expect(wrapper).toHaveClass('transition-transform', 'duration-300', 'md:hidden');
  });

  it('should close sheet when navigating from table of contents', async () => {
    const user = userEvent.setup();

    render(<MobileIndexButton sections={mockSections} />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Wait for sheet to open
    expect(screen.getByTestId('table-of-contents')).toBeInTheDocument();

    const navigateButton = screen.getByTestId('toc-navigate');
    await user.click(navigateButton);

    // Wait for sheet to close (the beforeScroll function closes it)
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Sheet should be closed after navigation
    expect(screen.queryByTestId('table-of-contents')).not.toBeInTheDocument();
  }, 10000);

  it('should handle empty sections array', () => {
    render(<MobileIndexButton sections={[]} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('moreReports');
  });

  it('should handle empty relatedPosts array', () => {
    render(<MobileIndexButton relatedPosts={[]} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should prioritize sections over relatedPosts when both are provided', () => {
    render(<MobileIndexButton sections={mockSections} relatedPosts={mockRelatedPosts} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('index');
  });
});
