'use client';

import { CardContent, CardFooter, CardHeader } from 'investtech/external-components';
import { Label } from 'investtech/external-components';
import { RadioGroup, RadioGroupItem } from 'investtech/external-components';

import { ChartErrorBoundary } from '@/components/chart-error-boundry';
import { Chart, MainChart } from '@/lib/types/company';

import { TechnicalCommentSkeleton } from '../../loading';
import { RenderHTML } from '@/utils/create-mark-up';
import { MainChartSvgBlock, RsiChartBlock } from './main-chart-section-svg-block';
import { SettingsSheet } from '../sheet-components/settings-sheet';

import type { MainChartSettings } from '@/lib/types/user-settings';
import type { CompanySectionMainChart, TechnicalComment } from '@/lib/types/company';

export interface MainChartHeaderProps {
  selectedTimeSpan: number | undefined;
  timeSpanOptions: Array<{ value: string; label: string; id: string }>;
  userSettingsStore: { main_chart_settings?: MainChartSettings } | null;
  labelsAndTexts: CompanySectionMainChart['labels_and_texts'];
  onTimeSpanChange: (value: string) => void;
  onIndicatorToggle: (indicatorId: number) => void;
  onTooltipChange: (tooltipSetting: number) => void;
}

export function MainChartHeader({
  selectedTimeSpan,
  timeSpanOptions,
  userSettingsStore,
  labelsAndTexts,
  onTimeSpanChange,
  onIndicatorToggle,
  onTooltipChange,
}: MainChartHeaderProps) {
  return (
    <CardHeader
      className="flex flex-row items-center justify-between gap-4 px-4 pb-2 sm:px-0 sm:pb-0 md:justify-end md:px-6"
      id="main-chart-header"
    >
      <RadioGroup
        value={selectedTimeSpan?.toString() ?? ''}
        onValueChange={onTimeSpanChange}
        className="flex flex-row items-center justify-between"
        id="timespan-radio-group"
      >
        {timeSpanOptions.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2"
            id={`timespan-option-${option.value}`}
          >
            <RadioGroupItem value={option.value} id={option.id} className="size-5" />
            <Label
              htmlFor={option.id}
              className={`text-xs font-normal ${selectedTimeSpan?.toString() === option.value ? 'text-grey-900 dark:text-grey-50' : 'text-grey-600 dark:text-grey-300'}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {userSettingsStore?.main_chart_settings && (
        <SettingsSheet
          main_chart_settings={userSettingsStore.main_chart_settings}
          labelsAndTexts={labelsAndTexts}
          onIndicatorToggle={onIndicatorToggle}
          onSettingsChange={onTooltipChange}
        />
      )}
    </CardHeader>
  );
}

export interface MainChartContentAreaProps {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  rsiChartContainerRef: React.RefObject<HTMLDivElement | null>;
  main_chart: MainChart;
  rsi_chart: Chart;
  companyId: string;
  platform: 'mobile' | 'desktop';
  userSettingsStore: { update_info?: { chart_tooltip_id?: number } } | null;
  updatedMainChartParam: string | undefined;
  currentTooltipSetting: number | undefined;
  mainChartData: { raw_svg?: string } | undefined;
  mainChartIsLoading: boolean;
  rsiChartData: { raw_svg?: string } | undefined;
  rsiChartIsLoading: boolean;
  chartContainerClasses: string;
  labelsAndTexts: CompanySectionMainChart['labels_and_texts'];
}

export function MainChartContentArea(props: MainChartContentAreaProps) {
  return (
    <CardContent className="px-0" id="main-chart-content">
      <div className="relative">
        <div className="flex">
          <div className="flex-1">
            <ChartErrorBoundary chartName="Main Chart">
              <MainChartSvgBlock
                chartContainerRef={props.chartContainerRef}
                main_chart={props.main_chart}
                companyId={props.companyId}
                platform={props.platform}
                userSettingsStore={props.userSettingsStore}
                updatedMainChartParam={props.updatedMainChartParam}
                currentTooltipSetting={props.currentTooltipSetting}
                mainChartData={props.mainChartData}
                mainChartIsLoading={props.mainChartIsLoading}
                chartContainerClasses={props.chartContainerClasses}
                labelsAndTexts={props.labelsAndTexts}
              />
            </ChartErrorBoundary>
            {props.rsi_chart.active && (
              <ChartErrorBoundary chartName="RSI Chart">
                <RsiChartBlock
                  rsiChartContainerRef={props.rsiChartContainerRef}
                  rsiChartData={props.rsiChartData}
                  rsiChartIsLoading={props.rsiChartIsLoading}
                  chartContainerClasses={props.chartContainerClasses}
                />
              </ChartErrorBoundary>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  );
}

export interface MainChartTechnicalCommentProps {
  isRefetching: boolean | undefined;
  labelsAndTexts: CompanySectionMainChart['labels_and_texts'];
  technical_comment: TechnicalComment;
}

export function MainChartTechnicalComment({
  isRefetching,
  labelsAndTexts,
  technical_comment,
}: MainChartTechnicalCommentProps) {
  if (isRefetching) {
    return <TechnicalCommentSkeleton />;
  }
  return (
    <CardFooter className="px-4 sm:px-0" id="main-chart-technical-comment">
      <div className="space-y-2">
        <h3
          className="dark:text-grey-50 text-lg font-semibold text-black"
          id="technical-analysis-title"
        >
          {labelsAndTexts.algorithmic_technical_analysis ?? ''},{' '}
          {technical_comment.time_span_string ?? ''}
        </h3>
        <div
          className="dark:text-grey-100 text-sm leading-relaxed font-normal text-black"
          id="technical-analysis-content"
        >
          <RenderHTML html={technical_comment.analysis ?? ''} />
        </div>
      </div>
    </CardFooter>
  );
}
