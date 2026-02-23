import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { ContentBlock, ModelPortfolio } from '@/lib/types/model-portfolio';

import ContentRenderer from './content-renderer';
import DescriptionDialog from './description-dialog';

interface ProductHelpProps {
  data: ModelPortfolio;
  isLoading: boolean;
}

function ProductHelpLoading() {
  const c = useTranslations('common');

  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center gap-2">
        <div className="border-grey-400 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        <span className="text-sm font-medium">{c('loading')}...</span>
      </div>
    </Card>
  );
}

function HelpContentBody({ content }: { content?: ContentBlock[] }) {
  if (!content || content.length === 0) return null;

  if (Array.isArray(content)) {
    return <ContentRenderer content={content} />;
  }

  return (
    <span className="text-sm font-light">
      {(content as ContentBlock[]).map((block: ContentBlock) => block.text).join(' ')}
    </span>
  );
}

function ProductHelpContent({ data }: { data: ModelPortfolio }) {
  const n = useTranslations('navigation');

  const help = data?.help;
  const productHelp = help?.product_help;
  const productDescription = help?.product_description;

  if (!productHelp) return null;

  return (
    <Card className="bg-primary-background dark:bg-card" id="product-help-section">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col items-start justify-between px-6 lg:flex-row lg:items-center">
            <span className="text-xl font-semibold" id="product-help-title">
              {productHelp.title}
            </span>

            <div className="flex flex-col items-start justify-start md:flex-row lg:items-center lg:justify-center">
              <span className="text-sm font-light" id="product-help-description">
                {productDescription?.info_text}{' '}
                <DescriptionDialog popup={productDescription?.popup} title={n('modelPortfolio')} />
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 px-6">
        <HelpContentBody content={productHelp.content} />
      </CardContent>
    </Card>
  );
}

/**
 * Component for displaying product help section
 */
export default function ProductHelp({ data, isLoading }: ProductHelpProps) {
  if (isLoading) return <ProductHelpLoading />;
  return <ProductHelpContent data={data} />;
}
