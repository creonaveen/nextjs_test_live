'use client';
import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

function MainChartSectionSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Chart tabs/controls */}
          <div className="flex flex-wrap items-center justify-end">
            <div className="flex gap-2">
              <Skeleton className="h-9 w-18" />
              <Skeleton className="h-9 w-18" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>

          {/* Chart area */}
          <Skeleton className="h-[400px] w-full md:h-[500px]" />

          {/* Chart period selector */}
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-9 w-16" />
            ))}
          </div>

          {/* Additional chart info */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KeyInfoSectionSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Section title */}
          <Skeleton className="h-7 w-40" />

          {/* Key info grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CompanyInfoDetailsSectionSkeleton() {
  return (
    <Card className="col-span-1 rounded-xl p-3 md:col-span-2 md:px-5 md:pt-5 md:pb-8">
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Close Price Section */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>

          {/* About the Company Section */}
          <div className="hidden space-y-3 md:block">
            <Skeleton className="h-5 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Sector Section */}
          <div className="hidden space-y-3 lg:block">
            <Skeleton className="h-5 w-20" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CompanyInformationSectionSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      {/* Company Information Details Section */}
      <CompanyInfoDetailsSectionSkeleton />

      {/* Investtech Score Section */}
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 text-center">
            <div className="flex w-full justify-between gap-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-42" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SignalsSectionSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Section title */}
          <Skeleton className="h-7 w-48" />

          {/* Signals grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border-grey-200 dark:border-grey-700">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CompanyPageLoading() {
  return (
    <div className="w-full space-y-8 px-4 md:px-6">
      {/* Company Header Section Skeleton */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left side - Company info */}
        {/* Company name and ticker */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-64" />
        </div>

        {/* Right side - Action buttons */}
        <div className="hidden flex-wrap gap-2 md:flex">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Company Information and Score Section */}
      <CompanyInformationSectionSkeleton />

      {/* Main Chart Section Skeleton */}
      <MainChartSectionSkeleton />

      {/* Key Info Section Skeleton */}
      <KeyInfoSectionSkeleton />

      {/* Signals Section Skeleton */}
      <SignalsSectionSkeleton />
    </div>
  );
}

export function TechnicalCommentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
