import InvesttechOwnStocks from '@/components/custom-components/investtech-own-stocks';
import { TodaysCaseData } from '@/lib/types/todays-case';

import ChartSection from './chart-section/chart-section';
import HeaderSection from './header-section';
import LatestReportsTable from './latest-report/latest-reports';

interface TodaysCaseDetailsProps {
  data: TodaysCaseData;
}

export default function TodaysCaseDetails({ data }: TodaysCaseDetailsProps) {
  const {
    publication,
    todays_case_section_header,
    company_section_main_chart,
    labels_and_texts,
    latest_reports,
  } = data;

  return (
    <div className="w-full space-y-4 md:space-y-8">
      {/*  Header Section */}
      <HeaderSection
        publication={publication}
        todays_case_section_header={todays_case_section_header}
        labels_and_texts={todays_case_section_header.labels_and_texts}
      />

      {/* Chart and Analysis Section */}
      <ChartSection
        company_section_main_chart={company_section_main_chart}
        labels_and_texts={labels_and_texts}
        id={todays_case_section_header?.data?.general?.id ?? ''}
      />

      {todays_case_section_header.data.own_stocks &&
        todays_case_section_header.data.own_stocks === 1 &&
        todays_case_section_header.data.additional_texts.own_stocks_info && (
          <InvesttechOwnStocks
            ownStocksInfo={todays_case_section_header.data.additional_texts.own_stocks_info}
          />
        )}

      {/* Latest Reports Section */}
      {latest_reports && <LatestReportsTable latest_reports={latest_reports} />}
    </div>
  );
}
