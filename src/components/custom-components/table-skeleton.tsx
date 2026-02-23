import { TableBody, TableRow, TableCell } from 'investtech/external-components';

/**
 * Props for TableSkeleton component
 */
interface TableSkeletonProps {
  /** Number of skeleton rows to display (default: 8) */
  rows?: number;
  /** Number of columns in the table */
  columns: number;
}

/**
 * TableSkeleton - Loading skeleton component for tables
 *
 * Displays animated skeleton placeholders for table rows and cells.
 * Provides visual feedback while table data is loading.
 *
 * @example
 * ```tsx
 * <TableSkeleton rows={10} columns={5} />
 * ```
 */
const TableSkeleton = ({ rows = 8, columns }: TableSkeletonProps) => {
  return (
    <TableBody aria-busy="true" aria-label="Loading table data">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => {
            let textAlign = 'text-center'; // default middle
            let justify = 'justify-center';
            if (colIndex === 0 || colIndex === 1) {
              textAlign = 'text-right'; // first col
              justify = 'justify-start';
            }
            if (colIndex === columns - 1) {
              textAlign = 'text-left'; // last col
              justify = 'justify-end';
            }

            return (
              <TableCell key={colIndex} className={textAlign}>
                <div className={`flex ${justify}`}>
                  <div className="bg-accent-1 h-5 w-3/4 max-w-[120px] animate-pulse rounded-md" />
                </div>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
