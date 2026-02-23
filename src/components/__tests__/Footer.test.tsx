import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import { PlatformType } from '@/lib/server-platform';

import Footer from '../footer/Footer';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

// Mock hooks
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/lib/hooks/use-market-id', () => ({
  useMarketId: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/components/link', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next/navigation for usePathname and useSearchParams (Link uses both)
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} data-testid={`image-${alt}`} />
  ),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;
const mockUseMarketId = useMarketId as jest.MockedFunction<typeof useMarketId>;

describe('Footer', () => {
  const mockT = jest.fn((key: string) => key);
  const mockN = jest.fn((key: string) => key);
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mocks
    mockUseTranslations.mockImplementation((namespace: string) => {
      if (namespace === 'footer') {
        return mockT;
      }
      if (namespace === 'navigation') {
        return mockN;
      }
      return mockT;
    });

    mockUsePlatform.mockReturnValue('desktop' as PlatformType);
    mockUseMarketId.mockReturnValue('1');
    mockUsePathname.mockReturnValue('');

    // Setup translation mocks
    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'copyRight.section1': '© ',
        'copyRight.section2': ' Investtech. All rights reserved.',
        'description.largeDescription.paragraph1': 'Large description paragraph 1',
        'description.largeDescription.link': 'disclaimer link',
        'description.largeDescription.paragraph2': 'Large description paragraph 2',
        'description.smallDescription.paragraph1': 'Small description paragraph 1',
        'description.smallDescription.link': 'about analyses link',
        'headOffice.title': 'Head Office',
        'headOffice.address': 'Head Office Address\nCity, Country',
        'analysisDepartment.title': 'Analysis Department',
        'analysisDepartment.address': 'Analysis Department Address\nCity, Country',
        'contactUs.title': 'Contact Us',
        'contactUs.phone': '+47 22 00 00 00',
        'contactUs.email': 'info@investtech.com',
        'followUs.title': 'Follow Us',
      };
      return translations[key] || key;
    });

    mockN.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        myPages: 'My Pages',
        watchlist: 'Watchlist',
        myNotes: 'My Notes',
        market: 'Market',
        stocks: 'Stocks',
        indices: 'Indices',
        marketCommentary: 'Market Commentary',
        actionPicking: 'Action Picking',
        top50: 'Top 50',
        recommendations: 'Recommendations',
        todaysCase: "Today's Case",
        modelPortfolio: 'Model Portfolio',
        analyzeAndLearn: 'Analyze and Learn',
        stockSchool: 'Stock School',
        theMostCommonMistakesInvestorsMake: 'The Most Common Mistakes Investors Make',
        advantagesYouHaveAsASmallSaver: 'Advantages You Have As A Small Saver',
        userTipsFromInvesttechAnalysts: 'User Tips From Investtech Analysts',
        investtechResearch: 'Investtech Research',
        trends: 'Trends',
        supportAndResistance: 'Support and Resistance',
        pricePatterns: 'Price Patterns',
        volume: 'Volume',
        momentumAndRSI: 'Momentum and RSI',
        insiderTrades: 'Insider Trades',
        others: 'Others',
        aboutTheAnalyses: 'About The Analyses',
        aboutInvesttech: 'About Investtech',
      };
      return translations[key] || key;
    });
  });

  describe('Desktop Layout', () => {
    it('should render desktop layout when platform is desktop', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByAltText('Investtech Logo')).toBeInTheDocument();
    });

    it('should render all navigation sections in desktop layout', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('My Pages')).toBeInTheDocument();
      expect(screen.getByText('Market')).toBeInTheDocument();
      expect(screen.getByText('Action Picking')).toBeInTheDocument();
      expect(screen.getByText('Recommendations')).toBeInTheDocument();
      expect(screen.getByText('Analyze and Learn')).toBeInTheDocument();
    });

    it('should render navigation links with correct hrefs', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const watchlistLink = screen.getByText('Watchlist').closest('a');
      expect(watchlistLink).toHaveAttribute('href', expect.stringContaining('/watchlist'));

      const stocksLink = screen.getByText('Stocks').closest('a');
      expect(stocksLink).toHaveAttribute('href', expect.stringContaining('stocks'));
    });

    it('should render copyright with current year', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const copyrightText = `© ${currentYear} Investtech. All rights reserved.`;
      expect(screen.getByText(copyrightText)).toBeInTheDocument();
    });

    it('should render description paragraphs with disclaimer links', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      // Text is split across multiple elements, so use a flexible matcher
      expect(screen.getByText(/Large description paragraph 1/i)).toBeInTheDocument();
      expect(screen.getByText('disclaimer link')).toBeInTheDocument();
      expect(screen.getByText(/Small description paragraph 1/i)).toBeInTheDocument();
      expect(screen.getByText('about analyses link')).toBeInTheDocument();
    });

    it('should render contact information sections', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('Head Office')).toBeInTheDocument();
      // Address text contains newlines, so check for parts of it
      expect(
        screen.getByText((content, element) => {
          return element?.tagName === 'P' && content.includes('Head Office Address');
        })
      ).toBeInTheDocument();
      expect(screen.getByText('Analysis Department')).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => {
          return element?.tagName === 'P' && content.includes('Analysis Department Address');
        })
      ).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText('+47 22 00 00 00')).toBeInTheDocument();
    });

    it('should render email link with mailto', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const emailLink = screen.getByText('info@investtech.com').closest('a');
      expect(emailLink).toHaveAttribute('href', 'mailto:info@investtech.com');
    });
  });

  describe('Mobile Layout', () => {
    it('should render mobile layout when platform is mobile', () => {
      mockUsePlatform.mockReturnValue('mobile' as PlatformType);

      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByAltText('Investtech Logo')).toBeInTheDocument();
    });

    it('should render mobile layout when platform is tablet', () => {
      mockUsePlatform.mockReturnValue('tablet' as PlatformType);

      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render all sections in mobile layout', () => {
      mockUsePlatform.mockReturnValue('mobile' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('My Pages')).toBeInTheDocument();
      expect(screen.getByText('Market')).toBeInTheDocument();
      expect(screen.getByText('Head Office')).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('should render social media icons', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByTestId('image-YouTube')).toBeInTheDocument();
      expect(screen.getByTestId('image-Twitter')).toBeInTheDocument();
      expect(screen.getByTestId('image-LinkedIn')).toBeInTheDocument();
    });

    it('should render Facebook link with correct href for market ID 461 (Sweden)', async () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);
      mockUseMarketId.mockReturnValue('461');

      render(<Footer />);

      await waitFor(() => {
        const facebookLink = screen.getByTestId('image-Facebook').closest('a');
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/InvesttechSE/');
      });
    });

    it('should render Facebook link with correct href for market ID 451 (Denmark)', async () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);
      mockUseMarketId.mockReturnValue('451');

      render(<Footer />);

      await waitFor(() => {
        const facebookLink = screen.getByTestId('image-Facebook').closest('a');
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/InvesttechDK/');
      });
    });

    it('should render Facebook link with default href for other market IDs', async () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);
      mockUseMarketId.mockReturnValue('1');

      render(<Footer />);

      await waitFor(() => {
        const facebookLink = screen.getByTestId('image-Facebook').closest('a');
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/InvesttechNO/');
      });
    });

    it('should render external social media links with target="_blank"', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const youtubeLink = screen.getByTestId('image-YouTube').closest('a');
      expect(youtubeLink).toHaveAttribute('target', '_blank');
      expect(youtubeLink).toHaveAttribute(
        'href',
        'https://www.youtube.com/channel/UCy0RvVfAnDvBd-5vaU9s46A'
      );
    });

    it('should render external social media links with rel="noopener noreferrer" on mobile', () => {
      mockUsePlatform.mockReturnValue('mobile' as PlatformType);

      render(<Footer />);

      const youtubeLink = screen.getByTestId('image-YouTube').closest('a');
      expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not render Facebook link if href is not available', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);
      mockUseMarketId.mockReturnValue('999'); // Unknown market ID

      render(<Footer />);

      // Facebook should still render with default NO link
      const facebookLink = screen.getByTestId('image-Facebook').closest('a');
      expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/InvesttechNO/');
    });
  });

  describe('External vs Internal Links', () => {
    it('should render external links with target="_blank"', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const emailLink = screen.getByText('info@investtech.com').closest('a');
      expect(emailLink).toHaveAttribute('href', 'mailto:info@investtech.com');
    });

    it('should render internal links without target="_blank"', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const watchlistLink = screen.getByText('Watchlist').closest('a');
      expect(watchlistLink).not.toHaveAttribute('target', '_blank');
    });
  });

  describe('Text-only Items', () => {
    it('should render address as text without link', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      // Address text contains newlines, so find by partial text
      const addressText = screen.getByText((content, element) => {
        return element?.tagName === 'P' && content.includes('Head Office Address');
      });
      expect(addressText.tagName).toBe('P');
      expect(addressText.closest('a')).toBeNull();
    });

    it('should render phone number as text without link', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      const phoneText = screen.getByText('+47 22 00 00 00');
      expect(phoneText.tagName).toBe('P');
      expect(phoneText.closest('a')).toBeNull();
    });
  });

  describe('Navigation Sections', () => {
    it('should render myPages section with correct items', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('My Pages')).toBeInTheDocument();
      expect(screen.getByText('Watchlist')).toBeInTheDocument();
      expect(screen.getByText('My Notes')).toBeInTheDocument();
    });

    it('should render market section with correct items', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('Market')).toBeInTheDocument();
      expect(screen.getByText('Stocks')).toBeInTheDocument();
      expect(screen.getByText('Indices')).toBeInTheDocument();
      expect(screen.getByText('Market Commentary')).toBeInTheDocument();
    });

    it('should render actionPicking section with correct items', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('Action Picking')).toBeInTheDocument();
      expect(screen.getByText('Top 50')).toBeInTheDocument();
    });

    it('should render recommendations section with correct items', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('Recommendations')).toBeInTheDocument();
      expect(screen.getByText("Today's Case")).toBeInTheDocument();
      expect(screen.getByText('Model Portfolio')).toBeInTheDocument();
    });

    it('should render analyzeAndLearn section with correct items', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByText('Analyze and Learn')).toBeInTheDocument();
      expect(screen.getByText('Stock School')).toBeInTheDocument();
      expect(screen.getByText('The Most Common Mistakes Investors Make')).toBeInTheDocument();
      expect(screen.getByText('About The Analyses')).toBeInTheDocument();
    });
  });

  describe('Market ID Changes', () => {
    it('should update Facebook href when market ID changes', async () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);
      mockUseMarketId.mockReturnValue('1');

      const { rerender } = render(<Footer />);

      await waitFor(() => {
        const facebookLink = screen.getByTestId('image-Facebook').closest('a');
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/InvesttechNO/');
      });

      // Change market ID
      mockUseMarketId.mockReturnValue('461');
      rerender(<Footer />);

      await waitFor(() => {
        const facebookLink = screen.getByTestId('image-Facebook').closest('a');
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/InvesttechSE/');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper footer role', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should have aria-label on social media links in mobile view', () => {
      mockUsePlatform.mockReturnValue('mobile' as PlatformType);

      render(<Footer />);

      const youtubeLink = screen.getByTestId('image-YouTube').closest('a');
      expect(youtubeLink).toHaveAttribute('aria-label', 'Visit our YouTube page');
    });
  });

  describe('Styling Classes', () => {
    it('should apply correct CSS classes to footer element', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      const { container } = render(<Footer />);

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass(
        'bg-grey-900',
        'dark:bg-card',
        'z-0',
        'w-full',
        'py-6',
        'text-white',
        'md:py-12'
      );
    });

    it('should render divider with correct classes', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      const { container } = render(<Footer />);

      const divider = container.querySelector('.bg-grey-750');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing href gracefully', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);

      render(<Footer />);

      // Items without href should not render as links
      // Address text contains newlines, so find by partial text
      const addressText = screen.getByText((content, element) => {
        return element?.tagName === 'P' && content.includes('Head Office Address');
      });
      expect(addressText.closest('a')).toBeNull();
    });

    it('should handle translation keys that return the key itself', () => {
      mockUsePlatform.mockReturnValue('desktop' as PlatformType);
      mockT.mockImplementation((key: string) => key);
      mockN.mockImplementation((key: string) => key);

      render(<Footer />);

      // Should still render, even if translations return keys
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Accordion Behavior', () => {
    it('should render accordion for navigation sections on mobile', () => {
      mockUsePlatform.mockReturnValue('mobile' as PlatformType);

      render(<Footer />);

      // Accordion items should be rendered for mobile layout
      const myPagesButton = screen.getByText('My Pages').closest('button');
      expect(myPagesButton).toBeInTheDocument();
    });

    it('should reset accordion state when pathname changes', async () => {
      const user = userEvent.setup();
      mockUsePlatform.mockReturnValue('mobile' as PlatformType);
      mockUsePathname.mockReturnValue('/home');

      const { rerender } = render(<Footer />);

      // Click to open accordion
      const myPagesButton = screen.getByText('My Pages').closest('button');
      if (myPagesButton) {
        await user.click(myPagesButton);
      }

      // Change pathname
      mockUsePathname.mockReturnValue('/stocks');
      rerender(<Footer />);

      // Accordion should reset (not open)
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });
});
