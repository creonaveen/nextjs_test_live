'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'investtech/external-components';
import { useMemo, useState, useCallback } from 'react';

import { ChartErrorBoundary } from '@/components/chart-error-boundry';
import { usePlatform } from '@/lib/platform';
import {
  FactorDiagramTooltips,
  FactorTooltip,
  FactorDiagramLabelsAndTexts,
} from '@/lib/types/shared-components';
import { sanitizeSvg } from '@/utils/sanitize-svg';

import { FactorTooltipContent } from './factor-diagram-tooltip-content';

interface FactorDiagramMobileProps {
  rawSvgHtml: string;
  tooltips?: FactorDiagramTooltips;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}

// Helper function to get tooltip by target
const getTooltipByTarget = (
  tooltipTarget: string,
  tooltips: FactorDiagramTooltips
): FactorTooltip | null => {
  return tooltips?.[tooltipTarget as keyof FactorDiagramTooltips] ?? null;
};

// Helper function to process SVG HTML for active slice highlighting
const processSvgHtml = (rawSvgHtml: string, activeSliceId: string | null): string => {
  let svg = rawSvgHtml.replace(/\s*title="[^"]*"/g, '');

  if (activeSliceId) {
    svg = svg.replace(
      new RegExp(
        `(class="[^"]*ifgTooltipSliceOpacityLight[^"]*"[^>]*data-tooltip-target="${activeSliceId}")`,
        'g'
      ),
      `$1 data-active="true"`
    );
  }

  return svg;
};

function MainDiagram({
  processedSvgHtml,
  handleSliceClick,
  isTouch,
}: {
  processedSvgHtml: string;
  handleSliceClick: (event: React.MouseEvent | React.TouchEvent) => void;
  isTouch: boolean;
}) {
  return (
    <div
      className="factor-diagram-container relative"
      onClick={handleSliceClick}
      onTouchEnd={isTouch ? handleSliceClick : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSliceClick(e as unknown as React.MouseEvent);
        }
      }}
      aria-label="Interactive factor diagram"
    >
      <div
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(processedSvgHtml) }}
        role="img"
        aria-label="Factor diagram"
      />
    </div>
  );
}

function SheetHeaderContent({
  labelsAndTexts,
  processedSvgHtml,
  handleSliceClick,
}: {
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
  processedSvgHtml: string;
  handleSliceClick: (event: React.MouseEvent | React.TouchEvent) => void;
}) {
  return (
    <div className="bg-card sticky top-0 z-10">
      <SheetHeader className="px-4 py-0 pb-4">
        <SheetTitle className="text-grey-900 dark:text-grey-50 flex items-center justify-between pt-0 text-base font-semibold">
          {labelsAndTexts?.title ?? ''}
        </SheetTitle>
      </SheetHeader>

      <div
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(processedSvgHtml) }}
        role="button"
        tabIndex={0}
        aria-label="Interactive factor diagram"
        className="flex justify-center pb-4"
        onClick={handleSliceClick}
        onTouchEnd={handleSliceClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSliceClick(e as unknown as React.MouseEvent);
          }
        }}
      />
    </div>
  );
}

function SheetContentBody({
  activeTooltip,
  labelsAndTexts,
}: {
  activeTooltip: FactorTooltip;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}) {
  return (
    <>
      <div className="bg-grey-50 dark:bg-grey-900 h-[4px] w-full" />

      <div className="overflow-y-auto px-4 pb-6">
        <FactorTooltipContent tooltip={activeTooltip} labelsAndTexts={labelsAndTexts} />
      </div>
    </>
  );
}

function FactorDiagramSheet({
  activeTooltip,
  isSheetOpen,
  setIsSheetOpen,
  setActiveSliceId,
  setActiveTooltip,
  processedSvgHtml,
  handleSliceClick,
  labelsAndTexts,
}: {
  activeTooltip: FactorTooltip;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  setActiveSliceId: (id: string | null) => void;
  setActiveTooltip: (tooltip: FactorTooltip | null) => void;
  processedSvgHtml: string;
  handleSliceClick: (event: React.MouseEvent | React.TouchEvent) => void;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}) {
  return (
    <Sheet
      aria-describedby="factor-diagram-tooltip-content"
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) {
          setActiveSliceId(null);
          setActiveTooltip(null);
        }
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[100dvh] rounded-none pt-12 pb-4 md:px-0"
        id="factor-diagram-tooltip-content"
      >
        <SheetHeaderContent
          labelsAndTexts={labelsAndTexts}
          processedSvgHtml={processedSvgHtml}
          handleSliceClick={handleSliceClick}
        />

        <SheetContentBody activeTooltip={activeTooltip} labelsAndTexts={labelsAndTexts} />
      </SheetContent>
    </Sheet>
  );
}

function useFactorDiagramState(tooltips: FactorDiagramTooltips | undefined) {
  const [activeSliceId, setActiveSliceId] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<FactorTooltip | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSliceClick = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const target = event.target as Element;

      if (!target.classList.contains('ifgTooltipSliceOpacityLight')) return;

      const tooltipTarget = target.getAttribute('data-tooltip-target');
      if (!tooltipTarget || !tooltips) return;

      if (!isSheetOpen && tooltipTarget === activeSliceId) {
        setActiveSliceId(null);
        setActiveTooltip(null);
        return;
      }

      const tooltipData = getTooltipByTarget(tooltipTarget, tooltips);
      if (!tooltipData) return;

      setActiveSliceId(tooltipTarget);
      setActiveTooltip(tooltipData);
      setIsSheetOpen(true);
    },
    [tooltips, activeSliceId, isSheetOpen]
  );

  return {
    activeSliceId,
    activeTooltip,
    isSheetOpen,
    setActiveSliceId,
    setActiveTooltip,
    setIsSheetOpen,
    handleSliceClick,
  };
}

export default function FactorDiagramMobile({
  rawSvgHtml,
  tooltips,
  labelsAndTexts,
}: FactorDiagramMobileProps) {
  const platform = usePlatform();
  const isTouch = platform === 'mobile' || platform === 'tablet';
  const {
    activeSliceId,
    activeTooltip,
    isSheetOpen,
    setActiveSliceId,
    setActiveTooltip,
    setIsSheetOpen,
    handleSliceClick,
  } = useFactorDiagramState(tooltips);

  const processedSvgHtml = useMemo(
    () => processSvgHtml(rawSvgHtml, activeSliceId),
    [rawSvgHtml, activeSliceId]
  );

  return (
    <ChartErrorBoundary chartName="Factor Diagram">
      <MainDiagram
        processedSvgHtml={processedSvgHtml}
        handleSliceClick={handleSliceClick}
        isTouch={isTouch}
      />

      {activeSliceId && activeTooltip && (
        <FactorDiagramSheet
          activeTooltip={activeTooltip}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          setActiveSliceId={setActiveSliceId}
          setActiveTooltip={setActiveTooltip}
          processedSvgHtml={processedSvgHtml}
          handleSliceClick={handleSliceClick}
          labelsAndTexts={labelsAndTexts}
        />
      )}
    </ChartErrorBoundary>
  );
}
