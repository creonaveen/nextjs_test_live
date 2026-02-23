import { Sheet, SheetContent } from 'investtech/external-components';
import React from 'react';

interface MobileChartSheetProps {
  testId?: string;
  title?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  platform: string;
  children: React.ReactNode;
}

// Mobile sheet view
export function MobileChartSheet({
  testId,
  title,
  isOpen,
  onOpenChange,
  chartContainerRef,
  platform,
  children,
}: MobileChartSheetProps) {
  const transformValue =
    platform === 'mobile'
      ? 'rotate(90deg) translate(-30%)'
      : 'rotate(90deg) translate(-10%) scale(2)';

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-full rounded-none p-4"
        id={`sheet-content-${testId}`}
      >
        <MobileSheetContent
          title={title}
          chartContainerRef={chartContainerRef}
          transformValue={transformValue}
        >
          {children}
        </MobileSheetContent>
      </SheetContent>
    </Sheet>
  );
}

interface MobileSheetContentProps {
  title?: string;
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  transformValue: string;
  children: React.ReactNode;
}

export function MobileSheetContent({
  title,
  chartContainerRef,
  transformValue,
  children,
}: MobileSheetContentProps) {
  return (
    <div className="flex h-full flex-row gap-6 overflow-hidden">
      <div
        ref={chartContainerRef}
        className="relative flex h-full w-full items-center justify-center"
        role="img"
        aria-label={title ? `Maximized chart: ${title}` : 'Maximized chart view'}
      >
        <div className="flex h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto">
          <div
            className="chart-maximize-transform relative flex h-full w-full origin-center items-center justify-center"
            style={{ '--chart-transform': transformValue } as React.CSSProperties}
          >
            <div className="[&_svg]:bg-chart-background flex h-full w-full items-center justify-center [&_svg]:h-[200%] [&_svg]:max-h-none [&_svg]:w-[200%] [&_svg]:max-w-none [&_svg]:overflow-visible [&_svg]:rounded-xl [&_svg]:object-contain">
              {children}
            </div>
          </div>
        </div>
        {title && (
          <div className="mr-4 flex w-8 shrink-0 items-center justify-center md:mr-6 lg:mr-0">
            <div className="rotate-90 text-center text-sm font-medium whitespace-nowrap md:text-lg lg:text-sm">
              {title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
