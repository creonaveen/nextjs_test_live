import { render } from '@testing-library/react';

import CompanyPageLoading, { TechnicalCommentSkeleton } from '../loading';

describe('CompanyPageLoading', () => {
  it('should render loading skeleton', () => {
    const { container } = render(<CompanyPageLoading />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render company header skeleton', () => {
    const { container } = render(<CompanyPageLoading />);

    // Check for skeleton elements in header section
    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render company information section skeleton', () => {
    const { container } = render(<CompanyPageLoading />);

    // Check for card elements
    const cards = container.querySelectorAll('[class*="rounded-xl"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render main chart section skeleton', () => {
    const { container } = render(<CompanyPageLoading />);

    // Check for chart skeleton (large height skeleton)
    const chartSkeleton =
      container.querySelector('[class*="h-[400px]"]') ||
      container.querySelector('[class*="h-[500px]"]');
    expect(chartSkeleton).toBeInTheDocument();
  });

  it('should render key info section skeleton', () => {
    const { container } = render(<CompanyPageLoading />);

    // Check for grid layout in key info section
    const grids = container.querySelectorAll('[class*="grid"]');
    expect(grids.length).toBeGreaterThan(0);
  });

  it('should render signals section skeleton', () => {
    const { container } = render(<CompanyPageLoading />);

    // Check for signal cards
    const signalCards = container.querySelectorAll('[class*="border-grey-200"]');
    expect(signalCards.length).toBeGreaterThan(0);
  });

  it('should have proper spacing classes', () => {
    const { container } = render(<CompanyPageLoading />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('w-full', 'space-y-8');
  });

  it('should render multiple skeleton elements', () => {
    const { container } = render(<CompanyPageLoading />);

    // Should have many skeleton elements for different sections
    const allSkeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(allSkeletons.length).toBeGreaterThan(10);
  });
});

describe('TechnicalCommentSkeleton', () => {
  it('should render technical comment skeleton', () => {
    const { container } = render(<TechnicalCommentSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render title skeleton', () => {
    const { container } = render(<TechnicalCommentSkeleton />);

    const titleSkeleton = container.querySelector('[class*="h-6"]');
    expect(titleSkeleton).toBeInTheDocument();
  });

  it('should render multiple line skeletons', () => {
    const { container } = render(<TechnicalCommentSkeleton />);

    const lineSkeletons = container.querySelectorAll('[class*="h-4"]');
    expect(lineSkeletons.length).toBeGreaterThan(0);
  });

  it('should have proper spacing', () => {
    const { container } = render(<TechnicalCommentSkeleton />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('space-y-4');
  });
});
