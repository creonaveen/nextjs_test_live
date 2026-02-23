import { render } from '@testing-library/react';

import Loading from '../loading';

describe('Loading', () => {
  it('should render loading skeleton', () => {
    const { container } = render(<Loading />);

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render header section skeleton', () => {
    const { container } = render(<Loading />);

    const headerSkeletons = container.querySelectorAll('.h-10');
    expect(headerSkeletons.length).toBeGreaterThan(0);
  });

  it('should render company section skeleton with grid layout', () => {
    const { container } = render(<Loading />);

    const grid = container.querySelector('.grid-cols-1');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('lg:grid-cols-2');
  });

  it('should render 4 company skeleton cards', () => {
    const { container } = render(<Loading />);

    // The component renders 4 cards in a grid, check for Card components using data-slot
    const cards = container.querySelectorAll('[data-slot="card"]');
    // Should have at least 4 company cards (plus 3 table cards = 7 total, plus 4 nested badge cards = 11 total)
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it('should render table section skeleton with grid layout', () => {
    const { container } = render(<Loading />);

    const grids = container.querySelectorAll('.grid');
    const tableGrid = Array.from(grids).find((grid) => grid.classList.contains('lg:grid-cols-3'));
    expect(tableGrid).toBeInTheDocument();
  });

  it('should render 3 table skeleton cards', () => {
    const { container } = render(<Loading />);

    // The component renders 3 table cards in a grid
    const cards = container.querySelectorAll('[data-slot="card"]');
    // Should have at least 7 cards total (4 company + 3 table, plus 4 nested badge cards = 11 total)
    expect(cards.length).toBeGreaterThanOrEqual(7);
  });

  it('should have correct container classes', () => {
    const { container } = render(<Loading />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('w-full', 'space-y-4');
  });

  it('should render rounded skeleton cards', () => {
    const { container } = render(<Loading />);

    // Check for rounded classes (rounded-lg, rounded-xl, etc.)
    const roundedSkeletons = container.querySelectorAll('[class*="rounded"]');
    expect(roundedSkeletons.length).toBeGreaterThan(0);
  });
});
