'use client';

import { Suspense } from 'react';

import TableSkeleton from '@/components/custom-components/table-skeleton';
import type { Top50TableProps } from '@/app/top50/components/top50-table-types';
import { Top50TableContent } from '@/app/top50/components/top50-table-content';
import { useTop50TableState } from '@/app/top50/components/use-top50-table-state';

/**
 * Top50Table Component
 *
 * Main component for displaying the Top 50 stocks table with filtering and sorting capabilities.
 * Supports buy/sell candidates, time span filtering, and pagination.
 */
export function Top50Table({ serverData }: Top50TableProps) {
  const state = useTop50TableState();
  const { limitFromUrl, platform } = state;

  return (
    <Suspense
      fallback={<TableSkeleton rows={limitFromUrl} columns={platform === 'mobile' ? 3 : 4} />}
    >
      <Top50TableContent serverData={serverData} {...state} />
    </Suspense>
  );
}
