'use client';

import { Card, CardContent } from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';
import {
  InsiderTradeData,
  InsiderTradeTable,
  TableColumnDefinition,
} from '@/lib/types/todays-case';
import { getColorClass, getTableColumnHideClass } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

type HideBreakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop';

function buildHideOn(col: TableColumnDefinition): HideBreakpoint[] {
  const hideOn: HideBreakpoint[] = [];
  if (col?.hidden_on_mobile) hideOn.push('mobile');
  if (col?.hidden_on_tablet) hideOn.push('tablet');
  if (col?.hidden_on_laptop) hideOn.push('laptop');
  if (col?.hidden_on_desktop) hideOn.push('desktop');
  return hideOn;
}

function getInsiderHeaderCellClass(col: TableColumnDefinition): string {
  const key = col?.key ?? '';
  const map: Record<string, string> = {
    date: 'min-w-[80px] max-w-[100px] text-left',
    count: 'min-w-[70px] max-w-[90px] text-right',
    price: 'min-w-[70px] max-w-[90px] text-right',
    value: 'min-w-[70px] max-w-[90px] text-right',
    insider: 'min-w-[200px] text-right lg:text-center break-words whitespace-normal pl-4',
    importance: 'min-w-[90px] max-w-[110px] text-right',
  };
  return map[key] ?? '';
}

const INSIDER_CELL_BASE = 'numeric-table-cell';

function getInsiderCellContent(
  col: TableColumnDefinition,
  insider_trade: InsiderTradeData
): { content: string | number; cellContentClassName: string } {
  const key = col?.key ?? '';
  const v = insider_trade;
  const contentByKey: Record<string, () => string | number> = {
    date: () => (v && v.date) || '',
    count: () => (v && v.count) || '',
    price: () => (v && v.price) || '',
    value: () => (v && v.value) || '',
    insider: () => (v && v.insider && v.insider.value) || '',
    importance: () => (v && v.importance) || '',
  };
  const classByKey: Record<string, string> = {
    date: `${INSIDER_CELL_BASE} min-w-[80px] max-w-[100px] text-left`,
    count: `${INSIDER_CELL_BASE} min-w-[70px] max-w-[90px] text-right`,
    price: `${INSIDER_CELL_BASE} min-w-[70px] max-w-[90px] text-right`,
    value: `${INSIDER_CELL_BASE} min-w-[70px] max-w-[90px] text-right`,
    insider: `${getColorClass(v && v.insider && v.insider.sign)} whitespace-normal break-words min-w-[200px] text-right lg:text-center pl-4`,
    importance: `${INSIDER_CELL_BASE} min-w-[90px] max-w-[110px] text-right`,
  };
  const contentFn = contentByKey[key];
  const content = contentFn ? contentFn() : '';
  const cellContentClassName = classByKey[key] ?? '';
  return { content, cellContentClassName };
}

const TABLE_HEADER_CLASSES =
  'text-grey-700 dark:text-grey-200 text-[10px] font-medium tracking-wide uppercase';
const TABLE_CELL_CLASSES = 'text-grey-800 dark:text-grey-50 text-sm font-normal';

function InsiderTableHeaderRow({
  table_definition,
}: {
  table_definition: InsiderTradeTable['table_definition'];
}) {
  return (
    <TableRow
      showHover={false}
      className="dark:border-grey-750"
      id="todays-case-insider-trades-header-row"
    >
      {table_definition.map((col, index) => {
        const responsiveHideClass = getTableColumnHideClass(buildHideOn(col));
        const cellContentClassName = getInsiderHeaderCellClass(col);
        return (
          <TableHead
            key={col.key || index}
            className={`${TABLE_HEADER_CLASSES} ${responsiveHideClass} ${cellContentClassName}`}
            id={`todays-case-insider-trades-header-${col.key}`}
          >
            {col.column_name}
          </TableHead>
        );
      })}
    </TableRow>
  );
}

function InsiderTableBodyRows({
  table_definition,
  data,
}: {
  table_definition: InsiderTradeTable['table_definition'];
  data: InsiderTradeTable['data'];
}) {
  return (
    <>
      {data?.map((insider_trade, index) => (
        <TableRow
          key={index}
          showHover={false}
          className="dark:border-grey-750"
          id={`todays-case-insider-trades-row-${index + 1}`}
        >
          {table_definition.map((col, colIndex) => {
            const responsiveHideClass = getTableColumnHideClass(buildHideOn(col));
            const { content, cellContentClassName } = getInsiderCellContent(col, insider_trade);
            const cellClassName = `${TABLE_CELL_CLASSES} ${responsiveHideClass}`;
            return (
              <TableCell
                key={col.key || colIndex}
                className={`${cellClassName} ${cellContentClassName}`}
                id={`todays-case-insider-trades-cell-${index + 1}-${col.key}`}
              >
                <RenderHTML html={String(content)} />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
}

interface ChartSectionInsiderTableProps {
  insider_trade_table: InsiderTradeTable;
}

export function ChartSectionInsiderTable({ insider_trade_table }: ChartSectionInsiderTableProps) {
  return (
    <div className="overflow-x-auto" id="todays-case-insider-trades-table-wrapper">
      <Card
        className="dark:bg-grey-900 w-full overflow-hidden py-0 lg:p-5 lg:py-6 dark:mt-6"
        id="todays-case-insider-trades-card"
      >
        <CardContent
          className="px-0 lg:p-0 dark:px-6 dark:py-4 dark:lg:px-0 dark:lg:py-4"
          id="todays-case-insider-trades-content"
        >
          <Table id="todays-case-insider-trades-table">
            <TableHeader id="todays-case-insider-trades-header">
              <InsiderTableHeaderRow table_definition={insider_trade_table.table_definition} />
            </TableHeader>
            <TableBody id="todays-case-insider-trades-body">
              <InsiderTableBodyRows
                table_definition={insider_trade_table.table_definition}
                data={insider_trade_table?.data ?? []}
              />
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
