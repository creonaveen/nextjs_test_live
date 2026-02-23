'use client';
import React from 'react';
import { TableCell, TableRow } from 'investtech/external-components';
import { TableRowData } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';

export function getPerformanceTableRowCells(
  row: TableRowData | { name?: string; value?: string }
): [string | unknown, string | unknown] {
  if (Array.isArray(row)) return [row[0] || '-', row[1] || '-'];
  if (row && typeof row === 'object' && 'name' in row && 'value' in row) {
    return [row.name ?? '-', row.value ?? '-'];
  }
  return ['-', '-'];
}

export function renderPerformanceTableRow(
  row: TableRowData | { name?: string; value?: string },
  rowIndex: number,
  index: number
) {
  const [name, value] = getPerformanceTableRowCells(row);
  return (
    <TableRow
      key={rowIndex}
      id={`research-page-performance-table-row-${index + 1}-${rowIndex + 1}`}
    >
      <TableCell className="font-medium">
        {typeof name === 'string' ? <RenderHTML html={name} /> : <span>{String(name)}</span>}
      </TableCell>
      <TableCell>
        {typeof value === 'string' ? <RenderHTML html={value} /> : <span>{String(value)}</span>}
      </TableCell>
    </TableRow>
  );
}
