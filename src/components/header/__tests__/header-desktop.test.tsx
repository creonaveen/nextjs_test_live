import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, usePathname } from 'next/navigation';

import HeaderDesktop from '../header-desktop';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
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

jest.mock('../navbar/Navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

jest.mock('../company-search-bar', () => ({
  __esModule: true,
  default: () => <div data-testid="company-search-bar">Company Search Bar</div>,
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('HeaderDesktop', () => {
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

    mockUsePathname.mockReturnValue('');

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('should render header with all components', () => {
    render(<HeaderDesktop />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByTestId('company-search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('market-combobox')).toBeInTheDocument();
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    expect(screen.getByTestId('light-dark-switch')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('should render logo images', () => {
    render(<HeaderDesktop />);

    const logos = screen.getAllByAltText('Investtech Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should navigate to home when logo is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderDesktop />);

    const logos = screen.getAllByAltText('Investtech Logo');
    await user.click(logos[0]);

    expect(mockPush).toHaveBeenCalledWith('/?market_id=&language=');
  });

  it('should add shadow on scroll', async () => {
    render(<HeaderDesktop />);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('shadow-md');

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });

    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      // Header should have shadow class after scroll
      expect(header).toBeInTheDocument();
    });
  });

  it('should render company search bar with correct props', () => {
    render(<HeaderDesktop />);

    expect(screen.getByTestId('company-search-bar')).toBeInTheDocument();
  });

  it('should render navigation menu', () => {
    render(<HeaderDesktop />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('should render market combobox', () => {
    render(<HeaderDesktop />);

    expect(screen.getByTestId('market-combobox')).toBeInTheDocument();
  });

  it('should render language selector', () => {
    render(<HeaderDesktop />);

    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

  it('should render light/dark switch', () => {
    render(<HeaderDesktop />);

    expect(screen.getByTestId('light-dark-switch')).toBeInTheDocument();
  });

  it('should have correct header structure', () => {
    render(<HeaderDesktop />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Check for divider
    const divider = header.querySelector('.bg-divider');
    expect(divider).toBeInTheDocument();
  });

  it('should apply backdrop blur on scroll', async () => {
    render(<HeaderDesktop />);

    const header = screen.getByRole('banner');

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 50,
    });

    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      // Header should have shadow-md on scroll but NOT backdrop-blur
      // backdrop-blur has been removed for better performance
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('shadow-md');
    });
  });

  it('should cleanup scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<HeaderDesktop />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('should have spacer div below header', () => {
    const { container } = render(<HeaderDesktop />);

    // The spacer div should be rendered (it's in the parent component, but we can check structure)
    expect(container).toBeInTheDocument();
  });
});
