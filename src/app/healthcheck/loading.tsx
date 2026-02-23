'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

import {
  CorrelationAnalysisSkeleton,
  ElementHealthSkeleton,
  FullHealthReportSkeleton,
  PieChartsSkeleton,
  PortfolioSkeleton,
  WarningsSkeleton,
} from './healthcheck-loading-skeletons';

function HealthCheckLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 px-4 sm:px-0 lg:grid-cols-3 lg:gap-3">
      <div className="col-span-2">
        <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-8 w-full rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function HealthCheckLoadingSkeletonContent() {
  return (
    <>
      <HealthCheckLoadingSkeleton />
      <ElementHealthSkeleton />
      <WarningsSkeleton />
      <PieChartsSkeleton />
      <CorrelationAnalysisSkeleton />
      <FullHealthReportSkeleton />
      <PortfolioSkeleton />
    </>
  );
}

export default function HealthCheckLoading() {
  return (
    <div className="space-y-2 px-0 sm:space-y-3 sm:px-4 md:space-y-4 lg:space-y-8">
      <div className="flex flex-col items-start justify-start px-4 sm:px-0 md:mb-6 xl:flex-row xl:justify-between">
        <Skeleton className="h-8 w-64" />
      </div>
      <HealthCheckLoadingSkeletonContent />
    </div>
  );
}
