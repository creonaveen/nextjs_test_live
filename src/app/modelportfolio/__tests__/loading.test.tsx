import { render } from '@testing-library/react';

import Loading from '../loading';

describe('ModelPortfolio Loading', () => {
  it('should render loading skeletons', () => {
    const { container } = render(<Loading />);

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render header section skeleton', () => {
    const { container } = render(<Loading />);
    const headerSkeletons = container.querySelectorAll('.h-10');
    expect(headerSkeletons.length).toBeGreaterThan(0);
  });

  it('should render portfolio holdings skeleton', () => {
    const { container } = render(<Loading />);
    const holdingsSkeleton = container.querySelector('.lg\\:w-3\\/4');
    expect(holdingsSkeleton).toBeInTheDocument();
  });
});
