'use client';

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Spinner } from './spinner';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface PaginatorProps {
  pageParent?: (page: number) => void;
  pageSize?: number;
  pageSizeParent?: (size: number) => void;
  isAPILoad?: boolean;
  countRow?: number;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const RESULT_LENGTH_OPTIONS = [5, 10, 20, 50, 80, 100];
const TEXT = 'text-grey-700 dark:text-grey-200';
const DISABLED = 'pointer-events-none text-grey-500';
const ENABLED = 'cursor-pointer';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getAvailableOptions = (size: number) =>
  size > 0 && !RESULT_LENGTH_OPTIONS.includes(size)
    ? [...RESULT_LENGTH_OPTIONS, size].sort((a, b) => a - b)
    : RESULT_LENGTH_OPTIONS;

const getRangeText = (page: number, size: number, total: number) =>
  total === 0 ? '0 - 0' : `${(page - 1) * size + 1} - ${Math.min(page * size, total)}`;

/* -------------------------------------------------------------------------- */
/* Sub Components                                                             */
/* -------------------------------------------------------------------------- */

function RowsPerPage({
  value,
  options,
  onChange,
}: {
  value: number;
  options: number[];
  onChange: (v: string) => void;
}) {
  const t = useTranslations('common');

  return (
    <div className="flex items-center gap-1">
      <span className={`text-xs ${TEXT}`}>{t('rowsPerPage')}</span>
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger className="h-8 w-[70px] px-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={String(o)} className="cursor-pointer">
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PaginationNav({
  page,
  total,
  loading,
  onChange,
}: {
  page: number;
  total: number;
  loading?: boolean;
  onChange: (p: number) => void;
}) {
  const cls = (disabled: boolean) => `${TEXT} ${disabled ? DISABLED : ENABLED}`;

  return (
    <>
      <PaginationItem>
        <PaginationFirst
          className={cls(page === 1)}
          aria-disabled={page === 1}
          onClick={() => onChange(1)}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious
          className={cls(page === 1)}
          aria-disabled={page === 1}
          onClick={() => onChange(page - 1)}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext
          className={cls(page === total)}
          aria-disabled={page === total}
          onClick={() => onChange(page + 1)}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLast
          className={cls(page === total)}
          aria-disabled={page === total}
          onClick={() => onChange(total)}
        />
      </PaginationItem>
      {loading && (
        <PaginationItem>
          <Spinner />
        </PaginationItem>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

// Hook for pagination state management
function usePaginationState(
  pageSize: number,
  countRow: number,
  pageParent?: (page: number) => void,
  pageSizeParent?: (size: number) => void
) {
  const [page, setPage] = useQueryState('page', { defaultValue: 1, parse: Number });
  const [size, setSize] = useQueryState('limit', { defaultValue: pageSize, parse: Number });
  const [total, setTotal] = useState(1);

  useEffect(() => {
    setTotal(Math.max(1, Math.ceil(countRow / size)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [countRow, size, page]);

  const handlePageChange = useCallback(
    (p: number) => {
      const next = Math.min(Math.max(p, 1), total);
      setPage(next).catch(() => {});
      pageParent?.(next);
    },
    [pageParent, setPage, total]
  );

  const handleSizeChange = useCallback(
    (v: string) => {
      const next = Number(v);
      setSize(next).catch(() => {});
      setPage(1).catch(() => {});
      pageSizeParent?.(next);
      pageParent?.(1);
    },
    [pageParent, pageSizeParent, setPage, setSize]
  );

  return { page, size, total, handlePageChange, handleSizeChange };
}

function Paginator({
  pageParent,
  pageSize = 20,
  pageSizeParent,
  isAPILoad = false,
  countRow = 0,
}: PaginatorProps) {
  const t = useTranslations('common');
  const { page, size, total, handlePageChange, handleSizeChange } = usePaginationState(
    pageSize,
    countRow,
    pageParent,
    pageSizeParent
  );
  const options = useMemo(() => getAvailableOptions(size), [size]);

  return (
    <div className="mt-4 flex w-full flex-col items-end justify-end gap-2 md:flex-row md:gap-4">
      <RowsPerPage value={size} options={options} onChange={handleSizeChange} />
      <Pagination>
        <PaginationContent className="flex items-center gap-2">
          <PaginationItem>
            <span className={`text-xs ${TEXT}`}>
              {getRangeText(page, size, countRow)} {t('of')} {countRow}
            </span>
          </PaginationItem>
          <PaginationNav
            page={page}
            total={total}
            loading={isAPILoad}
            onChange={handlePageChange}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Paginator;
