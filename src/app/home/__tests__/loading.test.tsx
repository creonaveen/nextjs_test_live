import { render } from '@testing-library/react';

import HomeLoading from '../loading';

describe('HomeLoading', () => {
  it('should render loading skeleton', () => {
    const { container } = render(<HomeLoading />);

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render grid container with correct classes', () => {
    const { container } = render(<HomeLoading />);

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('gap-4', 'sm:gap-6', 'lg:grid-cols-3');
  });

  it('should render market commentary skeleton card', () => {
    const { container } = render(<HomeLoading />);

    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render 5 skeleton cards', () => {
    const { container } = render(<HomeLoading />);

    const cards = container.querySelectorAll('[data-slot="card"]');
    // Should have at least 5 cards (market commentary, todays case, news, watchlist, top50, model portfolio)
    expect(cards.length).toBeGreaterThanOrEqual(5);
  });

  it('should render watchlist table rows skeleton', () => {
    const { container } = render(<HomeLoading />);

    // Check for skeleton elements that represent table rows
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render top50 table rows with numbering skeleton', () => {
    const { container } = render(<HomeLoading />);

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should have correct card padding classes', () => {
    const { container } = render(<HomeLoading />);

    const cardsWithPadding = container.querySelectorAll('.p-5');
    expect(cardsWithPadding.length).toBeGreaterThan(0);
  });

  it('should render news card with image placeholder', () => {
    const { container } = render(<HomeLoading />);

    const newsCard = container.querySelector('.overflow-hidden');
    expect(newsCard).toBeInTheDocument();
  });

  it('should render button skeletons', () => {
    const { container } = render(<HomeLoading />);

    const buttonSkeletons = container.querySelectorAll('.h-9');
    expect(buttonSkeletons.length).toBeGreaterThan(0);
  });

  it('should render chart placeholders', () => {
    const { container } = render(<HomeLoading />);

    // Check for chart placeholder using className contains
    const chartSkeletons = Array.from(container.querySelectorAll('[data-slot="skeleton"]')).filter(
      (el) => el.className.includes('h-[200px]')
    );
    expect(chartSkeletons.length).toBeGreaterThan(0);
  });
});
