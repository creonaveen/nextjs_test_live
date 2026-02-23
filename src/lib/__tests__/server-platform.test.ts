import { headers } from 'next/headers';

import { getServerPlatform } from '@/lib/server-platform';

// Mock next/headers
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

describe('getServerPlatform', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mobile for mobile user agents', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set(
      'user-agent',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('mobile');
  });

  it('should return mobile for Android mobile user agents', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set('user-agent', 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36');

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('mobile');
  });

  it('should return mobile for iPad user agents (mobile regex matches first)', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set(
      'user-agent',
      'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    // iPad is in the mobile regex, so it will be detected as mobile first
    expect(result).toBe('mobile');
  });

  it('should return mobile for Android tablet user agents (mobile regex matches first)', async () => {
    const mockHeaders = new Headers();
    // Android tablet user agent should NOT contain "Mobile" in the user agent string
    mockHeaders.set(
      'user-agent',
      'Mozilla/5.0 (Linux; Android 10; K00F Build/JDQ39) AppleWebKit/537.36'
    );

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    // Note: The mobile regex includes "Android", so it matches first before tablet regex can check
    // This is expected behavior based on the implementation
    expect(result).toBe('mobile');
  });

  it('should return desktop for desktop user agents', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('desktop');
  });

  it('should return desktop for Mac user agents', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set(
      'user-agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    );

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('desktop');
  });

  it('should return desktop when user-agent is not provided', async () => {
    const mockHeaders = new Headers();

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('desktop');
  });

  it('should return desktop when user-agent is empty string', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set('user-agent', '');

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('desktop');
  });

  it('should handle various mobile user agents', async () => {
    const mobileUserAgents = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      'Mozilla/5.0 (Linux; Android 10; SM-G973F)',
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en)',
      'Mozilla/5.0 (webOS/1.4.0; U; en-US)',
      'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us)',
      'Opera/9.80 (Android; Opera Mini/7.5.33361/31.1448; U; en) Presto/2.8.119 Version/11.1010',
    ];

    for (const userAgent of mobileUserAgents) {
      const mockHeaders = new Headers();
      mockHeaders.set('user-agent', userAgent);

      (headers as jest.Mock).mockResolvedValue(mockHeaders);

      const result = await getServerPlatform();

      expect(result).toBe('mobile');
    }
  });

  it('should handle various tablet user agents (detected as mobile due to regex order)', async () => {
    const tabletUserAgents = [
      'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
      // Android tablets without "Mobile" in user agent
      'Mozilla/5.0 (Linux; Android 10; K00F Build/JDQ39)',
      'Mozilla/5.0 (Linux; Android 9; SM-T860 Build/PPR1.180610.011)',
    ];

    for (const userAgent of tabletUserAgents) {
      const mockHeaders = new Headers();
      mockHeaders.set('user-agent', userAgent);

      (headers as jest.Mock).mockResolvedValue(mockHeaders);

      const result = await getServerPlatform();

      // Both iPad and Android are in the mobile regex, so they will be detected as mobile first
      expect(result).toBe('mobile');
    }
  });

  it('should prioritize mobile detection over tablet for mobile devices', async () => {
    // This test ensures that mobile regex is checked before tablet regex
    const mockHeaders = new Headers();
    mockHeaders.set('user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');

    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    const result = await getServerPlatform();

    expect(result).toBe('mobile');
  });
});
