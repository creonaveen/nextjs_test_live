'use client';

import { Badge, Button, Card, CardContent } from 'investtech/external-components';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/components/link';
import { useTranslations } from 'next-intl';

import SvgRenderer from '@/components/custom-components/svg-renderer';
import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { Company, CompanyText, MarketCommentary } from '@/lib/types/market-commentary';
import {
  cn,
  getBadgeColorClass,
  getBadgeText,
  getBadgeVariant,
  getCardColorClass,
} from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';
import { getUrlWithParams } from '@/utils/navigation-utils';

interface CompaniesProps {
  data: MarketCommentary;
}
interface CompanyCardProps {
  company: Company;
  index: number;
  onClick: () => void;
  renderAnalysisSvgImage: (
    index: number,
    company: Company,
    alt: string,
    className?: string
  ) => React.JSX.Element;
  translations: { readMore: string };
}
interface CompanyBadgeProps {
  company: Company;
  index: number;
}
interface BadgeHeaderProps {
  company: Company;
  index: number;
}

function BadgeHeader({ company, index }: BadgeHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between space-x-5">
      <p
        className="text-grey-700 dark:text-grey-400 text-[10px] font-medium tracking-wide uppercase"
        id="company-badge-title"
      >
        {company?.badge?.title ?? ''}
      </p>

      <TooltipOrSheet
        id={`company-badge-tooltip-${index + 1}`}
        text={company?.badge?.popup?.text || ''}
        triggerElement={
          <Image
            src="circle_question_mark.svg"
            alt="Circle Question Mark"
            width={20}
            height={20}
            className="cursor-pointer font-bold"
            onClick={(e) => e.stopPropagation()}
            id={`company-badge-tooltip-${index + 1}`}
          />
        }
      />
    </div>
  );
}

interface BadgeContentProps {
  company: Company;
  index: number;
}

function BadgeContent({ company, index }: BadgeContentProps) {
  const badge = company?.badge;
  const riskLevel = badge?.risk_level;

  return (
    <div className="row-span-2 flex h-full flex-col items-center justify-between gap-3 text-center md:gap-0">
      <span
        id={`company-badge-text-${index + 1}`}
        className={`font-headline pb-4 text-xl font-medium ${getBadgeText(badge?.sign)}`}
      >
        {badge?.text}
      </span>
      <Badge
        size="risk"
        className={cn(
          'dark:text-grey-900 text-xs font-semibold',
          riskLevel?.is_badge ? getBadgeColorClass(riskLevel.sign) : ''
        )}
        id={`company-badge-risk-level-badge-${index + 1}`}
      >
        {riskLevel?.text ?? ''}
      </Badge>
    </div>
  );
}

function CompanyBadge({ company, index }: CompanyBadgeProps) {
  return (
    <Card
      id={`company-badge-${index + 1}`}
      className={`${getCardColorClass(
        company?.badge?.sign
      )} gap-3 rounded-xl px-3 py-0 pt-3 md:w-2/5 md:px-4 md:pt-4`}
    >
      <BadgeHeader company={company} index={index} />
      <BadgeContent company={company} index={index} />
    </Card>
  );
}

interface CompanyHeaderProps {
  company: Company;
  index: number;
}

function CompanyHeader({ company, index }: CompanyHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}>
      <div className="flex flex-row items-center justify-between gap-5 md:flex-col md:items-start">
        <div className="flex flex-col gap-2">
          <span
            id={`company-name-${index + 1}`}
            className="text-grey-900 dark:text-grey-200 max-w-[150px] truncate text-base font-semibold break-words sm:max-w-none"
          >
            {company.name}
          </span>
          <span
            id={`company-ticker-${index + 1}`}
            className="text-grey-700 dark:text-grey-300 text-[10px] font-medium uppercase"
          >
            {company?.ticker}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span
            className="text-grey-700 dark:text-grey-300 text-end text-[10px] font-medium uppercase md:text-start"
            id="company-price-label"
          >
            {company?.price_label}
          </span>
          <div className="flex flex-row gap-2">
            {company?.close && (
              <span
                id={`company-close-${index + 1}`}
                className="text-sm font-normal dark:text-white"
              >
                <RenderHTML html={company.close} />
              </span>
            )}
            <Badge
              size="small"
              variant={getBadgeVariant(company?.profit_loss_percent?.sign || 0)}
              id={`company-profit-loss-percent-badge-${index + 1}`}
            >
              {company?.profit_loss_percent?.value}
            </Badge>
          </div>
        </div>
      </div>
      <CompanyBadge company={company} index={index} />
    </div>
  );
}

function CompanyCard({
  company,
  index,
  onClick,
  renderAnalysisSvgImage,
  translations,
}: CompanyCardProps) {
  const colViewClasses = 'flex flex-col';

  return (
    <Card
      key={company.company_id || index}
      id={`company-${index + 1}`}
      onClick={onClick}
      className={`border-grey-100 dark:border-grey-700 h-full cursor-pointer border px-4 py-0 pt-4 pb-8`}
    >
      <CardContent className={`gap-2 px-0 ${colViewClasses}`}>
        <CompanyHeader company={company} index={index} />

        {/* svg image */}
        {renderAnalysisSvgImage(index, company, 'Comment and Analysis', 'py-8')}

        {company?.text && company.text.length > 0 && (
          <div className="flex flex-col gap-2">
            <Link href={`/company/${company?.company_id}`}>
              <p className="text-foreground text-sm" id="company-text">
                {company.text.map((textItem: CompanyText) => textItem.text).join(' ')}{' '}
                <Button
                  id={`company-read-more-${index + 1}`}
                  variant="link"
                  className="m-0 ml-1 inline h-auto cursor-pointer p-0 underline"
                >
                  {translations.readMore}
                </Button>
              </p>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Companies({ data }: CompaniesProps) {
  const router = useRouter();
  const e = useTranslations('errors');
  const m = useTranslations('common');
  const searchParams = useSearchParams();

  if (!data?.companies?.length) return null;
  const handleCompanyClick = (companyId: number) =>
    router.push(getUrlWithParams(`/company/${companyId}`, searchParams));

  const renderAnalysisSvgImage = (
    index: number,
    company: Company,
    alt: string,
    className?: string
  ) => {
    const chartSpec = company?.chart_spec;
    const svgId = chartSpec?.img_param?.id;

    if (!svgId)
      return (
        <div className="text-error-text flex items-center justify-center">
          {e('imageLoadError')}
        </div>
      );

    return (
      <SvgRenderer
        svg_id={svgId}
        alt={alt}
        className={className}
        chart_params={chartSpec?.chart_param || ''}
        chart_tooltip_id={chartSpec?.img_param?.chart_tooltip_id ?? -1}
        testId={`market-commentary-svg-${index + 1}`}
      />
    );
  };

  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 lg:px-10 lg:py-4">
        {data.companies.map((company: Company, index: number) => (
          <CompanyCard
            key={company.company_id || index}
            company={company}
            index={index}
            onClick={() => handleCompanyClick(company.company_id)}
            renderAnalysisSvgImage={renderAnalysisSvgImage}
            translations={{ readMore: m('readMore') }}
          />
        ))}
      </div>
    </Card>
  );
}
