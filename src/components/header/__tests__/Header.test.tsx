import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import { usePlatform } from '@/lib/platform';
import { PlatformType } from '@/lib/server-platform';
import { reloadPage } from '@/utils/navigation-utils';

import Header from '../Header';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('../header-desktop', () => ({
  __esModule: true,
  default: () => <header data-testid="header-desktop">Desktop Header</header>,
}));

jest.mock('../header-mobile', () => ({
  __esModule: true,
  default: () => <header data-testid="header-mobile">Mobile Header</header>,
}));

jest.mock('@/utils/navigation-utils', () => ({
  reloadPage: jest.fn(),
}));

// ... other mocks ...

jest.mock('@/lib/utils', () => ({
  getLanguageFromStorage: jest.fn(() => 'eng'),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;

describe('Header', () => {
  const mockReloadPage = reloadPage as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({} as unknown);
  });

  // ... tests ...

  it('should handle popstate event and reload if language changes', () => {
    // Set initial state
    // Set initial state
    window.history.pushState({}, '', '?language=nor');

    Object.defineProperty(document, 'documentElement', {
      writable: true,
      value: {
        lang: 'eng',
      },
    });

    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    render(<Header serverPlatform="desktop" />);

    // Create a popstate event
    const popStateEvent = new PopStateEvent('popstate', {
      state: { language: 'nor' },
    });

    // Manually trigger the event handler
    window.dispatchEvent(popStateEvent);

    // The handler should check language and potentially reload
    expect(mockReloadPage).toHaveBeenCalled();
  });

  it('should handle popstate event when language is the same', () => {
    // Set initial state
    // Set initial state
    window.history.pushState({}, '', '?language=eng');

    Object.defineProperty(document, 'documentElement', {
      writable: true,
      value: {
        lang: 'eng',
      },
    });

    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    render(<Header serverPlatform="desktop" />);

    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);

    // Should not reload if language is the same
    expect(mockReloadPage).not.toHaveBeenCalled();
  });

  it('should render HeaderDesktop when platform is desktop', () => {
    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    render(<Header serverPlatform="desktop" />);

    expect(screen.getByTestId('header-desktop')).toBeInTheDocument();
    expect(screen.queryByTestId('header-mobile')).not.toBeInTheDocument();
  });

  it('should render HeaderMobile when platform is tablet', () => {
    mockUsePlatform.mockReturnValue('tablet' as PlatformType);

    render(<Header serverPlatform="tablet" />);

    expect(screen.getByTestId('header-mobile')).toBeInTheDocument();
    expect(screen.queryByTestId('header-desktop')).not.toBeInTheDocument();
  });

  it('should render HeaderMobile when platform is mobile', () => {
    mockUsePlatform.mockReturnValue('mobile' as PlatformType);

    render(<Header serverPlatform="mobile" />);

    expect(screen.getByTestId('header-mobile')).toBeInTheDocument();
    expect(screen.queryByTestId('header-desktop')).not.toBeInTheDocument();
  });

  it('should render spacer div with correct height classes', () => {
    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    const { container } = render(<Header serverPlatform="desktop" />);

    const spacer = container.querySelector('.h-\\[80px\\]');
    expect(spacer).toBeInTheDocument();
  });

  it('should add popstate event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    render(<Header serverPlatform="desktop" />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('should remove popstate event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    const { unmount } = render(<Header serverPlatform="desktop" />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('should use serverPlatform as initial platform', () => {
    mockUsePlatform.mockReturnValue('desktop' as PlatformType);

    render(<Header serverPlatform="tablet" />);

    expect(mockUsePlatform).toHaveBeenCalledWith('tablet');
  });
});
