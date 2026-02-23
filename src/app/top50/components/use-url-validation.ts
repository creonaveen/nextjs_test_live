'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import type { Option } from '@/app/top50/components/top50-table-types';

/** Validates URL params for buy_or_sell and time_span and resets to defaults if invalid. */
export function useUrlValidation(props: {
  searchParams: ReturnType<typeof useSearchParams>;
  buyOrSellOptions: Option[];
  timeSpanOptions: Option[];
  defaultBuyOrSell: Option;
  defaultTimeSpan: Option;
  setBuyOrSell: (v: Option | null) => void;
  setTimeSpan: (v: Option | null) => void;
}) {
  const isValidatingRef = useRef(false);
  const {
    searchParams,
    buyOrSellOptions,
    timeSpanOptions,
    defaultBuyOrSell,
    defaultTimeSpan,
    setBuyOrSell,
    setTimeSpan,
  } = props;

  useEffect(() => {
    if (isValidatingRef.current) return;
    const urlBuyOrSell = searchParams?.get('buy_or_sell');
    const urlTimeSpan = searchParams?.get('time_span');
    let needsUpdate = false;
    if (urlBuyOrSell && !buyOrSellOptions.some((o) => o.value === urlBuyOrSell)) {
      isValidatingRef.current = true;
      setBuyOrSell(defaultBuyOrSell);
      needsUpdate = true;
    }
    if (urlTimeSpan && !timeSpanOptions.some((o) => o.value === urlTimeSpan)) {
      isValidatingRef.current = true;
      setTimeSpan(defaultTimeSpan);
      needsUpdate = true;
    }
    if (needsUpdate)
      setTimeout(() => {
        isValidatingRef.current = false;
      }, 100);
  }, [
    searchParams,
    setBuyOrSell,
    setTimeSpan,
    defaultBuyOrSell,
    defaultTimeSpan,
    buyOrSellOptions,
    timeSpanOptions,
  ]);
}
