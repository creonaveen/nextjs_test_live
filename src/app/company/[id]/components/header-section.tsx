'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { AboutSheet } from '@/components/custom-components/about-sheet';
import { TechAnalysisHeader } from '@/components/custom-components/tech-analysis-header/tech-analysis-header';
import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';
import { useThrottle } from '@/lib/hooks/use-throttle';
import { usePlatform } from '@/lib/platform';
import {
  CompanySectionHeader,
  CompanySectionHeaderData,
  General,
  HeaderLabelsAndTexts,
  MyData,
} from '@/lib/types/company';

import { AddToWatchlist } from './add-to-watchlist';
import { CompanyMobileStickyHeader } from './company-mobile-sticky-header';
import { TakeNotesSheet } from './sheet-components/take-notes-sheet';

interface CompanyHeaderProps {
  companyData: CompanySectionHeader;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
}

function useMobileScrollState(platform: string) {
  const { isVisible } = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useThrottle(() => {
    setIsScrolled(window.scrollY > 0);
  }, 100);

  useEffect(() => {
    if (platform === 'mobile') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, platform]);

  return {
    showStickyHeader: !isVisible,
    isScrolled,
  };
}

function MobileStickyHeader({
  general,
  show,
  isScrolled,
}: {
  general: General;
  show: boolean;
  isScrolled: boolean;
}) {
  return <CompanyMobileStickyHeader general={general} isVisible={show} isScrolled={isScrolled} />;
}

function DesktopActions({
  general,
  myData,
  labels,
  onRefreshData,
  isRefetching,
}: {
  general: General;
  myData: MyData;
  labels: HeaderLabelsAndTexts;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
}) {
  return (
    <div className="hidden gap-3 md:flex">
      <TakeNotesSheet
        companyName={general.name}
        companyId={general.id}
        existingNote={myData?.status?.n?.[0]?.note ?? null}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        labels={{
          placeholder: labels.my_notes_place_holder,
          addNoteLabel: labels.my_notes_action_add,
          editNoteLabel: labels.my_notes_action_edit,
        }}
      />

      <AddToWatchlist
        companyId={general.id}
        companyName={general.name}
        isInWatchlist={Boolean(myData?.status?.w?.[0]?.watchlist_id)}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        labels={{
          addToWatchlistLabel: labels.watchlist_action_add,
          removeFromWatchlistLabel: labels.watchlist_action_remove,
          addedToWatchlistLabel: labels.watchlist_response_add,
          removedFromWatchlistLabel: labels.watchlist_response_remove,
        }}
      />
    </div>
  );
}

function HeaderTopRow({
  general,
  data,
  labels,
  onRefreshData,
  isRefetching,
}: {
  general: General;
  data: CompanySectionHeaderData;
  labels: HeaderLabelsAndTexts;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
}) {
  const hasAboutInfo = Boolean(
    data.static_info.description ||
    data.sectors.sector?.name ||
    data.sectors.group?.name ||
    data.sectors.industry?.name
  );

  return (
    <div className="flex items-center justify-between px-4 md:px-6">
      <div className="flex w-full flex-row justify-between md:w-auto md:flex-col">
        <div>
          <p className="text-grey-700 dark:text-grey-300 text-[10px] font-medium uppercase">
            {general.ticker_full}
          </p>
          <div className="dark:text-grey-100 text-grey-900 text-[24px] font-bold sm:text-[32px] sm:font-medium">
            {general.name}
          </div>
        </div>

        {hasAboutInfo && (
          <div className="md:hidden">
            <AboutSheet
              static_info={data.static_info}
              labelAndTexts={labels}
              sectors={data.sectors}
            />
          </div>
        )}
      </div>

      <DesktopActions
        general={general}
        myData={data.my_data}
        labels={labels}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
      />
    </div>
  );
}

function HeaderAnalysisSection({
  data,
  labels,
}: {
  data: CompanySectionHeaderData;
  labels: HeaderLabelsAndTexts;
}) {
  return (
    <TechAnalysisHeader
      price={data.price}
      static_info={data.static_info}
      sectors={data.sectors}
      recommendation={data.recommendation}
      factor_diagram_thumb={data.factor_diagram_thumb}
      risk={data.risk}
      labelAndTexts={labels}
      extraClasses="px-4 md:px-6"
    />
  );
}

function CompanyHeaderView({
  platform,
  general,
  data,
  labels,
  showStickyHeader,
  isScrolled,
  onRefreshData,
  isRefetching,
}: {
  platform: string;
  general: General;
  data: CompanySectionHeaderData;
  labels: HeaderLabelsAndTexts;
  showStickyHeader: boolean;
  isScrolled: boolean;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
}) {
  return (
    <>
      {platform === 'mobile' && (
        <MobileStickyHeader general={general} show={showStickyHeader} isScrolled={isScrolled} />
      )}

      <HeaderTopRow
        general={general}
        data={data}
        labels={labels}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
      />

      <HeaderAnalysisSection data={data} labels={labels} />
    </>
  );
}

export const CompanyHeader = React.memo(function CompanyHeader({
  companyData,
  onRefreshData,
  isRefetching,
}: CompanyHeaderProps) {
  const platform = usePlatform();
  const scroll = useMobileScrollState(platform);

  return (
    <CompanyHeaderView
      platform={platform}
      general={companyData.data.general}
      data={companyData.data}
      labels={companyData.labels_and_texts}
      onRefreshData={onRefreshData}
      isRefetching={isRefetching}
      {...scroll}
    />
  );
});
