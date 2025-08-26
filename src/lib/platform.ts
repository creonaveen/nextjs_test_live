'use client';
import React from 'react';

import { PlatformType } from './server-platform';

// Client-side detection using media queries
export const getClientPlatform = (): PlatformType => {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    return 'mobile';
  } else if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
    return 'tablet';
  }
  return 'desktop';
};

// Hook for React components
export const usePlatform = (initialPlatform: PlatformType = 'desktop') => {
  const [platform, setPlatform] = React.useState<PlatformType>(initialPlatform);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPlatform = getClientPlatform();
    setPlatform(currentPlatform);

    // Create media query lists
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const handleMediaChange = () => {
      let newPlatform: PlatformType;
      if (mobileQuery.matches) {
        newPlatform = 'mobile';
      } else if (tabletQuery.matches) {
        newPlatform = 'tablet';
      } else if (desktopQuery.matches) {
        newPlatform = 'desktop';
      } else {
        newPlatform = 'desktop';
      }
      setPlatform(newPlatform);
    };

    // Add listeners for media query changes
    mobileQuery.addEventListener('change', handleMediaChange);
    tabletQuery.addEventListener('change', handleMediaChange);
    desktopQuery.addEventListener('change', handleMediaChange);

    // Cleanup listeners
    return () => {
      mobileQuery.removeEventListener('change', handleMediaChange);
      tabletQuery.removeEventListener('change', handleMediaChange);
      desktopQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);
  return platform;
};
