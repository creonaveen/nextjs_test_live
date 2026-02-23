import { useEffect } from 'react';

import { TooltipLegends } from '@/lib/types/svg';
import { attachOrDetachEventListeners } from '@/utils/main-chart-tooltip';

import { setupTooltips, TOOLTIP_SETUP_DELAY_MS } from '../chart-maximize-utils';

interface UseTooltipAttachmentProps {
  platform: string;
  isOpen: boolean;
  tooltipSetting: number | undefined;
  maximizedData: { raw_svg?: string; tooltip_legends?: TooltipLegends } | undefined;
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
}

// Hook: manage tooltip attachment lifecycle
export function useTooltipAttachment({
  platform,
  isOpen,
  tooltipSetting,
  maximizedData,
  chartContainerRef,
}: UseTooltipAttachmentProps) {
  useEffect(() => {
    if (platform === 'desktop' && maximizedData?.raw_svg && isOpen && chartContainerRef.current) {
      const container = chartContainerRef.current;

      requestAnimationFrame(() => {
        setupTooltips(container, tooltipSetting ?? 0, maximizedData?.tooltip_legends);
      });

      const timeoutId = setTimeout(() => {
        setupTooltips(container, tooltipSetting ?? 0, maximizedData?.tooltip_legends);
      }, TOOLTIP_SETUP_DELAY_MS);

      return () => {
        clearTimeout(timeoutId);
        attachOrDetachEventListeners(
          container,
          false,
          true,
          tooltipSetting ?? 0,
          maximizedData?.tooltip_legends
        );
      };
    }
  }, [isOpen, tooltipSetting, platform, maximizedData, chartContainerRef]);
}
