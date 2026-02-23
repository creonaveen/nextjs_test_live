import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'investtech/external-components';
import React from 'react';

interface DesktopChartDialogProps {
  testId?: string;
  title?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  tooltipSetting?: number;
  children: React.ReactNode;
}

export function DesktopChartDialog({
  testId,
  title,
  isOpen,
  onOpenChange,
  chartContainerRef,
  tooltipSetting,
  children,
}: DesktopChartDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        id={`dialog-content-${testId}`}
        className="min-h-[95dvh] min-w-[95dvw] p-0"
        onClick={() => onOpenChange(false)}
      >
        <div className="flex h-full flex-col">
          <DialogHeader className="shrink-0 p-6 pt-10" id={`${testId}-dialog-title`}>
            <div className="flex items-center justify-center">
              <DialogTitle className="text-center text-base font-normal">{title}</DialogTitle>
              <DialogDescription className="sr-only">
                Maximized chart view for detailed analysis
              </DialogDescription>
            </div>
          </DialogHeader>
          <div
            ref={chartContainerRef}
            className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-6"
            data-chart-info={tooltipSetting?.toString() || '2'}
            role="img"
            aria-label={title ? `Maximized chart: ${title}` : 'Maximized chart view'}
          >
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
