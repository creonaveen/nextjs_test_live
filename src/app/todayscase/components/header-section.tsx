'use client';

import { Button } from 'investtech/external-components';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { AboutSheet } from '@/components/custom-components/about-sheet';
import AuthorInfoBlock from '@/components/custom-components/author-info-block';
import {
  Publication,
  TodaysCaseSectionHeader,
  TodaysCaseHeaderSectionLabels,
} from '@/lib/types/todays-case';
import { RenderHTML } from '@/utils/create-mark-up';
import { TechAnalysisHeader } from '@/components/custom-components/tech-analysis-header/tech-analysis-header';

interface TodaysCaseHeaderProps {
  publication: Publication;
  todays_case_section_header: TodaysCaseSectionHeader;
  labels_and_texts: TodaysCaseHeaderSectionLabels;
}

/* =========================
   Title Section
========================= */

function TodaysCaseTitle({
  todays_case_section_header,
}: {
  todays_case_section_header: TodaysCaseSectionHeader;
}) {
  const n = useTranslations('navigation');
  const general = todays_case_section_header.data.general;

  const labelClasses =
    'text-grey-700 dark:text-grey-300 font-medium text-[10px] uppercase tracking-wide';

  return (
    <div className="flex flex-col" id="todays-case-title-wrapper">
      <p className={labelClasses} id="todays-case-subtitle">
        {n('todaysCase')} {general.date ?? ''}
      </p>
      <div className="dark:text-grey-100 text-[32px] font-medium text-black" id="page-title">
        {general.name ?? ''}
      </div>
    </div>
  );
}

/* =========================
   About Sheet (Mobile)
========================= */

function TodaysCaseAboutMobile({
  todays_case_section_header,
  labels_and_texts,
}: {
  todays_case_section_header: TodaysCaseSectionHeader;
  labels_and_texts: TodaysCaseHeaderSectionLabels;
}) {
  const data = todays_case_section_header.data;
  const hasContent =
    data.static_info.description ||
    data.sectors.sector?.name ||
    data.sectors.group?.name ||
    data.sectors.industry?.name;

  if (!hasContent) return null;

  return (
    <div className="md:hidden" id="todays-case-about-sheet-mobile">
      <AboutSheet
        static_info={data.static_info}
        labelAndTexts={labels_and_texts}
        sectors={data.sectors}
      />
    </div>
  );
}

/* =========================
   Extra Info Section
========================= */

function TodaysCaseExtraInfo({
  todays_case_section_header,
  labels_and_texts,
}: {
  todays_case_section_header: TodaysCaseSectionHeader;
  labels_and_texts: TodaysCaseHeaderSectionLabels;
}) {
  const n = useTranslations('navigation');
  const general = todays_case_section_header.data.general;

  if (!labels_and_texts.extra_info && !labels_and_texts.see_more_info) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 xl:mt-0" id="todays-case-extra-info">
      <div
        className="text-grey-800 dark:text-grey-200 text-xs font-normal md:text-base [&_div]:inline [&_p]:inline [&_span]:inline"
        id="todays-case-extra-info-text"
      >
        {labels_and_texts.extra_info && <RenderHTML html={labels_and_texts.extra_info} />}

        {labels_and_texts.see_more_info && (
          <ExtraInfoDialog
            title={`${n('todaysCase')} ${general.date ?? ''}`}
            see_more_info={labels_and_texts.see_more_info}
            see_more={labels_and_texts.see_more ?? ''}
          />
        )}
      </div>
    </div>
  );
}

/* =========================
   Main Component
========================= */

export default function TodaysCaseHeader({
  publication,
  todays_case_section_header,
  labels_and_texts,
}: TodaysCaseHeaderProps) {
  const data = todays_case_section_header.data;

  return (
    <div className="space-y-4 md:space-y-8" id="todays-case-header">
      <div
        className="flex flex-col justify-between gap-3 md:gap-2 xl:flex-row"
        id="todays-case-main-header"
      >
        <div
          className="flex w-full flex-row items-center justify-between md:w-auto md:flex-col md:items-start"
          id="todays-case-title-section"
        >
          <TodaysCaseTitle todays_case_section_header={todays_case_section_header} />
          <TodaysCaseAboutMobile
            todays_case_section_header={todays_case_section_header}
            labels_and_texts={labels_and_texts}
          />
        </div>

        <TodaysCaseExtraInfo
          todays_case_section_header={todays_case_section_header}
          labels_and_texts={labels_and_texts}
        />
      </div>

      <AuthorInfoBlock
        isLoading={false}
        authorImage={publication.author_image}
        authorName={publication.author_name}
        authorTitle={publication.author_title}
        publishedDate={publication.published_date}
        authorEmail={publication.author_email}
      />

      <TechAnalysisHeader
        price={data.price}
        static_info={data.static_info}
        sectors={data.sectors}
        recommendation={data.recommendation}
        risk={data.risk}
        labelAndTexts={todays_case_section_header.labels_and_texts}
        extraClasses="px-0"
      />
    </div>
  );
}

/* =========================
   Extra Info Dialog
========================= */

function ExtraInfoDialog({
  title,
  see_more_info,
  see_more,
}: {
  title: string;
  see_more_info: string;
  see_more: string;
}) {
  const t = useTranslations('common');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="mx-0.5 inline p-0 text-xs font-normal md:text-base"
          id="todays-case-extra-info-dialog-trigger"
        >
          {see_more.trim() !== '' ? see_more : t('seeMore')}
        </Button>
      </DialogTrigger>

      <DialogContent id="todays-case-extra-info-dialog">
        <DialogHeader id="todays-case-extra-info-dialog-header">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className="text-grey-800 dark:text-grey-200 text-xs font-normal md:text-base"
          id="todays-case-extra-info-dialog-content"
        >
          <RenderHTML html={see_more_info} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
