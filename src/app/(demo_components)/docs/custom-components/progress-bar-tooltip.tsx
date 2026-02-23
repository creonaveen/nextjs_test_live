'use client';

import { ProgressBarTooltip } from '@/components/custom-components/progress-bar-tooltip';

export function ProgressBarTooltipDemo() {
  return (
    <ProgressBarTooltip
      value={33}
      indicatorClassName="bg-green-700"
      className="bg-green-700/20"
      barTitle="Progress"
      barValue="33%"
    />
  );
}

export const progressBarTooltipCode = `import { ProgressBarTooltip } from '@/components/custom-components/progress-bar-tooltip';

export function ProgressBarTooltipDemo() {
  return <ProgressBarTooltip value={33} indicatorClassName="bg-green-700" className="bg-green-700/20" />;
}`;
