'use client';

import { Card, CardContent, Skeleton } from 'investtech/external-components';

import { sanitizeSvg } from '@/utils/sanitize-svg';

export function LoadingCard() {
  return (
    <Card className="w-full rounded-lg p-0 shadow-none">
      <CardContent className="px-4 pt-4 pb-8">
        <Skeleton className="bg-grey-200 dark:bg-grey-700 h-[200px] w-full" />
      </CardContent>
    </Card>
  );
}

export function SvgRendererContent({
  showLoading,
  showError,
  hasData,
  error,
  data,
  alt,
  e,
}: {
  showLoading: boolean;
  showError: boolean;
  hasData: boolean;
  error: Error | null;
  data: { raw_svg: string } | null;
  alt: string;
  e: (key: string) => string;
}) {
  if (showLoading) return <LoadingCard />;

  if (showError) {
    return (
      <div className="text-error-text flex items-center justify-center">
        {error?.message ?? e('imageLoadError')}
      </div>
    );
  }

  if (hasData && data) {
    return (
      <div
        className="dark:bg-chart-background h-full w-full overflow-hidden rounded-xl [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(data.raw_svg) }}
      />
    );
  }

  return (
    <div className="text-error-text flex items-center justify-center">
      {e('imageLoadError') ?? alt}
    </div>
  );
}
