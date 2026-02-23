import { TableBody, TableCell, TableHead, TableRow } from 'investtech/external-components';
import { Link } from '@/components/link';

import Paginator from '@/components/custom-components/paginator';
import { getColorClass, getResponsiveHideClass } from '@/lib/utils';
import { Index, IndicesList } from '@/lib/types/indices';
import { RenderHTML } from '@/utils/create-mark-up';
import { arrowDown, arrowUp } from '@/components/custom-components/icon';

interface TableColumn {
  key: string;
  label: string;
  align: 'left' | 'right';
  hideOn?: ('mobile' | 'tablet' | 'laptop' | 'desktop')[];
}

interface TableHeaderRowProps {
  columns: TableColumn[];
  ordering: string;
  onOrderingChange: (key: string) => void;
}

interface IndexTableRowProps {
  index: Index;
  indexNumber?: number;
}

interface TableBodyContentProps {
  data: IndicesList | undefined;
  translations: {
    noData: string;
  };
}

interface IndicesPaginatorProps {
  data: IndicesList | undefined;
  isLoading: boolean;
  limitFromUrl: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const NAME_CELL_CLASS =
  'company-link-button table-cell max-w-[90px] truncate sm:max-w-none sm:min-w-[100px]';
const TICKER_CELL_CLASS = `company-link-button ${getResponsiveHideClass(['mobile'])} min-w-[60px] lg:min-w-[80px]`;
const CLOSE_CELL_CLASS = 'numeric-table-cell table-cell min-w-[60px] text-right lg:min-w-[80px]';
const CHANGE_CELL_BASE_CLASS = `numeric-table-cell min-w-[60px] text-right lg:min-w-[80px] ${getResponsiveHideClass(['tablet'])}`;
const PROFIT_CELL_CLASS = 'numeric-table-cell min-w-[60px] text-right lg:min-w-[80px]';
const DATE_CELL_CLASS = `numeric-table-cell min-w-[60px] text-right lg:min-w-[80px] ${getResponsiveHideClass(['laptop'])}`;

export function TableHeaderRow({ columns, ordering, onOrderingChange }: TableHeaderRowProps) {
  return (
    <TableRow showHover={false}>
      {columns.map((col) => {
        const isActive = ordering === col.key || ordering === `-${col.key}`;
        const isDesc = ordering === `-${col.key}`;
        return (
          <TableHead
            key={col.key}
            onClick={() => onOrderingChange(col.key)}
            role="columnheader"
            aria-label={`Sort by ${col.label}`}
            aria-sort={isActive ? (isDesc ? 'descending' : 'ascending') : 'none'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOrderingChange(col.key);
              }
            }}
            className={`table-cell max-w-[80px] cursor-pointer break-words lg:min-w-[100px] ${getResponsiveHideClass(col?.hideOn)} ${
              isActive ? 'active-table-head' : ''
            }`}
          >
            <div
              className={`column-header text-center ${col.align === 'right' ? 'justify-end' : ''}`}
            >
              <span>{col.label}</span>
              {isActive
                ? isDesc
                  ? arrowUp('active-table-head')
                  : arrowDown('active-table-head')
                : arrowUp()}
            </div>
          </TableHead>
        );
      })}
    </TableRow>
  );
}

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

export function IndexTableRow({ index }: IndexTableRowProps) {
  const companyHref = `/company/${index.id}`;

  return (
    <TableRow key={index.ticker} showHover={false}>
      {renderLinkCell(index.name, companyHref, NAME_CELL_CLASS)}
      {renderLinkCell(index.ticker, companyHref, TICKER_CELL_CLASS)}
      {renderHtmlCell(index.close, CLOSE_CELL_CLASS)}
      {renderColoredHtmlCell(
        index.change?.value,
        index.change?.sign.toString(),
        CHANGE_CELL_BASE_CLASS
      )}
      {renderColoredHtmlCell(
        index.profit_loss_percent?.value,
        index.profit_loss_percent?.sign.toString(),
        PROFIT_CELL_CLASS
      )}
      <TableCell className={DATE_CELL_CLASS}>{index.analysis_date || '-'}</TableCell>
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
        data.results.map((index: Index, indexNumber: number) => (
          <IndexTableRow key={index.ticker} index={index} indexNumber={indexNumber} />
        ))
      )}
    </TableBody>
  );
}

export function IndicesPaginator({
  data,
  isLoading,
  limitFromUrl,
  onPageChange,
  onLimitChange,
}: IndicesPaginatorProps) {
  if (!data?.results || !data?.count || data.count <= 5) {
    return null;
  }

  return (
    <div className="flex w-full justify-end">
      <Paginator
        pageParent={onPageChange}
        pageSizeParent={onLimitChange}
        pageSize={limitFromUrl}
        isAPILoad={isLoading}
        countRow={data.count}
      />
    </div>
  );
}
