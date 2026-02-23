'use client';
import React from 'react';
import { TableRow, TableCell } from 'investtech/external-components';
import { RenderHTML } from '@/utils/create-mark-up';

export function isResearchBoxRowWithColspan(
  r: unknown
): r is { colspan?: number; label?: string; value?: string } {
  return (
    typeof r === 'object' && r !== null && !Array.isArray(r) && ('colspan' in r || 'label' in r)
  );
}

function renderResearchBoxColspanRow(
  row: { colspan?: number; label?: string },
  i: number,
  index: number
) {
  return (
    <TableRow key={i} showHover={false} id={`research-page-table-row-${index + 1}-${i + 1}`}>
      <TableCell
        colSpan={row.colspan}
        className="p-2 text-center font-medium"
        id={`research-page-research-box-table-cell-${index + 1}`}
      >
        <RenderHTML html={row.label || ''} />
      </TableCell>
    </TableRow>
  );
}

function renderResearchBoxLabelValueRow(
  row: { label?: string; value?: string },
  i: number,
  index: number
) {
  return (
    <TableRow key={i} showHover={false} id={`research-page-table-row-${index + 1}-${i + 1}`}>
      <TableCell
        className="p-2 font-medium"
        id={`research-page-research-box-${index + 1}-label-${i + 1}`}
      >
        <RenderHTML html={row.label || '-'} />
      </TableCell>
      <TableCell className="p-2" id={`research-page-research-box-${index + 1}-value-${i + 1}`}>
        <RenderHTML html={row.value || '-'} />
      </TableCell>
    </TableRow>
  );
}

function renderResearchBoxArrayRow(row: unknown[], i: number, index: number) {
  const firstCell = row[0];
  const secondCell = row[1] as string | undefined;
  return (
    <TableRow key={i} showHover={false} id={`research-page-table-row-${index + 1}-${i + 1}`}>
      <TableCell
        className="p-2 font-medium"
        id={`research-page-research-box-${index + 1}-first-cell-${i + 1}`}
      >
        <RenderHTML html={typeof firstCell === 'string' ? firstCell : String(firstCell || '-')} />
      </TableCell>
      {secondCell && (
        <TableCell
          className="p-2"
          id={`research-page-research-box-${index + 1}-second-cell-${i + 1}`}
        >
          <RenderHTML html={typeof secondCell === 'string' ? secondCell : String(secondCell)} />
        </TableCell>
      )}
    </TableRow>
  );
}

export function renderResearchBoxTableRow(row: unknown, i: number, index: number) {
  if (isResearchBoxRowWithColspan(row) && row.colspan && row.colspan > 1) {
    return renderResearchBoxColspanRow(row, i, index);
  }
  if (isResearchBoxRowWithColspan(row)) {
    return renderResearchBoxLabelValueRow(row, i, index);
  }
  return renderResearchBoxArrayRow(Array.isArray(row) ? row : [], i, index);
}
