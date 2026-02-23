'use client';

import { useTranslations } from 'next-intl';

import AuthorInfoBlock from '@/components/custom-components/author-info-block';
import { ModelPortfolio, TextBlock } from '@/lib/types/model-portfolio';
import { RenderHTML } from '@/utils/create-mark-up';

import CommentAndAnalysis from './comment-and-analysis';
import DescriptionDialog from './description-dialog';
import MostRecentSale from './most-recent-sale';
import PortfolioHoldings from './portfolio-holdings';
import ProductHelp from './product-help';
import Return from './return';

interface ModelPortfolioDetailsProps {
  data: ModelPortfolio;
  isError: boolean;
}

/* =========================
   Header
========================= */
function ModelPortfolioHeader({ data }: { data: ModelPortfolio }) {
  const n = useTranslations('navigation');
  const infoText = data?.help?.product_description?.info_text;
  const popup = data?.help?.product_description?.popup;

  return (
    <div className="mb-8 flex flex-col items-start justify-start xl:flex-row xl:justify-between">
      <span className="page-header" id="page-title">
        {n('modelPortfolio')}
      </span>

      <div className="flex flex-col items-start justify-start md:flex-row lg:items-center lg:justify-center">
        <span className="text-sm font-light" id="modelportfolio-description">
          {infoText ? <RenderHTML html={infoText} /> : null}{' '}
          <DescriptionDialog popup={popup} title={n('modelPortfolio')} />
        </span>
      </div>
    </div>
  );
}

/* =========================
   Author Section
========================= */
function PortfolioAuthor({ data, isLoading }: { data: ModelPortfolio; isLoading: boolean }) {
  const publication = data?.publication;
  if (!publication) return null;

  return (
    <AuthorInfoBlock
      isLoading={isLoading}
      authorImage={publication.author_image}
      authorTitle={publication.author_title}
      authorName={publication.author_name}
      publishedDate={publication.published_date}
      authorEmail={publication.author_email}
    />
  );
}

/* =========================
   Ingress Section
========================= */
function PortfolioIngress({ data }: { data: ModelPortfolio }) {
  const m = useTranslations('modelPortfolio');
  const ingress = data?.portfolio_comments?.ingress;

  if (!ingress?.length) return null;

  const text = ingress.map((item: TextBlock) => item.text).join(' ');

  return (
    <div className="flex flex-col gap-2 py-8" id="modelportfolio-details">
      <span className="pb-3 text-sm font-semibold">{m('commentAndAnalysis')}</span>
      <span className="text-sm font-light">{text}</span>
    </div>
  );
}

/* =========================
   Sections Renderer
========================= */
const SECTION_CONFIG: Array<{
  key: string;
  show: (data: ModelPortfolio) => boolean;
  Component: React.ComponentType<{ data: ModelPortfolio; isLoading: boolean }>;
}> = [
  {
    key: 'holdings',
    show: (d) => Boolean(d?.current_holdings),
    Component: PortfolioHoldings,
  },
  {
    key: 'analysis',
    show: (d) => Boolean(d?.portfolio_comments?.analyses),
    Component: CommentAndAnalysis,
  },
  {
    key: 'sales',
    show: (d) => Boolean(d?.latest_sales),
    Component: MostRecentSale,
  },
  {
    key: 'return',
    show: (d) => Boolean(d?.annualized_return),
    Component: Return,
  },
  {
    key: 'help',
    show: (d) => Boolean(d?.help?.product_help),
    Component: ProductHelp,
  },
];

function ModelPortfolioSections({ data, isLoading }: { data: ModelPortfolio; isLoading: boolean }) {
  const sections = SECTION_CONFIG.filter((c) => c.show(data)).map(({ key, Component }) => (
    <Component key={key} data={data} isLoading={isLoading} />
  ));
  if (sections.length === 0) return null;
  return <div className="space-y-4">{sections}</div>;
}

/* =========================
   Main Component
========================= */
export default function ModelPortfolioDetails({ data, isError }: ModelPortfolioDetailsProps) {
  const n = useTranslations('navigation');
  const isLoading = !data && !isError;

  if (isError) {
    throw new Error(`${n('modelPortfolio')} failed to load`);
  }

  if (!data) return null;

  return (
    <div>
      <ModelPortfolioHeader data={data} />
      <PortfolioAuthor data={data} isLoading={isLoading} />
      <PortfolioIngress data={data} />
      <ModelPortfolioSections data={data} isLoading={isLoading} />
    </div>
  );
}
