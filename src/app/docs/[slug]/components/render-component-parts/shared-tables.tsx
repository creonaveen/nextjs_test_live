'use client';
import NextLink from 'next/link';
import Image from 'next/image';
import React from 'react';
import { TableCell, TableHead, TableRow } from 'investtech/external-components';
import { ResearchPageBlock, TableDefinitionColumn } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';
import { ConditionalTooltip } from './shared-tooltip';

function renderTableContentItemLink(
  contentItem: { type: string; href?: string; text?: string },
  j: number
) {
  if (contentItem.type === 'link' && contentItem.href) {
    return (
      <NextLink
        key={j}
        href={contentItem.href}
        className="text-primary text-sm font-normal underline"
      >
        {contentItem.text}
      </NextLink>
    );
  }
  return null;
}

function renderTableCellItem(
  item: {
    img?: string;
    text?: string;
    content?: Array<{ type: string; href?: string; text?: string }>;
  },
  i: number
) {
  return (
    <div key={i} className="flex max-w-full items-center gap-2">
      {item.img && (
        <Image
          src={item.img}
          alt={item.text || 'image'}
          width={50}
          height={50}
          className="flex-shrink-0 rounded-sm"
        />
      )}
      {item.text && (
        <ConditionalTooltip content={item.text}>
          <div className="max-w-full truncate overflow-hidden whitespace-nowrap">
            <RenderHTML html={item.text} />
          </div>
        </ConditionalTooltip>
      )}
      {Array.isArray(item.content) &&
        item.content.map((contentItem, j) => renderTableContentItemLink(contentItem, j))}
    </div>
  );
}

function renderTableCellContent(cellValue: unknown, alignment: string) {
  const alignmentClass = alignment.includes('right')
    ? 'items-end justify-end'
    : alignment.includes('center')
      ? 'items-center justify-center'
      : '';
  return (
    <div className={`flex max-w-full cursor-pointer gap-1 lg:max-w-[550px] ${alignmentClass}`}>
      {Array.isArray(cellValue) ? (
        (
          cellValue as Array<{
            img?: string;
            text?: string;
            content?: { type: string; href?: string; text?: string }[];
          }>
        ).map((item, i) => renderTableCellItem(item, i))
      ) : (
        <ConditionalTooltip content={cellValue as string}>
          <div className="max-w-full truncate overflow-hidden whitespace-nowrap">
            <RenderHTML html={cellValue as string} />
          </div>
        </ConditionalTooltip>
      )}
    </div>
  );
}

export function getTableDiscoveredKeys(block: ResearchPageBlock): string[] {
  return Array.from(
    new Set(
      ((block?.data as unknown as Record<string, string>[]) || []).flatMap(
        (row: Record<string, string>) => Object.keys(row || {})
      )
    )
  ).sort((a, b) => {
    const na = parseInt(String(a).replace(/\D/g, ''));
    const nb = parseInt(String(b).replace(/\D/g, ''));
    if (Number.isNaN(na) || Number.isNaN(nb)) return String(a).localeCompare(String(b));
    return na - nb;
  });
}

export function renderTableHeader(block: ResearchPageBlock, index: number) {
  const tableDefs = block?.table_definition || [];
  const isSingleHeader = tableDefs.length === 1;
  const discoveredKeys = getTableDiscoveredKeys(block);

  if (isSingleHeader) {
    const headerCol = tableDefs[0];
    const colSpan =
      discoveredKeys.length > 0
        ? discoveredKeys.length
        : (headerCol as TableDefinitionColumn)?.colspan || 1;
    const alignClass = headerCol.align
      ? `text-${headerCol.align}`
      : headerCol.key === '0'
        ? 'text-left'
        : 'text-center';
    return (
      <TableRow showHover={false} className="dark:border-grey-750">
        <TableHead
          id={`research-page-table-${index + 1}`}
          colSpan={colSpan}
          className={`cursor-default px-2 font-medium ${alignClass}`}
        >
          <RenderHTML html={headerCol.column_name} />
        </TableHead>
      </TableRow>
    );
  }
  return (
    <TableRow showHover={false} className="dark:border-grey-750">
      {tableDefs.map((col, colIndex) => (
        <TableHead
          id={`research-page-table-${index + 1}-${colIndex + 1}`}
          key={colIndex}
          className={`cursor-default truncate px-2 font-medium ${block?.table_type === 'research_table' && 'border-divider dark:border-grey-750 border-t'} ${
            col.align ? `text-${col.align}` : colIndex === 0 ? 'text-left' : 'text-center'
          }`}
        >
          <ConditionalTooltip content={col.column_name}>
            <div className="max-w-full truncate overflow-hidden whitespace-nowrap">
              <RenderHTML html={col.column_name} />
            </div>
          </ConditionalTooltip>
        </TableHead>
      ))}
    </TableRow>
  );
}

function renderTableBodyRowWithKeys(opts: {
  block: ResearchPageBlock;
  index: number;
  row: Record<string, unknown>;
  rowIndex: number;
  discoveredKeys: string[];
}) {
  const { block, index, row, rowIndex, discoveredKeys } = opts;
  const rowClass = `${block?.table_type === 'research_table' && 'border-none'} dark:border-grey-750`;
  return (
    <TableRow
      id={`research-page-table-row-${index + 1}-${rowIndex + 1}`}
      key={rowIndex}
      showHover={false}
      className={rowClass}
    >
      {discoveredKeys.map((key, colIndex) => {
        const cellValue = row[key] ?? '-';
        let alignment = colIndex === 0 ? 'text-left' : 'text-center';
        if (
          Array.isArray(cellValue) &&
          cellValue.length > 0 &&
          typeof cellValue[0] === 'object' &&
          cellValue[0] !== null &&
          'align' in cellValue[0]
        ) {
          alignment = `text-${(cellValue[0] as { align?: string }).align}`;
        }
        return (
          <TableCell
            key={key}
            className={`px-2 align-top ${alignment} ${colIndex === 0 ? 'text-foreground font-medium' : ''}`}
          >
            <ConditionalTooltip content={cellValue}>
              {renderTableCellContent(cellValue, alignment)}
            </ConditionalTooltip>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

function renderTableBodyRowWithDefs(
  block: ResearchPageBlock,
  index: number,
  row: Record<string, unknown>,
  rowIndex: number
) {
  const rowClass = `${block?.table_type === 'research_table' && 'border-none'} dark:border-grey-750`;
  return (
    <TableRow key={rowIndex} showHover={false} className={rowClass}>
      {(block?.table_definition || []).map((col, colIndex: number) => {
        const cellValue = row[col.key] ?? '-';
        const alignment = col.align
          ? `text-${col.align}`
          : colIndex === 0
            ? 'text-left'
            : 'text-center';
        return (
          <TableCell
            id={`research-page-table-${index + 1}-${colIndex + 1}`}
            key={colIndex}
            className={`px-2 align-top ${alignment} ${colIndex === 0 ? 'text-foreground font-medium' : ''}`}
          >
            <ConditionalTooltip content={cellValue}>
              {renderTableCellContent(cellValue, alignment)}
            </ConditionalTooltip>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export function renderTableBody(block: ResearchPageBlock, index: number) {
  const tableDefs = block?.table_definition || [];
  const isSingleHeader = tableDefs.length === 1;
  const data = (block?.data as unknown as Record<string, unknown>[]) || [];

  if (isSingleHeader) {
    const discoveredKeys = getTableDiscoveredKeys(block);
    return data.map((row: Record<string, unknown>, rowIndex: number) =>
      renderTableBodyRowWithKeys({ block, index, row, rowIndex, discoveredKeys })
    );
  }
  return data.map((row: Record<string, unknown>, rowIndex: number) =>
    renderTableBodyRowWithDefs(block, index, row, rowIndex)
  );
}

export function renderStandardTableRow(row: string[], rowIndex: number, index: number) {
  return (
    <TableRow key={rowIndex} id={`research-page-standard-table-row-${index + 1}-${rowIndex + 1}`}>
      {row.map((cell: string, cellIndex: number) => (
        <TableCell
          key={cellIndex}
          className="numeric-table-cell max-w-[200px] truncate overflow-hidden text-sm"
        >
          <ConditionalTooltip content={cell}>
            <span className="block cursor-pointer truncate">{cell}</span>
          </ConditionalTooltip>
        </TableCell>
      ))}
    </TableRow>
  );
}
