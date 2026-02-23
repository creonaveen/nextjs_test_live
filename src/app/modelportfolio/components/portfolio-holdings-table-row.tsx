import { Badge } from 'investtech/external-components';
import { TableCell, TableRow } from 'investtech/external-components';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'investtech/external-components';
import Image from 'next/image';
import { Link } from '@/components/link';

import { CurrentHolding, TableColumnDefinition } from '@/lib/types/model-portfolio';
import { getBadgeVariant, getResponsiveHideClass } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

const TABLE_CELL_CLASS = 'table-cell numeric-table-cell text-right lg:min-w-[80px]';

function OwnStocksTooltip({
  index,
  ownStocksInfo,
}: {
  index: number;
  ownStocksInfo: string | undefined;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild id={`modelportfolio-holdings-tooltip-${index + 1}`}>
          <Image
            src="logo_light.svg"
            alt="Investtech Logo"
            className="bg-grey-200 aspect-square rounded-full p-1"
            width={16}
            height={16}
          />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="text-xs"
          id={`modelportfolio-holdings-tooltip-content-${index + 1}`}
        >
          {ownStocksInfo}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function HoldingsNameCell({
  row,
  index,
  ownStocksInfo,
}: {
  row: CurrentHolding;
  index: number;
  ownStocksInfo: string | undefined;
}) {
  return (
    <TableCell
      className="company-link-button table-cell max-w-[80px] truncate px-0 md:min-w-[100px]"
      id={`modelportfolio-holdings-stock-name-${index + 1}`}
    >
      <div
        className="flex min-w-0 items-center gap-2"
        id={`modelportfolio-holdings-stock-name-container-${index + 1}`}
      >
        <Link
          href={`/company/${row?.id}`}
          className="truncate whitespace-nowrap"
          aria-label={`View details for ${row?.name || 'company'}`}
          id={`modelportfolio-holdings-stock-name-link-${index + 1}`}
        >
          {row?.name ?? '-'}
        </Link>
        {row?.own_stocks === 1 && <OwnStocksTooltip index={index} ownStocksInfo={ownStocksInfo} />}
      </div>
    </TableCell>
  );
}

function HoldingsInfoDatePriceCells({
  row,
  index,
  showInfoCol,
}: {
  row: CurrentHolding;
  index: number;
  showInfoCol: boolean;
}) {
  return (
    <>
      {showInfoCol && (
        <TableCell
          className={`${TABLE_CELL_CLASS} ${getResponsiveHideClass(['mobile', 'tablet'])}`}
          id={`modelportfolio-holdings-info-${index + 1}`}
        >
          {row.info ?? '-'}
        </TableCell>
      )}
      <TableCell
        className={`${TABLE_CELL_CLASS} ${getResponsiveHideClass(['mobile', 'tablet'])}`}
        id={`modelportfolio-holdings-date-entered-${index + 1}`}
      >
        {row.date_entered ?? '-'}
      </TableCell>
      <TableCell
        className={`${TABLE_CELL_CLASS} ${getResponsiveHideClass(['mobile'])}`}
        id={`modelportfolio-holdings-buying-price-${index + 1}`}
      >
        {row.buying_price ? <RenderHTML html={String(row.buying_price)} /> : <span>-</span>}
      </TableCell>
    </>
  );
}

function HoldingsCloseProfitCells({ row, index }: { row: CurrentHolding; index: number }) {
  return (
    <>
      <TableCell className={TABLE_CELL_CLASS} id={`modelportfolio-holdings-close-${index + 1}`}>
        {row.close ? <RenderHTML html={String(row.close)} /> : <span>-</span>}
      </TableCell>
      <TableCell
        className={TABLE_CELL_CLASS}
        id={`modelportfolio-holdings-profit-loss-percent-${index + 1}`}
      >
        <Badge
          size="small"
          variant={getBadgeVariant(row.profit_loss_percent?.sign)}
          className="whitespace-nowrap"
          id={`modelportfolio-holdings-profit-loss-percent-badge-${index + 1}`}
        >
          {row.profit_loss_percent?.value ? (
            <RenderHTML html={String(row.profit_loss_percent.value)} />
          ) : (
            <span>-</span>
          )}
        </Badge>
      </TableCell>
    </>
  );
}

function HoldingsDataCells({
  row,
  index,
  showInfoCol,
}: {
  row: CurrentHolding;
  index: number;
  showInfoCol: boolean;
}) {
  return (
    <>
      <HoldingsInfoDatePriceCells row={row} index={index} showInfoCol={showInfoCol} />
      <HoldingsCloseProfitCells row={row} index={index} />
    </>
  );
}

export function PortfolioHoldingsTableRow({
  row: modelPortfolio,
  index,
  columns,
  ownStocksInfo,
}: {
  row: CurrentHolding;
  index: number;
  columns: TableColumnDefinition[];
  ownStocksInfo: string | undefined;
}) {
  const showInfoCol = columns.some((col) => col.key === 'info' && col.hidden_on_desktop !== true);
  return (
    <TableRow
      key={modelPortfolio.id}
      showHover={false}
      id={`modelportfolio-holdings-table-row-${index + 1}`}
    >
      <HoldingsNameCell row={modelPortfolio} index={index} ownStocksInfo={ownStocksInfo} />
      <HoldingsDataCells row={modelPortfolio} index={index} showInfoCol={showInfoCol} />
    </TableRow>
  );
}
