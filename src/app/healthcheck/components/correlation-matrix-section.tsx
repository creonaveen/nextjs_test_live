import { InfoIcon } from 'lucide-react';

import { CorrelationMatrix } from '@/components/custom-components/table-with-popover';
import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import type { CorrelationAnalysisSection as CorrelationAnalysisSectionData } from '@/lib/types/health-check';
import { RenderHTML } from '@/utils/create-mark-up';

function CorrelationHelpAccordion({
  data,
  accordionTextClasses,
}: {
  data: CorrelationAnalysisSectionData;
  accordionTextClasses: string;
}) {
  return (
    <Card className="bg-primary-background dark:bg-card col-span-1 hidden p-0 lg:col-span-1 lg:block">
      <Accordion type="single" collapsible defaultValue="help-data">
        <AccordionItem value="help-data">
          <div className="px-6 pb-2">
            <AccordionTrigger className="border-grey-300 dark:border-grey-700 cursor-pointer rounded-none border-b text-lg font-semibold">
              <div className="flex w-full flex-col gap-2 text-left">
                <span className="text-base font-semibold">{data.help_data.title ?? ''}</span>
                {data.help_data.text_primary && (
                  <span className={accordionTextClasses}>
                    <RenderHTML html={data.help_data.text_primary ?? ''} />
                  </span>
                )}
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-6">
            <div className="flex flex-col gap-4">
              <span className={accordionTextClasses}>
                <RenderHTML html={data.help_data.text_secondary ?? ''} />
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default function CorrelationAnalysisSection({
  data,
}: {
  data: CorrelationAnalysisSectionData;
}) {
  const captionClass = 'mb-2 w-full text-sm font-semibold';
  const accordionTextClasses = 'text-grey-800 dark:text-grey-100 font-normal text-xs';

  return (
    <div className="grid flex-1 grid-cols-1 gap-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
      <Card className="col-span-1 rounded-none px-4 py-3 sm:rounded-xl sm:p-5 lg:col-span-2">
        <CardHeader className="flex flex-1 items-center justify-between">
          <CardTitle className="text-lg font-semibold">{data.title ?? ''}</CardTitle>
          <TooltipOrSheet
            title={data.help_data.title ?? ''}
            text={
              <span className="dark:text-grey-100 text-sm font-normal text-black">
                <RenderHTML html={data.help_data.text_secondary ?? ''} />
              </span>
            }
            triggerElement={
              <InfoIcon size={20} className="text-grey-700 dark:text-grey-300 lg:hidden" />
            }
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-0">
          <CorrelationMatrix data={data} />
          <div className="flex flex-col gap-2">
            <div className={captionClass}>{data.highlights_text ?? ''}</div>
            <div className={captionClass}>{data.details_text ?? ''}</div>
          </div>
        </CardContent>
      </Card>
      <CorrelationHelpAccordion data={data} accordionTextClasses={accordionTextClasses} />
    </div>
  );
}
