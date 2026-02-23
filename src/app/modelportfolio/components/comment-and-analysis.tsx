import { Card, CardContent } from 'investtech/external-components';
import { Link } from '@/components/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import SvgRenderer from '@/components/custom-components/svg-renderer';
import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';
import { usePlatform } from '@/lib/platform';
import { Analysis, ModelPortfolio, TextBlock } from '@/lib/types/model-portfolio';
import { RenderHTML } from '@/utils/create-mark-up';
import { getUrlWithParams } from '@/utils/navigation-utils';

import { AnalysisCard } from './analysis-card';

interface CommentAndAnalysisProps {
  data: ModelPortfolio;
  isLoading: boolean;
}

function renderAnalysisSvgImage(
  index: number,
  analysis: Analysis,
  alt: string,
  className?: string
): React.ReactNode {
  const imgParam = analysis?.chart_spec?.img_param;
  const svgId = imgParam?.id;
  if (!svgId) return null;

  const chartParams = analysis?.chart_spec?.chart_param ?? '';
  const chartTooltipId = imgParam?.chart_tooltip_id ?? -1;
  return (
    <SvgRenderer
      svg_id={svgId}
      alt={alt}
      className={className}
      chart_params={chartParams}
      chart_tooltip_id={chartTooltipId}
      testId={`comment-and-analysis-svg-${index + 1}`}
    />
  );
}

function renderGeneralTextBlock(block: TextBlock, index: number): React.ReactNode {
  if (block.type === 'text') {
    return (
      <span key={index} id={`comment-and-analysis-general-text-${index + 1}`}>
        {block.text && <RenderHTML html={block.text} />}
      </span>
    );
  }
  if (block.type === 'link') {
    return (
      <Link
        key={index}
        href={block.href || '#'}
        className="text-primary hover:text-primary/80 underline"
        id={`comment-and-analysis-link-${index + 1}`}
      >
        {block.anchor_text}
      </Link>
    );
  }
  return null;
}

interface CommentChartSectionProps {
  chart: ModelPortfolio['portfolio_return_chart'];
  showMaximize: boolean;
}

function CommentChartSection({ chart, showMaximize }: CommentChartSectionProps) {
  const imgParam = chart?.img_param;
  if (!imgParam?.id) return null;

  const svgEl = (
    <SvgRenderer
      svg_id={imgParam.id}
      alt="Comment and Analysis"
      className="w-full cursor-pointer p-1"
      chart_params={chart?.chart_param}
      show_image_border={imgParam.show_image_border}
      testId="comment-and-analysis-chart"
    />
  );

  if (showMaximize) {
    return (
      <ChartMaximizeWithTrigger
        title={imgParam.chart_maximize_title}
        enableTooltips={false}
        apiProps={{
          svg_id: imgParam.id,
          chart_param: chart?.chart_param ?? '',
        }}
      >
        <SvgRenderer
          svg_id={imgParam.id}
          alt="Comment and Analysis"
          className="w-full cursor-pointer p-1"
          chart_params={chart?.chart_param}
          show_image_border={imgParam.show_image_border}
          testId="comment-and-analysis-chart"
        />
      </ChartMaximizeWithTrigger>
    );
  }
  return svgEl;
}

interface CommentAndAnalysisTopSectionProps {
  data: ModelPortfolio;
  colViewClasses: string;
  commentHeading: string;
  showMaximize: boolean;
}

function CommentAndAnalysisTopSection({
  data,
  colViewClasses,
  commentHeading,
  showMaximize,
}: CommentAndAnalysisTopSectionProps) {
  return (
    <div className={`${colViewClasses} space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5 lg:p-5`}>
      <Card
        className="bg-grey-50 dark:bg-grey-900 w-full sm:hidden lg:block lg:w-1/2"
        id="comment-and-analysis-card"
      >
        <CardContent className="p-0 lg:px-5">
          <div className="flex flex-col gap-2">
            <span
              className="text-grey-900 dark:text-grey-200 text-lg font-semibold"
              id="comment-and-analysis-heading"
            >
              {commentHeading}
            </span>
            <span className="text-sm font-light break-words">
              {data?.portfolio_comments?.general_text?.map(renderGeneralTextBlock)}
            </span>
          </div>
        </CardContent>
      </Card>
      <div
        className="dark:bg-card border-grey-100 dark:border-grey-700 w-full rounded-md border bg-white pb-1 lg:w-1/2"
        id="comment-and-analysis-chart-card"
      >
        <CommentChartSection chart={data?.portfolio_return_chart} showMaximize={showMaximize} />
        <span className="text-grey-900 dark:text-grey-200 block p-2 text-xs font-medium">
          {data?.portfolio_return_chart?.caption}
        </span>
      </div>
    </div>
  );
}

interface CommentAndAnalysisContentProps {
  data: ModelPortfolio;
  platform: string;
  handleCardClick: (companyId: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent, companyId: number) => void;
  buttonClasses: string;
  colViewClasses: string;
  commentHeading: string;
  readMoreLabel: string;
  riskLabel: string;
}

function CommentAndAnalysisContent(props: CommentAndAnalysisContentProps) {
  const showMaximize =
    !!props.data?.portfolio_return_chart?.img_param?.chart_maximize && props.platform === 'desktop';

  return (
    <div>
      <div
        className={`${props.colViewClasses} bg-grey-50 dark:bg-grey-900 lg:dark:bg-card rounded-xl lg:bg-white`}
      >
        <CommentAndAnalysisTopSection
          data={props.data}
          colViewClasses={props.colViewClasses}
          commentHeading={props.commentHeading}
          showMaximize={showMaximize}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 lg:mt-0 lg:grid-cols-2 lg:px-5">
          {props.data?.portfolio_comments?.analyses?.map((analysis: Analysis, index: number) => (
            <AnalysisCard
              key={analysis.company_id || index}
              analysis={analysis}
              index={index}
              analystRecommendationTitle={props.data?.headers?.analyst_recommendation ?? ''}
              onCardClick={props.handleCardClick}
              onCardKeyDown={props.handleCardKeyDown}
              buttonClasses={props.buttonClasses}
              colViewClasses={props.colViewClasses}
              renderSvg={renderAnalysisSvgImage}
              readMoreLabel={props.readMoreLabel}
              riskLabel={props.riskLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentAndAnalysisLoading({
  loadingLabel,
  colViewClasses,
}: {
  loadingLabel: string;
  colViewClasses: string;
}) {
  return (
    <div>
      <Card className={`${colViewClasses} h-full`}>
        <div className="flex flex-1 items-center justify-center gap-2">
          <div className="border-grey-400 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
          <span className="text-sm font-medium">{loadingLabel}...</span>
        </div>
      </Card>
    </div>
  );
}

/**
 * Component for displaying portfolio comments and analysis
 *
 * @param data - Model portfolio data containing comments and analyses
 * @param isLoading - Whether data is currently loading
 */
export default function CommentAndAnalysis({ data, isLoading }: CommentAndAnalysisProps) {
  const router = useRouter();
  const c = useTranslations('common');
  const m = useTranslations('modelPortfolio');
  const platform = usePlatform();
  const searchParams = useSearchParams();
  const buttonClasses = 'inline cursor-pointer p-0 m-0 h-auto underline';
  const colViewClasses = 'flex flex-col';

  const handleCardClick = React.useCallback(
    (companyId: number) => {
      if (companyId) {
        router.push(getUrlWithParams(`/company/${companyId}`, searchParams));
      }
    },
    [router, searchParams]
  );

  const handleCardKeyDown = React.useCallback(
    (e: React.KeyboardEvent, companyId: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(companyId);
      }
    },
    [handleCardClick]
  );

  return isLoading ? (
    <CommentAndAnalysisLoading loadingLabel={c('loading')} colViewClasses={colViewClasses} />
  ) : (
    <CommentAndAnalysisContent
      data={data}
      platform={platform}
      handleCardClick={handleCardClick}
      handleCardKeyDown={handleCardKeyDown}
      buttonClasses={buttonClasses}
      colViewClasses={colViewClasses}
      commentHeading={m('commentAndAnalysis')}
      readMoreLabel={c('readMore')}
      riskLabel={m('risk')}
    />
  );
}
