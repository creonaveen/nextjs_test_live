import { Badge } from 'investtech/external-components';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/components/link';

import TableSkeleton from '@/components/custom-components/table-skeleton';
import { usePlatform } from '@/lib/platform';
import { LatestSale, ModelPortfolio, TableColumnDefinition } from '@/lib/types/model-portfolio';
import { getBadgeVariant, toKebabCase } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

interface MostRecentSaleProps {
  data: ModelPortfolio;
  isLoading: boolean;
}

function MostRecentSaleTableHead({ columns }: { columns: TableColumnDefinition[] }) {
  return (
    <TableRow showHover={false}>
      {columns.map((col: TableColumnDefinition, index: number) => {
        const alignClass =
          index === 0 ? 'justify-start' : col.key === 'date_out' ? 'justify-center' : 'justify-end';
        return (
          <TableHead
            id={`most-recent-sale-table-head-${toKebabCase(`${col?.key}`)}`}
            key={col.key}
            className={`table-cell min-w-[80px] cursor-default lg:min-w-[100px] ${col.key === 'date_out' ? 'hidden md:table-cell' : ''}`}
          >
            <div className={`column-header whitespace-nowrap ${alignClass}`}>
              <span>{col.column_name || ''}</span>
            </div>
          </TableHead>
        );
      })}
    </TableRow>
  );
}

function MostRecentSaleNameCell({
  latestSale,
  index,
  ownStocksInfo,
}: {
  latestSale: LatestSale;
  index: number;
  ownStocksInfo: string | undefined;
}) {
  return (
    <TableCell
      className="company-link-button table-cell min-w-[80px] lg:min-w-[100px]"
      id={`most-recent-sale-table-name-${index + 1}`}
    >
      <div
        className="flex min-w-0 items-center gap-2"
        id={`most-recent-sale-table-name-container-${index + 1}`}
      >
        <Link
          href={`/company/${latestSale?.id}`}
          className="truncate whitespace-nowrap"
          aria-label={`View details for ${latestSale?.name || 'company'}`}
          id={`most-recent-sale-table-name-link-${index + 1}`}
        >
          {latestSale?.name}
        </Link>
        {latestSale?.own_stocks === 1 && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild id={`most-recent-sale-table-tooltip-${index + 1}`}>
                <Image
                  src="logo_light.svg"
                  alt="Investtech Logo"
                  className="bg-grey-200 aspect-square rounded-full p-1"
                  width={16}
                  height={16}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {ownStocksInfo}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </TableCell>
  );
}

function MostRecentSaleTableRow({
  latestSale,
  index,
  ownStocksInfo,
}: {
  latestSale: LatestSale;
  index: number;
  ownStocksInfo: string | undefined;
}) {
  return (
    <TableRow key={latestSale.id} showHover={false} id={`most-recent-table-row-${index + 1}`}>
      <MostRecentSaleNameCell latestSale={latestSale} index={index} ownStocksInfo={ownStocksInfo} />
      <TableCell
        className="numeric-table-cell hidden min-w-[60px] text-center md:table-cell lg:min-w-[80px]"
        id={`most-recent-sale-table-date-out-${index + 1}`}
      >
        {latestSale.date_out}
      </TableCell>
      <TableCell
        className="numeric-table-cell table-cell min-w-[60px] text-right lg:min-w-[80px]"
        id={`most-recent-sale-table-profit-loss-percent-${index + 1}`}
      >
        <Badge
          size="small"
          variant={getBadgeVariant(latestSale.profit_loss_percent?.sign)}
          className="numeric-table-cell"
          id={`most-recent-sale-table-profit-loss-percent-badge-${index + 1}`}
        >
          {latestSale.profit_loss_percent?.value ? (
            <RenderHTML html={String(latestSale.profit_loss_percent.value)} />
          ) : (
            <span>-</span>
          )}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

function MostRecentSaleTableLoading({ columns }: { columns: TableColumnDefinition[] }) {
  return (
    <Table className="w-full table-auto">
      <TableHeader>
        <MostRecentSaleTableHead columns={columns} />
      </TableHeader>
      <TableBody>
        <TableSkeleton rows={5} columns={3} />
      </TableBody>
    </Table>
  );
}

function MostRecentSaleTableBody({
  isLoading,
  isEmpty,
  content,
  data,
}: {
  isLoading: boolean;
  isEmpty: boolean;
  content: LatestSale[];
  data: ModelPortfolio;
}) {
  const e = useTranslations('errors');
  const columns = data?.latest_sales?.table_definition ?? [];
  if (isLoading) return <MostRecentSaleTableLoading columns={columns} />;
  return (
    <Table className="w-full table-auto">
      <TableHeader>
        <MostRecentSaleTableHead columns={columns} />
      </TableHeader>
      <TableBody>
        {isEmpty ? (
          <TableRow showHover={false}>
            <TableCell colSpan={3} className="text-foreground py-4 text-center">
              {e('noData')}
            </TableCell>
          </TableRow>
        ) : (
          content.map((latestSale: LatestSale, index: number) => (
            <MostRecentSaleTableRow
              key={latestSale.id}
              latestSale={latestSale}
              index={index}
              ownStocksInfo={data?.additional_texts?.own_stocks_info}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}

function MostRecentSaleTooltipInfo({ ownStocksInfo }: { ownStocksInfo: string | undefined }) {
  return (
    <div
      className="text-grey-700 dark:text-grey-200 mt-3 flex w-full flex-1 items-center gap-2 text-xs font-bold"
      id="most-recent-sale-tooltip-info"
    >
      <Image
        src="logo_light.svg"
        alt="Investtech Logo"
        className="bg-grey-200 aspect-square flex-shrink-0 rounded-full p-1"
        width={16}
        height={16}
      />
      <span className="leading-snug break-words">{ownStocksInfo}</span>
    </div>
  );
}

/**
 * Component for displaying the most recent sales table
 *
 * @param data - Model portfolio data containing latest sales information
 * @param isLoading - Whether data is currently loading
 */
export default function MostRecentSale({ data, isLoading }: MostRecentSaleProps) {
  const platform = usePlatform();
  const content = data?.latest_sales?.content ?? [];
  const isEmpty = content.length === 0;
  const showTooltipInfo =
    platform !== 'desktop' && content.some((s: LatestSale) => s.own_stocks === 1);

  return (
    <div className="flex flex-col rounded-sm">
      <div className="rounded-sm">
        <Card className="w-full" id="most-recent-sale-card">
          <CardContent>
            <div className="pb-4 text-lg font-semibold" id="most-recent-sale-heading">
              {data?.headers?.most_recent_sales}
            </div>
            <MostRecentSaleTableBody
              isLoading={isLoading}
              isEmpty={isEmpty}
              content={content}
              data={data}
            />
            {showTooltipInfo && (
              <MostRecentSaleTooltipInfo ownStocksInfo={data?.additional_texts?.own_stocks_info} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
