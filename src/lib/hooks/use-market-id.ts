'use client';

import { useEffect, useState } from 'react';

import { Storage } from '@/store/local-storage';

const DEFAULT_MARKET_ID = '1';

function getInitialMarketId(): string {
  try {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlMarketId = urlParams.get('market_id');
      if (urlMarketId) {
        const currentStorageId = Storage.getMarketId();
        if (currentStorageId !== urlMarketId) {
          Storage.setMarketId(urlMarketId);
        }
        return urlMarketId;
      }
    }
    return Storage.getMarketId();
  } catch {
    return DEFAULT_MARKET_ID;
  }
}

function useUrlSyncEffect(marketId: string, setMarketId: (id: string) => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const urlMarketId = urlParams.get('market_id');
    if (urlMarketId && urlMarketId !== marketId) {
      setMarketId(urlMarketId);
    }
  }, [marketId, setMarketId]);
}

function useStorageSyncEffect(marketId: string, setMarketId: (id: string) => void) {
  useEffect(() => {
    const checkStorageChange = () => {
      try {
        const currentMarketId = Storage.getMarketId();
        if (currentMarketId !== marketId) setMarketId(currentMarketId);
      } catch {
        if (marketId !== DEFAULT_MARKET_ID) setMarketId(DEFAULT_MARKET_ID);
      }
    };
    const interval = setInterval(checkStorageChange, 100);
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'market_id') {
        setMarketId(e.newValue || Storage.getMarketId());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [marketId, setMarketId]);
}

/**
 * Custom hook that provides reactive access to the market ID from storage.
 * This hook will automatically update when the market ID changes in storage.
 */
export function useMarketId(): string {
  const [marketId, setMarketId] = useState<string>(getInitialMarketId);
  useUrlSyncEffect(marketId, setMarketId);
  useStorageSyncEffect(marketId, setMarketId);
  return marketId;
}

/**
 * Hook that provides both the current market ID and a function to update it.
 * This ensures that all components using this hook will automatically re-render
 * when the market ID changes.
 */
export function useMarketIdState(): [string, (newMarketId: string) => void] {
  const marketId = useMarketId();

  const setMarketId = (newMarketId: string) => {
    Storage.setMarketId(newMarketId);
    // The useMarketId hook will automatically detect this change
  };

  return [marketId, setMarketId];
}
