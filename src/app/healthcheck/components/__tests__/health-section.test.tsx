import { render, screen } from '@testing-library/react';

import type { HealthReportElement } from '@/lib/types/health-check';

import HealthSection from '../health-section';

jest.mock('@/utils/common-functions', () => ({
  TextTagWithArrowIcon: () => <span data-testid="arrow-icon" />,
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

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe('HealthSection', () => {
  it('should render title and elements', () => {
    const elements: HealthReportElement[] = [
      {
        title: 'Element A',
        explanation: 'Explanation',
        text_html: 'Details',
        icon_data_recommendation_style: { icon: 'arrow_up', color: 'positive' },
      },
    ] as HealthReportElement[];

    render(<HealthSection title="Health section" elements={elements} />);

    expect(screen.getByText('Health section')).toBeInTheDocument();
    expect(screen.getByText('Element A')).toBeInTheDocument();
    expect(screen.getByText('Explanation')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });
});
