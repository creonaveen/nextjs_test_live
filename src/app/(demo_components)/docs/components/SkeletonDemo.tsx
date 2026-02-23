import { Skeleton } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableRow } from 'investtech/external-components';

function BasicSkeleton() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Basic Skeleton</h4>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Card Skeleton</h4>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Profile Skeleton</h4>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Table Skeleton</h4>
      <Table>
        <TableBody>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <TableCell key={colIndex} className={colIndex === 4 - 1 ? 'text-left' : ''}>
                  <div
                    className={`flex items-center ${colIndex === 4 - 1 ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="bg-accent-1 h-5 w-3/4 max-w-[120px] animate-pulse rounded-md" />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className="space-y-8">
      <BasicSkeleton />
      <CardSkeleton />
      <ProfileSkeleton />
      <TableSkeleton />
    </div>
  );
}

export const skeletonExampleCode = `import { Skeleton } from "@/components/external-components/skeleton"

export function SkeletonDemo() {
  return (
    <div className="space-y-8">
      {/* Basic Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Basic Skeleton</h4>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>

      {/* Card Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Card Skeleton</h4>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* Profile Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Profile Skeleton</h4>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Table Skeleton</h4>
        <Table>
          <TableBody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <TableCell key={colIndex} className={colIndex === 4 - 1 ? 'text-left' : ''}>
                    <div
                      className={\`flex items-center \${colIndex === 4 - 1 ? 'justify-end' : 'justify-start'}\`}
                    >
                      <div className="bg-accent-1 h-5 w-3/4 max-w-[120px] animate-pulse rounded-md" />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`;
