export const configuration = {
  BASE_API_URL: 'https://bravo.investtech.com:8830/',
  NEXT_PUBLIC_AXIOS_API_URL: 'http://localhost:3010/',
  SERVER_AXIOS_API_URL: 'http://localhost:3010',
  BASE_PATH: '/web',
  IMAGE_BASE_PATH: '/web',
  ENGLISH_LANGUAGE: 'eng',
  DEFAULT_MARKET_ID: '1', // Norway
  DEFAULT_LANGUAGE: 'eng',
  AUTH_ENABLED: true,
  REWRITE_ENABLED: true,
  LINK_PREFETCH_ENABLED: false,
  VALID_MARKET_IDS: ['1', '451', '351', '461', '452'] as const, // Valid Market IDs
  VALID_LANGUAGES: ['eng', 'nor', 'swe', 'dan'] as const, // Valid Language Codes
  ERROR_TRACKING_ENABLED: true,
  COOKIE_SECURE: false,
  COOKIE_HTTP_ONLY: false,
  COOKIE_SAME_SITE: 'lax' as const,
  COOKIE_MAX_AGE: 2 * 24 * 60 * 60 * 1000,
  NORDNET_SUBSCRIPTION_URLS: {
    nor: 'https://www.nordnet.no/aksjer/teknisk-analyse',
    swe: 'https://www.nordnet.se/aktier/analystjanster',
    dan: 'https://www.nordnet.dk/aktier/analysetjenester/investtech',
    eng: 'https://www.nordnet.fi/fi/palvelut/analyysit-ja-uutiset',
  } as const,
};
