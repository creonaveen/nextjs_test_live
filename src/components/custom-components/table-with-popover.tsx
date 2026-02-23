'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';

import { CorrelationAnalysisSection } from '@/lib/types/health-check';
import { getCorrelationAnalysisColors } from '@/lib/utils';

import { TableCellTooltip } from './table-cell-tooltip';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface Props {
  data: CorrelationAnalysisSection;
}

interface Category {
  category_id: number;
  color_bg: string;
  color_text: string;
  color_class: string;
}

type CellKey = `c${number}`;
type RowKey = `l${number}`;

type Matrix<T> = Record<RowKey, Record<CellKey, T>>;

interface CorrelationTable {
  column_headers: Record<string, string>;
  cell_content: Matrix<string>;
  cell_tooltip?: Matrix<string>;
  cell_category?: Matrix<number | null>;
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getCategoryStyle(
  categoryId: number | null,
  categories: Category[]
): React.CSSProperties {
  if (categoryId === null) return {};

  const cat = categories.find((c) => c.category_id === categoryId);
  if (!cat) return {};

  const colorClass = getCorrelationAnalysisColors(cat.color_class);

  return {
    backgroundColor: colorClass.backgroundColor,
    color: colorClass.textColor,
  };
}

/* ------------------------------------------------------------------ */
/* Cell component                                                      */
/* ------------------------------------------------------------------ */

interface MatrixCellProps {
  cellKey: CellKey;
  value: string;
  tooltip?: string;
  categoryId?: number | null;
  categories: Category[];
}

function MatrixCell({ cellKey, value, tooltip, categoryId, categories }: MatrixCellProps) {
  const style = getCategoryStyle(categoryId ?? null, categories);

  return (
    <TableCell
      key={cellKey}
      className={`h-[38px] w-[56px] max-w-[56px] min-w-[56px] p-px text-xs font-normal ${
        cellKey === 'c0'
          ? 'bg-card sticky left-0 z-30 text-left will-change-transform'
          : 'text-center'
      }`}
    >
      {value && (
        <div
          className={`flex h-full items-center ${
            cellKey === 'c0' ? 'justify-start' : 'justify-center'
          }`}
        >
          <TableCellTooltip value={value} tooltip={tooltip} style={style} />
        </div>
      )}
    </TableCell>
  );
}

/* ------------------------------------------------------------------ */
/* Row component                                                       */
/* ------------------------------------------------------------------ */

interface MatrixRowProps {
  rowKey: RowKey;
  table: CorrelationTable;
  categories: Category[];
}

function MatrixRow({ rowKey, table, categories }: MatrixRowProps) {
  return (
    <TableRow key={rowKey} showHover={false} className="border-none">
      {(Object.keys(table.cell_content[rowKey]) as CellKey[]).map((cellKey) => (
        <MatrixCell
          key={cellKey}
          cellKey={cellKey}
          value={table.cell_content[rowKey][cellKey]}
          tooltip={table.cell_tooltip?.[rowKey]?.[cellKey]}
          categoryId={table.cell_category?.[rowKey]?.[cellKey]}
          categories={categories}
        />
      ))}
    </TableRow>
  );
}

/* ------------------------------------------------------------------ */
/* Main component (lint-safe)                                          */
/* ------------------------------------------------------------------ */

export function CorrelationMatrix({ data }: Props) {
  const table = data.correlation_table as CorrelationTable;
  const categories = data.categories as unknown as Category[];

  const columnHeaders = Object.values(table.column_headers);
  const rows = Object.keys(table.cell_content) as RowKey[];

  return (
    <div className="relative space-y-4 overflow-x-auto">
      <Table className="w-max table-fixed border-collapse [&_td]:border-0 [&_th]:border-0 [&_tr]:border-0">
        <TableHeader>
          <TableRow showHover={false} className="border-none">
            {columnHeaders.map((header, i) => (
              <TableHead
                key={i}
                className={`text-grey-900 w-[56px] max-w-[56px] min-w-[56px] p-px text-center text-xs font-normal ${
                  i === 0 ? 'bg-card sticky left-0 z-30 lowercase will-change-transform' : ''
                }`}
              >
                <div
                  className={`flex h-[38px] items-center overflow-hidden ${
                    i === 0 ? 'justify-start' : 'justify-center'
                  }`}
                >
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                    {header}
                  </span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((rowKey) => (
            <MatrixRow key={rowKey} rowKey={rowKey} table={table} categories={categories} />
          ))}
        </TableBody>
      </Table>

      {table.caption && <div className="mb-2 w-full text-sm font-semibold">{table.caption}</div>}
    </div>
  );
}
