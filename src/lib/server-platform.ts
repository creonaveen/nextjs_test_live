import { headers } from 'next/headers';

export type PlatformType = 'mobile' | 'tablet' | 'desktop';

// Server-side detection using user agent
export const getServerPlatform = async (): Promise<PlatformType> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /iPad|Android(?!.*Mobile)/i;

  if (mobileRegex.test(userAgent)) {
    return 'mobile';
  } else if (tabletRegex.test(userAgent)) {
    return 'tablet';
  }
  return 'desktop';
};
