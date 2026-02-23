'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import type { Option } from '@/app/top50/components/top50-table-types';

function useTop50Options(t: (key: string) => string) {
  const buyOrSellOptions: Option[] = useMemo(
    () => [
      { value: 'buy', label: t('buyCandidates') },
      { value: 'sell', label: t('sellCandidates') },
    ],
    [t]
  );
  const timeSpanOptions: Option[] = useMemo(
    () => [
      { value: 'medium', label: t('mediumTerm') },
      { value: 'long', label: t('longTerm') },
    ],
    [t]
  );
  const defaultBuyOrSell: Option = useMemo(
    () => ({ value: 'buy', label: t('buyCandidates') }),
    [t]
  );
  const defaultTimeSpan: Option = useMemo(() => ({ value: 'medium', label: t('mediumTerm') }), [t]);
  return { buyOrSellOptions, timeSpanOptions, defaultBuyOrSell, defaultTimeSpan };
}

/** Raw URL state from nuqs. Used by useTop50TableState to build options and void setters. */
function useTop50QueryState() {
  const t = useTranslations('common');
  const options = useTop50Options(t);
  const marketId = useMarketId();
  const [ordering, setOrderingRaw] = useQueryState('ordering', { defaultValue: '-score' });
  const platform = usePlatform();
  const [pageFromUrl, setPageFromUrlRaw] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
    serialize: (v: number) => String(v),
  });
  const [limitFromUrl, setLimitFromUrlRaw] = useQueryState('limit', {
    defaultValue: 50,
    parse: Number,
    serialize: (v: number) => String(v),
  });

  const [buyOrSell, setBuyOrSellRaw] = useQueryState<Option | null>('buy_or_sell', {
    defaultValue: options.defaultBuyOrSell,
    parse: (value: string | null) =>
      options.buyOrSellOptions.find((option) => option.value === value) || null,
    serialize: (value: Option | null) => value?.value ?? '',
  });
  const [timeSpan, setTimeSpanRaw] = useQueryState<Option | null>('time_span', {
    defaultValue: options.defaultTimeSpan,
    parse: (value: string | null) =>
      options.timeSpanOptions.find((option) => option.value === value) || null,
    serialize: (value: Option | null) => value?.value ?? '',
  });

  return {
    t,
    marketId,
    ordering,
    setOrderingRaw,
    platform,
    pageFromUrl,
    setPageFromUrlRaw,
    limitFromUrl,
    setLimitFromUrlRaw,
    buyOrSellOptions: options.buyOrSellOptions,
    timeSpanOptions: options.timeSpanOptions,
    defaultBuyOrSell: options.defaultBuyOrSell,
    defaultTimeSpan: options.defaultTimeSpan,
    buyOrSell,
    setBuyOrSellRaw,
    timeSpan,
    setTimeSpanRaw,
  };
}

/** Hook that provides all URL state and options for Top50Table. Setters return void for lint. */
export function useTop50TableState() {
  const raw = useTop50QueryState();
  const setBuyOrSell = (v: Option | null) => void raw.setBuyOrSellRaw(v);
  const setTimeSpan = (v: Option | null) => void raw.setTimeSpanRaw(v);
  const setOrdering = (v: string) => void raw.setOrderingRaw(v);
  const setPageFromUrl = (v: number) => void raw.setPageFromUrlRaw(v);
  const setLimitFromUrl = (v: number) => void raw.setLimitFromUrlRaw(v);

  return {
    t: raw.t,
    e: useTranslations('errors'),
    n: useTranslations('navigation'),
    marketId: raw.marketId,
    ordering: raw.ordering,
    setOrdering,
    platform: raw.platform,
    pageFromUrl: raw.pageFromUrl,
    setPageFromUrl,
    limitFromUrl: raw.limitFromUrl,
    setLimitFromUrl,
    buyOrSellOptions: raw.buyOrSellOptions,
    timeSpanOptions: raw.timeSpanOptions,
    defaultBuyOrSell: raw.defaultBuyOrSell,
    defaultTimeSpan: raw.defaultTimeSpan,
    buyOrSell: raw.buyOrSell,
    setBuyOrSell,
    timeSpan: raw.timeSpan,
    setTimeSpan,
  };
}
