'use client';
import { Card } from 'investtech/external-components';

export default function SessionExpirySkeleton() {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4">
      <Card className="w-full max-w-md space-y-11 p-6">
        <div className="animate-pulse">
          {/* Logo Skeleton */}
          <div className="h-8 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />

          {/* Title and Message skeleton */}
          <div className="mt-11 space-y-2">
            <div className="h-8 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Button skeleton */}
          <div className="mt-11 h-10 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </Card>
    </div>
  );
}
