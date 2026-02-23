import React from 'react';
import Image from 'next/image';
import { Link } from '@/components/link';

import SvgRenderer from '@/components/custom-components/svg-renderer';
import { usePlatform } from '@/lib/platform';
import { ContentBlock } from '@/lib/types/model-portfolio';
import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';

interface ContentRendererProps {
  content: ContentBlock[];
}

const TEXT_COLOR = 'text-grey-800 dark:text-grey-300';
const HEADER_CLASSES = 'text-grey-900 dark:text-grey-200 font-semibold';

interface RenderContext {
  textColor: string;
  headerClasses: string;
  platform: string;
}

/* -------------------- List Renderer -------------------- */
function renderList(item: ContentBlock, index: number, ctx: RenderContext) {
  return (
    <ul
      key={index}
      className="mb-4 list-outside list-disc space-y-1 lg:list-inside"
      id={`list-${index + 1}`}
    >
      {item.items
        ?.filter((li) => li.type === 'list_item')
        .map((li, liIndex) => (
          <li
            key={liIndex}
            id={`list-item-${index + 1}-${liIndex + 1}`}
            className={`${ctx.textColor} text-sm font-normal`}
          >
            {li.text && <span>{li.text}</span>}
            {li.content?.map((c, cIndex) => (
              <React.Fragment key={cIndex}>
                {c.type === 'link' ? (
                  <Link
                    id={`list-item-link-${index + 1}-${liIndex + 1}-${cIndex + 1}`}
                    href={c.href || ''}
                    className="text-primary hover:text-primary/80 underline"
                  >
                    {c.text}
                  </Link>
                ) : (
                  <span>{c.text ?? ''}</span>
                )}
              </React.Fragment>
            ))}
          </li>
        ))}
    </ul>
  );
}

/* -------------------- Chart Helpers -------------------- */
function getChartParams(item: ContentBlock) {
  return item?.image_dynamic?.chart_param || item?.chart_param;
}

function getSvgId(item: ContentBlock) {
  return (
    (item?.image_dynamic as { svg_id?: string })?.svg_id || (item as { svg_id?: string })?.svg_id
  );
}

function ChartWrapper({
  svgId,
  chartParam,
  title,
  useMaximize,
  index,
}: {
  svgId?: string;
  chartParam: unknown;
  title: string;
  useMaximize: boolean;
  index: number;
}) {
  const ChartContent = () => (
    <SvgRenderer
      testId={`image-dynamic-svg-renderer-${index + 1}`}
      svg_id={svgId}
      alt={title}
      className="mt-2 h-auto max-w-[500px]"
      chart_params={chartParam as string}
    />
  );

  return useMaximize ? (
    <ChartMaximizeWithTrigger
      id={`image-dynamic-chart-maximize-${index + 1}`}
      title={title}
      apiProps={{ svg_id: svgId, chart_param: chartParam as string }}
    >
      <ChartContent />
    </ChartMaximizeWithTrigger>
  ) : (
    <ChartContent />
  );
}

/* -------------------- Dynamic Chart Renderer -------------------- */
function DynamicChart({
  item,
  index,
  ctx,
}: {
  item: ContentBlock;
  index: number;
  ctx: RenderContext;
}) {
  const chartParam = getChartParams(item);
  if (!chartParam) return null;

  const svgId = getSvgId(item);
  const title = item.title || item.text || 'Dynamic chart';
  const useMaximize = Boolean(item?.image_dynamic?.chart_maximize && ctx.platform === 'desktop');

  return (
    <div key={index} className="w-full" id={`image-dynamic-${index + 1}`}>
      <div className="mb-4 h-auto max-w-[500px]">
        <ChartWrapper
          svgId={svgId}
          chartParam={chartParam}
          title={title}
          useMaximize={useMaximize}
          index={index}
        />
      </div>
      {item.caption && (
        <div className={`${ctx.textColor} mt-1 text-sm font-semibold`}>{item.caption}</div>
      )}
    </div>
  );
}

/* -------------------- Content Renderer Map -------------------- */
const CONTENT_RENDERERS: Record<
  string,
  (item: ContentBlock, index: number, ctx: RenderContext) => React.ReactNode
> = {
  h2: (item, index, ctx) => (
    <h2
      key={index}
      className={`${ctx.headerClasses} mt-6 mb-3 text-lg`}
      id={`heading-${index + 1}`}
    >
      {item.text}
    </h2>
  ),
  h3: (item, index, ctx) => (
    <h3
      key={index}
      className={`${ctx.headerClasses} mt-4 mb-2 text-base`}
      id={`heading-${index + 1}`}
    >
      {item.text}
    </h3>
  ),
  paragraph: (item, index, ctx) => (
    <p
      key={index}
      className={`${ctx.textColor} mb-3 text-sm leading-relaxed font-normal`}
      id={`paragraph-${index + 1}`}
    >
      {item.text}
    </p>
  ),
  list: renderList,
  link: (item, index, ctx) => (
    <div key={index} className="mb-3" id={`link-${index + 1}`}>
      {item.href ? (
        <Link
          href={item.href.toLowerCase()}
          className="text-primary hover:text-primary/80 text-sm font-light underline"
          rel="noopener noreferrer"
        >
          {item.text || item.title}
        </Link>
      ) : (
        <span className={`${ctx.textColor} text-sm font-light`}>{item.text || item.title}</span>
      )}
      {item.img && (
        <Image
          src={item.img}
          alt={item.title || item.text || ''}
          className="mt-2 h-auto max-w-full"
        />
      )}
    </div>
  ),
  image: (item, index, ctx) => (
    <div key={index} className="mb-4" id={`image-${index + 1}`}>
      <Image
        src={item.img || ''}
        alt={item.title || item.text || ''}
        className="mt-2 h-auto max-w-full"
      />
      {item.caption && <div className={`${ctx.textColor} mt-1 text-xs`}>{item.caption}</div>}
    </div>
  ),
  image_dynamic: (item, index, ctx) => <DynamicChart item={item} index={index} ctx={ctx} />,
};

/* -------------------- Main Component -------------------- */
const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const platform = usePlatform();
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  const ctx: RenderContext = { textColor: TEXT_COLOR, headerClasses: HEADER_CLASSES, platform };

  return (
    <div className="space-y-2">
      {content.map((item, index) => {
        if (!item || !item.type) return null;
        const fn = CONTENT_RENDERERS[item.type];
        const child = fn ? (
          fn(item, index, ctx)
        ) : (
          <div className={`${ctx.textColor} mb-2 text-sm font-light`}>
            {item.text || JSON.stringify(item)}
          </div>
        );
        return <React.Fragment key={index}>{child}</React.Fragment>;
      })}
    </div>
  );
};

export default ContentRenderer;
