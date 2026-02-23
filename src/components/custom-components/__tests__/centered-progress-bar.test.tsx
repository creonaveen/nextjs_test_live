import { render, screen } from '@testing-library/react';

import { CenteredProgress } from '../centered-progress-bar';

describe('CenteredProgress', () => {
  it('should render progress bar', () => {
    const { container } = render(<CenteredProgress value={50} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toBeInTheDocument();
  });

  it('should render with positive value', () => {
    const { container } = render(<CenteredProgress value={100} max={200} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toBeInTheDocument();
  });

  it('should render with negative value', () => {
    const { container } = render(<CenteredProgress value={-50} max={200} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toBeInTheDocument();
  });

  it('should clamp value to max', () => {
    render(<CenteredProgress value={300} max={200} showValue={true} />);
    expect(screen.getByText('+200')).toBeInTheDocument();
  });

  it('should clamp value to negative max', () => {
    render(<CenteredProgress value={-300} max={200} showValue={true} />);
    expect(screen.getByText('-200')).toBeInTheDocument();
  });

  it('should display value when showValue is true', () => {
    render(<CenteredProgress value={75} showValue={true} />);
    expect(screen.getByText('+75')).toBeInTheDocument();
  });

  it('should not display value when showValue is false', () => {
    render(<CenteredProgress value={75} showValue={false} />);
    expect(screen.queryByText('+75')).not.toBeInTheDocument();
  });

  it('should apply sm size class', () => {
    const { container } = render(<CenteredProgress value={50} size="sm" />);
    const progressBar = container.querySelector('.h-2');
    expect(progressBar).toBeInTheDocument();
  });

  it('should apply md size class', () => {
    const { container } = render(<CenteredProgress value={50} size="md" />);
    const progressBar = container.querySelector('.h-3');
    expect(progressBar).toBeInTheDocument();
  });

  it('should apply lg size class', () => {
    const { container } = render(<CenteredProgress value={50} size="lg" />);
    const progressBar = container.querySelector('.h-4');
    expect(progressBar).toBeInTheDocument();
  });

  it('should apply technical variant styles', () => {
    const { container } = render(<CenteredProgress value={50} variant="technical" />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toBeInTheDocument();
  });

  it('should apply default variant styles', () => {
    const { container } = render(<CenteredProgress value={50} variant="default" />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    const { container } = render(<CenteredProgress value={50} className="custom-class" />);
    const progressBar = container.querySelector('.custom-class');
    expect(progressBar).toBeInTheDocument();
  });

  it('should display zero value correctly', () => {
    render(<CenteredProgress value={0} showValue={true} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
