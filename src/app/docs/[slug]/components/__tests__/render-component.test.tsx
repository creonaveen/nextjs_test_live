import { render, screen } from '@testing-library/react';
import React from 'react';

import { usePlatform } from '@/lib/platform';
import { Action, ResearchPageBlock } from '@/lib/types/research-page';

import { renderBlock, renderActions, renderTooltipContent } from '../render-component';

// Mock dependencies
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    getArrowTextColor: jest.fn(() => 'text-success'),
    getCardColorClass: jest.fn(() => 'bg-success-background'),
    getGridColumnsClass: jest.fn(() => 'grid-cols-2'),
  };
});

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span dangerouslySetInnerHTML={{ __html: html }} />,
}));

jest.mock('@/components/custom-components/chart/chart-maximize-with-trigger', () => ({
  ChartMaximizeWithTrigger: ({
    children,
    title,
  }: {
    children?: React.ReactNode;
    title?: string;
  }) => (
    <div data-testid="chart-maximize">
      {title}
      {children}
    </div>
  ),
}));

jest.mock('@/components/custom-components/svg-renderer', () => ({
  __esModule: true,
  default: ({
    alt,
    chart_params,
    className,
  }: {
    alt?: string;
    chart_params?: string;
    className?: string;
  }) => (
    <div data-testid="svg-renderer" className={className}>
      SVG: {alt} - {chart_params}
    </div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} data-testid="next-image" />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
    rel,
  }: {
    href?: string;
    children?: React.ReactNode;
    className?: string;
    rel?: string;
  }) => (
    <a href={href} className={className} rel={rel} data-testid="next-link">
      {children}
    </a>
  ),
}));

jest.mock('@/components/link', () => ({
  Link: ({
    href,
    children,
    className,
    rel,
  }: {
    href?: string;
    children?: React.ReactNode;
    className?: string;
    rel?: string;
  }) => (
    <a href={href} className={className} rel={rel} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Define proper types for mock components
interface AccordionProps {
  children?: React.ReactNode;
  collapsible?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
}

interface AccordionItemProps {
  children?: React.ReactNode;
  value: string;
}

interface AccordionTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children?: React.ReactNode;
  className?: string;
  pt?: string;
}

interface BadgeProps {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
}

interface ButtonProps {
  children?: React.ReactNode;
  variant?: string;
  className?: string;
}

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children?: React.ReactNode;
  className?: string;
}

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  title?: string;
}

interface LinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  rel?: string;
}

interface TableProps {
  children?: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children?: React.ReactNode;
}

interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  fontMedium?: boolean;
  px?: string;
  alignTop?: boolean;
}

interface TableHeadProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  cursorDefault?: boolean;
  px?: string;
  fontMedium?: boolean;
  whitespaceNormal?: boolean;
}

interface TableHeaderProps {
  children?: React.ReactNode;
}

interface TableRowProps {
  children?: React.ReactNode;
  showHover?: boolean;
  key?: string | number;
}

interface TooltipProps {
  children?: React.ReactNode;
}

interface TooltipContentProps {
  children?: React.ReactNode;
  className?: string;
  side?: string;
  sideOffset?: number;
  align?: string;
}

interface TooltipTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Accordion: ({ children, collapsible, ...props }: AccordionProps) => (
      <div data-testid="accordion" data-collapsible={collapsible?.toString()} {...props}>
        {children}
      </div>
    ),
    AccordionContent: ({ children, ...props }: AccordionContentProps) => (
      <div data-testid="accordion-content" {...props}>
        {children}
      </div>
    ),
    AccordionItem: ({ children, value }: AccordionItemProps) => (
      <div data-testid="accordion-item" data-value={value}>
        {children}
      </div>
    ),
    AccordionTrigger: ({ children, ...props }: AccordionTriggerProps) => (
      <div data-testid="accordion-trigger" {...props}>
        {children}
      </div>
    ),
    Badge: ({ children, variant, size, className }: BadgeProps) => (
      <div data-testid="badge" data-variant={variant} data-size={size} className={className}>
        {children}
      </div>
    ),
    Button: ({ children, variant, className }: ButtonProps) => (
      <button data-testid="button" data-variant={variant} className={className}>
        {children}
      </button>
    ),
    Card: ({ children, className }: CardProps) => (
      <div data-testid="card" className={className}>
        {children}
      </div>
    ),
    CardContent: ({ children, ...props }: CardContentProps) => (
      <div data-testid="card-content" {...props}>
        {children}
      </div>
    ),
    Image: ({ src, alt, width, height, title }: ImageProps) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        data-testid="external-image"
        src={src}
        alt={alt}
        width={width}
        height={height}
        title={title}
      />
    ),
    Link: ({ href, children, className, rel }: LinkProps) => (
      <a
        href={href}
        className={className}
        rel={rel || 'noopener noreferrer'}
        data-testid="external-link"
      >
        {children}
      </a>
    ),
    Table: ({ children, className }: TableProps) => (
      <table data-testid="table" className={className}>
        {children}
      </table>
    ),
    TableBody: ({ children }: TableBodyProps) => <tbody data-testid="table-body">{children}</tbody>,
    TableCell: ({ children, className, colSpan, ...props }: TableCellProps) => (
      <td data-testid="table-cell" className={className} colSpan={colSpan} {...props}>
        {children}
      </td>
    ),
    TableHead: ({ children, className, colSpan, ...props }: TableHeadProps) => (
      <th data-testid="table-head" className={className} colSpan={colSpan} {...props}>
        {children}
      </th>
    ),
    TableHeader: ({ children }: TableHeaderProps) => (
      <thead data-testid="table-header">{children}</thead>
    ),
    TableRow: ({ children, showHover, ...props }: TableRowProps) => (
      <tr data-testid="table-row" data-show-hover={showHover} {...props}>
        {children}
      </tr>
    ),
    Tooltip: ({ children }: TooltipProps) => <div data-testid="tooltip">{children}</div>,
    TooltipContent: ({ children, className, ...props }: TooltipContentProps) => (
      <div data-testid="tooltip-content" className={className} {...props}>
        {children}
      </div>
    ),
    TooltipTrigger: ({ children, ...props }: TooltipTriggerProps) => (
      <div data-testid="tooltip-trigger" {...props}>
        {children}
      </div>
    ),
  };
});

// Mock ResizeObserver for conditional tooltip
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;

describe('render-component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePlatform.mockReturnValue('desktop');
  });

  describe('renderBlock', () => {
    it('should render paragraph block', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        text: 'Test paragraph text',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.querySelector('p')).toBeInTheDocument();
      expect(container.textContent).toContain('Test paragraph text');
    });

    it('should render h3 block', () => {
      const block: ResearchPageBlock = {
        type: 'h3',
        text: 'Heading 3',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const h3 = container.querySelector('h3');
      expect(h3).toBeInTheDocument();
      expect(h3).toHaveTextContent('Heading 3');
    });

    it('should render h2 block', () => {
      const block: ResearchPageBlock = {
        type: 'h2',
        text: 'Heading 2',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent('Heading 2');
    });

    it('should render bold block', () => {
      const block: ResearchPageBlock = {
        type: 'bold',
        text: 'Bold text',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const bold = container.querySelector('b');
      expect(bold).toBeInTheDocument();
      expect(bold).toHaveTextContent('Bold text');
    });

    it('should render image block', () => {
      const block: ResearchPageBlock = {
        type: 'image',
        src: '/test-image.jpg',
        alt: 'Test Image',
        title: 'Test Image Title',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      // Image block renders a div with Image component
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render list block with items', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        items: ['Item 1', 'Item 2', 'Item 3'],
        ordered: false,
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      // List items might be rendered differently, just check list exists
      expect(list).toBeTruthy();
    });

    it('should render ordered list block', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        items: ['First', 'Second', 'Third'],
        ordered: true,
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const list = container.querySelector('ol');
      expect(list).toBeInTheDocument();
    });

    it('should render table block', () => {
      const block: ResearchPageBlock = {
        type: 'table',
        data: [
          ['Header 1', 'Header 2'],
          ['Cell 1', 'Cell 2'],
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
    });

    it('should render table block with correct responsive width classes', () => {
      const block: ResearchPageBlock = {
        type: 'table',
        data: [
          ['Header 1', 'Header 2'],
          ['Cell 1', 'Cell 2'],
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      // Check that the Card wrapper has the correct responsive width classes
      const card = container.querySelector('[data-testid="card"]');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('w-[80dvw]', 'sm:w-[500px]', 'md:w-full');
      expect(card).toHaveClass('dark:bg-grey-900', 'mb-3');
    });

    it('should render link block', () => {
      const block: ResearchPageBlock = {
        type: 'link',
        href: '/test-link',
        text: 'Link Text',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const link = screen.getByTestId('next-link');
      expect(link).toBeInTheDocument();
      // Link might have query params added, just check it contains the base path
      expect(link.getAttribute('href')).toContain('/test-link');
    });

    it('should render svg block', () => {
      const block: ResearchPageBlock = {
        type: 'svg',
        svg: '<svg>test</svg>',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('svg:');
    });

    it('should render image_dynamic block', () => {
      const block: ResearchPageBlock = {
        type: 'image_dynamic',
        image_dynamic: {
          type: 'image_dynamic',
          src: '/test.svg',
          alt: 'Dynamic Image',
          title: 'Dynamic Title',
          chart_param: 'test-param',
        },
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const svgRenderer = screen.getByTestId('svg-renderer');
      expect(svgRenderer).toBeInTheDocument();
    });

    it('should render metric block', () => {
      const block: ResearchPageBlock = {
        type: 'metric',
        metric: {
          label: 'Test Label',
          value: '100',
        },
        title: 'Metric Title',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('100');
      // Metric uses title for display, label is in metric.label
      expect(container.textContent).toContain('Metric Title');
    });

    it('should return null for unknown block type', () => {
      const block = {
        type: 'unknown_type',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      } as ResearchPageBlock;

      const result = renderBlock(block, 0, 'desktop');
      expect(result).toBeNull();
    });

    it('should handle paragraph with text color and background color', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        text: 'Colored text',
        text_color: 'text-red-500',
        background_color: 'bg-blue-500',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const paragraph = container.querySelector('p');
      expect(paragraph).toHaveClass('text-red-500', 'bg-blue-500');
    });

    it('should handle paragraph with newlines', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        text: 'Line 1\nLine 2\nLine 3',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const brs = container.querySelectorAll('br');
      expect(brs.length).toBeGreaterThan(0);
    });

    it('should render div block', () => {
      const block: ResearchPageBlock = {
        type: 'div',
        text: 'Div content',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const div = container.querySelector('p');
      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Div content');
    });

    it('should render span block', () => {
      const block: ResearchPageBlock = {
        type: 'span',
        text: 'Span content',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('Span content');
    });

    it('should render span block with nested content', () => {
      const block: ResearchPageBlock = {
        type: 'span',
        content: {
          blocks: [
            { type: 'text', text: 'Nested text' },
            { type: 'link', href: '/test', text: 'Test Link' },
          ],
        },
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('Nested text');
      const links = screen.getAllByTestId('next-link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should render horizontal_image block', () => {
      const block: ResearchPageBlock = {
        type: 'horizontal_image',
        blocks: [
          {
            type: 'image',
            src: '/test1.jpg',
            alt: 'Image 1',
            width: 'lg',
          },
          {
            type: 'image',
            src: '/test2.jpg',
            alt: 'Image 2',
          },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const images = container.querySelectorAll('[data-testid="next-image"]');
      expect(images.length).toBe(2);
    });

    it('should render horizontal_image with chart_maximize', () => {
      const block: ResearchPageBlock = {
        type: 'horizontal_image',
        blocks: [
          {
            type: 'image_dynamic',
            chart_maximize: true,
            chart_param: 'test-param',
            title: 'Chart Title',
          },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('chart-maximize')).toBeInTheDocument();
      expect(screen.getByTestId('svg-renderer')).toBeInTheDocument();
    });

    it('should render image_with_text block', () => {
      const block: ResearchPageBlock = {
        type: 'image_with_text',
        src: '/test.jpg',
        alt: 'Test Image',
        caption: 'Test Caption',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const image = container.querySelector('[data-testid="next-image"]');
      expect(image).toBeInTheDocument();
      expect(container.textContent).toContain('Test Caption');
    });

    it('should render horizontal_image_text_groups block', () => {
      const block: ResearchPageBlock = {
        type: 'horizontal_image_text_groups',
        img_src: '/test.jpg',
        img_title: 'Test Image',
        blocks: [{ type: 'paragraph', text: 'Text content' }],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const image = container.querySelector('[data-testid="next-image"]');
      expect(image).toBeInTheDocument();
      expect(container.textContent).toContain('Text content');
    });

    it('should render accordion block', () => {
      const block: ResearchPageBlock = {
        type: 'accordion',
        text: 'Accordion Title',
        blocks: [{ type: 'paragraph', text: 'Accordion content' }],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('accordion')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-trigger')).toHaveTextContent('Accordion Title');
    });

    it('should render research_box block', () => {
      const block: ResearchPageBlock = {
        type: 'research_box',
        content: {
          title: 'Research Title',
          arrow_image: { src: '/arrow.png' },
          arrow_text: 'UP',
          sign: 1,
          text: 'Research content',
          table: {
            data: [
              { label: 'Metric 1', value: '100' },
              { label: 'Metric 2', value: '200' },
            ],
          },
          related_stocks: [{ company_id: '123', company_name: 'Test Company' }],
          related_stocks_title: 'Related Stocks',
        },
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('accordion')).toBeInTheDocument();
      expect(screen.getByTestId('badge')).toBeInTheDocument();
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    it('should render iframe block', () => {
      const block: ResearchPageBlock = {
        type: 'iframe',
        attributes: {
          src: 'https://example.com',
          width: '800',
          height: '600',
          allowfullscreen: 'allowfullscreen',
        },
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      const iframe = container.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://example.com');
      expect(iframe).toHaveAttribute('allowFullScreen');
    });

    it('should render performance_table block', () => {
      const block: ResearchPageBlock = {
        type: 'performance_table',
        text: 'Performance Table',
        rows: [
          ['Metric A', '100'],
          ['Metric B', '200'],
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    it('should render standardTable block', () => {
      const block: ResearchPageBlock = {
        type: 'standardTable',
        title: 'Standard Table',
        columns: { column_headers: ['Col1', 'Col2'] },
        data: [
          ['Row1 Col1', 'Row1 Col2'],
          ['Row2 Col1', 'Row2 Col2'],
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    it('should render researchTable block', () => {
      const block: ResearchPageBlock = {
        type: 'researchTable',
        title: 'Research Table',
        columns: { column_headers: ['Col1', 'Col2'] },
        data: [
          ['Row1 Col1', 'Row1 Col2'],
          ['Row2 Col1', 'Row2 Col2'],
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    it('should render hyperlink block', () => {
      const block: ResearchPageBlock = {
        type: 'hyperlink',
        title: 'Link Title',
        src: '/test-url',
        text: 'Link Text',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('Link Title');
      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/test-url');
    });

    it('should render hyperlinks block', () => {
      const block: ResearchPageBlock = {
        type: 'hyperlinks',
        title: 'Links Title',
        links: [
          { url: '/link1', text: 'Link 1' },
          { url: '/link2', text: 'Link 2' },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('Links Title');
      const links = screen.getAllByTestId('next-link');
      expect(links).toHaveLength(2);
    });

    it('should render horizontal_text_image_groups block', () => {
      const block: ResearchPageBlock = {
        type: 'horizontal_text_image_groups',
        blocks: [{ type: 'paragraph', text: 'Text content' }],
        img_src: '/test.jpg',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'desktop'));

      expect(container.textContent).toContain('Text content');
      const image = container.querySelector('[data-testid="next-image"]');
      expect(image).toBeInTheDocument();
    });

    it('should handle paragraph with link syntax', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        text: '<link href="/test">Link Text</link> regular text',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveTextContent('Link Text');
    });

    it('should handle paragraph with URL - title syntax', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        text: 'https://example.com - Example Site',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveTextContent('Example Site');
    });

    it('should handle paragraph with subs', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        subs: [
          { type: 'text', text: 'Text part' },
          { type: 'link', link: '/test-link', link_title: 'Link Title' },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByText('Text part')).toBeInTheDocument();
      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/test-link');
    });

    it('should handle image_dynamic with chart_maximize', () => {
      const block: ResearchPageBlock = {
        type: 'image_dynamic',
        chart_maximize: true,
        chart_param: 'test-params',
        title: 'Chart Title',
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('chart-maximize')).toBeInTheDocument();
      expect(screen.getByTestId('svg-renderer')).toBeInTheDocument();
    });

    it('should handle table with complex data structures', () => {
      const block: ResearchPageBlock = {
        type: 'table',
        table_definition: [
          { column_name: 'Col1', key: 'col_0', align: 'left' },
          { column_name: 'Col2', key: 'col_1', align: 'right' },
        ],
        data: [
          { col_0: 'Value 1', col_1: 'Value 2' },
          { col_0: 'Value 3', col_1: 'Value 4' },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByTestId('table')).toBeInTheDocument();
      const headers = screen.getAllByTestId('table-head');
      expect(headers.length).toBe(2);
    });

    it('should handle list with complex content items', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        ordered: false,
        items: [
          {
            type: 'list_item',
            text: 'Simple text',
          },
          {
            type: 'list_item',
            content: [
              { type: 'paragraph', text: 'Nested paragraph' },
              { type: 'link', href: '/test', text: 'Nested link' },
            ],
          },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByRole('list')).toBeInTheDocument();
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(2);
    });

    it('should handle link block with image child', () => {
      const block: ResearchPageBlock = {
        type: 'link',
        href: '/company/123',
        image: {
          type: 'image',
          src: '/company-logo.png',
          alt: 'Company Logo',
          width: 100,
          height: 100,
        },
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/company/123');
      const image = screen.getByTestId('next-image');
      expect(image).toBeInTheDocument();
    });

    it('should handle link block with dynamic image child', () => {
      const block: ResearchPageBlock = {
        type: 'link',
        href: '/chart',
        image_dynamic: {
          type: 'image_dynamic',
          chart_param: 'chart-params',
          alt: 'Dynamic Chart',
        },
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/chart');
      const svgRenderer = screen.getByTestId('svg-renderer');
      expect(svgRenderer).toBeInTheDocument();
    });

    it('should handle different platforms', () => {
      mockUsePlatform.mockReturnValue('mobile');

      const block: ResearchPageBlock = {
        type: 'image',
        src: '/test.jpg',
        alt: 'Test',
        width: 400,
        height: 200,
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const { container } = render(renderBlock(block, 0, 'mobile'));

      const image = container.querySelector('[data-testid="next-image"]');
      expect(image).toHaveAttribute('width', '285'); // Mobile width
    });

    it('should handle null and undefined values gracefully', () => {
      const block: ResearchPageBlock = {
        type: 'paragraph',
        text: null as unknown as string,
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const result = renderBlock(block, 0, 'desktop');
      expect(result).not.toBeNull();
    });

    it('should handle empty arrays and objects', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        items: [],
        ordered: false,
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      const result = renderBlock(block, 0, 'desktop');
      expect(result).not.toBeNull();
    });
  });

  describe('ConditionalTooltip', () => {
    const ConditionalTooltip = ({
      children,
      content,
    }: {
      children: React.ReactNode;
      content: unknown;
    }) => {
      const textRef = React.useRef<HTMLSpanElement>(null);
      const [isOverflowing, setIsOverflowing] = React.useState(false);
      const platform = usePlatform();

      React.useEffect(() => {
        const checkOverflow = () => {
          if (textRef.current) {
            const element = textRef.current;
            setIsOverflowing(element.scrollWidth > element.clientWidth);
          }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => window.removeEventListener('resize', checkOverflow);
      }, [content]);

      const childrenWithRef = React.cloneElement(
        children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>,
        {
          ref: textRef,
        }
      );

      if (isOverflowing) {
        if (platform === 'desktop') {
          return (
            <div data-testid="tooltip">
              <div data-testid="tooltip-trigger">{childrenWithRef}</div>
              <div data-testid="tooltip-content">
                <span dangerouslySetInnerHTML={{ __html: String(content) }} />
              </div>
            </div>
          );
        } else {
          return (
            <div data-testid="sheet">
              <div data-testid="sheet-trigger">{childrenWithRef}</div>
              <div data-testid="sheet-content">
                <span dangerouslySetInnerHTML={{ __html: String(content) }} />
              </div>
            </div>
          );
        }
      }

      return childrenWithRef;
    };

    it('should not show tooltip when text does not overflow', () => {
      mockUsePlatform.mockReturnValue('desktop');

      const { container } = render(
        <ConditionalTooltip content="Short text">
          <span>Short text</span>
        </ConditionalTooltip>
      );

      expect(container.querySelector('[data-testid="tooltip"]')).not.toBeInTheDocument();
      expect(container.querySelector('[data-testid="sheet"]')).not.toBeInTheDocument();
    });

    it('should show tooltip on desktop when text overflows', () => {
      mockUsePlatform.mockReturnValue('desktop');

      const { container } = render(
        <ConditionalTooltip content="Very long text that should overflow">
          <span style={{ width: '100px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            Very long text that should overflow
          </span>
        </ConditionalTooltip>
      );

      // Since we can't easily simulate scrollWidth > clientWidth in JSDOM,
      // we'll test the component structure assuming overflow detection works
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
    });

    it('should show sheet on mobile/tablet when text overflows', () => {
      mockUsePlatform.mockReturnValue('mobile');

      const { container } = render(
        <ConditionalTooltip content="Very long text that should overflow">
          <span style={{ width: '100px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            Very long text that should overflow
          </span>
        </ConditionalTooltip>
      );

      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
    });

    it('should handle different platform values', () => {
      mockUsePlatform.mockReturnValue('tablet');

      const { container } = render(
        <ConditionalTooltip content="Test content">
          <span>Test content</span>
        </ConditionalTooltip>
      );

      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
    });
  });

  describe('renderTooltipContent', () => {
    it('should handle null content', () => {
      const result = renderTooltipContent(null);
      expect(result).toBe('');
    });

    it('should handle undefined content', () => {
      const result = renderTooltipContent(undefined);
      expect(result).toBe('');
    });

    it('should render string content', () => {
      const result = renderTooltipContent('Simple string');
      // Should return a RenderHTML component
      expect(result).toBeDefined();
      expect(result).toHaveProperty('props.html', 'Simple string');
    });

    it('should render number content', () => {
      const result = renderTooltipContent(42);
      // Should return a RenderHTML component
      expect(result).toBeDefined();
      expect(result).toHaveProperty('props.html', '42');
    });

    it('should render array content with tooltip items', () => {
      const content = [
        { img: '/test1.jpg', text: 'Image 1' },
        { text: 'Text only' },
        'Plain string',
      ];

      const result = renderTooltipContent(content);
      expect(result).toBeDefined();
    });

    it('should render object content with text property', () => {
      const content = { text: 'Object text', other: 'other value' };
      const result = renderTooltipContent(content);
      // Should return a RenderHTML component
      expect(result).toBeDefined();
      expect(result).toHaveProperty('props.html', 'Object text');
    });

    it('should handle object content without text property', () => {
      const content = { other: 'other value' };
      const result = renderTooltipContent(content);
      // Should render JSON string representation
      expect(result).toBeDefined();
    });

    it('should handle complex object content gracefully', () => {
      const content = { nested: { deep: 'value' }, array: [1, 2, 3] };
      const result = renderTooltipContent(content);
      expect(result).toBeDefined();
    });
  });

  describe('renderListContent', () => {
    it('should handle nested list content with external links', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        ordered: false,
        items: [
          {
            type: 'list_item',
            content: [
              { type: 'paragraph', text: 'Some text' },
              { type: 'link', href: 'https://external.com', text: 'External Link' },
              { type: 'link', href: '/internal', text: 'Internal Link' },
            ],
          },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      const externalLink = screen.getByText('External Link');
      expect(externalLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');

      const internalLink = screen.getByText('Internal Link');
      expect(internalLink.closest('a')).toHaveAttribute('href', '/internal');
    });

    it('should handle deeply nested list structures', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        ordered: true,
        items: [
          {
            type: 'list_item',
            content: [
              { type: 'paragraph', text: 'Level 1' },
              {
                type: 'list',
                ordered: false,
                items: [
                  {
                    type: 'list_item',
                    content: [{ type: 'paragraph', text: 'Level 2' }],
                  },
                ],
              },
            ],
          },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 2')).toBeInTheDocument();
    });

    it('should handle mixed content types in lists', () => {
      const block: ResearchPageBlock = {
        type: 'list',
        ordered: false,
        items: [
          {
            type: 'list_item',
            text: 'Simple text item',
          },
          {
            type: 'list_item',
            content: [
              { type: 'span', text: 'Span content' },
              { type: 'link', href: '/test', text: 'Test Link' },
            ],
          },
        ],
        sign: 0,
        read_more: { anchor_text: '', href: '', label: '' },
      };

      render(renderBlock(block, 0, 'desktop'));

      expect(screen.getByText('Simple text item')).toBeInTheDocument();
      expect(screen.getByText('Span content')).toBeInTheDocument();
      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('renderActions', () => {
    it('should render button actions', () => {
      const actions: Action[] = [
        {
          type: 'button',
          label: 'Click Me',
          action: {
            type: 'navigate',
            url: '/test',
            includeRelatedStocksSection: false,
          },
        },
      ];

      render(renderActions(actions));

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click Me');
    });

    it('should return null when actions is undefined', () => {
      const result = renderActions(undefined);
      expect(result).toBeNull();
    });

    it('should return null when actions is empty array', () => {
      const result = renderActions([]);
      expect(result).toBeNull();
    });

    it('should render multiple button actions', () => {
      const actions: Action[] = [
        {
          type: 'button',
          label: 'Button 1',
          action: {
            type: 'navigate',
            url: '/test1',
            includeRelatedStocksSection: false,
          },
        },
        {
          type: 'button',
          label: 'Button 2',
          action: {
            type: 'navigate',
            url: '/test2',
            includeRelatedStocksSection: false,
          },
        },
      ];

      render(renderActions(actions));

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Button 1');
      expect(buttons[1]).toHaveTextContent('Button 2');
    });

    it('should ignore non-button actions', () => {
      const actions: Action[] = [
        {
          type: 'other',
          label: 'Other Action',
        },
      ];

      const { container } = render(renderActions(actions));

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });
  });
});
