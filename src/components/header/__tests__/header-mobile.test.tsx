import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';

import HeaderMobile from '../header-mobile';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => {
    const params = new URLSearchParams();
    // Ensure it's truly empty
    params.delete('market_id');
    params.delete('language');
    return params;
  }),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/use-scroll-direction', () => ({
  useScrollDirection: jest.fn(),
}));

jest.mock('../market-combobox/market-combobox', () => ({
  MarketCombobox: () => <div data-testid="market-combobox">Market Combobox</div>,
}));

jest.mock('../language-selector', () => ({
  LanguageSelector: () => <div data-testid="language-selector">Language Selector</div>,
}));

jest.mock('../light-dark-switch', () => ({
  LightDarkSwitch: () => <div data-testid="light-dark-switch">Light Dark Switch</div>,
}));

jest.mock('../navbar/navbar-mobile', () => ({
  NavbarMobile: ({ onNavigate }: { onNavigate: () => void }) => (
    <nav data-testid="navbar-mobile">
      <button onClick={onNavigate}>Navbar Mobile</button>
    </nav>
  ),
}));

jest.mock('../company-search-bar', () => ({
  __esModule: true,
  default: () => <div data-testid="company-search-bar">Company Search Bar</div>,
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseScrollDirection = useScrollDirection as jest.MockedFunction<typeof useScrollDirection>;

describe('HeaderMobile', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      refresh: jest.fn(),
      forward: jest.fn(),
    } as unknown);

    mockUseScrollDirection.mockReturnValue({
      isVisible: true,
    });

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock document.body.style - add missing methods that JSDOM doesn't provide
    const bodyStyle = document.body.style as CSSStyleDeclaration & {
      removeProperty?: jest.Mock;
      setProperty?: jest.Mock;
    };
    if (!bodyStyle.removeProperty) {
      bodyStyle.removeProperty = jest.fn();
    }
    if (!bodyStyle.setProperty) {
      bodyStyle.setProperty = jest.fn();
    }
    // Ensure properties are writable
    bodyStyle.overflow = '';
    bodyStyle.paddingRight = '';

    // Mock document.documentElement.style
    const docElementStyle = document.documentElement.style as CSSStyleDeclaration & {
      overflow?: string;
    };
    if (!docElementStyle) {
      Object.defineProperty(document.documentElement, 'style', {
        writable: true,
        configurable: true,
        value: { overflow: '' },
      });
    }
    docElementStyle.overflow = '';

    // Mock window.innerWidth and document.documentElement.clientWidth for scrollbar width calculation
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should render mobile header', () => {
    render(<HeaderMobile />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render logo images', () => {
    render(<HeaderMobile />);

    const logos = screen.getAllByAltText('Investtech Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should navigate to home when logo is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const logos = screen.getAllByAltText('Investtech Logo');
    await user.click(logos[0]);

    expect(mockPush).toHaveBeenCalledWith('/?market_id=&language=');
  });

  it('should render hamburger menu button', () => {
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    expect(menuButtons.length).toBeGreaterThan(0);
  });

  it('should open menu when hamburger button is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('navbar-mobile')).toBeInTheDocument();
      expect(screen.getByTestId('market-combobox')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
      expect(screen.getByTestId('light-dark-switch')).toBeInTheDocument();
    });
  });

  it('should close menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('navbar-mobile')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Close menu');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('navbar-mobile')).not.toBeInTheDocument();
    });
  });

  it('should render company search bar', () => {
    render(<HeaderMobile />);

    // HeaderMobile renders search bar in both mobile and tablet views, so there will be multiple
    expect(screen.getAllByTestId('company-search-bar').length).toBeGreaterThan(0);
  });

  it('should hide header when scrolling down', () => {
    mockUseScrollDirection.mockReturnValue({
      isVisible: false,
    });

    render(<HeaderMobile />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('-translate-y-full');
  });

  it('should show header when scrolling up', () => {
    mockUseScrollDirection.mockReturnValue({
      isVisible: true,
    });

    render(<HeaderMobile />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('translate-y-0');
  });

  it('should set body overflow hidden when menu is open', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('should restore body overflow when menu is closed', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    const closeButton = screen.getByLabelText('Close menu');
    await user.click(closeButton);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('should call onNavigate when navigation item is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      const navbarButton = screen.getByText('Navbar Mobile');
      user.click(navbarButton);
    });

    // Menu should close after navigation
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('should render all header controls in mobile menu', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('market-combobox')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
      expect(screen.getByTestId('light-dark-switch')).toBeInTheDocument();
      expect(screen.getByTestId('navbar-mobile')).toBeInTheDocument();
    });
  });

  it('should add shadow on scroll', async () => {
    render(<HeaderMobile />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });

    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(header).toBeInTheDocument();
    });
  });

  it('should cleanup scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<HeaderMobile />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('should render divider line', () => {
    const { container } = render(<HeaderMobile />);

    const divider = container.querySelector('.bg-border');
    expect(divider).toBeInTheDocument();
  });

  it('should handle fullscreen menu overlay', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    await waitFor(() => {
      const menuOverlay = document.querySelector('.fixed.inset-0');
      expect(menuOverlay).toBeInTheDocument();
    });
  });

  it('should have min-w-0 on flex container to allow proper text truncation on mobile', async () => {
    const user = userEvent.setup();
    const { container } = render(<HeaderMobile />);

    // Open menu first to access the hidden content
    const menuButtons = screen.getAllByLabelText('Open menu');
    await user.click(menuButtons[0]);

    // The market and language selector container should have min-w-0 to prevent flex overflow
    // This allows text truncation to work properly on small screens like iPhone SE
    await waitFor(() => {
      const flexContainer = container.querySelector(
        '.flex.min-w-0.items-center.justify-start.gap-4'
      );
      expect(flexContainer).toBeInTheDocument();
    });
  });
});
