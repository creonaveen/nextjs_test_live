'use client';

import React, { useMemo } from 'react';

import { getLanguageFromStorage } from '@/lib/utils';
import { useGetTop50List } from '@/store/api-service/top50-api-service';

import type {
  ColumnDefinition,
  Option,
  Top50TableContentProps,
} from '@/app/top50/components/top50-table-types';

function hasActiveFilters(p: Top50TableContentProps): boolean {
  return !!(
    p.buyOrSell ||
    p.timeSpan ||
    p.ordering !== '-score' ||
    p.pageFromUrl !== 1 ||
    p.limitFromUrl !== 50
  );
}

function orderingForBuyOrSell(value: string): string {
  return value === 'buy' ? '-score' : 'score';
}

export function getColumns(t: (key: string) => string): ColumnDefinition[] {
  return [
    { key: 'name', label: t('name'), align: 'left' },
    { key: 'ticker', label: 'Ticker', align: 'left', hideOn: ['mobile'] },
    { key: 'score', label: t('score'), align: 'right' },
    { key: 'close', label: t('close'), align: 'right' },
  ];
}

export function useTop50TableData(props: Top50TableContentProps) {
  const active = hasActiveFilters(props);
  const { data: apiData, isLoading } = useGetTop50List(
    {
      page: props.pageFromUrl,
      limit: props.limitFromUrl,
      market_id: props.marketId,
      ordering: props.ordering,
      buyOrSell: props.buyOrSell?.value,
      timespan: props.timeSpan?.value,
      lang: getLanguageFromStorage(),
    },
    { enabled: active }
  );
  const data = active ? apiData : props.serverData;
  const columns = useMemo(() => getColumns(props.t), [props.t]);
  const handleOrdering = (key: string) =>
    props.setOrdering(props.ordering === key ? '-' + String(key) : String(key));
  const handleKeyDown = (event: React.KeyboardEvent, key: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOrdering(key);
    }
  };
  const handleLimitChange = (newLimit: number) => {
    props.setLimitFromUrl(newLimit);
    props.setBuyOrSell(null);
    props.setTimeSpan(null);
    props.setOrdering('-score');
  };
  const handleBuyOrSellChange = (option: Option | null) => {
    props.setBuyOrSell(option);
    props.setPageFromUrl(1);
    if (option?.value) props.setOrdering(orderingForBuyOrSell(option.value));
  };
  const handleTimeSpanChange = (option: Option | null) => {
    props.setTimeSpan(option);
    props.setPageFromUrl(1);
  };
  return {
    data,
    isLoading,
    columns,
    handleOrdering,
    handleKeyDown,
    handleLimitChange,
    handleBuyOrSellChange,
    handleTimeSpanChange,
  };
}
