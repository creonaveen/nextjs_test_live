import React from 'react';
import { render, screen } from '@testing-library/react';

import ContentRenderer from '../content-renderer';

// Mock dependencies
jest.mock('@/components/custom-components/chart/chart-maximize-with-trigger', () => ({
  ChartMaximizeWithTrigger: ({ children, title }: unknown) => (
    <div data-testid="chart-maximize" data-title={title}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/custom-components/svg-renderer', () => ({
  __esModule: true,
  default: ({ alt, chart_params }: unknown) => (
    <div data-testid="svg-renderer" data-alt={alt} data-chart-params={chart_params}>
      SVG
    </div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: unknown) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} data-testid="image" />
  ),
}));

jest.mock('@/components/link', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href?: string;
    children?: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="link">
      {children}
    </a>
  ),
}));

describe('ContentRenderer', () => {
  it('should render h2 heading', () => {
    const content = [{ type: 'h2', text: 'Heading 2' }];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Heading 2')).toBeInTheDocument();
    expect(screen.getByText('Heading 2').tagName).toBe('H2');
  });

  it('should render h3 heading', () => {
    const content = [{ type: 'h3', text: 'Heading 3' }];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Heading 3')).toBeInTheDocument();
    expect(screen.getByText('Heading 3').tagName).toBe('H3');
  });

  it('should render paragraph', () => {
    const content = [{ type: 'paragraph', text: 'Paragraph text' }];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
    expect(screen.getByText('Paragraph text').tagName).toBe('P');
  });

  it('should render list with list items', () => {
    const content = [
      {
        type: 'list',
        items: [
          { type: 'list_item', text: 'Item 1' },
          { type: 'list_item', text: 'Item 2' },
        ],
      },
    ];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should render link', () => {
    const content = [
      {
        type: 'link',
        href: '/test',
        text: 'Link Text',
      },
    ];
    render(<ContentRenderer content={content} />);

    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Link Text');
  });

  it('should render image', () => {
    const content = [
      {
        type: 'image',
        img: '/test-image.jpg',
        alt: 'Test Image',
        caption: 'Image Caption',
      },
    ];
    render(<ContentRenderer content={content} />);

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByText('Image Caption')).toBeInTheDocument();
  });

  it('should render image_dynamic with chart maximize', () => {
    const content = [
      {
        type: 'image_dynamic',
        title: 'Dynamic Chart',
        chart_param: 'param1',
        image_dynamic: {
          chart_maximize: true,
        },
      },
    ];
    render(<ContentRenderer content={content} />);

    expect(screen.getByTestId('chart-maximize')).toBeInTheDocument();
    expect(screen.getByTestId('svg-renderer')).toBeInTheDocument();
  });

  it('should render image_dynamic without chart maximize', () => {
    const content = [
      {
        type: 'image_dynamic',
        title: 'Dynamic Chart',
        chart_param: 'param1',
        image_dynamic: {
          chart_maximize: false,
        },
      },
    ];
    render(<ContentRenderer content={content} />);

    expect(screen.queryByTestId('chart-maximize')).not.toBeInTheDocument();
    expect(screen.getByTestId('svg-renderer')).toBeInTheDocument();
  });

  it('should render list item with content array containing link', () => {
    const content = [
      {
        type: 'list',
        items: [
          {
            type: 'list_item',
            content: [
              { type: 'text', text: 'Text before ' },
              { type: 'link', href: '/link', text: 'Link Text' },
            ],
          },
        ],
      },
    ];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Link Text')).toBeInTheDocument();
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/link');
  });

  it('should render default case for unknown type', () => {
    const content = [{ type: 'unknown', text: 'Unknown content' }];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Unknown content')).toBeInTheDocument();
  });

  it('should render multiple content items', () => {
    const content = [
      { type: 'h2', text: 'Heading' },
      { type: 'paragraph', text: 'Paragraph' },
      { type: 'link', href: '/link', text: 'Link' },
    ];
    render(<ContentRenderer content={content} />);

    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });
});
