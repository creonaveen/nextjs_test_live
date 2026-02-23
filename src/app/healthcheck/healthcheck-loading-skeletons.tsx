'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

function ElementHealthSectionSkeleton() {
  return (
    <div className="col-span-1">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-6 w-full rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-3 flex flex-col items-start gap-3">
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-10 w-full sm:w-48" />
        </CardFooter>
      </Card>
    </div>
  );
}

function FactorDiagramSkeleton() {
  return (
    <div className="col-span-1">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}

function KPIsSectionSkeleton() {
  return (
    <div className="col-span-1">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ElementHealthSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-3 lg:gap-6">
      <ElementHealthSectionSkeleton />
      <FactorDiagramSkeleton />
      <KPIsSectionSkeleton />
    </div>
  );
}

export function WarningsSkeleton() {
  return (
    <div className="px-4 sm:px-0">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="border-grey-200 dark:border-grey-700 flex items-start gap-3 rounded-lg border p-4"
              >
                <Skeleton className="size-5 shrink-0 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PieChartsSkeleton() {
  return (
    <div className="px-4 sm:px-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <Skeleton className="aspect-square w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CorrelationAnalysisSkeleton() {
  return (
    <div className="px-4 sm:px-0">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-2">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FullHealthReportSkeleton() {
  return (
    <div className="px-4 sm:px-0">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="px-4 sm:px-0">
      <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-52" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="border-grey-100 dark:border-grey-700 flex items-center gap-4 border-b pb-4"
              >
                <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-20 w-32 shrink-0 rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
