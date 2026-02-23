import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { TableOfContentsProvider, useTableOfContentsContext } from '../intra-page-menu';
import TableOfContents from '../table-of-contents';

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock getBoundingClientRect globally so tests remain stable
HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
  top: 120,
  left: 0,
  bottom: 200,
  right: 0,
  width: 100,
  height: 80,
  x: 0,
  y: 120,
  toJSON: () => {},
}));

// Ensure window.scrollY is writable
Object.defineProperty(window, 'scrollY', {
  configurable: true,
  writable: true,
  value: 0,
});

describe('TableOfContents', () => {
  const mockSections = [
    { id: '1', title: 'Section 1' },
    { id: '2', title: 'Section 2' },
    { id: '3', title: 'Section 3' },
  ];

  it('renders table of contents with sections', () => {
    render(
      <TableOfContentsProvider sections={mockSections}>
        <TableOfContents sections={mockSections} />
      </TableOfContentsProvider>
    );

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <TableOfContentsProvider sections={mockSections}>
        <TableOfContents sections={mockSections} title="Contents" />
      </TableOfContentsProvider>
    );

    expect(screen.getByText('Contents')).toBeInTheDocument();
  });

  it('highlights first section as active initially', () => {
    render(
      <TableOfContentsProvider sections={mockSections}>
        <TableOfContents sections={mockSections} />
      </TableOfContentsProvider>
    );

    const first = screen.getByText('Section 1').closest('button');
    expect(first).toHaveClass('text-primary');
  });

  it('scrolls to section when clicked', async () => {
    const user = userEvent.setup();

    // Set up a mock section element that will act as section-1
    const mockSectionEl = document.createElement('div');
    document.body.appendChild(mockSectionEl);

    const TestRegistrar = () => {
      const { registerSection } = useTableOfContentsContext();
      React.useEffect(() => {
        registerSection('section-1', mockSectionEl);
      }, [registerSection]);
      return null;
    };

    render(
      <TableOfContentsProvider sections={mockSections}>
        <TestRegistrar />
        <TableOfContents sections={mockSections} />
      </TableOfContentsProvider>
    );

    const second = screen.getByText('Section 2');
    await user.click(second);

    await waitFor(() => {
      expect(global.scrollTo).toHaveBeenCalled();
    });

    document.body.removeChild(mockSectionEl);
  });

  it('calls beforeScroll when clicking a section', async () => {
    const user = userEvent.setup();
    const beforeScroll = jest.fn();

    render(
      <TableOfContentsProvider sections={mockSections}>
        <TableOfContents sections={mockSections} beforeScroll={beforeScroll} />
      </TableOfContentsProvider>
    );

    const section2 = screen.getByText('Section 2');
    await user.click(section2);

    expect(beforeScroll).toHaveBeenCalled();
  });

  it('renders separators between items', () => {
    const { container } = render(
      <TableOfContentsProvider sections={mockSections}>
        <TableOfContents sections={mockSections} />
      </TableOfContentsProvider>
    );

    const separators = container.querySelectorAll('.bg-divider');
    expect(separators.length).toBe(2);
  });

  it('accepts custom className', () => {
    const { container } = render(
      <TableOfContentsProvider sections={mockSections}>
        <TableOfContents sections={mockSections} className="custom-class" />
      </TableOfContentsProvider>
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('throws error when used outside provider', () => {
    const originalError = console.error;
    console.error = jest.fn(); // silence React error logs

    expect(() => {
      render(<TableOfContents sections={mockSections} />);
    }).toThrow('useTableOfContentsContext must be used within TableOfContentsProvider');

    console.error = originalError;
  });
});

describe('TableOfContentsProvider', () => {
  const mockSections = [
    { id: '1', title: 'Section 1' },
    { id: '2', title: 'Section 2' },
  ];

  it('provides context to children', () => {
    const Test = () => {
      const { activeSection } = useTableOfContentsContext();
      return <span data-testid="value">{activeSection}</span>;
    };

    render(
      <TableOfContentsProvider sections={mockSections}>
        <Test />
      </TableOfContentsProvider>
    );

    expect(screen.getByTestId('value')).toBeInTheDocument();
  });

  it('sets initial active section = section-0', () => {
    const Test = () => {
      const { activeSection } = useTableOfContentsContext();
      return <span data-testid="value">{activeSection}</span>;
    };

    render(
      <TableOfContentsProvider sections={mockSections}>
        <Test />
      </TableOfContentsProvider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent('section-0');
  });
});
