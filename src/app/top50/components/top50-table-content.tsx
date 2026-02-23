'use client';

import { Card, CardContent } from 'investtech/external-components';
import { TableHeader, TableRow, TableBody, TableCell, Table } from 'investtech/external-components';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { DropdownMenuComponent } from '@/components/custom-components/dropdown-menu';
import Paginator from '@/components/custom-components/paginator';
import TableSkeleton from '@/components/custom-components/table-skeleton';
import { Top50, Top50List } from '@/lib/types/top50';
import {
  type ColumnDefinition,
  type Option,
  type Top50TableContentProps,
  PAGINATION_THRESHOLD,
} from '@/app/top50/components/top50-table-types';
import { Top50TableDataRow, Top50TableHeadCell } from '@/app/top50/components/top50-table-cells';
import { useUrlValidation } from '@/app/top50/components/use-url-validation';
import { useTop50TableData } from '@/app/top50/components/use-top50-table-data';

export type { Top50TableContentProps };

function Top50PaginationSection(props: {
  data: Top50List | null | undefined;
  limitFromUrl: number;
  isLoading: boolean;
  setPageFromUrl: (v: number) => void;
  handleLimitChange: (v: number) => void;
}) {
  const { data, limitFromUrl, isLoading, setPageFromUrl, handleLimitChange } = props;
  if (!data?.results || data.count <= PAGINATION_THRESHOLD) return null;
  return (
    <div className="flex w-full justify-end">
      <Paginator
        pageParent={setPageFromUrl}
        pageSizeParent={handleLimitChange}
        pageSize={limitFromUrl}
        isAPILoad={isLoading}
        countRow={data.count}
      />
    </div>
  );
}

function Top50FiltersSection(props: {
  buyOrSell: Option | null;
  buyOrSellOptions: Option[];
  timeSpan: Option | null;
  timeSpanOptions: Option[];
  onBuyOrSellChange: (option: Option | null) => void;
  onTimeSpanChange: (option: Option | null) => void;
}) {
  const {
    buyOrSell,
    buyOrSellOptions,
    timeSpan,
    timeSpanOptions,
    onBuyOrSellChange,
    onTimeSpanChange,
  } = props;
  return (
    <div className="mb-4 flex justify-end gap-8">
      <DropdownMenuComponent
        selectedOption={
          buyOrSell
            ? (buyOrSellOptions.find((o) => o.value === buyOrSell.value) ?? buyOrSell)
            : undefined
        }
        onSelect={onBuyOrSellChange}
        options={buyOrSellOptions}
      />
      <DropdownMenuComponent
        selectedOption={
          timeSpan
            ? (timeSpanOptions.find((o) => o.value === timeSpan.value) ?? timeSpan)
            : undefined
        }
        onSelect={onTimeSpanChange}
        options={timeSpanOptions}
      />
    </div>
  );
}

function Top50TableBody(props: {
  isLoading: boolean;
  limitFromUrl: number;
  platform: string;
  data: Top50List | null | undefined;
  e: (key: string) => string;
}) {
  const { isLoading, limitFromUrl, platform, data, e } = props;
  if (isLoading) {
    return <TableSkeleton rows={limitFromUrl} columns={platform === 'mobile' ? 3 : 4} />;
  }
  if (data?.results?.length === 0) {
    return (
      <TableBody>
        <TableRow showHover={false}>
          <TableCell colSpan={6} className="text-foreground py-4 text-center">
            {e('noData')}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return (
    <TableBody>
      {data?.results?.map((top50: Top50, rowIndex: number) => (
        <Top50TableDataRow key={top50.ticker} top50={top50} rowIndex={rowIndex} />
      ))}
    </TableBody>
  );
}

function Top50TableSection(props: {
  columns: ColumnDefinition[];
  ordering: string;
  onOrdering: (key: string) => void;
  onKeyDown: (e: React.KeyboardEvent, key: string) => void;
  isLoading: boolean;
  limitFromUrl: number;
  platform: string;
  data: Top50List | null | undefined;
  e: (key: string) => string;
}) {
  const { columns, ordering, onOrdering, onKeyDown, isLoading, limitFromUrl, platform, data, e } =
    props;
  return (
    <div className="overflow-x-auto rounded-sm">
      <Card className="w-full">
        <CardContent>
          <Table className="table-auto">
            <TableHeader>
              <TableRow showHover={false}>
                {columns.map((col) => (
                  <Top50TableHeadCell
                    key={col.key}
                    col={col}
                    ordering={ordering}
                    onOrdering={onOrdering}
                    onKeyDown={onKeyDown}
                  />
                ))}
              </TableRow>
            </TableHeader>
            <Top50TableBody
              isLoading={isLoading}
              limitFromUrl={limitFromUrl}
              platform={platform}
              data={data}
              e={e}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function Top50TableContent(props: Top50TableContentProps) {
  const searchParams = useSearchParams();
  useUrlValidation({
    searchParams,
    buyOrSellOptions: props.buyOrSellOptions,
    timeSpanOptions: props.timeSpanOptions,
    defaultBuyOrSell: props.defaultBuyOrSell,
    defaultTimeSpan: props.defaultTimeSpan,
    setBuyOrSell: props.setBuyOrSell,
    setTimeSpan: props.setTimeSpan,
  });
  const h = useTop50TableData(props);

  return (
    <div>
      <div className="page-header-table" id="page-title">
        {props.n('top50')}
      </div>
      <Top50FiltersSection
        buyOrSell={props.buyOrSell}
        buyOrSellOptions={props.buyOrSellOptions}
        timeSpan={props.timeSpan}
        timeSpanOptions={props.timeSpanOptions}
        onBuyOrSellChange={h.handleBuyOrSellChange}
        onTimeSpanChange={h.handleTimeSpanChange}
      />
      <Top50TableSection
        columns={h.columns}
        ordering={props.ordering}
        onOrdering={h.handleOrdering}
        onKeyDown={h.handleKeyDown}
        isLoading={h.isLoading}
        limitFromUrl={props.limitFromUrl}
        platform={props.platform}
        data={h.data}
        e={props.e}
      />
      <Top50PaginationSection
        data={h.data}
        limitFromUrl={props.limitFromUrl}
        isLoading={h.isLoading}
        setPageFromUrl={props.setPageFromUrl}
        handleLimitChange={h.handleLimitChange}
      />
    </div>
  );
}
