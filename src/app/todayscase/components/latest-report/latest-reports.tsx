'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { usePlatform } from '@/lib/platform';
import { LatestReports } from '@/lib/types/todays-case';
import {
  getLatestReportsHeaderCellClasses,
  getResponsiveHideClass,
  sortLatestReportsTableDefinition,
} from './latest-reports-helpers';
import { LatestReportsTableCell } from './latest-reports-table-cell';

const TITLE_CLASSES = 'dark:text-grey-50 text-grey-900 text-lg font-semibold';
const TABLE_CELL_CLASSES = 'text-grey-800 dark:text-grey-100 text-sm font-normal';
const TABLE_HEADER_CLASSES =
  'text-grey-700 dark:text-grey-300 text-[10px] font-medium tracking-wide uppercase';

function LatestReportsTableHeader({
  table_definition,
}: {
  table_definition: LatestReports['table_definition'];
}) {
  return (
    <TableHeader id="latest-reports-table-header">
      <TableRow showHover={false} id="latest-reports-header-row">
        {table_definition.map((col, index) => {
          const responsiveHideClass = getResponsiveHideClass(col);
          const { cellContentClassName, widthClassName } = getLatestReportsHeaderCellClasses(col);
          return (
            <TableHead
              key={col.key || index}
              className={`${TABLE_HEADER_CLASSES} ${responsiveHideClass} ${cellContentClassName} ${widthClassName}`}
              id={`latest-reports-header-${col.key}`}
            >
              {col.column_name && col.column_name}
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}

function LatestReportsTableBody({
  latest_reports,
  sortedTableDefinition,
  platform,
  emptyMessage,
}: {
  latest_reports: LatestReports;
  sortedTableDefinition: LatestReports['table_definition'];
  platform: string;
  emptyMessage: string;
}) {
  if (latest_reports.data.length === 0) {
    return (
      <TableBody id="latest-reports-table-body">
        <TableRow showHover={false} id="latest-reports-empty-row">
          <TableCell
            colSpan={latest_reports.num_columns}
            className="py-4 text-center"
            id="latest-reports-empty-cell"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return (
    <TableBody id="latest-reports-table-body">
      {latest_reports.data.map((report, reportIndex) => (
        <TableRow
          key={reportIndex}
          showHover={false}
          className="dark:border-grey-750"
          id={`latest-reports-row-${reportIndex + 1}`}
        >
          {sortedTableDefinition.map((col, colIndex) => (
            <LatestReportsTableCell
              key={col.key || colIndex}
              col={col}
              report={report}
              reportIndex={reportIndex}
              platform={platform}
              tableCellClasses={TABLE_CELL_CLASSES}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

interface LatestReportsProps {
  latest_reports: LatestReports;
}

export default function LatestReportsTable({ latest_reports }: LatestReportsProps) {
  const e = useTranslations('errors');
  const platform = usePlatform();
  const sortedTableDefinition = sortLatestReportsTableDefinition(latest_reports.table_definition);
  const hasAnyColumnName = latest_reports.table_definition.some(
    (col) => col.column_name && col.column_name.trim() !== ''
  );
  return (
    <Card className="bg-card overflow-hidden p-5" id="latest-reports-card">
      <CardContent className="p-0" id="latest-reports-content">
        <div className="w-full lg:w-1/2" id="latest-reports-container">
          <Card
            className="lg:border-grey-100 dark:lg:border-grey-700 dark:bg-grey-900 w-full overflow-hidden py-0 lg:border-[1px] lg:p-5 lg:py-6 dark:px-6 dark:py-4 dark:lg:border-none"
            id="latest-reports-inner-card"
          >
            <CardHeader id="latest-reports-header">
              <CardTitle className={TITLE_CLASSES} id="latest-reports-title">
                {latest_reports.title}
              </CardTitle>
            </CardHeader>
            <CardContent
              className="px-0 lg:p-0 dark:pb-4 dark:lg:px-0 dark:lg:pb-4"
              id="latest-reports-table-wrapper"
            >
              <div className="overflow-x-auto" id="latest-reports-scroll-container">
                <Table className="w-full table-fixed" id="latest-reports-table">
                  {hasAnyColumnName && (
                    <LatestReportsTableHeader table_definition={latest_reports.table_definition} />
                  )}
                  <LatestReportsTableBody
                    latest_reports={latest_reports}
                    sortedTableDefinition={sortedTableDefinition}
                    platform={platform}
                    emptyMessage={e('noData')}
                  />
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
