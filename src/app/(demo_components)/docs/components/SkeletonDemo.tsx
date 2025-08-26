'use client';

import { Skeleton } from '@/components/ui/skeleton';

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
    </div>
  );
}

export const skeletonExampleCode = `import { Skeleton } from "@/components/ui/skeleton"

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
    </div>
  )
}`;
