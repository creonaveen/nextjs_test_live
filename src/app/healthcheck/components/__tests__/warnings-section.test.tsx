import { render, screen } from '@testing-library/react';

import type { DataAndCalculationWarningsSection } from '@/lib/types/health-check';

import WarningsSection from '../warnings-section';

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe('WarningsSection', () => {
  it('should render warning title and messages', () => {
    const data: DataAndCalculationWarningsSection = {
      title: 'Warnings',
      warnings: [{ message: 'Data might be delayed' }],
    } as DataAndCalculationWarningsSection;

    render(<WarningsSection data={data} />);

    expect(screen.getByText('Warnings')).toBeInTheDocument();
    expect(screen.getByText('Data might be delayed')).toBeInTheDocument();
  });
});
