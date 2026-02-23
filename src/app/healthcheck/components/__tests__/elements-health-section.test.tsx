import { fireEvent, render, screen } from '@testing-library/react';

import type { ElementsHealthSection, ScoreBarCategory } from '@/lib/types/health-check';

import { ElementsHealth } from '../elements-health-section';

const progressBarSpy = jest.fn(() => <div data-testid="progress-bar" />);

jest.mock('@/components/custom-components/progress-bar-tooltip', () => ({
  ProgressBarTooltip: (props: Record<string, unknown>) => progressBarSpy(props),
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Button: ({ children, ...props }: { children: React.ReactNode }) => (
      <button type="button" {...props}>
        {children}
      </button>
    ),
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('@/lib/platform', () => ({
  usePlatform: () => 'desktop',
}));

describe('ElementsHealth', () => {
  beforeEach(() => {
    progressBarSpy.mockClear();
  });

  it('should render elements and handle scroll button click', () => {
    const data: ElementsHealthSection = {
      title: 'Elements health',
      full_health_report_link_text: 'View full report',
      data: [
        {
          score: 10,
          score_bar_category_id: 1,
          label: 'Momentum',
          score_text: '10',
          info_text1: 'Info 1',
          info_text2: 'Info 2',
        },
      ],
    } as ElementsHealthSection;

    const categories: ScoreBarCategory[] = [
      { id: 1, name: 'Negative', min_value: 0, max_value: 10, class: 'barNegative' },
    ];

    const scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView,
    } as unknown as HTMLElement);

    render(<ElementsHealth data={data} categories={categories} />);

    expect(screen.getByText('Elements health')).toBeInTheDocument();
    expect(progressBarSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('View full report'));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
