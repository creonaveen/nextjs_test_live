'use client';

import { TableHead, TableRow } from 'investtech/external-components';

import { arrowDown, arrowUp } from '@/components/custom-components/icon';
import { getResponsiveHideClass, toKebabCase } from '@/lib/utils';

interface MyNotesTableHeaderRowProps {
  notesT: (key: string) => string;
  ordering: string;
  handleOrdering: (key: string) => void;
}

const COLUMN_KEYS = [
  { key: 'date', classes: 'w-[140px] whitespace-nowrap', hideOn: ['mobile'] as const },
  { key: 'name', classes: 'max-w-[160px] min-w-[120px] whitespace-nowrap' },
  { key: 'note', classes: 'table-cell' },
  { key: 'actions', classes: 'w-[60px] text-right', sortable: false as const },
];

export function MyNotesTableHeaderRow({
  notesT,
  ordering,
  handleOrdering,
}: MyNotesTableHeaderRowProps) {
  const columns = [
    { ...COLUMN_KEYS[0], label: notesT('date') },
    { ...COLUMN_KEYS[1], label: notesT('company') },
    { ...COLUMN_KEYS[2], label: notesT('notes') },
    { ...COLUMN_KEYS[3], label: '' },
  ];

  return (
    <TableRow showHover={false}>
      {columns.map((col) => {
        if ('sortable' in col && col.sortable === false) {
          return (
            <TableHead
              id={`mynotes-table-head-${toKebabCase(col.key)}`}
              key={col.key}
              className={`${col.classes} cursor-default`}
            />
          );
        }
        const isActive = ordering === col.key || ordering === `-${col.key}`;
        const isDesc = ordering === `-${col.key}`;
        const hideOn = 'hideOn' in col ? col.hideOn : undefined;
        const responsiveHideClass = getResponsiveHideClass(
          hideOn as unknown as ('mobile' | 'tablet' | 'desktop' | 'laptop')[]
        );
        return (
          <TableHead
            id={`mynotes-table-head-${toKebabCase(col.key)}`}
            key={col.key}
            onClick={() => handleOrdering(col.key)}
            className={`${col.classes} table-cell ${isActive ? 'active-table-head' : ''} ${responsiveHideClass}`}
          >
            <div className="column-header">
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
