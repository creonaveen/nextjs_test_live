import { render } from '@testing-library/react';

import { chevronUp, chevronDown, arrowUp, arrowDown, arrowRight, arrowLeft } from '../icon';

describe('Icon', () => {
  it('should render chevronUp with className', () => {
    const { container } = render(chevronUp('test-class'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('test-class');
    expect(svg).toHaveClass('up-down-icon');
  });

  it('should render chevronDown with className', () => {
    const { container } = render(chevronDown('test-class'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('test-class');
    expect(svg).toHaveClass('up-down-icon');
  });

  it('should render arrowUp with optional className', () => {
    const { container } = render(arrowUp('arrow-class'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('arrow-class');
    expect(svg).toHaveClass('up-down-icon');
  });

  it('should render arrowUp without className', () => {
    const { container } = render(arrowUp());
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('up-down-icon');
  });

  it('should render arrowDown with optional className', () => {
    const { container } = render(arrowDown('arrow-class'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('arrow-class');
  });

  it('should render arrowDown without className', () => {
    const { container } = render(arrowDown());
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render arrowRight with optional className', () => {
    const { container } = render(arrowRight('arrow-class'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('arrow-class');
  });

  it('should render arrowRight without className', () => {
    const { container } = render(arrowRight());
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render arrowLeft with optional className', () => {
    const { container } = render(arrowLeft('arrow-class'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('arrow-class');
  });

  it('should render arrowLeft without className', () => {
    const { container } = render(arrowLeft());
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render icons with size 12', () => {
    const { container } = render(chevronUp('test'));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Lucide icons use size prop, not attribute
    expect(svg).toHaveAttribute('width', '12');
    expect(svg).toHaveAttribute('height', '12');
  });
});
