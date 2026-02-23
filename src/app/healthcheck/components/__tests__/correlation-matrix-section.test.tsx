import { render, screen } from '@testing-library/react';

import type { CorrelationAnalysisSection } from '@/lib/types/health-check';

import CorrelationAnalysisSectionComponent from '../correlation-matrix-section';

jest.mock('@/components/custom-components/table-with-popover', () => ({
  CorrelationMatrix: () => <div data-testid="correlation-matrix" />,
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

describe('CorrelationAnalysisSection', () => {
  it('should render title, matrix, and highlights', () => {
    const data: CorrelationAnalysisSection = {
      title: 'Correlation analysis',
      highlights_text: 'Highlights',
      details_text: 'Details',
      help_data: { title: 'Help', text_primary: 'Primary', text_secondary: 'Secondary' },
    } as CorrelationAnalysisSection;

    render(<CorrelationAnalysisSectionComponent data={data} />);

    expect(screen.getByText('Correlation analysis')).toBeInTheDocument();
    expect(screen.getByTestId('correlation-matrix')).toBeInTheDocument();
    expect(screen.getByText('Highlights')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getAllByText('Secondary')).toHaveLength(2);
  });
});
