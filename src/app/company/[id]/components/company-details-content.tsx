'use client';

import dynamic from 'next/dynamic';
import React, { Suspense, useCallback, useMemo, useState } from 'react';

import InvesttechOwnStocks from '@/components/custom-components/investtech-own-stocks';
import { Skeleton } from 'investtech/external-components';
import { usePlatform } from '@/lib/platform';
import { CompanyDetail, CompanySectionMainChart, MainChartSectionData } from '@/lib/types/company';
import { getCompanyDetailsServerSection } from '@/store/api-service/companies-api-service';
import logger from '@/utils/logger';

import { CompanyHeader } from './header-section';
import { KeyInfoSection } from './key-info-section';
import { MobileFloatingButtons } from './mobile-floating-buttons';
import { SignalsSection } from './signals-section';

const MainChartSection = dynamic(() => import('./main-chart/main-chart-section'), {
  loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  ssr: true,
});

interface CompanyDetailsContentProps {
  data: CompanyDetail;
  onRefreshData?: (selectedProduct?: number) => Promise<void>;
  isRefetching?: boolean;
}

function useMainChartSection(data: CompanyDetail) {
  const [isRefetchingChartSection, setIsRefetchingChartSection] = useState(false);
  const [refreshedChartSectionData, setRefreshedChartSectionData] =
    useState<CompanySectionMainChart | null>(null);

  const handleRefresh = useCallback(
    async (selectedProduct?: number) => {
      try {
        setIsRefetchingChartSection(true);

        const freshData: MainChartSectionData | null = await getCompanyDetailsServerSection({
          company_id: data.company_section_header.data.general.id,
          section: 'main_chart',
          product: selectedProduct,
        });

        if (freshData) {
          setRefreshedChartSectionData(freshData.company_section_main_chart);
        }
      } catch (error) {
        logger.error('Error refetching company details', error);
      } finally {
        setIsRefetchingChartSection(false);
      }
    },
    [data.company_section_header.data.general.id]
  );

  const currentChartSectionData = useMemo(
    () => refreshedChartSectionData || data.company_section_main_chart,
    [refreshedChartSectionData, data.company_section_main_chart]
  );

  return {
    currentChartSectionData,
    handleRefresh,
    isRefetchingChartSection,
  };
}

function useMobileButtonLabels(data: CompanyDetail) {
  return useMemo(() => {
    const l = data.company_section_header.labels_and_texts;

    return {
      takeNotesLabel: l.my_notes_action,
      takeNotesTitle: l.my_notes_action,
      takeNotesPlaceholder: l.my_notes_place_holder,
      addToWatchlistLabel: l.watchlist_action_add,
      removeFromWatchlistLabel: l.watchlist_action_remove,
      addedToWatchlistLabel: l.watchlist_response_add,
      removedFromWatchlistLabel: l.watchlist_response_remove,
      addNoteLabel: l.my_notes_action_add,
      editNoteLabel: l.my_notes_action_edit,
    };
  }, [data.company_section_header.labels_and_texts]);
}

function DesktopLayout(props: {
  data: CompanyDetail;
  onRefreshData?: (selectedProduct?: number) => Promise<void>;
  isRefetching?: boolean;
  chartData: CompanySectionMainChart;
  onRefreshChart: (selectedProduct?: number) => Promise<void>;
  isRefetchingChart: boolean;
}) {
  const { data, onRefreshData, isRefetching, chartData, onRefreshChart, isRefetchingChart } = props;

  return (
    <>
      <CompanyHeader
        companyData={data.company_section_header}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
      />

      <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-lg" />}>
        <MainChartSection
          chartSectionData={chartData}
          onRefreshData={onRefreshChart}
          isRefetching={isRefetchingChart}
        />
      </Suspense>
    </>
  );
}

function MobileLayout(props: {
  data: CompanyDetail;
  onRefreshData?: (selectedProduct?: number) => Promise<void>;
  isRefetching?: boolean;
  chartData: CompanySectionMainChart;
  onRefreshChart: (selectedProduct?: number) => Promise<void>;
  isRefetchingChart: boolean;
}) {
  const { data, onRefreshData, isRefetching, chartData, onRefreshChart, isRefetchingChart } = props;

  return (
    <div className="px-0 sm:px-4">
      <div className="bg-card dark:bg-chart-background space-y-2 rounded-none py-4 sm:rounded-lg">
        <CompanyHeader
          companyData={data.company_section_header}
          onRefreshData={onRefreshData}
          isRefetching={isRefetching}
        />

        <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-lg" />}>
          <MainChartSection
            chartSectionData={chartData}
            onRefreshData={onRefreshChart}
            isRefetching={isRefetchingChart}
          />
        </Suspense>
      </div>
    </div>
  );
}

function SignalsBlock({ data }: { data: CompanyDetail }) {
  if (!data.company_section_current_signals.data.has_signals) return null;
  return <SignalsSection data={data.company_section_current_signals} />;
}

function OwnStocksBlock({ data }: { data: CompanyDetail }) {
  if (data.own_stocks !== 1 || !data.additional_texts.own_stocks_info) return null;
  return <InvesttechOwnStocks ownStocksInfo={data.additional_texts.own_stocks_info} />;
}

function DetailsBottomSections(props: {
  data: CompanyDetail;
  onRefreshData?: (selectedProduct?: number) => Promise<void>;
  isRefetching?: boolean;
  labels: ReturnType<typeof useMobileButtonLabels>;
}) {
  const { data, onRefreshData, isRefetching, labels } = props;

  return (
    <>
      <KeyInfoSection data={data.company_section_key_info} />

      <SignalsBlock data={data} />
      <OwnStocksBlock data={data} />

      <MobileFloatingButtons
        companyName={data.company_section_header.data.general.name}
        companyId={data.company_section_header.data.general.id}
        existingNote={data.company_section_header.data.my_data?.status?.n?.[0]?.note ?? null}
        isInWatchlist={Boolean(
          data.company_section_header.data.my_data?.status?.w?.[0]?.watchlist_id
        )}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        labels={labels}
      />
    </>
  );
}

export const CompanyDetailsContent = React.memo(function CompanyDetailsContent({
  data,
  onRefreshData,
  isRefetching,
}: CompanyDetailsContentProps) {
  const platform = usePlatform();

  const { currentChartSectionData, handleRefresh, isRefetchingChartSection } =
    useMainChartSection(data);

  const mobileButtonLabels = useMobileButtonLabels(data);

  const Layout = platform === 'mobile' ? MobileLayout : DesktopLayout;

  return (
    <div className="w-full space-y-1 overflow-x-hidden md:space-y-8 dark:space-y-0 dark:sm:space-y-8">
      <Layout
        data={data}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        chartData={currentChartSectionData}
        onRefreshChart={handleRefresh}
        isRefetchingChart={isRefetchingChartSection}
      />

      <DetailsBottomSections
        data={data}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        labels={mobileButtonLabels}
      />
    </div>
  );
});
