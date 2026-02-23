import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import SessionExpiryTab from '../session-expiry-tab';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_LANGUAGE: 'eng',
    VALID_LANGUAGES: ['eng', 'nor', 'swe', 'dan', 'fin'] as const,
    NORDNET_SUBSCRIPTION_URLS: {
      nor: 'https://www.nordnet.no/aksjer/teknisk-analyse',
      swe: 'https://www.nordnet.se/aktier/analystjanster',
      dan: 'https://www.nordnet.dk/aktier/analysetjenester/investtech',
      eng: 'https://www.nordnet.fi/fi/palvelut/analyysit-ja-uutiset',
    } as const,
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: unknown) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="image"
    />
  ),
}));

jest.mock('@/utils/navigation-utils', () => ({
  redirectToUrl: jest.fn(),
}));

import { redirectToUrl } from '@/utils/navigation-utils';

// ... other mocks ...

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;

describe('SessionExpiryTab', () => {
  const mockRedirectToUrl = redirectToUrl as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  // ... other tests ...

  it('should redirect to subscription URL on button click', async () => {
    const user = userEvent.setup();

    render(<SessionExpiryTab language="eng" />);

    const button = screen.getByText('restart_button');
    await user.click(button);

    expect(mockRedirectToUrl).toHaveBeenCalledWith(
      'https://www.nordnet.fi/fi/palvelut/analyysit-ja-uutiset'
    );
  });

  it('should handle missing language', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<SessionExpiryTab language={undefined} />);

    expect(screen.getByText('title')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
