'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'investtech/external-components';
import React from 'react';

import { ChartErrorBoundary } from '@/components/chart-error-boundry';
import { usePlatform } from '@/lib/platform';
import {
  FactorDiagramTooltips,
  FactorTooltip,
  FactorDiagramLabelsAndTexts,
} from '@/lib/types/shared-components';
import { sanitizeSvg } from '@/utils/sanitize-svg';

import { FactorTooltipContent } from './factor-diagram-tooltip-content';
import { useFactorDiagramTooltip } from './use-factor-diagram-tooltip';

// Component for rendering the tooltip
function FactorDiagramTooltip({
  activeTooltip,
  hoveredElement,
  tooltipPosition,
  labelsAndTexts,
}: {
  activeTooltip: FactorTooltip;
  hoveredElement: Element;
  tooltipPosition: { left: number; top: number; width: number; height: number };
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}) {
  return (
    <Tooltip open={true}>
      <TooltipTrigger asChild>
        <div
          className="factor-diagram-tooltip-position pointer-events-none absolute z-[1]"
          style={
            {
              '--tooltip-left': `${tooltipPosition.left}px`,
              '--tooltip-top': `${tooltipPosition.top}px`,
              '--tooltip-width': `${tooltipPosition.width}px`,
              '--tooltip-height': `${tooltipPosition.height}px`,
            } as React.CSSProperties
          }
          dangerouslySetInnerHTML={{ __html: sanitizeSvg(hoveredElement.outerHTML) }}
          id="factor-diagram-tooltip-trigger"
        />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        className="max-w-[480px] rounded-xl p-0"
        sideOffset={10}
        alignOffset={0}
        id="factor-diagram-tooltip-content"
      >
        <FactorTooltipContent tooltip={activeTooltip} labelsAndTexts={labelsAndTexts} />
      </TooltipContent>
    </Tooltip>
  );
}

interface FactorDiagramProps {
  rawSvgHtml: string;
  tooltips?: FactorDiagramTooltips;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}

export default function FactorDiagram({
  rawSvgHtml,
  tooltips,
  labelsAndTexts,
}: FactorDiagramProps) {
  const platform = usePlatform();

  // Use tooltip logic from custom hook
  const {
    activeTooltip,
    isTooltipOpen,
    hoveredElement,
    containerRef,
    tooltipPositionRef,
    processedSvgHtml,
  } = useFactorDiagramTooltip(
    { ...tooltips, rawSvgHtml } as FactorDiagramTooltips & { rawSvgHtml?: string },
    platform
  );

  return (
    <ChartErrorBoundary chartName="Factor Diagram">
      <TooltipProvider>
        <div
          ref={containerRef}
          className={`factor-diagram-container relative flex justify-center ${platform !== 'desktop' ? 'pointer-events-none' : ''}`}
          id="factor-diagram-container"
        >
          {/* Render the full factor diagram */}
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(processedSvgHtml) }}
            role="img"
            aria-label="Factor diagram"
            id="factor-diagram-svg"
          />

          {/* Dynamic tooltip for the currently hovered element - only on desktop */}
          {platform === 'desktop' &&
            isTooltipOpen &&
            activeTooltip &&
            hoveredElement &&
            tooltipPositionRef.current && (
              <FactorDiagramTooltip
                activeTooltip={activeTooltip}
                hoveredElement={hoveredElement}
                tooltipPosition={tooltipPositionRef.current}
                labelsAndTexts={labelsAndTexts}
              />
            )}
        </div>
      </TooltipProvider>
    </ChartErrorBoundary>
  );
}
