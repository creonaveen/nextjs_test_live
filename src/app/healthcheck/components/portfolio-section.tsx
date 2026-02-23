import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import { useRouter } from 'next/navigation';

import SvgRenderer from '@/components/custom-components/svg-renderer';
import { usePlatform } from '@/lib/platform';
import { StockItem } from '@/lib/types/health-check';
import { RenderHTML } from '@/utils/create-mark-up';
import { useCallback } from 'react';
import { getLanguageFromStorage } from '@/lib/utils';
import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';

interface PortfolioSectionProps {
  data: StockItem;
  chartParams: string;
  hasAccess: boolean;
  chartMaximize: number | undefined;
  showMoreLabel: string;
}

function PortfolioSectionChart({
  chartParams,
  chartMaximize,
}: {
  chartParams: string;
  chartMaximize: number | undefined;
}) {
  if (chartMaximize === 1) {
    return (
      <ChartMaximizeWithTrigger title="Portfolio Chart" apiProps={{ chart_param: chartParams }}>
        <SvgRenderer
          alt="Portfolio Chart"
          className="h-auto w-full"
          chart_params={chartParams}
          containerWidth={440}
          containerHeight={200}
        />
      </ChartMaximizeWithTrigger>
    );
  }
  return (
    <SvgRenderer
      alt="Portfolio Chart"
      className="h-auto w-full"
      chart_params={chartParams}
      containerWidth={440}
      containerHeight={200}
      chart_tooltip_id={-1}
    />
  );
}

function PortfolioSectionCardBody({
  data,
  chartParams,
  chartMaximize,
  showMoreLabel,
  isAccessibleOnMobile,
}: PortfolioSectionProps & { isAccessibleOnMobile: boolean }) {
  return (
    <CardContent className="grid grid-cols-1 items-center gap-4 px-0 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div className="col-span-1 lg:col-span-2">
        <PortfolioSectionChart chartParams={chartParams} chartMaximize={chartMaximize} />
      </div>
      <div className="col-span-1 items-center justify-start text-sm font-normal lg:col-span-2">
        <span className="text-grey-800 dark:text-grey-100">
          <RenderHTML html={data.comment_text} />
        </span>
        {isAccessibleOnMobile && (
          <span className="text-primary active:text-primary-active underline">{showMoreLabel}</span>
        )}
      </div>
    </CardContent>
  );
}

export function PortfolioSection({
  data,
  chartParams,
  hasAccess,
  chartMaximize,
  showMoreLabel,
}: PortfolioSectionProps) {
  const router = useRouter();
  const platform = usePlatform();
  const lang = getLanguageFromStorage();
  const isAccessible = hasAccess === true;
  const isAccessibleOnDesktop = hasAccess === true && platform === 'desktop';
  const isAccessibleOnMobile = hasAccess === true && platform !== 'desktop';

  const handleSeeMoreClick = useCallback(() => {
    if (isAccessible) {
      router.push(`/company/${data.company_id}?market_id=${data.market_id}&language=${lang}`);
    }
  }, [router, data.company_id, data.market_id, lang, isAccessible]);

  if (!isAccessible) return null;

  const titleClass = isAccessibleOnDesktop
    ? 'group-hover:text-primary dark:group-hover:text-primary transition-colors group-hover:underline'
    : '';

  return (
    <div className="rounded-none px-0 py-4 md:py-5 lg:pt-4 lg:pb-8">
      <Card
        className="group cursor-pointer space-y-2 py-0 lg:space-y-0"
        onClick={handleSeeMoreClick}
        role="button"
        tabIndex={0}
      >
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-medium">
            <span className={`text-grey-800 dark:text-grey-100 ${titleClass}`}>
              {data.company_name}
            </span>
          </CardTitle>
        </CardHeader>
        <PortfolioSectionCardBody
          data={data}
          chartParams={chartParams}
          hasAccess={hasAccess}
          chartMaximize={chartMaximize}
          showMoreLabel={showMoreLabel}
          isAccessibleOnMobile={isAccessibleOnMobile}
        />
      </Card>
    </div>
  );
}
