'use client';

import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';
import React from 'react';

import logger from '@/utils/logger';

import { ErrorBoundary } from './error-boundry';

interface TableErrorBoundaryProps {
  children: React.ReactNode;
  tableName?: string;
}

/**
 * Specialized Error Boundary for Table Components
 *
 * Provides a table-specific fallback UI when table rendering fails.
 *
 * @example
 * ```tsx
 * <TableErrorBoundary tableName="Stocks Table">
 *   <StocksTable />
 * </TableErrorBoundary>
 * ```
 */
export function TableErrorBoundary({ children, tableName = 'Table' }: TableErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <Card className="border-destructive m-4">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <h3 className="text-destructive mb-2 text-lg font-semibold">
                Failed to load {tableName}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                There was an error loading the table data. Please try refreshing the page.
              </p>
            </div>
          </CardContent>
        </Card>
      }
      onError={(error, errorInfo) => {
        // Log table-specific errors
        logger.error(`TableErrorBoundary: ${tableName} error`, error, { errorInfo });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Table Error Boundary with Skeleton Fallback
 *
 * Shows a skeleton loader while the table is loading or if it fails.
 */
export function TableErrorBoundaryWithSkeleton({
  children,
  tableName = 'Table',
}: TableErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      }
      onError={(error, errorInfo) => {
        logger.error(`TableErrorBoundary: ${tableName} error`, error, { errorInfo });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
