'use client';
import { Skeleton } from 'investtech/external-components';

export default function Loading() {
  return (
    <div className="w-full space-y-8">
      {/* Header Section Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-96" />
        </div>
      </div>

      {/* Author Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>
      {/* Portfolio Comments Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>

      {/* Portfolio Holdings Section Skeleton */}
      <div className="flex flex-col gap-4 space-y-4 lg:flex-row">
        <Skeleton className="h-80 w-full rounded-lg lg:w-3/4" />
        <Skeleton className="h-80 w-full rounded-lg lg:w-1/4" />
      </div>

      {/* Comment and Analysis Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>

      {/* Most Recent Sale Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-72 w-full rounded-lg" />
      </div>

      {/* Portfolio Return Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-52 w-full rounded-lg" />
      </div>

      {/* Product Help Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  );
}
