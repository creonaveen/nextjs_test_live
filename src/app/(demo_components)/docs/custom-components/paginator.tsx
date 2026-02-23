'use client';

import Paginator from '@/components/custom-components/paginator';

export function PaginatorDemo() {
  return (
    <div>
      <Paginator countRow={120} pageSize={10} isAPILoad={false} />
    </div>
  );
}

export const paginatorCode = `
'use client';

import * as React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/external-components/pagination';
import { Spinner } from '@/components/custom-components/spinner';

/**
 * Props for the Paginator component
 */
interface PaginatorProps {
  /** Callback function called when page changes */
  pageParent?: (page: number) => void;
  /** Number of items per page */
  pageSize?: number;
  /** Callback function called when page size changes */
  pageSizeParent?: (size: number) => void;
  /** Whether to show loading spinner */
  isAPILoad?: boolean;
  /** Total number of rows */
  countRow?: number;
}

/**
 * Paginator component for navigating through paginated data.
 * Includes page size selector and previous/next navigation.
 *
 * @param props - The component props
 * @returns A paginator component
 */
export function Paginator({
  pageParent = () => {},
  pageSize = 20,
  pageSizeParent = () => {},
  isAPILoad = false,
  countRow = 100,
}: PaginatorProps) {
  const textColor = 'text-grey-700 dark:text-grey-200';

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [selectedPageSize, setSelectedPageSize] = React.useState<number>(pageSize);
  const [totalPage, setTotalPage] = React.useState(1);
  const resultLength = [5, 10, 20, 50, 80, 100];

  React.useEffect(() => {
    setTotalPage(Math.ceil(countRow / selectedPageSize));
  }, [selectedPageSize, countRow]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pageParent?.(page);
  };

  const handleResultPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setSelectedPageSize(newPageSize);
    setCurrentPage(1);
    pageSizeParent?.(newPageSize);
    pageParent?.(1);
  };

  return (
    <div className="mt-4 flex flex-row items-center justify-start gap-4">
      <div className="flex w-auto items-center justify-end">
        <label htmlFor="pageSize" className={\`mr-2 text-xs font-normal \${textColor}\`}>
          Rows per page
        </label>
        <select
          id="pageSize"
          className={\`\${textColor} rounded-md border p-2\`}
          value={selectedPageSize}
          onChange={handleResultPerPageChange}
          aria-label="Select rows per page"
        >
          {resultLength.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <Pagination>
        <PaginationContent className="list-none">
          <PaginationItem>
            <p className={\`\${textColor} text-xs font-normal\`}>
              {(currentPage - 1) * selectedPageSize + (countRow > 0 ? 1 : 0)} -
              {currentPage * selectedPageSize > countRow
                ? countRow
                : currentPage * selectedPageSize}{' '}
              of {countRow}
            </p>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              className={\`\${textColor} cursor-pointer \${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}\`}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              aria-label="Go to previous page"
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={\`\${textColor} cursor-pointer \${currentPage === totalPage ? 'pointer-events-none opacity-50' : ''}\`}
              onClick={() => handlePageChange(Math.min(totalPage, currentPage + 1))}
              aria-label="Go to next page"
              aria-disabled={currentPage === totalPage}
            />
          </PaginationItem>
          <PaginationItem>{isAPILoad && <Spinner />}</PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}`;
