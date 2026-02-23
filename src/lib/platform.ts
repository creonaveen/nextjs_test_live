'use client';
import React from 'react';

import { PlatformType } from './server-platform';

// Client-side detection using media queries
export const getClientPlatform = (): PlatformType => {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  // ---- Detect iPad (portrait or landscape) ----
  const isIpad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchstart' in window;

  if (isIpad) {
    if (width <= 767) return 'mobile';
    return 'tablet'; // All iPad sizes including Pro
  }

  // ---- Non-iPad devices ----
  if (width > 1023) return 'desktop';
  if (width < 768) return 'mobile';
  return 'tablet'; // small laptops, foldables, etc.
};

export const usePlatform = (initialPlatform: PlatformType = 'desktop') => {
  const [platform, setPlatform] = React.useState<PlatformType>(initialPlatform);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePlatform = () => {
      setPlatform(getClientPlatform());
    };

    // Initial run
    updatePlatform();

    // Media queries
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const listener = () => updatePlatform();

    // Listen to major changes
    touchQuery.addEventListener('change', listener);
    mobileQuery.addEventListener('change', listener);
    tabletQuery.addEventListener('change', listener);
    desktopQuery.addEventListener('change', listener);

    // Detect orientation & width change instantly
    window.addEventListener('resize', listener);
    window.addEventListener('orientationchange', listener);

    return () => {
      touchQuery.removeEventListener('change', listener);
      mobileQuery.removeEventListener('change', listener);
      tabletQuery.removeEventListener('change', listener);
      desktopQuery.removeEventListener('change', listener);
      window.removeEventListener('resize', listener);
      window.removeEventListener('orientationchange', listener);
    };
  }, []);
  return platform;
};
