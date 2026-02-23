'use client';
import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

/**
 * Style constants for loading skeleton
 */
const SKELETON_STYLES = {
  cardContent: 'flex h-full flex-col space-y-8 p-0',
  headerContainer: 'space-y-1',
  headerRow: 'flex items-start justify-between',
  subCard: 'border-grey-100 dark:border-grey-700 rounded-lg border p-0 shadow-none',
  subCardContent: 'space-y-6 px-4 pt-4 pb-8',
  tableRow: 'flex items-center justify-between',
  tableRowWithNumber: 'flex items-center gap-2',
} as const;

function MarketCommentarySkeleton() {
  return (
    <Card className="p-5" aria-label="Loading market commentary">
      <CardContent className={SKELETON_STYLES.cardContent}>
        {/* Header */}
        <div className={SKELETON_STYLES.headerContainer}>
          <div className={SKELETON_STYLES.headerRow}>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
          </div>
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Chart Container */}
        <div className="space-y-3">
          <Card className={SKELETON_STYLES.subCard}>
            <CardContent className={SKELETON_STYLES.subCardContent}>
              {/* Company Info */}
              <div className="space-y-1">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Chart Placeholder */}
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
          {/* Caption */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
}

function TodaysCaseSkeleton() {
  return (
    <Card className="p-5" aria-label="Loading today's case">
      <CardContent className={SKELETON_STYLES.cardContent}>
        {/* Header */}
        <div className={SKELETON_STYLES.headerContainer}>
          <div className={SKELETON_STYLES.headerRow}>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
          </div>
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Chart Container */}
        <div className="space-y-3">
          <Card className={SKELETON_STYLES.subCard}>
            <CardContent className={SKELETON_STYLES.subCardContent}>
              {/* Company Info with Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>

              {/* Chart Placeholder */}
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
          {/* Caption */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
}

function NewsSkeleton() {
  return (
    <Card className="overflow-hidden p-0" aria-label="Loading news">
      <CardContent className="flex h-full min-h-[500px] flex-col space-y-2 p-0">
        {/* Image Placeholder */}
        <Skeleton className="h-1/2 w-full flex-shrink-0 rounded-none" />

        {/* Description Section */}
        <div className="flex h-1/2 flex-col justify-between px-5 pb-5">
          <div className="space-y-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          {/* Button */}
          <Skeleton className="h-9 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

function WatchlistSkeleton() {
  return (
    <Card className="p-5" aria-label="Loading watchlist">
      <CardContent className={SKELETON_STYLES.cardContent}>
        {/* Header */}
        <div className={SKELETON_STYLES.headerContainer}>
          <div className={SKELETON_STYLES.headerRow}>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
          </div>
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Table Rows */}
        <div className="flex-1 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={`watchlist-${index}`} className={SKELETON_STYLES.tableRow}>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
}

function Top50Skeleton() {
  return (
    <Card className="p-5" aria-label="Loading top 50">
      <CardContent className={SKELETON_STYLES.cardContent}>
        {/* Header */}
        <div className={SKELETON_STYLES.headerContainer}>
          <div className={SKELETON_STYLES.headerRow}>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
          </div>
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Table Rows with numbering */}
        <div className="flex-1 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={`top50-${index}`} className={SKELETON_STYLES.tableRowWithNumber}>
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-5 w-32 flex-1" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
}

function ModelPortfolioSkeleton() {
  return (
    <Card className="p-5" aria-label="Loading model portfolio">
      <CardContent className={SKELETON_STYLES.cardContent}>
        {/* Header */}
        <div className={SKELETON_STYLES.headerContainer}>
          <div className={SKELETON_STYLES.headerRow}>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
          </div>
          <Skeleton className="h-7 w-48" />
        </div>

        {/* Table Rows */}
        <div className="flex-1 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={`portfolio-${index}`} className={SKELETON_STYLES.tableRow}>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
}

export default function HomeLoading() {
  return (
    <div aria-label="Loading home page content" role="status">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Market Commentary Skeleton */}
        <MarketCommentarySkeleton />
        {/* Today's Case Skeleton */}
        <TodaysCaseSkeleton />
        {/* News Skeleton */}
        <NewsSkeleton />
        {/* Watchlist Skeleton */}
        <WatchlistSkeleton />
        {/* Top50 Skeleton */}
        <Top50Skeleton />
        {/* Model Portfolio Skeleton */}
        <ModelPortfolioSkeleton />
      </div>
    </div>
  );
}
