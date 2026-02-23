'use client';
import { Card, CardContent } from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';
import { TableRowData } from '@/lib/types/research-page';
import { ConditionalTooltip } from '../shared-tooltip';
import { renderTableHeader, renderTableBody, renderStandardTableRow } from '../shared-tables';
import { renderPerformanceTableRow } from '../shared-performance-table';
import type { BlockRendererFn } from '../block-types';

export const renderTableBlock: BlockRendererFn = (block, index) => {
  return (
    <div className="flex items-center justify-center">
      <Card
        key={index}
        className={`dark:bg-grey-900 mb-3 w-[80dvw] sm:w-[500px] md:w-full ${block?.table_type === 'research_table' && 'bg-transparent dark:bg-transparent'} `}
        id={`research-page-table-${index + 1}`}
      >
        <CardContent
          className={`px-3 lg:px-6 ${block?.table_type === 'research_table' && 'lg:px-0'}`}
        >
          {block?.title && <h3 className="mb-3 text-lg font-medium">{block.title}</h3>}

          <div className="w-full overflow-x-auto md:overflow-visible">
            <Table className="w-full max-w-full table-auto overflow-hidden xl:table-fixed">
              <TableHeader>{renderTableHeader(block, index)}</TableHeader>
              <TableBody>{renderTableBody(block, index)}</TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const renderPerformanceTableBlock: BlockRendererFn = (block, index) => {
  return (
    <Card
      key={index}
      className="dark:bg-grey-900 px-3"
      id={`research-page-performance-table-${index + 1}`}
    >
      <CardContent>
        {block?.text && <h3 className="mb-3 text-lg font-medium">{block.text}</h3>}
        <Table className="w-full table-auto">
          <TableBody>
            {block?.rows?.map(
              (row: TableRowData | { name?: string; value?: string }, rowIndex: number) =>
                renderPerformanceTableRow(row, rowIndex, index)
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const renderStandardTableBlock: BlockRendererFn = (block, index) => {
  return (
    <Card
      key={index}
      className="dark:bg-grey-900 mb-3 px-3"
      id={`research-page-standard-table-${index + 1}`}
    >
      <CardContent>
        {block?.title && <h3 className="mb-3 text-lg font-medium">{block.title}</h3>}

        <Table className="w-full table-auto" key={index}>
          <TableHeader>
            <TableRow>
              {block?.columns?.column_headers?.map((header: string, headerIndex: number) => (
                <TableHead
                  key={headerIndex}
                  id={`research-page-standard-table-header-${index + 1}-${headerIndex + 1}`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {block?.data?.map((row: string[], rowIndex: number) =>
              renderStandardTableRow(row, rowIndex, index)
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

function renderResearchTableBody(block: { data?: string[][] }, index: number) {
  const data = block?.data ?? [];
  return data.map((row: string[], rowIndex: number) => (
    <TableRow key={rowIndex} id={`research-page-research-table-row-${index + 1}-${rowIndex + 1}`}>
      {row.map((cell: string, cellIndex: number) => (
        <TableCell
          key={cellIndex}
          className={`${cellIndex === 0 ? 'max-w-[300px] truncate' : 'text-center'} break-words`}
        >
          <ConditionalTooltip content={cell}>
            <span className="block truncate">{cell}</span>
          </ConditionalTooltip>
        </TableCell>
      ))}
    </TableRow>
  ));
}

export const renderResearchTableBlock: BlockRendererFn = (block, index) => {
  const title = block?.title;
  const headers = block?.columns?.column_headers ?? [];
  return (
    <Card
      key={index}
      className="dark:bg-grey-900 mb-3 px-3"
      id={`research-page-research-table-${index + 1}`}
    >
      <CardContent>
        {title ? <h3 className="mb-3 text-lg font-medium">{title}</h3> : null}

        <Table className="w-full table-auto" key={index}>
          <TableHeader>
            <TableRow>
              {headers.map((header: string, headerIndex: number) => (
                <TableHead
                  key={headerIndex}
                  id={`research-page-research-table-header-head-${index + 1}-${headerIndex + 1}`}
                >
                  <span
                    className={`block font-medium ${headerIndex === 0 ? 'text-left' : 'text-center'}`}
                  >
                    {header}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>{renderResearchTableBody(block, index)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const TABLE_BLOCKS: Record<string, BlockRendererFn> = {
  table: renderTableBlock,
  performance_table: renderPerformanceTableBlock,
  standardTable: renderStandardTableBlock,
  researchTable: renderResearchTableBlock,
};
