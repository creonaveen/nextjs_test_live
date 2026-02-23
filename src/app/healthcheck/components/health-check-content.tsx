'use client';

import { FactorDiagramContainer } from '@/components/custom-components/factor-diagram/factor-diagram-container';
import { HealthCheckResponse } from '@/lib/types/health-check';

import CorrelationAnalysisSection from './correlation-matrix-section';
import { ElementsHealth } from './elements-health-section';
import FullHealthReportSection from './full-health-report-section';
import { KeyRatiosSection } from './key-ratios-section';
import { OverallHealth } from './overall-health-section';
import { PieDonutsSection } from './pie-donuts-section';
import { PortfolioDevReportSection } from './portfolio-dev-report-section';
import { PortfolioStatisticsSection } from './portfolio-statistics-section';
import WarningsSection from './warnings-section';

interface HealthCheckContentProps {
  data: HealthCheckResponse;
}

const LAYOUT_PADDING = 'px-4 sm:px-0 ';

function HealthCheckPortfolioStats({ data }: HealthCheckContentProps) {
  const report = data.portfolio_development_report;
  if (!report?.is_available || !report?.portfolio_chart?.is_available) return null;
  return <PortfolioStatisticsSection data={report} />;
}

function HealthCheckFactorDiagram({ data }: HealthCheckContentProps) {
  if (data.factor_diagram?.active !== true) return null;
  return (
    <FactorDiagramContainer
      factor_diagram={data.factor_diagram}
      labels_and_texts={data.factor_diagram.labels}
    />
  );
}

function HealthCheckKeyRatios({ data }: HealthCheckContentProps) {
  if (!data.kpis?.has_data) return null;
  return <KeyRatiosSection data={data.kpis} />;
}

function HealthCheckElementsGrid({ data }: HealthCheckContentProps) {
  const hasFactorAndKpis = data.factor_diagram?.active === true && data.kpis?.has_data === true;
  const colClass = hasFactorAndKpis ? 'lg:col-span-1' : 'lg:col-span-2';

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-3 lg:gap-6">
      <div className={`col-span-1 ${colClass} ${LAYOUT_PADDING}`}>
        <ElementsHealth
          data={data.health_data?.elements_health_section}
          categories={data.health_data?.score_bar_data.categories}
        />
      </div>
      <HealthCheckFactorDiagram data={data} />
      <HealthCheckKeyRatios data={data} />
    </div>
  );
}

function HealthCheckWarningsMaybe({ data }: HealthCheckContentProps) {
  const warnings = data?.data_and_calculation_warnings_section;
  if (warnings?.has_warnings !== true || (warnings?.warning_count ?? 0) <= 0) return null;
  return <WarningsSection data={warnings} />;
}

function HealthCheckPiesMaybe({ data }: HealthCheckContentProps) {
  if ((data?.pies?.available_charts?.length ?? 0) <= 0) return null;
  return data?.pies ? <PieDonutsSection data={data.pies} /> : null;
}

function HealthCheckCorrelationMaybe({ data }: HealthCheckContentProps) {
  if (!data?.correlation_analysis) return null;
  return <CorrelationAnalysisSection data={data.correlation_analysis} />;
}

function HealthCheckFullReportMaybe({ data }: HealthCheckContentProps) {
  const fullReport = data?.health_data?.full_health_report_section;
  const healthData = data?.health_data;
  if (!fullReport || !healthData) return null;
  return <FullHealthReportSection data={fullReport} healthData={healthData} />;
}

function HealthCheckPortfolioDevMaybe({ data }: HealthCheckContentProps) {
  const report = data?.portfolio_development_report;
  if (!report?.is_available) return null;
  return <PortfolioDevReportSection data={report} />;
}

function HealthCheckOptionalSections({ data }: HealthCheckContentProps) {
  return (
    <>
      <HealthCheckWarningsMaybe data={data} />
      <HealthCheckPiesMaybe data={data} />
      <HealthCheckCorrelationMaybe data={data} />
      <HealthCheckFullReportMaybe data={data} />
      <HealthCheckPortfolioDevMaybe data={data} />
    </>
  );
}

export function HealthCheckContent({ data }: HealthCheckContentProps) {
  return (
    <div className="space-y-2 px-0 sm:space-y-3 sm:px-4 md:space-y-4 lg:space-y-8">
      <div
        className={`flex flex-col items-start justify-start md:mb-6 xl:flex-row xl:justify-between ${LAYOUT_PADDING}`}
      >
        <span className="page-header">{data.health_data?.overall_health_section.title ?? ''}</span>
      </div>
      <HealthCheckPortfolioStats data={data} />
      <div className={`grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3 ${LAYOUT_PADDING}`}>
        <div className="col-span-2">
          <OverallHealth
            data={data.health_data?.overall_health_section}
            categories={data.health_data?.score_bar_data.categories}
          />
        </div>
      </div>
      <HealthCheckElementsGrid data={data} />
      <HealthCheckOptionalSections data={data} />
    </div>
  );
}
