'use client';

import { TableHead, TableCell, TableRow } from 'investtech/external-components';
import { Link } from '@/components/link';
import React from 'react';

import { arrowDown, arrowUp } from '@/components/custom-components/icon';
import { Top50 } from '@/lib/types/top50';
import { getResponsiveHideClass, toKebabCase } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

import type { ColumnDefinition } from '@/app/top50/components/top50-table-types';

function getSortArrow(isActive: boolean, isDesc: boolean) {
  if (!isActive) return arrowUp();
  return isDesc ? arrowUp('active-table-head') : arrowDown('active-table-head');
}

export function Top50TableHeadCell(props: {
  col: ColumnDefinition;
  ordering: string;
  onOrdering: (key: string) => void;
  onKeyDown: (e: React.KeyboardEvent, key: string) => void;
}) {
  const { col, ordering, onOrdering, onKeyDown } = props;
  const isActive = ordering === col.key || ordering === `-${col.key}`;
  const isDesc = ordering === `-${col.key}`;
  const responsiveHideClass = getResponsiveHideClass(
    (col?.hideOn as ('mobile' | 'tablet' | 'laptop' | 'desktop')[]) || []
  );
  const sortDirection = isActive ? (isDesc ? 'descending' : 'ascending') : 'none';

  return (
    <TableHead
      id={`top50-table-head-${toKebabCase(`${col?.key}`)}`}
      key={col.key}
      onClick={() => onOrdering(col.key)}
      onKeyDown={(e) => onKeyDown(e, col.key)}
      tabIndex={0}
      aria-label={`Sort by ${col.label}`}
      aria-sort={sortDirection}
      className={`table-cell min-w-[80px] lg:min-w-[100px] ${responsiveHideClass} ${isActive ? 'active-table-head' : ''}`}
    >
      <div className={`column-header ${col.align === 'right' ? 'justify-end' : ''}`}>
        <span>{col.label}</span>
        {getSortArrow(isActive, isDesc)}
      </div>
    </TableHead>
  );
}

export function Top50TableDataRow({ top50, rowIndex }: { top50: Top50; rowIndex: number }) {
  return (
    <TableRow key={top50.ticker} showHover={false} id={`top50-table-row-${rowIndex + 1}`}>
      <TableCell
        className="company-link-button table-cell max-w-[110px] truncate sm:max-w-none sm:min-w-[100px]"
        id={`top50-table-name-${rowIndex + 1}`}
      >
        <Link href={`/company/${top50.id}`} className="whitespace-nowrap">
          {top50.name ?? '-'}
        </Link>
      </TableCell>
      <TableCell
        className={`company-link-button ${getResponsiveHideClass(['mobile'])} min-w-[60px] lg:min-w-[80px]`}
        id={`top50-table-ticker-${rowIndex + 1}`}
      >
        <Link href={`/company/${top50.id}`} className="whitespace-nowrap">
          {top50.ticker ?? '-'}
        </Link>
      </TableCell>
      <TableCell
        className="numeric-table-cell table-cell min-w-[60px] text-right lg:min-w-[80px]"
        id={`top50-table-score-${rowIndex + 1}`}
      >
        <RenderHTML html={top50.score ?? '-'} />
      </TableCell>
      <TableCell
        className="numeric-table-cell table-cell min-w-[60px] text-right lg:min-w-[80px]"
        id={`top50-table-close-${rowIndex + 1}`}
      >
        <RenderHTML html={top50.close ?? '-'} />
      </TableCell>
    </TableRow>
  );
}
