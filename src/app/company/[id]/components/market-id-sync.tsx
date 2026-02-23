'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { Storage } from '@/store/local-storage';
import { getUrlWithParams } from '@/utils/navigation-utils';

/**
 * Component that syncs market_id from URL to local storage
 * This works in conjunction with proxy which handles server-side cookie updates
 * Redirects to not-found page if user manually changes URL market_id and it doesn't match company's market_id
 * Note: Programmatic market changes (from dropdown) are handled by MarketCombobox component
 */
export function MarketIdSync({
  companyMarketId,
  onSyncComplete,
}: {
  companyMarketId?: string;
  onSyncComplete?: () => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const previousMarketIdRef = useRef<string | null>(null);
  const hasCheckedInitialMountRef = useRef(false);

  useEffect(() => {
    // Extract market_id from URL (supports both market_id and marketId)
    const marketIdFromUrl = searchParams.get('market_id') || searchParams.get('marketId');

    // Check if we're still on a company page route
    const isOnCompanyPage = pathname?.includes('/company/');

    if (marketIdFromUrl) {
      // Initialize ref on first mount
      if (!hasCheckedInitialMountRef.current) {
        previousMarketIdRef.current = marketIdFromUrl;
        hasCheckedInitialMountRef.current = true;

        // On initial mount, check if market_id doesn't match company's market_id
        // This handles the case where user manually changed URL and page reloaded
        if (isOnCompanyPage && companyMarketId && marketIdFromUrl !== companyMarketId) {
          router.push(getUrlWithParams(`/not-found`, searchParams));
          return;
        }
      }

      // Update previous market_id reference
      previousMarketIdRef.current = marketIdFromUrl;

      const currentMarketId = Storage.getMarketId();

      // Update local storage if different
      if (currentMarketId !== marketIdFromUrl) {
        Storage.setMarketId(marketIdFromUrl);
      }
    } else {
      // No market_id in URL, reset the ref
      previousMarketIdRef.current = null;
    }

    // Notify that sync is complete
    onSyncComplete?.();
  }, [searchParams, companyMarketId, pathname, router, onSyncComplete]);

  return null;
}
