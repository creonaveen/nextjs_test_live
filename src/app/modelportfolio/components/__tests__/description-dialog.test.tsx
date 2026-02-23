import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DescriptionDialog from '../description-dialog';

// Mock investtech/external-components (Dialog + Button)
jest.mock('investtech/external-components', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest mock factory runs before imports
  const React = require('react');
  return {
    Dialog: ({ children }: unknown) => <div data-testid="dialog">{children}</div>,
    DialogTrigger: ({ children, asChild, onClick }: unknown) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
          onClick,
          'data-testid': 'dialog-trigger',
          ...children.props,
        });
      }
      return (
        <button onClick={onClick} data-testid="dialog-trigger">
          {children}
        </button>
      );
    },
    DialogContent: ({ children, onClick }: unknown) => (
      <div
        data-testid="dialog-content"
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e: unknown) => e.key === 'Enter' && onClick(e) : undefined}
      >
        {children}
      </div>
    ),
    DialogHeader: ({ children }: unknown) => <div data-testid="dialog-header">{children}</div>,
    DialogTitle: ({ children }: unknown) => <h2 data-testid="dialog-title">{children}</h2>,
    DialogDescription: ({ children }: unknown) => (
      <p data-testid="dialog-description">{children}</p>
    ),
    Button: (() => {
      const B = React.forwardRef(
        (
          {
            children,
            className,
            variant,
            onClick,
            ...props
          }: {
            children?: React.ReactNode;
            className?: string;
            variant?: string;
            onClick?: () => void;
            [key: string]: unknown;
          },
          ref: unknown
        ) => (
          <button
            ref={ref}
            className={className}
            data-variant={variant}
            onClick={onClick}
            {...props}
          >
            {children}
          </button>
        )
      );
      B.displayName = 'Button';
      return B;
    })(),
  };
});

describe('DescriptionDialog', () => {
  const mockPopup = {
    title: 'Popup Title',
    text: 'Popup Text',
    trigger_text: 'Click me',
    popup_text: 'Popup Description',
  };

  it('should return null when popup is not provided', () => {
    const { container } = render(<DescriptionDialog popup={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render dialog trigger with popup trigger_text', () => {
    render(<DescriptionDialog popup={mockPopup} />);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render custom children as trigger', () => {
    render(
      <DescriptionDialog popup={mockPopup}>
        <span>Custom Trigger</span>
      </DescriptionDialog>
    );

    expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
  });

  it('should render dialog title from popup', () => {
    render(<DescriptionDialog popup={mockPopup} />);

    // Open dialog by clicking trigger
    const trigger = screen.getByTestId('dialog-trigger');
    userEvent.click(trigger);

    expect(screen.getByText('Popup Title')).toBeInTheDocument();
  });

  it('should render dialog title from title prop when popup title is missing', () => {
    const popupWithoutTitle = {
      ...mockPopup,
      title: undefined,
    };

    render(<DescriptionDialog popup={popupWithoutTitle} title="Prop Title" />);

    const trigger = screen.getByTestId('dialog-trigger');
    userEvent.click(trigger);

    expect(screen.getByText('Prop Title')).toBeInTheDocument();
  });

  it('should render dialog description from popup_text', () => {
    render(<DescriptionDialog popup={mockPopup} />);

    const trigger = screen.getByTestId('dialog-trigger');
    userEvent.click(trigger);

    expect(screen.getByText('Popup Description')).toBeInTheDocument();
  });

  it('should render dialog description from text when popup_text is missing', () => {
    const popupWithoutPopupText = {
      ...mockPopup,
      popup_text: undefined,
    };

    render(<DescriptionDialog popup={popupWithoutPopupText} />);

    const trigger = screen.getByTestId('dialog-trigger');
    userEvent.click(trigger);

    expect(screen.getByText('Popup Text')).toBeInTheDocument();
  });

  it('should render dialog trigger', () => {
    render(<DescriptionDialog popup={mockPopup} />);

    const trigger = screen.getByTestId('dialog-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Click me');
  });
});
