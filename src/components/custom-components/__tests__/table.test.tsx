import { render, screen } from '@testing-library/react';

import type { TableEntry } from '@/lib/types/tables-example';

import { TableComponent } from '../table/table';

function makeTableEntry(overrides: Partial<TableEntry> = {}): TableEntry {
  return {
    component_name: 'standardTable',
    params: {
      data: {
        i1: { c1: 'Name A', c2: '100' },
        i2: { c1: 'Name B', c2: '200' },
      },
      column_headers: {
        i1: 'Name',
        i2: 'Score',
      },
    },
    ...overrides,
  };
}

describe('TableComponent', () => {
  it('renders "No table data available." when data is null', () => {
    render(<TableComponent data={null as unknown as TableEntry} />);
    expect(screen.getByText('No table data available.')).toBeInTheDocument();
  });

  it('renders "No table data available." when data is undefined', () => {
    render(<TableComponent data={undefined as unknown as TableEntry} />);
    expect(screen.getByText('No table data available.')).toBeInTheDocument();
  });

  it('renders "No table data available." when params is null', () => {
    const data = makeTableEntry({ params: null as unknown as TableEntry['params'] });
    render(<TableComponent data={data} />);
    expect(screen.getByText('No table data available.')).toBeInTheDocument();
  });

  it('renders "No data available." when params has empty data', () => {
    const data = makeTableEntry({
      params: {
        data: {},
        column_headers: {},
      },
    });
    render(<TableComponent data={data} />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  it('renders "No data available." when params has data but no row keys', () => {
    const data = makeTableEntry({
      params: {
        data: {},
        column_headers: { i1: 'Col1' },
      },
    });
    render(<TableComponent data={data} />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  it('renders TableSkeleton when isLoading is true', () => {
    const data = makeTableEntry();
    const { container } = render(<TableComponent data={data} isLoading />);
    const skeletonRows = container.querySelectorAll('tr');
    expect(skeletonRows.length).toBeGreaterThan(0);
    const pulseElements = container.querySelectorAll('.animate-pulse');
    expect(pulseElements.length).toBeGreaterThan(0);
  });

  it('renders table with header and body when data is valid', () => {
    const data = makeTableEntry();
    render(<TableComponent data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Name A')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Name B')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('renders caption when params.caption is provided', () => {
    const data = makeTableEntry({
      params: {
        ...makeTableEntry().params,
        caption: 'Table caption text',
      },
    });
    render(<TableComponent data={data} />);
    expect(screen.getByText('Table caption text')).toBeInTheDocument();
  });

  it('does not render caption when params.caption is undefined', () => {
    const dataNoCaption = makeTableEntry({
      params: {
        data: { i1: { c1: 'A', c2: 'B' } },
        column_headers: { i1: 'C1', i2: 'C2' },
      },
    });
    render(<TableComponent data={dataNoCaption} />);
    expect(screen.queryByRole('caption')).not.toBeInTheDocument();
  });

  it('renders table_header when params.table_header is provided', () => {
    const data = makeTableEntry({
      params: {
        ...makeTableEntry().params,
        table_header: 'Custom table header',
      },
    });
    render(<TableComponent data={data} />);
    expect(screen.getByText('Custom table header')).toBeInTheDocument();
  });

  it('renders correct number of body rows', () => {
    const data = makeTableEntry({
      params: {
        data: {
          i1: { c1: 'R1', c2: '1' },
          i2: { c1: 'R2', c2: '2' },
          i3: { c1: 'R3', c2: '3' },
        },
        column_headers: { i1: 'Col1', i2: 'Col2' },
      },
    });
    const { container } = render(<TableComponent data={data} />);
    const tbody = container.querySelector('tbody');
    const rows = tbody?.querySelectorAll('tr') ?? [];
    expect(rows).toHaveLength(3);
  });

  it('uses standard-table type when component_name is standardTable', () => {
    const data = makeTableEntry({ component_name: 'standardTable' });
    const { container } = render(<TableComponent data={data} />);
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
    const headerRow = container.querySelector('.standard-table-row-header');
    expect(headerRow).toBeInTheDocument();
  });

  it('uses clean-table type when component_name is cleanTable', () => {
    const data = makeTableEntry({
      component_name: 'cleanTable',
      params: {
        data: { i1: { c1: 'X', c2: 'Y' } },
        column_headers: { i1: 'A', i2: 'B' },
      },
    });
    const { container } = render(<TableComponent data={data} />);
    const headerRow = container.querySelector('.clean-table-row-header');
    expect(headerRow).toBeInTheDocument();
  });

  it('uses research-table type when component_name is researchTable', () => {
    const data = makeTableEntry({
      component_name: 'researchTable',
      params: {
        data: { i1: { c1: 'X', c2: 'Y' } },
        column_headers: { i1: 'A', i2: 'B' },
      },
    });
    const { container } = render(<TableComponent data={data} />);
    const headerRow = container.querySelector('.research-table-row-header');
    expect(headerRow).toBeInTheDocument();
  });

  it('renders table without column_headers when only data is provided', () => {
    const data = makeTableEntry({
      params: {
        data: {
          i1: { c1: 'Only', c2: 'Data' },
        },
        column_headers: {},
      },
    });
    render(<TableComponent data={data} />);
    expect(screen.getByText('Only')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });

  it('renders numeric cell values correctly', () => {
    const data = makeTableEntry({
      params: {
        data: {
          i1: { c1: 'Row1', c2: 42 },
          i2: { c1: 'Row2', c2: 99.5 },
        },
        column_headers: { i1: 'Label', i2: 'Value' },
      },
    });
    render(<TableComponent data={data} />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('99.5')).toBeInTheDocument();
  });
});
