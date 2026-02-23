'use client';

import { Card, CardContent } from 'investtech/external-components';
import { Table, TableHeader } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React, { useCallback, useMemo } from 'react';

import TableSkeleton from '@/components/custom-components/table-skeleton';
import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';
import { IndicesList } from '@/lib/types/indices';
import { getLanguageFromStorage } from '@/lib/utils';
import { useGetIndicesList } from '@/store/api-service/indices-api-service';

import { IndicesPaginator, TableBodyContent, TableHeaderRow } from './indices-table-components';

interface IndicesTableProps {
  serverData: IndicesList;
}

interface TableColumn {
  key: string;
  label: string;
  align: 'left' | 'right';
  hideOn?: ('mobile' | 'tablet' | 'laptop' | 'desktop')[];
}

interface IndicesTableContentProps {
  tableColumns: TableColumn[];
  ordering: string;
  handleOrdering: (key: string) => void;
  isLoading: boolean;
  data: IndicesList | undefined;
  limitFromUrl: number;
  platform: string;
  translations: {
    noData: string;
    indices: string;
  };
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

function IndicesTableContent({
  tableColumns,
  ordering,
  handleOrdering,
  isLoading,
  data,
  limitFromUrl,
  platform,
  translations,
  onPageChange,
  onLimitChange,
}: IndicesTableContentProps) {
  return (
    <div>
      <div className="overflow-x-auto rounded-sm">
        <Card className="w-full">
          <CardContent>
            <Table className="w-full table-auto" aria-label={translations.indices}>
              <TableHeader>
                <TableHeaderRow
                  columns={tableColumns}
                  ordering={ordering}
                  onOrderingChange={handleOrdering}
                />
              </TableHeader>

              {isLoading ? (
                <TableSkeleton
                  rows={limitFromUrl}
                  columns={platform === 'mobile' ? 3 : platform === 'tablet' ? 5 : 6}
                />
              ) : (
                <TableBodyContent data={data} translations={{ noData: translations.noData }} />
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
      <IndicesPaginator
        data={data}
        isLoading={isLoading}
        limitFromUrl={limitFromUrl}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}

function useIndicesQueryState() {
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

  return { pageFromUrl, setPageFromUrl, limitFromUrl, setLimitFromUrl, ordering, setOrdering };
}

const getTableColumns = (t: (key: string) => string): TableColumn[] => [
  { key: 'name', label: t('name'), align: 'left' },
  { key: 'ticker', label: 'Ticker', align: 'left', hideOn: ['mobile'] },
  { key: 'close', label: t('close'), align: 'right' },
  { key: 'change', label: t('change'), align: 'right', hideOn: ['tablet'] },
  { key: 'profit_loss_percent', label: '+/- %', align: 'right' },
  { key: 'analysis_date', label: t('analysisDate'), align: 'right', hideOn: ['laptop'] },
];

const useIndicesCallbacks = (
  ordering: string,
  setOrdering: (value: string) => void,
  setPageFromUrl: (value: number) => void,
  setLimitFromUrl: (value: number) => void
) => {
  const handleOrdering = useCallback(
    (key: string) => void setOrdering(ordering === key ? `-${key}` : key),
    [ordering, setOrdering]
  );
  const handlePageChange = useCallback(
    (page: number) => void setPageFromUrl(page),
    [setPageFromUrl]
  );
  const handleLimitChange = useCallback(
    (limit: number) => void setLimitFromUrl(limit),
    [setLimitFromUrl]
  );

  return { handleOrdering, handlePageChange, handleLimitChange };
};

function IndicesTable({ serverData }: IndicesTableProps) {
  const t = useTranslations('common'),
    e = useTranslations('errors'),
    n = useTranslations('navigation');
  const marketId = useMarketId(),
    platform = usePlatform();

  const { pageFromUrl, setPageFromUrl, limitFromUrl, setLimitFromUrl, ordering, setOrdering } =
    useIndicesQueryState();

  const hasActiveFilters = ordering !== 'name' || pageFromUrl !== 1 || limitFromUrl !== 10;
  const { data: apiData, isLoading } = useGetIndicesList(
    {
      page: pageFromUrl,
      limit: limitFromUrl,
      market_id: marketId,
      ordering,
      lang: getLanguageFromStorage(),
    },
    { enabled: hasActiveFilters }
  );

  const data = hasActiveFilters ? apiData : serverData;
  const { handleOrdering, handlePageChange, handleLimitChange } = useIndicesCallbacks(
    ordering,
    (value) => void setOrdering(value),
    (value) => void setPageFromUrl(value),
    (value) => void setLimitFromUrl(value)
  );

  const tableColumns = useMemo(() => getTableColumns(t), [t]);

  return (
    <div>
      <div className="page-header-table" id="page-title">
        {n('indices')}
      </div>
      <IndicesTableContent
        tableColumns={tableColumns}
        ordering={ordering}
        handleOrdering={handleOrdering}
        isLoading={isLoading}
        data={data}
        limitFromUrl={limitFromUrl}
        platform={platform}
        translations={{ noData: e('noData'), indices: n('indices') }}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}

export default React.memo(IndicesTable);
