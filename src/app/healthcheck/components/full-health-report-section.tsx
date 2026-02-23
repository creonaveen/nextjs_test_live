import { InfoIcon } from 'lucide-react';

import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import type {
  FullHealthReportSection as FullHealthReportSectionData,
  HealthData,
  HealthReportSection,
  TipsSection,
} from '@/lib/types/health-check';
import { RenderHTML } from '@/utils/create-mark-up';

import HealthSection from './health-section';
import { OverallHealth } from './overall-health-section';

const accordionTextClasses = 'text-grey-800 dark:text-grey-100 font-normal text-xs';
const accordionTriggerClasses = 'dark:border-grey-700 cursor-pointer rounded-none';

function FullHealthReportHelpTooltipContent({ data }: { data: FullHealthReportSectionData }) {
  return (
    <div className="max-h-[calc(100svh-300px)] overflow-y-auto pr-2">
      <div className="flex flex-col gap-2">
        <span className="dark:text-grey-100 text-lg font-semibold text-black">
          {data.help_data.title ?? ''}
        </span>
        <span className="dark:text-grey-100 text-xs font-normal text-black">
          {data.help_data.text_primary ?? ''}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {data.help_data.text_secondary.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            {item.heading && (
              <span className="dark:text-grey-100 text-lg font-medium text-black">
                <RenderHTML html={item.heading ?? ''} />
              </span>
            )}
            <span className="dark:text-grey-100 text-sm font-normal text-black">
              {item.text && <RenderHTML html={item.text ?? ''} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullHealthReportSectionItem({
  sectionKey,
  section,
  index,
}: {
  sectionKey: string;
  section: HealthReportSection | TipsSection;
  index: number;
}) {
  if (sectionKey === 'tips') {
    const tipsSection = section as TipsSection;
    return (
      <div key={sectionKey + index}>
        <HealthSection
          elements={tipsSection.primary_tips_elements || []}
          title={tipsSection.title ?? ''}
        />
        {tipsSection.secondary_count > 0 && (
          <div className="mt-2 md:mt-5">
            <Accordion type="single" collapsible>
              <AccordionItem value="tips-details">
                <AccordionTrigger
                  className={`${accordionTriggerClasses} border-grey-200 border-t data-[state=open]:border-b`}
                >
                  {tipsSection.expand_label ?? ''}
                </AccordionTrigger>
                <AccordionContent className="mt-5">
                  <HealthSection elements={tipsSection.secondary_tips_elements || []} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    );
  }
  const healthSection = section as HealthReportSection;
  return (
    <div key={sectionKey + index}>
      <HealthSection elements={healthSection.elements || []} title={healthSection.title ?? ''} />
      <hr className="horizontal-divider my-2 md:my-5" />
    </div>
  );
}

function FullHealthReportHelpAccordion({ data }: { data: FullHealthReportSectionData }) {
  return (
    <Card className="bg-primary-background dark:bg-card col-span-1 hidden p-0 lg:col-span-1 lg:block">
      <Accordion type="single" collapsible>
        <AccordionItem value="help-data">
          <div className="px-6 pb-3">
            <AccordionTrigger className={`${accordionTriggerClasses} border-grey-300 border-b`}>
              <div className="flex w-full flex-col gap-2 text-left">
                <span className="text-lg font-semibold">{data.help_data.title ?? ''}</span>
                <span className={accordionTextClasses}>{data.help_data.text_primary ?? ''}</span>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6">
            <div className="flex flex-col gap-4">
              {data.help_data.text_secondary.map((item, index) => (
                <div key={`${'full-health-report-help-data'}-${index}`} className="flex flex-col">
                  {item.heading && (
                    <span className="text-lg font-medium">
                      <RenderHTML html={item.heading ?? ''} />
                    </span>
                  )}
                  {item.text && (
                    <span className={accordionTextClasses}>
                      <RenderHTML html={item.text ?? ''} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

const smallBoldTextClasses = 'font-semibold text-sm text-grey-800 dark:text-grey-50';

function FullHealthReportCardHeader({ data }: { data: FullHealthReportSectionData }) {
  return (
    <CardHeader>
      <span className="text-grey-700 text-xs uppercase dark:text-gray-300">
        {data.header.sub_title ?? ''}
      </span>
      <div className="flex flex-1 items-center justify-between">
        <CardTitle className="text-2xl font-medium">{data.header.title ?? ''}</CardTitle>
        <TooltipOrSheet
          title={null}
          text={<FullHealthReportHelpTooltipContent data={data} />}
          triggerElement={
            <InfoIcon size={20} className="text-grey-700 dark:text-grey-300 lg:hidden" />
          }
        />
      </div>
    </CardHeader>
  );
}

function FullHealthReportMainCard({
  data,
  healthData,
  sections,
}: {
  data: FullHealthReportSectionData;
  healthData: HealthData;
  sections: Record<string, HealthReportSection | TipsSection>;
}) {
  return (
    <Card className="col-span-1 rounded-none px-4 py-3 sm:rounded-xl sm:p-5 lg:col-span-2">
      <FullHealthReportCardHeader data={data} />
      <CardContent className="px-0">
        <div className="mt-4 flex flex-col gap-5">
          <span className={smallBoldTextClasses}>{data.header.portfolio_composition ?? ''}</span>
          <OverallHealth
            data={healthData.overall_health_section}
            categories={healthData.score_bar_data.categories}
          />
          <span className={smallBoldTextClasses}>{data.header.summary_text ?? ''}</span>
          <span className={smallBoldTextClasses}>{data.header.disclaimer ?? ''}</span>
        </div>
        <hr className="horizontal-divider mt-4 mb-3 md:my-6" />
        <div className="flex flex-col gap-2">
          {Object.entries(sections).map(([sectionKey, section], index) => (
            <FullHealthReportSectionItem
              key={sectionKey + index}
              sectionKey={sectionKey}
              section={section}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function FullHealthReportSection({
  data,
  healthData,
}: {
  data: FullHealthReportSectionData;
  healthData: HealthData;
}) {
  const sections = data?.sections || {};
  return (
    <div
      id="full-health-report-section"
      className="grid flex-1 grid-cols-1 gap-2 md:gap-4 lg:grid-cols-3 lg:gap-6"
    >
      <FullHealthReportMainCard data={data} healthData={healthData} sections={sections} />
      <FullHealthReportHelpAccordion data={data} />
    </div>
  );
}
