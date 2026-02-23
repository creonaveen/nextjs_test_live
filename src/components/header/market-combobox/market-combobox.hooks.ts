import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { configuration } from '@/environment/configuration';
import { useKeyboardNavigation } from '@/lib/hooks/use-keyboard-navigation';
import { useMarketIdState } from '@/lib/hooks/use-market-id';
import { getUrlWithParams } from '@/utils/navigation-utils';

import { MARKETS } from './market-combobox.types';

// hydration
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

// selected market
export function useSelectedMarket(
  hydrated: boolean,
  queryId: string | null,
  storedId: number,
  tMarkets: (key: string) => string
) {
  return useMemo(() => {
    const id = queryId
      ? Number(queryId)
      : hydrated
        ? storedId
        : Number(configuration.DEFAULT_MARKET_ID);
    const market = MARKETS.find((m) => m.marketId === id);
    if (!market) return null;
    return { ...market, label: tMarkets(market.translationKey) };
  }, [hydrated, queryId, storedId, tMarkets]);
}

// sync stored state with query
export function useMarketSyncState({
  hydrated,
  queryId,
  storedId,
  setQuery,
  setStored,
}: {
  hydrated: boolean;
  queryId: string | null;
  storedId: string;
  setQuery: (v: string) => Promise<void>;
  setStored: (v: string) => Promise<void>;
}) {
  useEffect(() => {
    if (!hydrated) return;
    if (queryId && queryId !== storedId) {
      void setStored(queryId);
    } else if (!queryId || queryId !== storedId) {
      void setQuery(storedId);
    }
  }, [hydrated, queryId, storedId, setQuery, setStored]);
}

// navigation handler
export function useMarketNavigator(
  searchParams: URLSearchParams,
  setStored: (v: string) => void,
  router: ReturnType<typeof useRouter>
) {
  return useCallback(
    (marketId: number, close: () => void) => {
      close();
      setStored(String(marketId));
      const params = new URLSearchParams(searchParams.toString());
      params.set('market_id', String(marketId));
      void router.push(getUrlWithParams(`/`, params));
    },
    [searchParams, setStored, router]
  );
}

// market combobox state and logic
export function useMarketCombobox() {
  // hooks & state
  const t = useTranslations('errors');
  const tMarkets = useTranslations('markets');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [queryId, setQuery] = useQueryState('market_id');
  const [storedId, setStored] = useMarketIdState();
  const selectedId = Number(storedId);
  const [open, setOpen] = useState(false);
  const hydrated = useHydration();

  const selectedMarket = useSelectedMarket(hydrated, queryId, selectedId, tMarkets);

  useMarketSyncState({
    hydrated,
    queryId,
    storedId,
    setQuery: async (v) => void setQuery(v),
    setStored: async (v) => void setStored(v),
  });

  const navigateMarket = useMarketNavigator(searchParams, setStored, router);

  const { selectedIndex } = useKeyboardNavigation({
    items: MARKETS,
    isOpen: open,
    onSelect: (m) => navigateMarket(m.marketId, () => setOpen(false)),
    onClose: () => setOpen(false),
    initialIndex: hydrated ? MARKETS.findIndex((m) => m.marketId === selectedId) : 0,
  });

  return {
    open,
    setOpen,
    selectedMarket,
    selectedIndex,
    hydrated,
    selectedId,
    queryId,
    navigateMarket,
    t,
    tMarkets,
  };
}
