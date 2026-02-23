'use client';

import { TableCell } from 'investtech/external-components';
import { Link } from '@/components/link';

import { LatestReportData, TableColumnDefinition } from '@/lib/types/todays-case';
import { toKebabCase } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';
import { getLatestReportsCellContent, getResponsiveHideClass } from './latest-reports-helpers';

interface LatestReportsTableCellProps {
  col: TableColumnDefinition;
  report: LatestReportData;
  reportIndex: number;
  platform: string;
  tableCellClasses: string;
}

export function LatestReportsTableCell({
  col,
  report,
  reportIndex,
  platform,
  tableCellClasses,
}: LatestReportsTableCellProps) {
  const responsiveHideClass = getResponsiveHideClass(col);
  const { cellContent, cellContentClassName, widthClassName } = getLatestReportsCellContent(
    col,
    report,
    platform,
    reportIndex
  );
  const cellClassName = `${tableCellClasses} ${responsiveHideClass} ${widthClassName}`;
  const renderInner = () => {
    if (col.key === 'buy_or_sell' && report.buy_or_sell.is_badge) {
      return cellContent;
    }
    if (col.key === 'date' || col.key === 'date_short') {
      return <Link href={`/todayscase/?price_date=${report.price_date}`}>{cellContent}</Link>;
    }
    if (col.key === 'company') {
      return (
        <span className="inline-block break-words whitespace-normal">
          <RenderHTML html={String(cellContent)} />
        </span>
      );
    }
    return <RenderHTML html={String(cellContent)} />;
  };

  return (
    <TableCell
      className={`${cellClassName} ${cellContentClassName}`}
      id={`latest-reports-${toKebabCase(col?.key ?? '')}-${reportIndex + 1}`}
    >
      {renderInner()}
    </TableCell>
  );
}
