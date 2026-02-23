import { render } from '@testing-library/react';

import Loading from '../loading';

describe('Loading', () => {
  it('should render loading skeleton', () => {
    const { container } = render(<Loading />);

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render company info skeleton', () => {
    const { container } = render(<Loading />);

    const companySkeletons = container.querySelectorAll('.h-5, .h-8');
    expect(companySkeletons.length).toBeGreaterThan(0);
  });

  it('should render chart skeletons', () => {
    const { container } = render(<Loading />);

    const chartSkeletons = container.querySelectorAll('.h-\\[200px\\], .h-\\[500px\\]');
    expect(chartSkeletons.length).toBeGreaterThan(0);
  });

  it('should render table skeletons', () => {
    const { container } = render(<Loading />);

    const tableSkeletons = container.querySelectorAll('.h-4, .h-5');
    expect(tableSkeletons.length).toBeGreaterThan(0);
  });

  it('should render card components', () => {
    const { container } = render(<Loading />);

    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should have correct container classes', () => {
    const { container } = render(<Loading />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('w-full', 'space-y-4', 'md:space-y-8');
  });
});
