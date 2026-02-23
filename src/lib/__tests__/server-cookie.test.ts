import { cookies } from 'next/headers';

import { configuration } from '@/environment/configuration';
import { getServerSideMarketId, getServerSideLanguage } from '@/lib/server-cookie';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

describe('server-cookie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getServerSideMarketId', () => {
    it('should return market_id from cookie when it exists and is not empty', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '451' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideMarketId();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('market_id');
      expect(result).toBe('451');
    });

    it('should return default market_id when cookie does not exist', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(undefined),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideMarketId();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('market_id');
      expect(result).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should return default market_id when cookie value is empty string', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideMarketId();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('market_id');
      expect(result).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should return default market_id when cookie value is whitespace only', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '   ' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideMarketId();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('market_id');
      expect(result).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should return default market_id when cookie value is tab character only', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '\t' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideMarketId();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('market_id');
      expect(result).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should return cookie value when it has leading/trailing whitespace but contains valid content', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '  351  ' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideMarketId();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('market_id');
      // Should return the value as-is (trim only checks if empty after trim)
      expect(result).toBe('  351  ');
    });

    it('should handle different valid market_id values', async () => {
      const validMarketIds = ['1', '451', '351', '461', '452'];

      for (const marketId of validMarketIds) {
        const mockCookieStore = {
          get: jest.fn().mockReturnValue({ value: marketId }),
        };

        (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

        const result = await getServerSideMarketId();

        expect(result).toBe(marketId);
        jest.clearAllMocks();
      }
    });
  });

  describe('getServerSideLanguage', () => {
    it('should return language from cookie when it exists and is not empty', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'nor' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideLanguage();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('language');
      expect(result).toBe('nor');
    });

    it('should return default language when cookie does not exist', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(undefined),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideLanguage();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('language');
      expect(result).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should return default language when cookie value is empty string', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideLanguage();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('language');
      expect(result).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should return default language when cookie value is whitespace only', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '   ' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideLanguage();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('language');
      expect(result).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should return default language when cookie value is newline character only', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '\n' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideLanguage();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('language');
      expect(result).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should return cookie value when it has leading/trailing whitespace but contains valid content', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '  swe  ' }),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const result = await getServerSideLanguage();

      expect(cookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('language');
      // Should return the value as-is (trim only checks if empty after trim)
      expect(result).toBe('  swe  ');
    });

    it('should handle different valid language values', async () => {
      const validLanguages = ['eng', 'nor', 'swe', 'dan'];

      for (const language of validLanguages) {
        const mockCookieStore = {
          get: jest.fn().mockReturnValue({ value: language }),
        };

        (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

        const result = await getServerSideLanguage();

        expect(result).toBe(language);
        jest.clearAllMocks();
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle cookies() throwing an error gracefully', async () => {
      const error = new Error('Cookie read error');
      (cookies as jest.Mock).mockRejectedValue(error);

      await expect(getServerSideMarketId()).rejects.toThrow('Cookie read error');
      await expect(getServerSideLanguage()).rejects.toThrow('Cookie read error');
    });

    it('should handle cookie store get method returning null', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(null),
      };

      (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

      const marketIdResult = await getServerSideMarketId();
      const languageResult = await getServerSideLanguage();

      expect(marketIdResult).toBe(configuration.DEFAULT_MARKET_ID);
      expect(languageResult).toBe(configuration.DEFAULT_LANGUAGE);
    });
  });
});
