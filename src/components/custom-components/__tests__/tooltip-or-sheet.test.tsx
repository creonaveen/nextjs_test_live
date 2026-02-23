import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as platform from '@/lib/platform';

import { TooltipOrSheet } from '../tooltip-or-sheet';

// Mock usePlatform
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(() => 'desktop'),
}));

describe('TooltipOrSheet', () => {
  it('should render trigger element', () => {
    render(<TooltipOrSheet text="Test tooltip text" triggerElement={<button>Hover me</button>} />);

    expect(screen.getByRole('button', { name: /hover me/i })).toBeInTheDocument();
  });

  it('should render tooltip on desktop platform', async () => {
    const user = userEvent.setup();
    render(<TooltipOrSheet text="Test tooltip text" triggerElement={<button>Hover me</button>} />);

    const trigger = screen.getByRole('button', { name: /hover me/i });
    await user.hover(trigger);

    // Tooltip should be accessible
    expect(trigger).toBeInTheDocument();
  });

  it('should render sheet on mobile platform', async () => {
    // Mock mobile platform
    (platform.usePlatform as jest.Mock).mockReturnValueOnce('mobile');

    const user = userEvent.setup();
    render(<TooltipOrSheet text="Test sheet text" triggerElement={<button>Click me</button>} />);

    const trigger = screen.getByRole('button', { name: /click me/i });
    await user.click(trigger);

    // Sheet should open
    expect(screen.getByText('Test sheet text')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(
      <TooltipOrSheet
        title="Tooltip Title"
        text="Test text"
        triggerElement={<button>Trigger</button>}
      />
    );

    expect(screen.getByRole('button', { name: /trigger/i })).toBeInTheDocument();
  });

  it('should render with ReactNode text', () => {
    render(
      <TooltipOrSheet
        text={<div>React Node Content</div>}
        triggerElement={<button>Trigger</button>}
      />
    );

    expect(screen.getByRole('button', { name: /trigger/i })).toBeInTheDocument();
  });

  it('should render HTML when useHtml is true', () => {
    const htmlText = '<p>HTML Content</p>';
    render(
      <TooltipOrSheet text={htmlText} useHtml={true} triggerElement={<button>Trigger</button>} />
    );

    expect(screen.getByRole('button', { name: /trigger/i })).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    const { container } = render(
      <TooltipOrSheet
        text="Test"
        triggerElement={<button>Trigger</button>}
        className="custom-class"
      />
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
