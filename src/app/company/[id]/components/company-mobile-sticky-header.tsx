'use client';

import React from 'react';

import { General } from '@/lib/types/company';

interface CompanyMobileStickyHeaderProps {
  general: General;
  isVisible: boolean;
  isScrolled: boolean;
}

/**
 * CompanyMobileStickyHeader - Mobile sticky header that appears from behind the primary header
 *
 * Visual Effect: The secondary header sits behind the primary header (z-40 vs z-50).
 * When user scrolls down, the primary header slides up and reveals this header behind it,
 * creating a smooth "reveal from behind" effect.
 *
 * When user scrolls back up, the primary header slides back down and covers this header again.
 *
 * @param general - Company general information (name, ticker, etc.)
 * @param isVisible - Boolean indicating if sticky header should be visible (true when scrolling down)
 * @param isScrolled - Boolean indicating if page has been scrolled
 */
export const CompanyMobileStickyHeader = React.memo(function CompanyMobileStickyHeader({
  general,
  isVisible,
  isScrolled,
}: CompanyMobileStickyHeaderProps) {
  // Secondary header sits behind primary header (z-40 vs z-50)
  // It's always at top:0, revealed when primary slides up
  // Only render when scrolled to avoid showing on initial load
  if (!isScrolled && !isVisible) {
    return null;
  }

  return (
    <div
      className={`dark:bg-grey-800 fixed inset-x-0 top-0 z-40 flex h-16 w-full flex-col bg-white ${
        isScrolled ? 'shadow-md' : ''
      }`}
      id="company-mobile-sticky-header"
    >
      <div className="flex h-full items-center px-4">
        <div
          className="text-grey-900 dark:text-grey-100 mt-3 text-[20px] font-semibold transition-opacity duration-300"
          id="company-mobile-sticky-header-name"
        >
          {general.name}
        </div>
      </div>
      <div
        className="bg-border relative h-px w-full self-stretch transition-opacity duration-300"
        id="company-mobile-sticky-header-divider"
      />
    </div>
  );
});
