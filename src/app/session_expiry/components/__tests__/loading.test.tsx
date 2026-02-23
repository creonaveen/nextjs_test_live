import { render } from '@testing-library/react';

import SessionExpirySkeleton from '../loading';

describe('SessionExpirySkeleton', () => {
  it('should render loading skeleton', () => {
    const { container } = render(<SessionExpirySkeleton />);

    const card = container.querySelector('.animate-pulse');
    expect(card).toBeInTheDocument();
  });

  it('should render logo skeleton', () => {
    const { container } = render(<SessionExpirySkeleton />);

    const logoSkeleton = container.querySelector('.h-8.w-28');
    expect(logoSkeleton).toBeInTheDocument();
  });

  it('should render title skeleton', () => {
    const { container } = render(<SessionExpirySkeleton />);

    const titleSkeleton = container.querySelector('.h-8.w-3\\/4');
    expect(titleSkeleton).toBeInTheDocument();
  });

  it('should render message skeletons', () => {
    const { container } = render(<SessionExpirySkeleton />);

    const messageSkeletons = container.querySelectorAll('.h-4');
    expect(messageSkeletons.length).toBeGreaterThan(0);
  });

  it('should render button skeleton', () => {
    const { container } = render(<SessionExpirySkeleton />);

    const buttonSkeleton = container.querySelector('.h-10.w-36');
    expect(buttonSkeleton).toBeInTheDocument();
  });

  it('should have correct container classes', () => {
    const { container } = render(<SessionExpirySkeleton />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      'flex',
      'min-h-[80dvh]',
      'items-center',
      'justify-center',
      'px-4'
    );
  });
});
