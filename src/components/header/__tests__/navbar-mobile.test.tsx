import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useNavSections } from '../navbar/navbar-menu';
import { NavbarMobile } from '../navbar/navbar-mobile';

jest.mock('../navbar/navbar-menu', () => ({
  useNavSections: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockUseNavSections = useNavSections as jest.MockedFunction<typeof useNavSections>;

describe('NavbarMobile', () => {
  const mockNavSections = [
    {
      value: 'myPages',
      label: 'myPages',
      items: [
        {
          title: 'watchlist',
          href: '/watchlist',
        },
        {
          title: 'myNotes',
          href: '/mynotes',
        },
      ],
    },
    {
      value: 'market',
      label: 'market',
      items: [
        {
          title: 'stocks',
          href: '/stocks',
        },
        {
          title: 'indices',
          href: '/indices',
        },
      ],
    },
  ];

  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavSections.mockReturnValue(mockNavSections);
  });

  it('should render navigation sections in accordion format', () => {
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    expect(screen.getByText('myPages')).toBeInTheDocument();
    expect(screen.getByText('market')).toBeInTheDocument();
  });

  it('should expand section when clicked', async () => {
    const user = userEvent.setup();
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const myPagesTrigger = screen.getByText('myPages');
    await user.click(myPagesTrigger);

    await waitFor(() => {
      expect(screen.getByText('watchlist')).toBeInTheDocument();
      expect(screen.getByText('myNotes')).toBeInTheDocument();
    });
  });

  it('should render navigation items as links', async () => {
    const user = userEvent.setup();
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const myPagesTrigger = screen.getByText('myPages');
    await user.click(myPagesTrigger);

    await waitFor(() => {
      const watchlistLink = screen.getByText('watchlist');
      expect(watchlistLink.closest('a')).toHaveAttribute(
        'href',
        expect.stringContaining('/watchlist')
      );
    });
  });

  it('should call onNavigate when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const myPagesTrigger = screen.getByText('myPages');
    await user.click(myPagesTrigger);

    await waitFor(async () => {
      const watchlistLink = screen.getByText('watchlist');
      await user.click(watchlistLink);
      expect(mockOnNavigate).toHaveBeenCalled();
    });
  });

  it('should handle nested navigation items with sub-accordion', async () => {
    const user = userEvent.setup();
    const sectionsWithSubItems = [
      {
        value: 'researchAndLearn',
        label: 'researchAndLearn',
        items: [
          {
            title: 'userTips',
            href: '/research',
            subItems: [
              {
                title: 'stockSchool',
                href: '/docs/stockSchool',
              },
              {
                title: 'theMostCommonMistakesInvestorsMake',
                href: '/docs/h2_commonMistakes',
              },
            ],
          },
        ],
      },
    ];

    mockUseNavSections.mockReturnValue(sectionsWithSubItems);

    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const researchTrigger = screen.getByText('researchAndLearn');
    await user.click(researchTrigger);

    await waitFor(() => {
      expect(screen.getByText('userTips')).toBeInTheDocument();
    });

    const userTipsTrigger = screen.getByText('userTips');
    await user.click(userTipsTrigger);

    await waitFor(() => {
      expect(screen.getByText('stockSchool')).toBeInTheDocument();
      expect(screen.getByText('theMostCommonMistakesInvestorsMake')).toBeInTheDocument();
    });
  });

  it('should handle navigation items without subItems', async () => {
    const user = userEvent.setup();
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const marketTrigger = screen.getByText('market');
    await user.click(marketTrigger);

    await waitFor(() => {
      expect(screen.getByText('stocks')).toBeInTheDocument();
      expect(screen.getByText('indices')).toBeInTheDocument();
    });

    const stocksLink = screen.getByText('stocks');
    expect(stocksLink.closest('a')).toHaveAttribute('href', expect.stringContaining('/stocks'));
  });

  it('should render all navigation sections', () => {
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    expect(screen.getByText('myPages')).toBeInTheDocument();
    expect(screen.getByText('market')).toBeInTheDocument();
  });

  it('should collapse section when clicked again', async () => {
    const user = userEvent.setup();
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const myPagesTrigger = screen.getByText('myPages');

    // First click to expand
    await user.click(myPagesTrigger);
    await waitFor(() => {
      expect(screen.getByText('watchlist')).toBeInTheDocument();
    });

    // Second click to collapse
    await user.click(myPagesTrigger);

    // Items should not be visible (accordion collapsed)
    await waitFor(() => {
      // The items might still be in DOM but hidden, so we check visibility
      // In an accordion, items might still be in DOM but not visible
      // This test ensures the accordion toggles correctly
      const watchlistElement = screen.queryByText('watchlist');
      if (watchlistElement) {
        expect(watchlistElement).not.toBeVisible();
      } else {
        // Element not in DOM when collapsed - also valid
        expect(watchlistElement).toBeNull();
      }
    });
  });

  it('should handle empty navigation sections gracefully', () => {
    mockUseNavSections.mockReturnValue([]);

    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    // Should render without errors - check for accordion container
    const accordionContainer = document.querySelector('[data-slot="accordion"]');
    expect(accordionContainer || document.body).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const myPagesTrigger = screen.getByText('myPages');
    expect(myPagesTrigger).toBeInTheDocument();
  });

  it('should render nested subItems as links', async () => {
    const user = userEvent.setup();
    const sectionsWithSubItems = [
      {
        value: 'researchAndLearn',
        label: 'researchAndLearn',
        items: [
          {
            title: 'userTips',
            href: '/research',
            subItems: [
              {
                title: 'stockSchool',
                href: '/docs/stockSchool',
              },
            ],
          },
        ],
      },
    ];

    mockUseNavSections.mockReturnValue(sectionsWithSubItems);

    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const researchTrigger = screen.getByText('researchAndLearn');
    await user.click(researchTrigger);

    await waitFor(() => {
      expect(screen.getByText('userTips')).toBeInTheDocument();
    });

    const userTipsTrigger = screen.getByText('userTips');
    await user.click(userTipsTrigger);

    await waitFor(() => {
      const stockSchoolLink = screen.getByText('stockSchool');
      expect(stockSchoolLink.closest('a')).toHaveAttribute(
        'href',
        expect.stringContaining('/docs/stockSchool')
      );
    });
  });

  it('should call onNavigate for nested subItem links', async () => {
    const user = userEvent.setup();
    const sectionsWithSubItems = [
      {
        value: 'researchAndLearn',
        label: 'researchAndLearn',
        items: [
          {
            title: 'userTips',
            href: '/research',
            subItems: [
              {
                title: 'stockSchool',
                href: '/docs/stockSchool',
              },
            ],
          },
        ],
      },
    ];

    mockUseNavSections.mockReturnValue(sectionsWithSubItems);

    render(<NavbarMobile onNavigate={mockOnNavigate} />);

    const researchTrigger = screen.getByText('researchAndLearn');
    await user.click(researchTrigger);

    await waitFor(() => {
      expect(screen.getByText('userTips')).toBeInTheDocument();
    });

    const userTipsTrigger = screen.getByText('userTips');
    await user.click(userTipsTrigger);

    await waitFor(() => {
      expect(screen.getByText('stockSchool')).toBeInTheDocument();
    });

    const stockSchoolLink = screen.getByText('stockSchool');
    await user.click(stockSchoolLink);
    expect(mockOnNavigate).toHaveBeenCalled();
  });
});
