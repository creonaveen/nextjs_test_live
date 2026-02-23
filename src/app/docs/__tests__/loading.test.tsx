import { render } from '@testing-library/react';
import React from 'react';

import Loading from '../loading';

describe('Loading', () => {
  it('should render loading skeleton', () => {
    const { container } = render(<Loading />);

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render main content skeleton with correct classes', () => {
    const { container } = render(<Loading />);

    const mainSkeleton = container.querySelector('.h-\\[80vh\\]');
    expect(mainSkeleton).toBeInTheDocument();
    expect(mainSkeleton).toHaveClass('w-full', 'md:w-3/4');
  });

  it('should render sidebar skeleton with correct classes', () => {
    const { container } = render(<Loading />);

    const sidebarSkeleton = container.querySelector('.hidden');
    expect(sidebarSkeleton).toBeInTheDocument();
    expect(sidebarSkeleton).toHaveClass('md:block');
    // Check for height class using className instead
    expect(sidebarSkeleton?.className).toContain('h-[60vh]');
    expect(sidebarSkeleton).toHaveClass('w-1/4');
  });

  it('should have correct container layout classes', () => {
    const { container } = render(<Loading />);

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass(
      'flex',
      'flex-1',
      'items-start',
      'justify-center',
      'gap-4',
      'lg:gap-6'
    );
  });
});
