import { render } from '@testing-library/react';
import { Table } from 'investtech/external-components';

import TableSkeleton from '../table-skeleton';

describe('TableSkeleton', () => {
  it('should render table skeleton with default rows', () => {
    const { container } = render(
      <Table>
        <TableSkeleton columns={3} />
      </Table>
    );
    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(8); // default rows
  });

  it('should render table skeleton with custom rows', () => {
    const { container } = render(
      <Table>
        <TableSkeleton rows={5} columns={3} />
      </Table>
    );
    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(5);
  });

  it('should render correct number of columns', () => {
    const { container } = render(
      <Table>
        <TableSkeleton columns={4} />
      </Table>
    );
    const firstRow = container.querySelector('tr');
    const cells = firstRow?.querySelectorAll('td');
    expect(cells).toHaveLength(4);
  });

  it('should apply correct text alignment for first column', () => {
    const { container } = render(
      <Table>
        <TableSkeleton columns={3} />
      </Table>
    );
    const firstRow = container.querySelector('tr');
    const firstCell = firstRow?.querySelector('td');
    expect(firstCell).toHaveClass('text-right');
  });

  it('should apply correct text alignment for last column', () => {
    const { container } = render(
      <Table>
        <TableSkeleton columns={3} />
      </Table>
    );
    const firstRow = container.querySelector('tr');
    const cells = firstRow?.querySelectorAll('td');
    const lastCell = cells?.[cells.length - 1];
    expect(lastCell).toHaveClass('text-left');
  });

  it('should apply correct text alignment for middle columns', () => {
    const { container } = render(
      <Table>
        <TableSkeleton columns={5} />
      </Table>
    );
    const firstRow = container.querySelector('tr');
    const middleCell = firstRow?.querySelectorAll('td')[2];
    expect(middleCell).toHaveClass('text-center');
  });

  it('should render skeleton divs in cells', () => {
    const { container } = render(
      <Table>
        <TableSkeleton columns={2} />
      </Table>
    );
    const skeletonDivs = container.querySelectorAll('.animate-pulse');
    expect(skeletonDivs.length).toBeGreaterThan(0);
  });
});
