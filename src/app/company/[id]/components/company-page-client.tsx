'use client';

import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CompanyDetail } from '@/lib/types/company';
import { getLanguageFromStorage } from '@/lib/utils';
import { getCompanyDetailsServer } from '@/store/api-service/companies-api-service';
import logger from '@/utils/logger';

import CompanyPageLoading from '../loading';

import { CompanyDetailsContent } from './company-details-content';
import { MarketIdSync } from './market-id-sync';

interface CompanyPageClientProps {
  data: CompanyDetail;
}

function useLanguageSync() {
  const [language, setLanguage] = useState<string>(() => getLanguageFromStorage());
  const [queryLanguage] = useQueryState('language');

  useEffect(() => {
    if (queryLanguage) {
      setLanguage(queryLanguage);
    }
  }, [queryLanguage]);

  return language;
}

function useCompanyRefresh(data: CompanyDetail, language: string) {
  const [isRefetching, setIsRefetching] = useState(false);
  const [refreshedData, setRefreshedData] = useState<CompanyDetail | null>(null);

  const handleRefresh = useCallback(
    async (selectedProduct?: number) => {
      try {
        setIsRefetching(true);

        const freshData = await getCompanyDetailsServer({
          company_id: data.company_section_header.data.general.id,
          lang: language,
          product: selectedProduct,
        });

        if (freshData) {
          setRefreshedData(freshData);
        }
      } catch (error) {
        logger.error('Error refetching company details', error);
      } finally {
        setIsRefetching(false);
      }
    },
    [data.company_section_header.data.general.id, language]
  );

  const currentData = useMemo(() => refreshedData || data, [refreshedData, data]);

  return { currentData, handleRefresh, isRefetching };
}

export function CompanyPageClient({ data }: CompanyPageClientProps) {
  const [isSyncComplete, setIsSyncComplete] = useState(false);

  const language = useLanguageSync();
  const { currentData, handleRefresh, isRefetching } = useCompanyRefresh(data, language);

  const handleSyncComplete = useCallback(() => {
    setIsSyncComplete(true);
  }, []);

  return (
    <>
      <MarketIdSync companyMarketId={data.market.market_id} onSyncComplete={handleSyncComplete} />

      {!isSyncComplete ? (
        <CompanyPageLoading />
      ) : (
        <CompanyDetailsContent
          data={currentData}
          onRefreshData={handleRefresh}
          isRefetching={isRefetching}
        />
      )}
    </>
  );
}
