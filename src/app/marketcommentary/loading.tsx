'use client';
import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

/**
 * HeaderSkeleton Component
 *
 * Renders the header section skeleton
 */
function HeaderSkeleton() {
  return (
    <div className="mb-8 flex flex-col items-start justify-start gap-4 xl:flex-row xl:justify-between">
      <Skeleton className="h-10 w-48" />
      <div className="flex flex-col items-start justify-start gap-2 md:flex-row lg:items-center lg:justify-center">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

/**
 * CompanyCardSkeleton Component
 *
 * Renders a single company card skeleton
 */
function CompanyCardSkeleton({ index }: { index: number }) {
  return (
    <Card key={index} className="border-grey-100 dark:border-grey-700 h-full border">
      <CardContent className="flex flex-col gap-2 px-4 py-4 pb-8">
        {/* Company Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-row items-center justify-between gap-5 md:flex-col md:items-start">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-row gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>
          {/* Badge Card */}
          <Card className="w-full rounded-xl px-3 py-3 md:w-2/5 md:px-4 md:pt-4">
            <div className="flex flex-row items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <div className="mt-4 flex flex-col items-center gap-3">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </Card>
        </div>

        {/* Chart Skeleton */}
        <Skeleton className="h-64 w-full py-8" />

        {/* Text Skeleton */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * StatisticsTableSkeleton Component
 *
 * Renders a single statistics table skeleton
 */
function StatisticsTableSkeleton({ index }: { index: number }) {
  return (
    <Card key={index}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Table Header */}
          <Skeleton className="mb-5 h-6 w-32" />
          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((rowIndex) => (
            <div key={rowIndex} className="flex justify-between border-b pb-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="w-full space-y-4">
      <HeaderSkeleton />

      {/* Company Cards Section Skeleton */}
      <Card>
        <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 lg:px-10 lg:py-4">
          {[1, 2, 3, 4].map((index) => (
            <CompanyCardSkeleton key={index} index={index} />
          ))}
        </div>
      </Card>

      {/* Statistics Tables Section Skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <StatisticsTableSkeleton key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
