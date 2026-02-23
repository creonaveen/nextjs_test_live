import { render, screen } from '@testing-library/react';

import type { FullHealthReportSection, HealthData } from '@/lib/types/health-check';

import FullHealthReportSectionComponent from '../full-health-report-section';

const healthSectionSpy = jest.fn(() => <div data-testid="health-section" />);

jest.mock('../health-section', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => healthSectionSpy(props),
}));

jest.mock('../overall-health-section', () => ({
  OverallHealth: () => <div data-testid="overall-health" />,
}));

jest.mock('@/components/custom-components/tooltip-or-sheet', () => ({
  TooltipOrSheet: ({
    triggerElement,
    text,
  }: {
    triggerElement: React.ReactNode;
    text: React.ReactNode;
  }) => (
    <div>
      {triggerElement}
      {text}
    </div>
  ),
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Accordion: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
      <button type="button">{children}</button>
    ),
    AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe('FullHealthReportSection', () => {
  beforeEach(() => {
    healthSectionSpy.mockClear();
  });

  it('should render header and health sections', () => {
    const data: FullHealthReportSection = {
      header: {
        title: 'Full report',
        sub_title: 'Subtitle',
        portfolio_composition: 'Portfolio',
        summary_text: 'Summary',
        disclaimer: 'Disclaimer',
      },
      help_data: {
        title: 'Help title',
        text_primary: 'Primary help',
        text_secondary: [{ heading: 'Heading', text: 'Body' }],
      },
      sections: {
        health: { title: 'Health', elements: [] },
        tips: {
          title: 'Tips',
          expand_label: 'Show more',
          secondary_count: 0,
          primary_tips_elements: [],
          secondary_tips_elements: [],
        },
      },
    } as FullHealthReportSection;

    const healthData: HealthData = {
      overall_health_section: {},
      score_bar_data: { categories: [] },
    } as HealthData;

    render(<FullHealthReportSectionComponent data={data} healthData={healthData} />);

    expect(screen.getByText('Full report')).toBeInTheDocument();
    expect(screen.getByTestId('overall-health')).toBeInTheDocument();
    expect(healthSectionSpy).toHaveBeenCalled();
  });
});
