'use client';
import { Badge } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'investtech/external-components';
import { Link } from '@/components/link';
import { MarketCommentary, Statistics, StatisticsContent } from '@/lib/types/market-commentary';
import { getBadgeVariant } from '@/lib/utils';

interface StatisticsTableProps {
  data: MarketCommentary;
}

interface StatisticsTableCardProps {
  table: Statistics;
  tableIndex: number;
  getCellValue: (row: StatisticsContent, key: string) => unknown;
}

interface StatisticsTableRowProps {
  row: StatisticsContent;
  rowIndex: number;
  tableIndex: number;
  tableName: string;
  tableDefinition: Statistics['table_definition'];
  getCellValue: (row: StatisticsContent, key: string) => unknown;
}

interface StatisticsTableCellProps {
  cellValue: unknown;
  tableIndex: number;
  rowIndex: number;
  colIndex: number;
}

/**
 * Helper function to check if a cell value represents a badge
 */
function isBadgeValue(
  cellValue: unknown
): cellValue is { value: string | number; is_badge: boolean } {
  return !!(
    cellValue &&
    typeof cellValue === 'object' &&
    'is_badge' in cellValue &&
    'value' in cellValue &&
    (cellValue as { is_badge?: boolean }).is_badge
  );
}

/**
 * Helper function to get display value from cell value
 */
function getDisplayValue(cellValue: unknown): string {
  if (cellValue && typeof cellValue === 'object' && 'value' in cellValue) {
    return String((cellValue as { value: string | number }).value);
  }
  if (typeof cellValue === 'string' || typeof cellValue === 'number') {
    return String(cellValue);
  }
  return '-';
}

/**
 * StatisticsTableCell Component
 *
 * Renders a single cell in the statistics table, either as a badge or text
 */
function StatisticsTableCell({
  cellValue,
  tableIndex,
  rowIndex,
  colIndex,
}: StatisticsTableCellProps) {
  if (isBadgeValue(cellValue)) {
    return (
      <TableCell
        key={colIndex}
        className="text-right"
        id={`table-${tableIndex + 1}-badge-cell-${rowIndex + 1}`}
      >
        <Badge
          variant={getBadgeVariant(cellValue.value)}
          id={`table-${tableIndex + 1}-badge-value-${rowIndex + 1}`}
        >
          {cellValue.value}
        </Badge>
      </TableCell>
    );
  }

  const displayValue = getDisplayValue(cellValue);

  return (
    <TableCell
      key={colIndex}
      className="text-right"
      id={`table-${tableIndex + 1}-text-value-${rowIndex + 1}`}
    >
      {displayValue}
    </TableCell>
  );
}

/**
 * StatisticsTableRow Component
 *
 * Renders a single row in the statistics table
 */
function StatisticsTableRow({
  row,
  rowIndex,
  tableIndex,
  tableName,
  tableDefinition,
  getCellValue,
}: StatisticsTableRowProps) {
  return (
    <TableRow id={`${tableName}-table-row-${rowIndex + 1}`} key={rowIndex} showHover={false}>
      <TableCell
        className="company-link-button max-w-[190px] truncate xl:max-w-none"
        id={`table-${tableIndex + 1}-company-name-${rowIndex + 1}`}
      >
        <Link
          href={`/company/${row?.id}`}
          className="inline-block w-full text-left whitespace-nowrap"
          id={`table-${tableIndex + 1}-company-name-link-${rowIndex + 1}`}
        >
          {row?.name}
        </Link>
      </TableCell>
      {(tableDefinition?.slice(1) ?? []).map((column, colIndex) => {
        const cellValue = getCellValue(row, column.key);
        return (
          <StatisticsTableCell
            key={colIndex}
            cellValue={cellValue}
            tableIndex={tableIndex}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        );
      })}
    </TableRow>
  );
}

/**
 * StatisticsTableCard Component
 *
 * Renders a single statistics table card
 */
function StatisticsTableCard({ table, tableIndex, getCellValue }: StatisticsTableCardProps) {
  return (
    <Card key={tableIndex} id={`table-${tableIndex + 1}`}>
      <CardContent>
        <Table id={`statistics-table-${tableIndex + 1}`}>
          <TableHeader>
            <TableRow
              id={`statistics-table-header-${tableIndex + 1}`}
              showHover={false}
              className="border-none"
            >
              <TableCell
                colSpan={table.table_definition?.length ?? 1}
                className="mb-5 block p-0 text-lg font-semibold"
                id={`table-${tableIndex + 1}-header`}
              >
                {table?.table_name ?? ''}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table?.content && table.content.length > 0 ? (
              table.content.map((row, rowIndex) => (
                <StatisticsTableRow
                  key={rowIndex}
                  row={row}
                  rowIndex={rowIndex}
                  tableIndex={tableIndex}
                  tableName={table?.table_name ?? ''}
                  tableDefinition={table.table_definition}
                  getCellValue={getCellValue}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.table_definition?.length ?? 1} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function StatisticsTable({ data }: StatisticsTableProps) {
  const getCellValue = (row: StatisticsContent, key: string): unknown => {
    const value = row[key];
    if (!value) return '-';
    if (typeof value === 'object' && value !== null && 'value' in value) return value;
    return value;
  };

  if (!data?.statistics || data.statistics.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {data.statistics.map((table: Statistics, tableIndex: number) => (
        <StatisticsTableCard
          key={tableIndex}
          table={table}
          tableIndex={tableIndex}
          getCellValue={getCellValue}
        />
      ))}
    </div>
  );
}
