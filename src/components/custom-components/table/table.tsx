'use client';

import { Table, TableBody, TableCaption } from 'investtech/external-components';

import type { TableEntry } from '@/lib/types/tables-example';

import TableSkeleton from '../table-skeleton';

import { TableComponentHeader, TableComponentRow } from './table-components';
import { useTableComponentState } from './use-table-state';

type TableComponentProps = {
  data: TableEntry;
  isLoading?: boolean;
};

export function TableComponent({ data, isLoading = false }: TableComponentProps) {
  const state = useTableComponentState(data);

  if (state.status === 'no_params') {
    return (
      <div className="text-muted-foreground rounded-md border border-dashed p-4 text-sm">
        No table data available.
      </div>
    );
  }

  if (state.status === 'no_data') {
    return <div className="text-muted-foreground text-sm">No data available.</div>;
  }

  if (isLoading) {
    return <TableSkeleton rows={state.rowKeys.length} columns={state.columnKeys.length} />;
  }

  const { params, rowKeys } = state;

  return (
    <Table className="w-full">
      {params?.caption != null && (
        <TableCaption className="text-left">{params.caption}</TableCaption>
      )}
      <TableComponentHeader state={state} />
      <TableBody>
        {rowKeys.map((rowKey) => (
          <TableComponentRow key={rowKey} state={state} rowKey={rowKey} />
        ))}
      </TableBody>
    </Table>
  );
}
