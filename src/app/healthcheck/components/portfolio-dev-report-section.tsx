'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';

import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { PortfolioDevelopmentReport } from '@/lib/types/health-check';
import { RenderHTML } from '@/utils/create-mark-up';

import { PortfolioSection } from './portfolio-section';

interface PortfolioDevReportSectionProps {
  data: PortfolioDevelopmentReport;
}

function getChartMaximizeFromTemplate(template: string): number | undefined {
  if (!template) {
    return undefined;
  }

  const queryString = template.startsWith('?') ? template.slice(1) : template;
  const params = new URLSearchParams(queryString);
  const chartMaximizeValue = params.get('chart_maximize');
  if (chartMaximizeValue !== null) {
    return +chartMaximizeValue;
  }

  return undefined;
}

const accordionTextClasses = 'text-grey-800 dark:text-grey-100 font-normal text-xs';
const accordionTriggerClasses = 'dark:border-grey-700 cursor-pointer rounded-none';

function PortfolioDevReportHelpCard({
  main_report,
}: {
  main_report: PortfolioDevelopmentReport['main_report'];
}) {
  return (
    <Card className="bg-primary-background dark:bg-card col-span-1 hidden p-0 lg:col-span-1 lg:block">
      <Accordion type="single" collapsible>
        <AccordionItem value="help-data">
          <div className="px-6 pb-2">
            <AccordionTrigger className={`${accordionTriggerClasses} border-grey-300 border-b`}>
              <div className="flex w-full flex-col gap-2 text-left">
                <span className="text-lg font-semibold">{main_report.help_data.title ?? ''}</span>
                {main_report.help_data.text_primary && (
                  <span className={accordionTextClasses}>
                    <RenderHTML html={main_report.help_data.text_primary ?? ''} />
                  </span>
                )}
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6">
            <div className="flex flex-col gap-4">
              <span className={accordionTextClasses}>
                <RenderHTML html={main_report.help_data.text_secondary ?? ''} />
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

function PortfolioDevReportSecondaryStocks({
  stocks,
  isOpen,
  onOpenChange,
  labels,
}: {
  stocks: PortfolioDevelopmentReport['main_report']['stocks']['stocks'];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  labels: PortfolioDevelopmentReport['main_report']['stocks']['labels'];
}) {
  if (stocks.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? 'secondary-stocks' : ''}
      onValueChange={(value) => onOpenChange(value === 'secondary-stocks')}
    >
      <AccordionItem value="secondary-stocks">
        <AccordionTrigger
          className={`${accordionTriggerClasses} border-grey-200 border-t data-[state=open]:border-b`}
        >
          {isOpen ? (labels.show_fewer_items ?? '') : (labels.show_more_items ?? '')}
        </AccordionTrigger>
        <AccordionContent>
          {stocks.map((stock, index) => (
            <div key={`${stock.ticker ?? 'stock'}-${index}`}>
              <PortfolioSection
                data={stock}
                chartParams={stock.chart_api_param_stock + stock.chart_api_param_common}
                hasAccess={stock.has_access}
                chartMaximize={getChartMaximizeFromTemplate(stock.chart_api_param_common)}
                showMoreLabel={labels.show_more_items ?? ''}
              />
              {index < stocks.length - 1 && <hr className="horizontal-divider py-0" />}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const devReportTextClasses = 'text-grey-800 dark:text-grey-100';

function PortfolioDevReportCardHeader({
  main_report,
}: {
  main_report: PortfolioDevelopmentReport['main_report'];
}) {
  return (
    <CardHeader>
      <span className="text-grey-700 dark:text-grey-300 text-xs uppercase">
        {main_report.sub_title ?? ''}
      </span>
      <div className="flex flex-1 items-center justify-between">
        <CardTitle className="text-2xl font-medium">{main_report.title ?? ''}</CardTitle>
        <TooltipOrSheet
          title={main_report.help_data.title ?? ''}
          text={
            <span className="dark:text-grey-100 text-sm font-normal text-black">
              <RenderHTML html={main_report.help_data.text_secondary ?? ''} />
            </span>
          }
          triggerElement={
            <InfoIcon size={20} className="text-grey-700 dark:text-grey-300 lg:hidden" />
          }
        />
      </div>
    </CardHeader>
  );
}

function PortfolioDevReportStocksList({
  main_report,
  stocksToDisplay,
  secondaryStocks,
  isAccordionOpen,
  setIsAccordionOpen,
}: {
  main_report: PortfolioDevelopmentReport['main_report'];
  stocksToDisplay: PortfolioDevelopmentReport['main_report']['stocks']['stocks'];
  secondaryStocks: PortfolioDevelopmentReport['main_report']['stocks']['stocks'];
  isAccordionOpen: boolean;
  setIsAccordionOpen: (open: boolean) => void;
}) {
  return (
    <>
      {stocksToDisplay.map((stock, index) => (
        <div key={`${stock.ticker}`}>
          <PortfolioSection
            data={stock}
            chartParams={stock.chart_api_param_stock + stock.chart_api_param_common}
            hasAccess={stock.has_access}
            chartMaximize={getChartMaximizeFromTemplate(stock.chart_api_param_common)}
            showMoreLabel={main_report.stocks.labels.show_more ?? ''}
          />
          {index < stocksToDisplay.length - 1 && <hr className="horizontal-divider py-0" />}
        </div>
      ))}
      {secondaryStocks.length > 0 && (
        <div className="mt-2 md:mt-5">
          <PortfolioDevReportSecondaryStocks
            stocks={secondaryStocks}
            isOpen={isAccordionOpen}
            onOpenChange={setIsAccordionOpen}
            labels={main_report.stocks.labels}
          />
        </div>
      )}
    </>
  );
}

function PortfolioDevReportMainCard({
  main_report,
  stocksToDisplay,
  secondaryStocks,
  isAccordionOpen,
  setIsAccordionOpen,
}: {
  main_report: PortfolioDevelopmentReport['main_report'];
  stocksToDisplay: PortfolioDevelopmentReport['main_report']['stocks']['stocks'];
  secondaryStocks: PortfolioDevelopmentReport['main_report']['stocks']['stocks'];
  isAccordionOpen: boolean;
  setIsAccordionOpen: (open: boolean) => void;
}) {
  return (
    <Card className="col-span-1 gap-2 rounded-none px-4 py-3 sm:rounded-xl sm:p-5 md:gap-3 lg:col-span-2 lg:gap-4">
      <PortfolioDevReportCardHeader main_report={main_report} />
      <CardContent className="px-0">
        <div className={`${devReportTextClasses} flex flex-col gap-2 text-sm font-normal`}>
          <RenderHTML html={main_report.ingress_full ?? ''} />
        </div>
        <PortfolioDevReportStocksList
          main_report={main_report}
          stocksToDisplay={stocksToDisplay}
          secondaryStocks={secondaryStocks}
          isAccordionOpen={isAccordionOpen}
          setIsAccordionOpen={setIsAccordionOpen}
        />
      </CardContent>
    </Card>
  );
}

export function PortfolioDevReportSection({ data }: PortfolioDevReportSectionProps) {
  const { main_report } = data;
  const numStocks = main_report.stocks.num_stocks;
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const stocksToDisplay =
    numStocks > 5 ? main_report.stocks.stocks.slice(0, 5) : main_report.stocks.stocks;
  const secondaryStocks = numStocks > 5 ? main_report.stocks.stocks.slice(5) : [];

  return (
    <div
      id="portfolio-development-report-section"
      className="grid flex-1 grid-cols-1 gap-2 md:gap-4 lg:grid-cols-3 lg:gap-6"
    >
      <PortfolioDevReportMainCard
        main_report={main_report}
        stocksToDisplay={stocksToDisplay}
        secondaryStocks={secondaryStocks}
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      <PortfolioDevReportHelpCard main_report={main_report} />
    </div>
  );
}
