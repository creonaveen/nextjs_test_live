'use client';
import NextLink from 'next/link';
import { Badge } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { RelatedStock } from '@/lib/types/research-page';

function renderRelatedStocksGrid(stocks: RelatedStock[], index: number) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {stocks.map((relatedStock: RelatedStock) => (
        <NextLink
          key={relatedStock.company_id}
          href={`/company/${relatedStock?.company_id}`}
          id={`research-page-research-box-related-stocks-badge-${index + 1}-${relatedStock.company_id}`}
        >
          <Badge
            variant="primary"
            size="big"
            className="inline-flex h-full w-[200px] items-start justify-start whitespace-normal md:w-full lg:items-center lg:justify-center"
            id={`research-page-research-box-related-stocks-badge-${index + 1}`}
          >
            {relatedStock.company_name}
          </Badge>
        </NextLink>
      ))}
    </div>
  );
}

function getResearchBoxRelatedStocksProps(block: {
  content?: {
    related_stocks_title?: string;
    related_stocks_text?: string;
    related_stocks?: RelatedStock[];
  };
}) {
  const title = block.content?.related_stocks_title;
  const text = block.content?.related_stocks_text;
  const stocks = block.content?.related_stocks;
  const hasTitle = Boolean(title);
  const hasText = Boolean(text);
  const hasStocks = Boolean(stocks?.length);
  const hasAny = hasTitle || hasText || hasStocks;
  return { title, text, stocks, hasTitle, hasText, hasStocks, hasAny };
}

export function renderResearchBoxRelatedStocksCard(
  block: {
    content?: {
      related_stocks_title?: string;
      related_stocks_text?: string;
      related_stocks?: RelatedStock[];
    };
  },
  index: number
) {
  const { title, text, stocks, hasTitle, hasText, hasStocks, hasAny } =
    getResearchBoxRelatedStocksProps(block);
  if (!hasAny) return null;
  return (
    <Card>
      <CardContent className="space-y-4">
        {hasTitle && (
          <h3
            className="text-2xl font-medium"
            id={`research-page-research-box-related-stocks-title-${index + 1}`}
          >
            {title}
          </h3>
        )}
        {hasText && (
          <p
            className="text-sm font-normal"
            id={`research-page-research-box-related-stocks-text-${index + 1}`}
          >
            {text}
          </p>
        )}
        {hasStocks && stocks && renderRelatedStocksGrid(stocks, index)}
      </CardContent>
    </Card>
  );
}
