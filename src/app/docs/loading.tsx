'use client';
import { Skeleton } from 'investtech/external-components';

export default function Loading() {
  return (
    <div className="flex flex-1 items-start justify-center gap-4 lg:gap-6">
      <Skeleton className="h-[80vh] w-full md:w-3/4" />
      <Skeleton className="hidden h-[60vh] w-1/4 md:block" />
    </div>
  );
}
