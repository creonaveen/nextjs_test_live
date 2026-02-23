'use client';

import { Card } from 'investtech/external-components';

import type { CompanySectionMainChart } from '@/lib/types/company';

import {
  MainChartHeader,
  MainChartContentArea,
  MainChartTechnicalComment,
} from './main-chart-section-parts';
import { useMainChartSection } from './use-main-chart-section';

interface MainChartSectionProps {
  chartSectionData: CompanySectionMainChart;
  onRefreshData?: (selectedProduct?: number) => Promise<void>;
  isRefetching?: boolean;
}

export default function MainChartSection({
  chartSectionData,
  onRefreshData,
  isRefetching,
}: MainChartSectionProps) {
  const props = useMainChartSection({ chartSectionData, onRefreshData, isRefetching });

  return (
    <div className="px-0 md:px-6">
      <Card
        className="bg-card dark:md:bg-card space-y-2 overflow-hidden rounded-none p-0 pt-1 sm:rounded-xl sm:px-5 md:space-y-6 md:p-5 dark:bg-transparent"
        id="main-chart-card"
      >
        <MainChartHeader
          selectedTimeSpan={props.selectedTimeSpan}
          timeSpanOptions={props.timeSpanOptions}
          userSettingsStore={props.userSettingsStore}
          labelsAndTexts={props.labelsAndTexts}
          onTimeSpanChange={props.handleTimeSpanChange}
          onIndicatorToggle={props.handleIndicatorToggle}
          onTooltipChange={props.handleTooltipChange}
        />
        <MainChartContentArea
          chartContainerRef={props.chartContainerRef}
          rsiChartContainerRef={props.rsiChartContainerRef}
          main_chart={props.main_chart}
          rsi_chart={props.rsi_chart}
          companyId={props.companyId}
          platform={props.platform}
          userSettingsStore={props.userSettingsStore}
          updatedMainChartParam={props.updatedMainChartParam}
          currentTooltipSetting={props.currentTooltipSetting}
          mainChartData={props.mainChartData}
          mainChartIsLoading={props.mainChartIsLoading}
          rsiChartData={props.rsiChartData}
          rsiChartIsLoading={props.rsiChartIsLoading}
          chartContainerClasses={props.chartContainerClasses}
          labelsAndTexts={props.labelsAndTexts}
        />
        <MainChartTechnicalComment
          isRefetching={props.isRefetching}
          labelsAndTexts={props.labelsAndTexts}
          technical_comment={props.technical_comment}
        />
      </Card>
    </div>
  );
}
