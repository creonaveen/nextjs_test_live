import { render } from '@testing-library/react';

import type { OverallHealthSection, ScoreBarCategory } from '@/lib/types/health-check';

import { OverallHealth } from '../overall-health-section';

const progressBarSpy = jest.fn(() => <div data-testid="progress-bar" />);

jest.mock('@/components/custom-components/progress-bar-tooltip', () => ({
  ProgressBarTooltip: (props: Record<string, unknown>) => progressBarSpy(props),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: () => 'desktop',
}));

describe('OverallHealth', () => {
  beforeEach(() => {
    progressBarSpy.mockClear();
  });

  it('should render progress bar with desktop score text', () => {
    const data: OverallHealthSection = {
      data: {
        score: 75,
        score_bar_category_id: 2,
        label: 'Overall health',
        score_text: '75 / 100',
        score_text_short: '75',
        info_text1: 'Info 1',
        info_text2: 'Info 2',
      },
    } as OverallHealthSection;

    const categories: ScoreBarCategory[] = [
      { id: 2, name: 'Positive', min_value: 60, max_value: 100, class: 'barPositive' },
    ];

    render(<OverallHealth data={data} categories={categories} />);

    expect(progressBarSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 75,
        barTitle: 'Overall health',
        barValue: '75 / 100',
        isMainHealth: true,
      })
    );
  });
});
