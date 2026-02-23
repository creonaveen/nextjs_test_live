import { render } from '@testing-library/react';

import { useScrollbarGutter } from '@/lib/hooks/use-scroll-bar-gutter';

import { ScrollbarGutterProvider } from '../scrollbar-gutter-provider';

// Mock the hook
jest.mock('@/lib/hooks/use-scroll-bar-gutter', () => ({
  useScrollbarGutter: jest.fn(),
}));

const mockUseScrollbarGutter = useScrollbarGutter as jest.MockedFunction<typeof useScrollbarGutter>;

describe('ScrollbarGutterProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseScrollbarGutter.mockReturnValue(false);
  });

  it('should render without crashing', () => {
    const { container } = render(<ScrollbarGutterProvider />);
    expect(container).toBeInTheDocument();
  });

  it('should call useScrollbarGutter hook', () => {
    render(<ScrollbarGutterProvider />);
    expect(mockUseScrollbarGutter).toHaveBeenCalledTimes(1);
  });

  it('should return null (render nothing)', () => {
    const { container } = render(<ScrollbarGutterProvider />);
    // The component returns null, so container should be empty
    expect(container.firstChild).toBeNull();
  });

  it('should handle hook return value', () => {
    mockUseScrollbarGutter.mockReturnValue(true);
    const { container } = render(<ScrollbarGutterProvider />);

    expect(mockUseScrollbarGutter).toHaveBeenCalled();
    expect(container.firstChild).toBeNull();
  });

  it('should call hook on every render', () => {
    const { rerender } = render(<ScrollbarGutterProvider />);
    expect(mockUseScrollbarGutter).toHaveBeenCalledTimes(1);

    rerender(<ScrollbarGutterProvider />);
    expect(mockUseScrollbarGutter).toHaveBeenCalledTimes(2);
  });

  it('should work correctly when hook throws an error', () => {
    mockUseScrollbarGutter.mockImplementation(() => {
      throw new Error('Hook error');
    });

    // Should not crash, but the error will be thrown
    expect(() => render(<ScrollbarGutterProvider />)).toThrow('Hook error');
  });

  it('should be a client component', () => {
    // The component has 'use client' directive, which is a build-time directive
    // We can verify it's a functional component
    expect(typeof ScrollbarGutterProvider).toBe('function');
  });
});
