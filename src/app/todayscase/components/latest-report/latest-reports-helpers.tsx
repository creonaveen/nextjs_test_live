import { LatestReportData, TableColumnDefinition } from '@/lib/types/todays-case';
import { getBadgeVariant, getTableColumnHideClass, toKebabCase } from '@/lib/utils';
import { Badge } from 'investtech/external-components';
import type { ReactNode } from 'react';

type HideBreakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export function sortLatestReportsTableDefinition(
  tableDefinition: TableColumnDefinition[]
): TableColumnDefinition[] {
  const dateKeys = ['date', 'date_short'];
  return [...tableDefinition].sort((a, b) => {
    const aIsDate = dateKeys.includes(a.key);
    const bIsDate = dateKeys.includes(b.key);
    if (aIsDate && !bIsDate) return -1;
    if (!aIsDate && bIsDate) return 1;
    return 0;
  });
}

export function buildHideOn(col: TableColumnDefinition): HideBreakpoint[] {
  const hideOn: HideBreakpoint[] = [];
  if (col?.hidden_on_mobile) hideOn.push('mobile');
  if (col?.hidden_on_tablet) hideOn.push('tablet');
  if (col?.hidden_on_laptop) hideOn.push('laptop');
  if (col?.hidden_on_desktop) hideOn.push('desktop');
  return hideOn;
}

const HEADER_CELL_MAP: Record<string, { cellContentClassName: string; widthClassName: string }> = {
  date: { cellContentClassName: 'text-left', widthClassName: 'min-w-[100px] max-w-[120px]' },
  date_short: {
    cellContentClassName: 'text-left',
    widthClassName: 'min-w-[80px] max-w-[100px]',
  },
  ticker: { cellContentClassName: 'text-left', widthClassName: 'min-w-[60px] max-w-[80px]' },
  price_date: {
    cellContentClassName: 'text-left',
    widthClassName: 'min-w-[100px] max-w-[120px]',
  },
  company: {
    cellContentClassName: 'text-left',
    widthClassName: 'min-w-[150px] max-w-[300px] break-words whitespace-normal',
  },
  buy_or_sell: {
    cellContentClassName: 'text-right',
    widthClassName: 'min-w-[80px] max-w-[120px]',
  },
};

export function getLatestReportsHeaderCellClasses(col: TableColumnDefinition): {
  cellContentClassName: string;
  widthClassName: string;
} {
  const key = col?.key ?? '';
  return (
    HEADER_CELL_MAP[key] ?? {
      cellContentClassName: '',
      widthClassName: 'min-w-[100px]',
    }
  );
}

export function getResponsiveHideClass(col: TableColumnDefinition): string {
  return getTableColumnHideClass(buildHideOn(col));
}

const CELL_CONTENT_MAP: Record<
  string,
  (
    r: LatestReportData,
    platform: string
  ) => { cellContent: ReactNode; cellContentClassName: string; widthClassName: string }
> = {
  date: (r) => ({
    cellContent: r.date,
    cellContentClassName: `whitespace-nowrap text-left ${r.price_date ? 'company-link-button' : ''}`,
    widthClassName: 'min-w-[100px] max-w-[120px]',
  }),
  date_short: (r) => ({
    cellContent: r.date_short,
    cellContentClassName: `whitespace-nowrap text-left ${r.price_date ? 'company-link-button' : ''}`,
    widthClassName: 'min-w-[80px] max-w-[100px]',
  }),
  ticker: (r) => ({
    cellContent: r.ticker,
    cellContentClassName: 'whitespace-nowrap text-left',
    widthClassName: 'min-w-[60px] max-w-[80px]',
  }),
  price_date: (r) => ({
    cellContent: r.price_date,
    cellContentClassName: 'whitespace-nowrap text-left',
    widthClassName: 'min-w-[100px] max-w-[120px]',
  }),
  company: (r, platform) => ({
    cellContent: r.company,
    cellContentClassName: platform === 'mobile' ? 'text-right' : 'text-center',
    widthClassName: 'min-w-[150px] max-w-[300px] break-words whitespace-normal',
  }),
};

function getBuyOrSellContent(
  col: TableColumnDefinition,
  report: LatestReportData,
  reportIndex: number
): ReactNode {
  return report.buy_or_sell.is_badge ? (
    <Badge
      variant={getBadgeVariant(report.buy_or_sell.sign)}
      size="small"
      className="whitespace-nowrap"
      id={`latest-reports-${toKebabCase(col?.key ?? '')}-badge-${reportIndex + 1}`}
    >
      {report.buy_or_sell.value}
    </Badge>
  ) : (
    report.buy_or_sell.value
  );
}

export function getLatestReportsCellContent(
  col: TableColumnDefinition,
  report: LatestReportData,
  platform: string,
  reportIndex: number
): { cellContent: ReactNode; cellContentClassName: string; widthClassName: string } {
  const key = col?.key ?? '';
  const fn = CELL_CONTENT_MAP[key];
  if (fn) return fn(report, platform);
  if (key === 'buy_or_sell') {
    return {
      cellContent: getBuyOrSellContent(col, report, reportIndex),
      cellContentClassName: 'text-right',
      widthClassName: 'min-w-[80px] max-w-[120px]',
    };
  }
  return { cellContent: '', cellContentClassName: '', widthClassName: 'min-w-[100px]' };
}
