import { Link } from '@/components/link';

import { TableBody, TableCell, TableRow } from 'investtech/external-components';

import { getColorClass, getResponsiveHideClass } from '@/lib/utils';
import { Stock, StockList } from '@/lib/types/stocks';
import { RenderHTML } from '@/utils/create-mark-up';

interface StockTableRowProps {
  stock: Stock;
  index?: number;
}

interface TableBodyContentProps {
  data: StockList | undefined;
  translations: {
    noData: string;
  };
}

const NAME_CELL_CLASS =
  'company-link-button table-cell max-w-[110px] truncate sm:max-w-none sm:min-w-[100px]';
const TICKER_CELL_CLASS = `company-link-button ${getResponsiveHideClass(['mobile'])} min-w-[60px] lg:min-w-[80px]`;
const CLOSE_CELL_CLASS = 'numeric-table-cell table-cell min-w-[60px] text-right lg:min-w-[80px]';
const CHANGE_CELL_BASE_CLASS = `numeric-table-cell min-w-[60px] text-right lg:min-w-[80px] ${getResponsiveHideClass(['tablet'])}`;
const PROFIT_CELL_CLASS = 'numeric-table-cell min-w-[60px] text-right lg:min-w-[80px]';
const DATE_CELL_CLASS = `numeric-table-cell min-w-[60px] text-right lg:min-w-[80px] ${getResponsiveHideClass(['laptop'])}`;

const renderLinkCell = (content: string | undefined, href: string, className: string) => (
  <TableCell className={className}>
    <Link href={href} className="whitespace-nowrap">
      {content || '-'}
    </Link>
  </TableCell>
);

const renderHtmlCell = (html: string | undefined, className: string) => (
  <TableCell className={className}>
    <RenderHTML html={html || '-'} />
  </TableCell>
);

const renderColoredHtmlCell = (
  value: string | undefined,
  sign: string | undefined,
  baseClass: string
) => (
  <TableCell className={`${baseClass} ${getColorClass(sign ?? 0)}`}>
    <RenderHTML html={value || '-'} />
  </TableCell>
);

export function StockTableRow({ stock }: StockTableRowProps) {
  const companyHref = `/company/${stock.id}`;

  return (
    <TableRow key={stock.ticker} showHover={false}>
      {renderLinkCell(stock.name, companyHref, NAME_CELL_CLASS)}
      {renderLinkCell(stock.ticker, companyHref, TICKER_CELL_CLASS)}
      {renderHtmlCell(stock.close, CLOSE_CELL_CLASS)}
      {renderColoredHtmlCell(
        stock.change?.value,
        stock.change?.sign.toString(),
        CHANGE_CELL_BASE_CLASS
      )}
      {renderColoredHtmlCell(
        stock.profit_loss_percent?.value,
        stock.profit_loss_percent?.sign.toString(),
        PROFIT_CELL_CLASS
      )}
      <TableCell className={DATE_CELL_CLASS}>{stock.analysis_date || '-'}</TableCell>
    </TableRow>
  );
}

export function TableBodyContent({ data, translations }: TableBodyContentProps) {
  return (
    <TableBody>
      {!data?.results || data.results.length === 0 ? (
        <TableRow showHover={false}>
          <TableCell colSpan={6} className="text-grey-500 py-4 text-center">
            {translations.noData}
          </TableCell>
        </TableRow>
      ) : (
        data.results.map((stock: Stock, index: number) => (
          <StockTableRow key={stock.ticker} stock={stock} index={index} />
        ))
      )}
    </TableBody>
  );
}
