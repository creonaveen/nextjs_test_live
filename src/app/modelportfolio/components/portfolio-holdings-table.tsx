import { Card, CardContent } from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';
import Image from 'next/image';

import TableSkeleton from '@/components/custom-components/table-skeleton';
import { usePlatform } from '@/lib/platform';
import { CurrentHolding, ModelPortfolio, TableColumnDefinition } from '@/lib/types/model-portfolio';
import { useTranslations } from 'next-intl';
import { getResponsiveHideClass, toKebabCase } from '@/lib/utils';

import { PortfolioHoldingsTableRow } from './portfolio-holdings-table-row';

const TABLE_HEAD_CLASS = 'table-cell lg:min-w-[80px] cursor-default';
const TITLE_CLASSES = 'text-grey-900 dark:text-grey-200 pb-4 text-lg font-semibold mb-4';

function getHoldingsHideClass(col: TableColumnDefinition): string {
  if (col?.key === 'info') {
    return col?.hidden_on_desktop === true
      ? getResponsiveHideClass(['mobile', 'tablet', 'desktop'])
      : getResponsiveHideClass(['mobile', 'tablet']);
  }
  if (col.key === 'date_entered') return getResponsiveHideClass(['mobile', 'tablet']);
  if (col.key === 'buying_price') return getResponsiveHideClass(['mobile']);
  return '';
}

export function PortfolioHoldingsTableHead({ columns }: { columns: TableColumnDefinition[] }) {
  return (
    <TableRow showHover={false}>
      {columns.map((col: TableColumnDefinition, index: number) => (
        <TableHead
          key={col.key}
          className={`${TABLE_HEAD_CLASS} ${getHoldingsHideClass(col)}`}
          id={`modelportfolio-holdings-table-head-${toKebabCase(`${col?.key}`)}`}
        >
          <div
            className={`column-header ${index === 0 ? 'justify-start' : 'justify-end'} whitespace-nowrap`}
          >
            <span>{col.column_name || ''}</span>
          </div>
        </TableHead>
      ))}
    </TableRow>
  );
}

function shouldShowOwnStocksTooltip(platform: string, content: CurrentHolding[]): boolean {
  return platform !== 'desktop' && content.some((row: CurrentHolding) => row.own_stocks === 1);
}

function getHoldingsTableState(data: ModelPortfolio) {
  const content = data?.current_holdings?.content ?? [];
  return {
    columns: data?.current_holdings?.table_definition ?? [],
    content,
    isEmpty: content.length === 0,
  };
}

interface PortfolioHoldingsTableProps {
  data: ModelPortfolio;
  isLoading: boolean;
}

function PortfolioHoldingsLoadingCard({
  data,
  columns,
}: {
  data: ModelPortfolio;
  columns: TableColumnDefinition[];
}) {
  return (
    <Card className="w-full" id="modelportfolio-holdings-card">
      <CardContent>
        <div className={TITLE_CLASSES} id="modelportfolio-holdings-heading">
          {data?.headers?.portfolio_holdings}
        </div>
        <Table className="w-full table-auto">
          <TableHeader>
            <PortfolioHoldingsTableHead columns={columns} />
          </TableHeader>
          <TableBody>
            <TableSkeleton rows={10} columns={5} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PortfolioHoldingsTooltipInfo({ ownStocksInfo }: { ownStocksInfo: string | undefined }) {
  return (
    <div
      className="text-grey-700 dark:text-grey-200 mt-3 flex w-full flex-1 items-center gap-2 text-xs font-bold"
      id="modelportfolio-holdings-own-stocks-info"
    >
      <Image
        src="logo_light.svg"
        alt="Investtech Logo"
        className="bg-grey-200 aspect-square flex-shrink-0 rounded-full p-1"
        width={16}
        height={16}
      />
      <span className="leading-snug break-words" id="modelportfolio-holdings-own-stocks-info-text">
        {ownStocksInfo}
      </span>
    </div>
  );
}

function PortfolioHoldingsTableContent({
  data,
  columns,
  content,
  isEmpty,
}: {
  data: ModelPortfolio;
  columns: TableColumnDefinition[];
  content: CurrentHolding[];
  isEmpty: boolean;
}) {
  const e = useTranslations('errors');
  return (
    <Table className="w-full table-auto">
      <TableHeader>
        <PortfolioHoldingsTableHead columns={columns} />
      </TableHeader>
      <TableBody>
        {isEmpty ? (
          <TableRow showHover={false}>
            <TableCell colSpan={5} className="text-grey-500 py-4 text-center">
              {e('noData')}
            </TableCell>
          </TableRow>
        ) : (
          content.map((row: CurrentHolding, index: number) => (
            <PortfolioHoldingsTableRow
              key={row.id}
              row={row}
              index={index}
              columns={columns}
              ownStocksInfo={data?.additional_texts?.own_stocks_info}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}

export function PortfolioHoldingsTable({ data, isLoading }: PortfolioHoldingsTableProps) {
  const platform = usePlatform();
  const { columns, content, isEmpty } = getHoldingsTableState(data);
  const showTooltipInfo = shouldShowOwnStocksTooltip(platform, content);

  if (isLoading) return <PortfolioHoldingsLoadingCard data={data} columns={columns} />;

  return (
    <Card className="w-full" id="modelportfolio-holdings-card">
      <CardContent>
        <div className={TITLE_CLASSES} id="modelportfolio-holdings-heading">
          {data?.headers?.portfolio_holdings}
        </div>
        <PortfolioHoldingsTableContent
          data={data}
          columns={columns}
          content={content}
          isEmpty={isEmpty}
        />
        {showTooltipInfo && (
          <PortfolioHoldingsTooltipInfo ownStocksInfo={data?.additional_texts?.own_stocks_info} />
        )}
      </CardContent>
    </Card>
  );
}
