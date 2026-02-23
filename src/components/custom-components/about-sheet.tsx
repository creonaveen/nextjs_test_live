'use client';

import { Sheet, SheetHeader, SheetTrigger, SheetContent } from 'investtech/external-components';
import { Badge } from 'investtech/external-components';
import { CircleAlert } from 'lucide-react';
import { Link } from '@/components/link';
import React from 'react';

import { LabelsAndTexts, Sectors, StaticInfo } from '@/lib/types/shared-components';

/**
 * AboutSheet - Sheet component displaying company information
 *
 * Displays company description, URL, source, and sector information in a bottom sheet.
 * Used primarily on mobile devices for displaying detailed company information.
 *
 * @example
 * ```tsx
 * <AboutSheet
 *   static_info={staticInfo}
 *   labelAndTexts={labels}
 *   sectors={sectors}
 * />
 * ```
 */
const SectorDisplay = ({
  sectors,
  labelAndTexts,
  labelClasses,
}: {
  sectors: Sectors;
  labelAndTexts: LabelsAndTexts;
  labelClasses: string;
}) => {
  const sectorItems = [
    { key: 'sector', data: sectors.sector },
    { key: 'group', data: sectors.group },
    { key: 'industry', data: sectors.industry },
  ].filter(({ data }) => data?.name && data.name.trim() !== '');

  if (sectorItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2" id="about-sheet-sectors">
      <p className={`${labelClasses} uppercase`} id="about-sheet-sector-label">
        {labelAndTexts.sector ?? ''}
      </p>
      {sectorItems.map(({ key, data }, index) => (
        <Badge
          key={key}
          variant="neutral"
          className="break-words whitespace-normal"
          id={`about-sheet-sector-${index + 1}`}
          title={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${data.name}`}
        >
          {data.name}
        </Badge>
      ))}
    </div>
  );
};

const CompanyContent = ({
  static_info,
  labelAndTexts,
  primaryTextClasses,
}: {
  static_info: StaticInfo;
  labelAndTexts: LabelsAndTexts;
  primaryTextClasses: string;
}) => (
  <div className="flex flex-col gap-2" id="about-sheet-content">
    {static_info.description && (
      <>
        <p
          className="text-grey-700 dark:text-grey-300 text-[10px] font-medium tracking-wide uppercase"
          id="about-sheet-label"
        >
          {labelAndTexts.about_company}
        </p>
        <p
          className="dark:text-grey-100 text-xs leading-relaxed font-normal text-black"
          id="about-sheet-description"
        >
          {static_info.description}
        </p>
        {static_info.company_url && (
          <div className="flex items-center" id="about-sheet-company-url">
            <Link
              href={`https://${static_info.company_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium underline"
            >
              {static_info.company_url}
            </Link>
          </div>
        )}
      </>
    )}
    <p className={`${primaryTextClasses}`} id="about-sheet-source">
      {static_info.source && `${labelAndTexts.source ?? ''}: ${static_info.source ?? ''}`}
    </p>
  </div>
);

export const AboutSheet = React.memo(function AboutSheet({
  static_info,
  labelAndTexts,
  sectors,
}: {
  static_info: StaticInfo;
  labelAndTexts: LabelsAndTexts;
  sectors: Sectors;
}) {
  const primaryTextClasses = 'text-grey-800 dark:text-grey-50 font-normal text-xs';
  const labelClasses =
    'text-grey-700 dark:text-grey-300 font-medium text-[10px] uppercase tracking-wide';

  return (
    <Sheet>
      <SheetTrigger asChild id="about-sheet-trigger">
        <CircleAlert
          className="dark:text-grey-100 h-6 w-6 cursor-pointer text-black"
          aria-label={labelAndTexts.about_company || 'Company information'}
        />
      </SheetTrigger>

      <SheetContent className="mt-4 px-5 pt-5 pb-[48px]" side="bottom">
        <SheetHeader className="mb-4 py-0"></SheetHeader>
        <div className="space-y-6">
          <CompanyContent
            static_info={static_info}
            labelAndTexts={labelAndTexts}
            primaryTextClasses={primaryTextClasses}
          />

          <SectorDisplay
            sectors={sectors}
            labelAndTexts={labelAndTexts}
            labelClasses={labelClasses}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
});
