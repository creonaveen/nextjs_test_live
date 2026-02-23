'use client';

import { useMemo } from 'react';

import type { TextAlign } from '@/components/custom-components/table/table-cell-renderers';
import type {
  TableAlign,
  TableClass,
  TableData,
  TableDataType,
  TableEntry,
  TableHeaders,
  TableHidden,
  TableParams,
  TableStyleTrigger,
} from '@/lib/types/tables-example';
import {
  getCellColorClass,
  getRowTriggeredStyles,
  parseStyleTriggers,
} from '@/table-utils/table-color';
import { useColumnAlignment } from '@/table-utils/table-column-alignment';
import {
  getFormattedTableName,
  getHiddenTableClasses,
  getTableClassName,
  getStringMaxLength,
  getStringWrapLength,
} from '@/table-utils/table-datatypes';
import { getSortedKeys } from '@/table-utils/table-trigger-styling';
import { getDisplayValue } from '@/table-utils/table-trigger-styling';

export type TableComponentState = {
  status: 'no_params' | 'no_data' | 'ready';
  params: TableParams | null;
  tableType: string;
  tableData: TableData;
  rowKeys: string[];
  columnKeys: string[];
  headers: TableHeaders;
  hasColumnHeaders: boolean;
  columnClass: TableClass;
  rowClass: TableClass;
  hoverClass: string | undefined;
  columnAlign: TableAlign;
  columnHidden: TableHidden;
  columnStyleTrigger: TableStyleTrigger;
  columnDataType: TableDataType;
  columnAlignment: Record<string, TextAlign>;
  triggerMap: ReturnType<typeof parseStyleTriggers>;
  isHover: boolean;
  showHeader: boolean;
};

type BaseState = {
  params: TableParams | null;
  tableType: string;
  tableData: TableData;
  rowKeys: string[];
  columnKeys: string[];
  headers: TableHeaders;
  hasColumnHeaders: boolean;
  columnClass: TableClass;
  rowClass: TableClass;
  hoverClass: string | undefined;
  columnAlign: TableAlign;
  columnHidden: TableHidden;
  columnStyleTrigger: TableStyleTrigger;
  columnDataType: TableDataType;
  normalizedStyleTriggers: Record<string, string>;
};

function hasColumnHeaders(params: TableParams | null): boolean {
  return (
    params != null && params.column_headers != null && Object.keys(params.column_headers).length > 0
  );
}

function getColumnKeys(
  hasHeaders: boolean,
  tableData: TableData,
  rowKeys: string[],
  headers: TableHeaders
): string[] {
  if (hasHeaders) return getSortedKeys(Object.keys(headers));
  if (rowKeys.length === 0) return [];
  const firstRow = tableData[rowKeys[0]] ?? {};
  return getSortedKeys(Object.keys(firstRow).map((k) => k.replace('c', 'i')));
}

function getParam<K extends keyof TableParams>(
  params: TableParams | null,
  key: K,
  fallback: NonNullable<TableParams[K]>
): NonNullable<TableParams[K]> {
  if (params == null) return fallback;
  const v = params[key];
  return (v !== undefined && v !== null ? v : fallback) as NonNullable<TableParams[K]>;
}

function computeBaseState(params: TableParams | null, componentName: string): BaseState {
  const tableData = getParam(params, 'data', {});
  const headers = getParam(params, 'column_headers', {});
  const rowKeys = getSortedKeys(Object.keys(tableData));
  const hasHeaders = hasColumnHeaders(params);
  const columnKeys = getColumnKeys(hasHeaders, tableData, rowKeys, headers);
  const columnStyleTrigger = getParam(params, 'column_style_trigger', {});
  const normalizedStyleTriggers = columnKeys.reduce<Record<string, string>>((acc, key) => {
    acc[key] = columnStyleTrigger[key] ?? '';
    return acc;
  }, {});
  return {
    params,
    tableType: getFormattedTableName(componentName),
    tableData,
    rowKeys,
    columnKeys,
    headers,
    hasColumnHeaders: hasHeaders,
    columnClass: getParam(params, 'column_class', {}),
    rowClass: getParam(params, 'row_class', {}),
    hoverClass: params?.hover_class,
    columnAlign: getParam(params, 'column_align', {}),
    columnHidden: getParam(params, 'column_hidden', {}),
    columnStyleTrigger,
    columnDataType: getParam(params, 'column_data_type', {}),
    normalizedStyleTriggers,
  };
}

export function useTableComponentState(data: TableEntry | null | undefined): TableComponentState {
  const params = data?.params ?? null;
  const componentName = data?.component_name ?? '';

  const base = useMemo(() => computeBaseState(params, componentName), [params, componentName]);

  const columnAlignment = useColumnAlignment({
    columnKeys: base.columnKeys,
    columnAlign: base.columnAlign,
    columnDataType: base.columnDataType,
    tableData: base.tableData,
    rowKeys: base.rowKeys,
  });

  const triggerMap = useMemo(
    () => parseStyleTriggers(base.normalizedStyleTriggers),
    [base.normalizedStyleTriggers]
  );

  const status: TableComponentState['status'] =
    params == null
      ? 'no_params'
      : base.rowKeys.length === 0 || base.columnKeys.length === 0
        ? 'no_data'
        : 'ready';

  const isHover = base.hoverClass === 'Hover';
  return {
    status,
    params: base.params,
    tableType: base.tableType,
    tableData: base.tableData,
    rowKeys: base.rowKeys,
    columnKeys: base.columnKeys,
    headers: base.headers,
    hasColumnHeaders: base.hasColumnHeaders,
    columnClass: base.columnClass,
    rowClass: base.rowClass,
    hoverClass: base.hoverClass,
    columnAlign: base.columnAlign,
    columnHidden: base.columnHidden,
    columnStyleTrigger: base.columnStyleTrigger,
    columnDataType: base.columnDataType,
    columnAlignment,
    triggerMap,
    isHover,
    showHeader: base.hasColumnHeaders,
  };
}

export { getTableClassName, getHiddenTableClasses, getStringWrapLength, getStringMaxLength };
export { getCellColorClass, getRowTriggeredStyles };
export { getDisplayValue };
