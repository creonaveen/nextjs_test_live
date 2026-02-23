import { TableHead, TableHeader, TableRow } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { arrowDown, arrowUp } from '@/components/custom-components/icon';
import { getResponsiveHideClass } from '@/lib/utils';
import { toKebabCase } from '@/lib/utils';

interface WatchlistTableHeaderProps {
  ordering: string;
  onOrdering: (key: string) => void;
}

interface Column {
  key: string;
  label: string;
  align: 'left' | 'right';
  hideOn?: string[];
  classes?: string;
  sortable?: boolean;
}

const getColumns = (t: (key: string) => string): Column[] => [
  { key: 'name', label: t('name'), align: 'left' },
  { key: 'ticker', label: 'Ticker', align: 'left', hideOn: ['laptop'] },
  { key: 'investtech_score', label: t('score'), align: 'right' },
  { key: 'close', label: t('close'), align: 'right', hideOn: ['mobile'] },
  { key: 'profit_loss_percent', label: '+/- %', align: 'right', hideOn: ['mobile'] },
  { key: 'delete', label: '', align: 'right', classes: 'text-right', sortable: false },
];

function SortableTableHead({
  col,
  ordering,
  onOrdering,
}: {
  col: Column;
  ordering: string;
  onOrdering: (key: string) => void;
}) {
  const isActive = ordering === col.key || ordering === `-${col.key}`;
  const isDesc = ordering === `-${col.key}`;
  const responsiveHideClass = getResponsiveHideClass(
    col.hideOn as ('mobile' | 'tablet' | 'laptop' | 'desktop')[] | undefined
  );

  return (
    <TableHead
      id={`watchlist-table-head-${toKebabCase(col.key)}`}
      key={col.key}
      onClick={() => onOrdering(col.key)}
      className={`table-cell min-w-[80px] lg:min-w-[100px] ${col.align === 'right' ? 'text-right' : ''} ${responsiveHideClass} ${
        isActive ? 'active-table-head' : ''
      }`}
    >
      <div className={`column-header ${col.align === 'right' ? 'justify-end' : ''}`}>
        <span>{col.label}</span>
        {isActive
          ? isDesc
            ? arrowUp('active-table-head')
            : arrowDown('active-table-head')
          : arrowUp()}
      </div>
    </TableHead>
  );
}

export function WatchlistTableHeader({ ordering, onOrdering }: WatchlistTableHeaderProps) {
  const t = useTranslations('common');
  const columns = getColumns(t);

  return (
    <TableHeader>
      <TableRow showHover={false}>
        {columns.map((col, index) => {
          if (col.sortable === false) {
            return (
              <TableHead
                id={`watchlist-table-head-${index + 1}`}
                key={col.key}
                className="cursor-default"
              />
            );
          }

          return (
            <SortableTableHead
              key={col.key}
              col={col}
              ordering={ordering}
              onOrdering={onOrdering}
            />
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
