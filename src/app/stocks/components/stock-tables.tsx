'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React, { useCallback, useMemo } from 'react';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import { StockList } from '@/lib/types/stocks';
import { getLanguageFromStorage } from '@/lib/utils';
import { useGetStocksList } from '@/store/api-service/stocks-api-service';
import { StocksTableContent } from './stock-table-components';

interface StocksTableProps {
  serverData: StockList;
}

interface TableColumn {
  key: string;
  label: string;
  align: 'left' | 'right';
  hideOn?: ('mobile' | 'tablet' | 'laptop' | 'desktop')[];
}

function useStocksQueryState() {
  const [selectedAlphabeticFilter, setAlphabeticFilter] = useQueryState<string | null>(
    'alphabetic',
    {
      defaultValue: null,
      parse: (value: string) => value || null,
      serialize: (value: string | null) => value || '',
    }
  );
  const [pageFromUrl, setPageFromUrl] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
    serialize: (v: number) => String(v),
  });
  const [limitFromUrl, setLimitFromUrl] = useQueryState('limit', {
    defaultValue: 10,
    parse: Number,
    serialize: (v: number) => String(v),
  });
  const [ordering, setOrdering] = useQueryState('ordering', { defaultValue: 'name' });

  return {
    selectedAlphabeticFilter,
    setAlphabeticFilter,
    pageFromUrl,
    setPageFromUrl,
    limitFromUrl,
    setLimitFromUrl,
    ordering,
    setOrdering,
  };
}

function useStocksData(serverData: StockList, queryState: ReturnType<typeof useStocksQueryState>) {
  const { selectedAlphabeticFilter, pageFromUrl, limitFromUrl, ordering } = queryState;

  const hasActiveFilters =
    !!selectedAlphabeticFilter || ordering !== 'name' || pageFromUrl !== 1 || limitFromUrl !== 10;
  const { data: apiData, isLoading } = useGetStocksList(
    {
      page: pageFromUrl,
      limit: limitFromUrl,
      market_id: useMarketId(),
      ordering,
      alphabetic_filter: selectedAlphabeticFilter || '',
      lang: getLanguageFromStorage(),
    },
    { enabled: hasActiveFilters as boolean }
  );

  const data = hasActiveFilters ? apiData : serverData;

  return { data, isLoading, selectedAlphabeticFilter, limitFromUrl };
}

const getStocksTableColumns = (t: (key: string) => string): TableColumn[] => [
  { key: 'name', label: t('name'), align: 'left' },
  { key: 'ticker', label: 'Ticker', align: 'left', hideOn: ['mobile'] },
  { key: 'close', label: t('close'), align: 'right' },
  { key: 'change', label: t('change'), align: 'right', hideOn: ['tablet'] },
  { key: 'profit_loss_percent', label: '+/- %', align: 'right' },
  { key: 'analysis_date', label: t('analysisDate'), align: 'right', hideOn: ['laptop'] },
];

const useStocksCallbacks = (
  ordering: string,
  setters: {
    setOrdering: (value: string) => void;
    setPageFromUrl: (value: number) => void;
    setLimitFromUrl: (value: number) => void;
    setAlphabeticFilter: (value: string | null) => void;
  }
) => {
  const { setOrdering, setPageFromUrl, setLimitFromUrl, setAlphabeticFilter } = setters;
  const handleOrdering = useCallback(
    (key: string) => void setOrdering(ordering === key ? `-${key}` : key),
    [ordering, setOrdering]
  );
  const handlePageChange = useCallback(
    (page: number) => void setPageFromUrl(page),
    [setPageFromUrl]
  );
  const handleLimitChange = useCallback(
    (limit: number) => {
      void setLimitFromUrl(limit);
      void setAlphabeticFilter(null);
    },
    [setLimitFromUrl, setAlphabeticFilter]
  );
  const handleAlphabeticFilterChange = useCallback(
    (letter: string | undefined) => {
      void setAlphabeticFilter(letter ?? null);
      void setPageFromUrl(1);
    },
    [setAlphabeticFilter, setPageFromUrl]
  );

  return { handleOrdering, handlePageChange, handleLimitChange, handleAlphabeticFilterChange };
};

function StocksTable({ serverData }: StocksTableProps) {
  const t = useTranslations('common'),
    e = useTranslations('errors'),
    n = useTranslations('navigation');
  const platform = usePlatform();

  const queryState = useStocksQueryState();
  const { data, isLoading, selectedAlphabeticFilter, limitFromUrl } = useStocksData(
    serverData,
    queryState
  );

  const { handleOrdering, handlePageChange, handleLimitChange, handleAlphabeticFilterChange } =
    useStocksCallbacks(queryState.ordering, {
      setOrdering: (value) => void queryState.setOrdering(value),
      setPageFromUrl: (value) => void queryState.setPageFromUrl(value),
      setLimitFromUrl: (value) => void queryState.setLimitFromUrl(value),
      setAlphabeticFilter: (value) => void queryState.setAlphabeticFilter(value),
    });

  return (
    <div>
      <div className="page-header-table" id="page-title">
        {n('stocks')}
      </div>
      <StocksTableContent
        tableColumns={useMemo(() => getStocksTableColumns(t), [t])}
        ordering={queryState.ordering}
        handleOrdering={handleOrdering}
        isLoading={isLoading}
        data={data}
        limitFromUrl={limitFromUrl}
        platform={platform}
        alphabeticFilter={selectedAlphabeticFilter}
        handleAlphabeticFilterChange={handleAlphabeticFilterChange}
        translations={{
          noData: e('noData'),
          stocks: n('stocks'),
          alphabeticFilter: t('alphabeticFilter'),
        }}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}

export default React.memo(StocksTable);
