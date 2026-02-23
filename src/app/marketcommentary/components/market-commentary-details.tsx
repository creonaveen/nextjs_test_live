import { useTranslations } from 'next-intl';

import { MarketCommentary } from '@/lib/types/market-commentary';
import { RenderHTML } from '@/utils/create-mark-up';

import DescriptionDialog from '@/app/modelportfolio/components/description-dialog';

import Companies from './companies';
import StatisticsTable from './statistics-table';

interface MarketCommentaryDetailsProps {
  data: MarketCommentary;
  isError: boolean;
}

function MarketCommentaryHeader({ data }: { data: MarketCommentary }) {
  const n = useTranslations('navigation');
  const infoText = data?.product_description?.info_text;
  return (
    <div className="mb-8 flex flex-col items-start justify-start xl:flex-row xl:justify-between">
      <span className="page-header" id="page-title">
        {n('marketCommentary')}
      </span>
      <div className="flex flex-col items-start justify-start md:flex-row lg:items-center lg:justify-center">
        <span className="text-sm font-light" id="market-commentary-description">
          {infoText ? <RenderHTML html={infoText} /> : null}{' '}
          <DescriptionDialog
            popup={data?.product_description?.popup}
            title={n('marketCommentary')}
          />
        </span>
      </div>
    </div>
  );
}

function MarketCommentaryContent({ data }: { data: MarketCommentary }) {
  const hasCompanies = Boolean(data?.companies);
  const hasStatistics = Boolean(data?.statistics);
  if (!hasCompanies && !hasStatistics) return null;
  return (
    <div className="space-y-4">
      {hasCompanies && <Companies data={data} />}
      {hasStatistics && <StatisticsTable data={data} />}
    </div>
  );
}

export default function MarketCommentaryDetails({ data, isError }: MarketCommentaryDetailsProps) {
  const n = useTranslations('navigation');
  if (isError || !data) {
    throw new Error(`${n('marketCommentary')} failed to load`);
  }
  return (
    <div>
      <MarketCommentaryHeader data={data} />
      <MarketCommentaryContent data={data} />
    </div>
  );
}
