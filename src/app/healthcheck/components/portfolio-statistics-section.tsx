'use client';

import { Button } from 'investtech/external-components';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import { Label } from 'investtech/external-components';
import { RadioGroupItem } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableRow } from 'investtech/external-components';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { useEffect, useState } from 'react';

import SvgRenderer from '@/components/custom-components/svg-renderer';
import {
  PortfolioDevelopmentReport,
  ReturnPctItem,
  TimeSpanOption,
} from '@/lib/types/health-check';
import { RenderHTML } from '@/utils/create-mark-up';

function updateChartParams(baseParams: string, link: string): string {
  const queryString = baseParams.startsWith('?') ? baseParams.slice(1) : baseParams;
  const params = new URLSearchParams(queryString);
  params.delete('mnths');
  params.delete('ytd');
  params.delete('years');
  const linkString = link.startsWith('&') ? link.slice(1) : link;
  const linkParams = new URLSearchParams(linkString);
  linkParams.forEach((value, key) => {
    params.set(key, value);
  });
  return params.toString();
}

function getInitialChartValues(portfolio_chart: PortfolioDevelopmentReport['portfolio_chart']) {
  const options = portfolio_chart.time_span.options;
  if (options) {
    const selectedKey = portfolio_chart.time_span.selected;
    const selectedOption = options[selectedKey as keyof typeof portfolio_chart.time_span.options];
    if (selectedOption) {
      const baseUrl = portfolio_chart.chart_spec.chart_api_param;
      return {
        selectedTimeSpan: selectedOption.name,
        chartParams: updateChartParams(baseUrl, selectedOption.link),
      };
    }
  }
  return {
    selectedTimeSpan: undefined as string | undefined,
    chartParams: portfolio_chart.chart_spec.chart_api_param,
  };
}

function PortfolioStatisticsTable({
  returnPct,
}: {
  returnPct: PortfolioDevelopmentReport['portfolio_statistics']['return_pct'];
}) {
  return (
    <div className="bg-background col-span-1 rounded-xl p-5">
      <Table>
        <TableBody>
          {returnPct.map((statistic: ReturnPctItem) => (
            <TableRow
              showHover={false}
              key={statistic.label}
              className="border-grey-100 dark:border-grey-700 border-b"
            >
              <TableCell className="text-left">{statistic.label}</TableCell>
              <TableCell className="numeric-table-cell text-right">{statistic.port}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PortfolioStatisticsTimeSpanChart({
  portfolio_chart,
  selectedTimeSpan,
  onTimeSpanChange,
  chartParams,
}: {
  portfolio_chart: PortfolioDevelopmentReport['portfolio_chart'];
  selectedTimeSpan: string | undefined;
  onTimeSpanChange: (value: string) => void;
  chartParams: string;
}) {
  return (
    <div className="col-span-1 flex flex-col gap-4 lg:col-span-2 lg:px-5">
      <RadioGroup
        className="flex flex-row items-center justify-between"
        value={selectedTimeSpan}
        onValueChange={onTimeSpanChange}
      >
        {Object.values(portfolio_chart.time_span.options).map(
          (time_span: TimeSpanOption) =>
            time_span.is_active === true && (
              <div key={time_span.name} className="flex items-center space-x-2">
                <RadioGroupItem id={time_span.name} value={time_span.name} className="size-5" />
                <Label htmlFor={time_span.name}>{time_span.label}</Label>
              </div>
            )
        )}
      </RadioGroup>
      <SvgRenderer alt="Portfolio Chart" className="h-auto w-full" chart_params={chartParams} />
    </div>
  );
}

function usePortfolioChartParams(portfolio_chart: PortfolioDevelopmentReport['portfolio_chart']) {
  const initialValues = getInitialChartValues(portfolio_chart);
  const [selectedTimeSpan, setSelectedTimeSpan] = useState<string | undefined>(
    initialValues.selectedTimeSpan
  );
  const [chartParams, setChartParams] = useState<string>(initialValues.chartParams);

  useEffect(() => {
    if (!selectedTimeSpan || !portfolio_chart.time_span.options) return;
    const matchingOption = Object.values(portfolio_chart.time_span.options).find(
      (option: TimeSpanOption) => option.name === selectedTimeSpan
    );
    if (matchingOption) {
      setChartParams(
        updateChartParams(portfolio_chart.chart_spec.chart_api_param, matchingOption.link)
      );
    }
  }, [
    selectedTimeSpan,
    portfolio_chart.chart_spec.chart_api_param,
    portfolio_chart.time_span.options,
  ]);

  const handleTimeSpanChange = (value: string) => {
    setSelectedTimeSpan(value);
    const matchingOption = Object.values(portfolio_chart.time_span.options).find(
      (option: TimeSpanOption) => option.name === value
    );
    if (matchingOption) {
      setChartParams(
        updateChartParams(portfolio_chart.chart_spec.chart_api_param, matchingOption.link)
      );
    }
  };

  return { selectedTimeSpan, chartParams, handleTimeSpanChange };
}

function PortfolioStatisticsCard({
  data,
  selectedTimeSpan,
  chartParams,
  onTimeSpanChange,
}: {
  data: PortfolioDevelopmentReport;
  selectedTimeSpan: string | undefined;
  chartParams: string;
  onTimeSpanChange: (value: string) => void;
}) {
  const { ingress, portfolio_statistics, portfolio_chart } = data;
  const handleHelpClick = () => {
    document.getElementById('portfolio-development-report-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <Card className="space-y-4 rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
      <CardHeader>
        <CardTitle className="text-xl font-medium">{ingress.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-grey-800 dark:text-grey-50 flex flex-col gap-6 px-0 text-sm">
        <div className="flex flex-col gap-3">
          <RenderHTML html={ingress.ingress_main} />
          <RenderHTML html={ingress.ingress_full} />
        </div>
        <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-3">
          <PortfolioStatisticsTimeSpanChart
            portfolio_chart={portfolio_chart}
            selectedTimeSpan={selectedTimeSpan}
            onTimeSpanChange={onTimeSpanChange}
            chartParams={chartParams}
          />
          <PortfolioStatisticsTable returnPct={portfolio_statistics.return_pct} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleHelpClick}>
          Help
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PortfolioStatisticsSection({ data }: { data: PortfolioDevelopmentReport }) {
  const { portfolio_chart } = data;
  const { selectedTimeSpan, chartParams, handleTimeSpanChange } =
    usePortfolioChartParams(portfolio_chart);

  return (
    <div>
      <PortfolioStatisticsCard
        data={data}
        selectedTimeSpan={selectedTimeSpan}
        chartParams={chartParams}
        onTimeSpanChange={handleTimeSpanChange}
      />
    </div>
  );
}
