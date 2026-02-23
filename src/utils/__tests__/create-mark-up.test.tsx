import { render } from '@testing-library/react';

import { RenderHTML } from '@/utils/create-mark-up';

describe('RenderHTML', () => {
  it('should render HTML content', () => {
    const { container } = render(<RenderHTML html="<p>Test HTML</p>" />);
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe('Test HTML');
  });

  it('should render complex HTML', () => {
    const html = '<div><h1>Title</h1><p>Content</p></div>';
    const { container } = render(<RenderHTML html={html} />);
    expect(container.querySelector('h1')?.textContent).toBe('Title');
    expect(container.querySelector('p')?.textContent).toBe('Content');
  });

  it('should handle empty HTML', () => {
    const { container } = render(<RenderHTML html="" />);
    // When html is empty, RenderHTML returns null, so no span should be rendered
    const span = container.querySelector('span');
    expect(span).not.toBeInTheDocument();
  });

  it('should render HTML with attributes', () => {
    const html = '<a href="/test">Link</a>';
    const { container } = render(<RenderHTML html={html} />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link?.getAttribute('href')).toBe('/test');
  });
});
