'use client';

import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

function CompanyInformationDetailsSectionSkeleton() {
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
          <div className="hidden space-y-3 md:block">
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

function HeaderSectionSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      {/* Company Information Details Section */}
      <CompanyInformationDetailsSectionSkeleton />

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

function InsiderTradesTableSkeleton() {
  return (
    <Card className="dark:bg-grey-900 w-full overflow-hidden py-0 lg:p-5 lg:py-6 dark:mt-6">
      <CardContent className="space-y-3 px-0 lg:p-0 dark:px-6 dark:py-4 dark:lg:px-0 dark:lg:py-4">
        {/* Table Header */}
        <div className="flex gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ChartSectionSkeleton() {
  return (
    <Card className="bg-card overflow-hidden p-5">
      <CardContent className="space-y-3 p-0 md:space-y-6">
        {/* Analysis Title and Text */}
        <div className="space-y-4 md:space-y-6">
          <Skeleton className="h-7 w-2/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Main Chart */}
        <Skeleton className="h-[200px] w-full rounded-lg md:h-[500px]" />

        {/* Insider Chart */}
        <Skeleton className="h-[100px] w-full rounded-lg md:h-[140px]" />

        {/* Caption */}
        <Skeleton className="h-3 w-64" />

        {/* Insider Trades Table */}
        <InsiderTradesTableSkeleton />

        {/* Caption and Button */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-48" />
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

function LatestReportsSectionSkeleton() {
  return (
    <Card className="bg-card overflow-hidden p-5">
      <CardContent className="space-y-4 p-0">
        {/* Section Title */}
        <Skeleton className="h-6 w-48" />

        {/* Reports Table */}
        <div className="space-y-3">
          {/* Table Header */}
          <div className="flex gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Table Rows */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex gap-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-end pt-2">
          <Skeleton className="h-10 w-40" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="w-full space-y-4 md:space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left side - Company info */}
        {/* Company name and ticker */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-64" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <Skeleton className="h-24 w-full" />
        </div>
      </div>

      {/* Header Section Skeleton */}
      <HeaderSectionSkeleton />

      {/* Chart and Analysis Section Skeleton */}
      <ChartSectionSkeleton />

      {/* Latest Reports Section Skeleton */}
      <LatestReportsSectionSkeleton />
    </div>
  );
}
