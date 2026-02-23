import { TableHead, TableRow } from 'investtech/external-components';

import { getResponsiveHideClass } from '@/lib/utils';
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
