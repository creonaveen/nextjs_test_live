import { render } from '@testing-library/react';

import { Spinner } from '../spinner';

describe('Spinner', () => {
  it('should render spinner', () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should have animate-spin class', () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('animate-spin');
  });

  it('should have rounded-full class for circular shape', () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('rounded-full');
  });

  it('should have correct size classes', () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('h-5', 'w-5');
  });

  it('should have border classes for spinner effect', () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('border-2');
  });
});
