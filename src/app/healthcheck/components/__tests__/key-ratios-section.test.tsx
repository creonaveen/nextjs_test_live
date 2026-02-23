import React from 'react';
import { render, screen } from '@testing-library/react';

import type { KPIsSection } from '@/lib/types/health-check';

import { KeyRatiosSection } from '../key-ratios-section';

jest.mock('@/components/link', () => ({
  Link: ({ href, children, ...props }: { href: string; children?: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
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
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
    Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
    TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
    TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
    TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('KeyRatiosSection', () => {
  it('should render KPI rows and help link', () => {
    const data: KPIsSection = {
      title: 'Key ratios',
      kpi_table_formatted: [{ key: 'P/E', value: '12.5' }],
      kpi_table: { caption: 'Based on last year' },
      help_data: { label: 'Learn more', help_source: 'help-doc' },
    } as KPIsSection;

    render(<KeyRatiosSection data={data} />);

    expect(screen.getByText('Key ratios')).toBeInTheDocument();
    expect(screen.getByText('P/E')).toBeInTheDocument();
    expect(screen.getByText('12.5')).toBeInTheDocument();
    expect(screen.getByText('Based on last year')).toBeInTheDocument();

    const link = screen.getByText('Learn more').closest('a');
    expect(link).toHaveAttribute('href', '/docs/help-doc');
  });
});
