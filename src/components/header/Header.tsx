'use client';

import React, { useCallback, useEffect } from 'react';

import { usePlatform } from '@/lib/platform';
import { PlatformType } from '@/lib/server-platform';
import { getLanguageFromStorage } from '@/lib/utils';
import logger from '@/utils/logger';
import { reloadPage } from '@/utils/navigation-utils';

import HeaderDesktop from './header-desktop';
import HeaderMobile from './header-mobile';

interface HeaderProps {
  serverPlatform: PlatformType;
}

/**
 * Header component that renders platform-specific header (desktop or mobile)
 * Handles language synchronization via URL query parameters
 */
const Header: React.FC<HeaderProps> = ({ serverPlatform }) => {
  const platform = usePlatform(serverPlatform);

  const handlePopState = useCallback((e: PopStateEvent) => {
    try {
      const url = new URL((e.currentTarget as Window).location.href);
      const language = url.searchParams.get('language');
      const currentLanguage = getLanguageFromStorage();

      if (language && currentLanguage !== language) {
        document.documentElement.lang = language;
        // Use router refresh instead of full page reload
        // The middleware will handle the language change
        reloadPage(); // Keep reload for popstate as it's a navigation event
      }
    } catch (error) {
      logger.error(
        'Error handling popstate event',
        error instanceof Error ? error : new Error(String(error)),
        { component: 'header-popstate' }
      );
      // Fallback to reload if URL parsing fails
      reloadPage();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  return (
    <>
      {platform === 'desktop' ? <HeaderDesktop /> : <HeaderMobile />}
      <div className="h-[80px] md:h-[50px] lg:h-0" />
    </>
  );
};

export default Header;
