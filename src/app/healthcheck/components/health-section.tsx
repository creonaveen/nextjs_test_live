import { HelpCircle } from 'lucide-react';

import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { HealthReportElement } from '@/lib/types/health-check';
import { TextTagWithArrowIcon } from '@/utils/common-functions';
import { RenderHTML } from '@/utils/create-mark-up';

export default function HealthSection({
  elements,
  title,
}: {
  elements: HealthReportElement[];
  title?: string;
}) {
  const textClasses = 'text-grey-800 dark:text-grey-100';
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {/* Title */}
      {title && <span className={`${textClasses} text-2xl font-medium`}>{title ?? ''}</span>}

      {/* Elements */}
      {elements.map((element, index) => (
        <div key={`${'health-element'}-${index}`} className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-3">
                <TextTagWithArrowIcon
                  testId={`health-element-${index}`}
                  icon={element.icon_data_recommendation_style.icon}
                  color={element.icon_data_recommendation_style.color}
                  className="font-semibold"
                />
                <span className={`${textClasses} text-base font-semibold`}>
                  {element.title ?? ''}
                </span>
              </div>
              <TooltipOrSheet
                title={''}
                text={<RenderHTML html={element?.explanation ?? ''} />}
                triggerElement={
                  <HelpCircle size={18} className="text-grey-500 dark:text-grey-400" />
                }
              />
            </div>
            <span className={`${textClasses} text-sm font-normal`}>
              <RenderHTML html={element?.text_html ?? ''} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
