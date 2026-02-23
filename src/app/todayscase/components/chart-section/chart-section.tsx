'use client';

import { Button } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';

import { CompanySectionMainChart, LabelsAndTexts } from '@/lib/types/todays-case';
import { RenderHTML } from '@/utils/create-mark-up';
import { ChartSectionInsiderTable } from '../chart-section/chart-section-insider-table';
import { MainChartBlock, InsiderChartBlock } from '../chart-section/chart-section-charts';
import { useChartSectionState } from './use-chart-section-state';

interface ChartSectionProps {
  company_section_main_chart: CompanySectionMainChart;
  labels_and_texts: LabelsAndTexts;
  id: string;
}

const CHART_CONTAINER_CLASSES =
  'bg-card dark:bg-chart-background overflow-hidden p-0 dark:rounded-sm dark:sm:rounded-md dark:lg:rounded-xl';
const CAPTION_CLASSES = 'text-grey-800 dark:text-grey-50 font-normal text-xs';

function ChartSectionAnalysis({
  analysis_title,
  analysis_text,
}: {
  analysis_title: string;
  analysis_text: string;
}) {
  return (
    <div className="space-y-4 md:space-y-6" id="todays-case-analysis-section">
      <div
        className="dark:text-grey-50 text-lg font-semibold text-black"
        id="todays-case-analysis-title"
      >
        {analysis_title}
      </div>
      <div
        className="text-grey-800 dark:text-grey-200 text-sm font-normal"
        id="todays-case-analysis-text"
      >
        <RenderHTML html={analysis_text} />
      </div>
    </div>
  );
}

function ChartSectionInsiderAndFooter({
  insider_trade_table,
  id,
  labels_and_texts,
  readMoreLabel,
}: {
  insider_trade_table: CompanySectionMainChart['insider_trade_table'];
  id: string;
  labels_and_texts: LabelsAndTexts;
  readMoreLabel: string;
}) {
  return (
    <>
      {insider_trade_table?.data?.length > 0 && (
        <ChartSectionInsiderTable insider_trade_table={insider_trade_table} />
      )}
      {insider_trade_table && (
        <div
          className="flex items-center justify-between"
          id="todays-case-insider-table-caption-section"
        >
          <p className={CAPTION_CLASSES} id="todays-case-insider-table-caption">
            {insider_trade_table.caption ?? ''}
          </p>
        </div>
      )}
      {id && (
        <div className="flex justify-end" id="todays-case-read-more-section">
          <Link href={`/company/${id}`}>
            <Button variant="outline" id="todays-case-read-more-btn">
              {labels_and_texts.read_more ?? readMoreLabel}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

function ChartSectionContent({
  state,
  technical_comment,
  insider_trade_table,
  id,
  labels_and_texts,
  readMoreLabel,
}: {
  state: ReturnType<typeof useChartSectionState>;
  technical_comment: { analysis_title?: string; analysis_text: string };
  insider_trade_table: CompanySectionMainChart['insider_trade_table'];
  id: string;
  labels_and_texts: LabelsAndTexts;
  readMoreLabel: string;
}) {
  return (
    <CardContent className="space-y-3 p-0 md:space-y-6" id="todays-case-chart-content">
      {technical_comment.analysis_title && (
        <ChartSectionAnalysis
          analysis_title={technical_comment.analysis_title}
          analysis_text={technical_comment.analysis_text}
        />
      )}
      <MainChartBlock
        main_chart={state.main_chart}
        chartContainerRef={state.chartContainerRef}
        mainChartData={state.mainChartData}
        mainChartIsLoading={state.mainChartIsLoading}
        platform={state.platform}
        chartContainerClasses={CHART_CONTAINER_CLASSES}
      />
      <InsiderChartBlock
        insider_chart={state.insider_chart}
        insiderChartContainerRef={state.insiderChartContainerRef}
        insiderChartData={state.insiderChartData}
        insiderChartIsLoading={state.insiderChartIsLoading}
        chartContainerClasses={CHART_CONTAINER_CLASSES}
        captionClasses={CAPTION_CLASSES}
      />
      <ChartSectionInsiderAndFooter
        insider_trade_table={insider_trade_table}
        id={id}
        labels_and_texts={labels_and_texts}
        readMoreLabel={readMoreLabel}
      />
    </CardContent>
  );
}

export default function ChartSection({
  company_section_main_chart,
  labels_and_texts,
  id,
}: ChartSectionProps) {
  const t = useTranslations('common');
  const { technical_comment } = company_section_main_chart?.data ?? {};
  const { insider_trade_table } = company_section_main_chart ?? {};
  const state = useChartSectionState(company_section_main_chart);
  return (
    <div className="space-y-6" id="todays-case-chart-section">
      <Card className="bg-card overflow-hidden p-5" id="todays-case-chart-card">
        <ChartSectionContent
          state={state}
          technical_comment={technical_comment}
          insider_trade_table={insider_trade_table}
          id={id}
          labels_and_texts={labels_and_texts}
          readMoreLabel={t('readMore')}
        />
      </Card>
    </div>
  );
}
