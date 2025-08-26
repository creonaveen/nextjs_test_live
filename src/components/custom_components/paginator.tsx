'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

import SpinnerSvg from './SpinnerSvg';

const Paginator = ({
  pageParent,
  pageSize = 20,
  pageSizeParent,
  isAPILoad = false,
  countRow = 0,
}: any) => {
  const textColor = 'text-secondary-foreground';
  const t = useTranslations('common');

  // ✅ useQueryState for currentPage + selectedPageSize
  const [currentPage, setCurrentPage] = useQueryState<number>('page', {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });
  const [selectedPageSize, setSelectedPageSize] = useQueryState<number>('limit', {
    defaultValue: pageSize,
    parse: Number,
    serialize: String,
  });

  const [totalPage, setTotalPage] = useState(1);
  const resultLength = [5, 10, 20, 50, 80, 100]; // Add the different page size options here

  useEffect(() => {
    setTotalPage(Math.ceil(countRow / selectedPageSize));
  }, [selectedPageSize, countRow]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (pageParent) {
      pageParent(page);
    }
  };

  const handleResultPerPageChange = (e: any) => {
    const newPageSize = Number(e.target.value); // Get the selected value from dropdown
    setSelectedPageSize(newPageSize); // Update selected page size
    setCurrentPage(1); // Reset to first page when page size changes
    if (pageSizeParent) {
      pageSizeParent(newPageSize); // Pass new page size to parent
    }
    if (pageParent) {
      pageParent(1); // Reset to first page
    }
  };

  return (
    <div className="mt-4 flex w-1/2 flex-row items-center justify-end gap-[16px]">
      <div className="flex w-auto items-center justify-end">
        <label htmlFor="pageSize" className={`mr-2 text-xs font-normal ${textColor}`}>
          {t('rowsPerPage')}
        </label>
        <select
          id="pageSize"
          className={`${textColor} rounded-md border p-2`}
          value={selectedPageSize}
          onChange={handleResultPerPageChange}
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
            <p className={`${textColor} text-xs font-normal`}>
              {(currentPage - 1) * selectedPageSize + (countRow > 0 ? 1 : 0)} -
              {currentPage * selectedPageSize > countRow
                ? countRow
                : currentPage * selectedPageSize}{' '}
              {t('of')} {countRow}
            </p>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              className={`${textColor} cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`${textColor} cursor-pointer ${currentPage === totalPage ? 'pointer-events-none opacity-50' : ''}`}
              onClick={() => handlePageChange(Math.min(totalPage, currentPage + 1))}
            />
          </PaginationItem>
          <PaginationItem>{isAPILoad && <SpinnerSvg />}</PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Page Size Dropdown */}
    </div>
  );
};

export default Paginator;
