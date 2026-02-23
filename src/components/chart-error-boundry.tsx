'use client';

import { Skeleton } from 'investtech/external-components';
import React from 'react';

import logger from '@/utils/logger';

import { ErrorBoundary } from './error-boundry';

interface ChartErrorBoundaryProps {
  children: React.ReactNode;
  chartName?: string;
}

/**
 * Specialized Error Boundary for Chart Components
 *
 * Provides a chart-specific fallback UI when chart rendering fails.
 *
 * @example
 * ```tsx
 * <ChartErrorBoundary chartName="Main Chart">
 *   <MainChartSection />
 * </ChartErrorBoundary>
 * ```
 */
export function ChartErrorBoundary({ children, chartName = 'Chart' }: ChartErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="border-destructive/50 bg-destructive/10 flex flex-col items-center justify-center rounded-lg border p-8">
          <h3 className="text-destructive mb-2 text-lg font-semibold">
            Failed to load {chartName}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            There was an error loading the chart. Please try refreshing the page.
          </p>
        </div>
      }
      onError={(error, errorInfo) => {
        // Log chart-specific errors
        logger.error(`ChartErrorBoundary: ${chartName} error`, error, {
          chartName,
          errorInfo: {
            componentStack: errorInfo.componentStack,
          },
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Chart Error Boundary with Skeleton Fallback
 *
 * Shows a skeleton loader while the chart is loading or if it fails.
 */
export function ChartErrorBoundaryWithSkeleton({
  children,
  chartName = 'Chart',
}: ChartErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={<Skeleton className="h-[500px] w-full rounded-lg" />}
      onError={(error, errorInfo) => {
        logger.error(`ChartErrorBoundary: ${chartName} error`, error, {
          chartName,
          errorInfo: {
            componentStack: errorInfo.componentStack,
          },
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
