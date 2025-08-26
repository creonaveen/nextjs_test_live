import { TableBody, TableRow, TableCell } from '../ui/table';

interface TableSkeletonProps {
  rows?: number;
  columns: number;
}

const TableSkeleton = ({ rows = 8, columns }: TableSkeletonProps) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} className={colIndex === columns - 1 ? 'text-left' : ''}>
              <div
                className={`flex items-center ${colIndex === columns - 1 ? 'justify-end' : 'justify-start'}`}
              >
                <div className="bg-accent h-5 w-3/4 max-w-[120px] animate-pulse rounded-md" />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
