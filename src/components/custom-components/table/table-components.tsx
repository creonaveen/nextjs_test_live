'use client';

import { TableCell, TableHead, TableHeader, TableRow } from 'investtech/external-components';
import type { CSSProperties } from 'react';

import {
  getCellContent,
  type TextAlign,
} from '@/components/custom-components/table/table-cell-renderers';
import { getTriggerValue } from '@/table-utils/table-trigger-styling';
import { RenderHTML } from '@/utils/create-mark-up';

import type { TableComponentState } from './use-table-state';
import {
  getTableClassName,
  getHiddenTableClasses,
  getStringMaxLength,
  getStringWrapLength,
  getCellColorClass,
  getRowTriggeredStyles,
  getDisplayValue,
} from './use-table-state';

const COLUMN_GAP_PX = 4;

function renderHeaderCells(state: TableComponentState) {
  const {
    columnKeys,
    headers,
    tableType,
    columnClass,
    columnHidden,
    columnDataType,
    columnAlignment,
  } = state;
  return columnKeys.map((columnKey) => {
    const colClass = getTableClassName(columnClass[columnKey]);
    const colHiddenVal = columnHidden[columnKey] ?? '';
    const stringWrapLength = getStringWrapLength(columnDataType[columnKey]);
    const headStyle: CSSProperties = {
      textAlign: columnAlignment[columnKey],
      paddingLeft: COLUMN_GAP_PX,
      paddingRight: COLUMN_GAP_PX,
      ...(stringWrapLength != null ? { maxWidth: `${stringWrapLength * 10}px` } : {}),
    };
    return (
      <TableHead
        key={columnKey}
        className={[
          colClass ? `${tableType}-column-${colClass}` : '',
          colHiddenVal ? getHiddenTableClasses(colHiddenVal) : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={Object.keys(headStyle).length > 0 ? headStyle : undefined}
      >
        <RenderHTML html={headers[columnKey] ?? ''} />
      </TableHead>
    );
  });
}

type TableComponentHeaderProps = { state: TableComponentState };

export function TableComponentHeader({ state }: TableComponentHeaderProps) {
  const { columnKeys, showHeader, tableType, isHover, params } = state;
  if (!(params?.table_header || showHeader)) return null;
  return (
    <TableHeader>
      {params?.table_header != null && (
        <TableRow className="research-table-row-header" showHover={false}>
          <TableHead colSpan={columnKeys.length} className="py-2 text-left font-medium">
            <RenderHTML html={params.table_header} />
          </TableHead>
        </TableRow>
      )}
      {showHeader && (
        <TableRow showHover={isHover} className={`${tableType}-row-header`}>
          {renderHeaderCells(state)}
        </TableRow>
      )}
    </TableHeader>
  );
}

type TableComponentRowProps = {
  state: TableComponentState;
  rowKey: string;
};

export function TableComponentRow({ state, rowKey }: TableComponentRowProps) {
  const { tableType, tableData, columnKeys, rowClass, triggerMap, isHover } = state;

  const rowClassName = getTableClassName(rowClass[rowKey.replace('l', 'i')]);
  const rowValues = columnKeys.map((columnKey) => {
    const colIndex = columnKey.slice(1);
    const cellKey = `c${colIndex}`;
    const value = tableData[rowKey]?.[cellKey];
    return getTriggerValue(value);
  });
  const rowTriggeredStyles = triggerMap.length
    ? getRowTriggeredStyles(rowValues.map(Number), triggerMap)
    : [];

  return (
    <TableRow
      key={rowKey}
      className={
        (rowClassName ? `${tableType}-row-${rowClassName}` : '') +
        (tableType === 'clean-table' || tableType === 'research-table' ? ' border-none' : '')
      }
      showHover={isHover}
    >
      {columnKeys.map((columnKey, index) => (
        <TableComponentCell
          key={`${rowKey}-${columnKey}`}
          state={state}
          rowKey={rowKey}
          columnKey={columnKey}
          rowTriggeredStyles={rowTriggeredStyles}
          index={index}
        />
      ))}
    </TableRow>
  );
}

function getCellDisplayText(
  value: import('@/lib/types/tables-example').TableCellValue | undefined,
  dataType: string | undefined,
  stringWrapLength: number | null | undefined,
  stringMaxLength: number | null | undefined
): string {
  const rawDisplayValue = getDisplayValue(value);
  if (stringWrapLength != null) return String(rawDisplayValue);
  if (
    typeof rawDisplayValue === 'string' &&
    stringMaxLength != null &&
    rawDisplayValue.length > stringMaxLength
  ) {
    return `${rawDisplayValue.slice(0, stringMaxLength - 3)}...`;
  }
  return String(rawDisplayValue);
}

const STYLE_TRIGGER_PREFIXES = ['styleUser.', 'styleTrigger.'];

function isStyledColumn(styleTrigger: string): boolean {
  return STYLE_TRIGGER_PREFIXES.some((p) => styleTrigger.startsWith(p));
}

function toColorName(value: string): 'positive' | 'negative' | 'neutral' {
  const valid = new Set(['positive', 'negative', 'neutral']);
  return valid.has(value) ? (value as 'positive' | 'negative' | 'neutral') : 'neutral';
}

function getCellClassName(
  state: TableComponentState,
  columnKey: string,
  rowTriggeredStyles: string[],
  index: number
): string {
  const { tableType, columnClass, columnHidden, columnStyleTrigger, columnDataType } = state;
  const colClass = getTableClassName(columnClass[columnKey]);
  const colHiddenVal = columnHidden[columnKey] ?? '';
  const styleTrigger = columnStyleTrigger[columnKey] ?? '';
  const colorClass = isStyledColumn(styleTrigger)
    ? getCellColorClass(toColorName(rowTriggeredStyles[index] ?? 'neutral'))
    : '';
  const stringWrapLength = getStringWrapLength(columnDataType[columnKey]);
  const wrapClass = stringWrapLength != null ? 'wrap-break-word whitespace-normal' : '';
  return [
    colClass ? `${tableType}-column-${colClass}` : '',
    colHiddenVal ? getHiddenTableClasses(colHiddenVal) : '',
    colorClass,
    wrapClass,
    'td',
  ]
    .filter(Boolean)
    .join(' ');
}

function getCellStyle(
  columnAlignment: Record<string, TextAlign>,
  columnKey: string,
  stringWrapLength: number | null | undefined
): CSSProperties {
  return {
    textAlign: columnAlignment[columnKey],
    paddingLeft: COLUMN_GAP_PX,
    paddingRight: COLUMN_GAP_PX,
    ...(stringWrapLength != null ? { maxWidth: `${stringWrapLength * 10}px` } : {}),
  };
}

type TableComponentCellProps = {
  state: TableComponentState;
  rowKey: string;
  columnKey: string;
  rowTriggeredStyles: string[];
  index: number;
};

export function TableComponentCell({
  state,
  rowKey,
  columnKey,
  rowTriggeredStyles,
  index,
}: TableComponentCellProps) {
  const { tableData, columnDataType, columnAlignment } = state;
  const cellKey = `c${columnKey.slice(1)}`;
  const value = tableData[rowKey]?.[cellKey];
  const dataType = columnDataType[columnKey];
  const stringWrapLength = getStringWrapLength(dataType);
  const stringMaxLength = getStringMaxLength(dataType);
  const displayText = getCellDisplayText(value, dataType, stringWrapLength, stringMaxLength);
  const cellContent = getCellContent(dataType, {
    value,
    displayText,
    rowKey,
    columnKey,
    align: columnAlignment[columnKey],
  });
  const className = getCellClassName(state, columnKey, rowTriggeredStyles, index);
  const style = getCellStyle(columnAlignment, columnKey, stringWrapLength);
  return (
    <TableCell className={className} style={style}>
      {cellContent}
    </TableCell>
  );
}
