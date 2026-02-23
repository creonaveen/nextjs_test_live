import { render, screen } from '@testing-library/react';

import {
  TextTagWithArrowIcon,
  MyDataIcon,
  AlertIcon,
  MyDataBadge,
  WarningIconTiny,
} from '@/utils/common-functions';

describe('common-functions', () => {
  describe('TextTagWithArrowIcon', () => {
    it('renders content with arrow icon', () => {
      render(
        <TextTagWithArrowIcon
          content="Test Content"
          testId="arrow-tag"
          icon="arrow_up"
          color="positive"
        />
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders arrow span with testId', () => {
      render(
        <TextTagWithArrowIcon
          content="Test"
          testId="my-arrow-id"
          icon="arrow_up"
          color="positive"
        />
      );
      expect(document.getElementById('my-arrow-id')).toBeInTheDocument();
    });

    it('applies positive background color', () => {
      const { container } = render(
        <TextTagWithArrowIcon content="Test" testId="t1" icon="arrow_up" color="positive" />
      );
      expect(container.querySelector('.bg-success')).toBeInTheDocument();
    });

    it('applies negative background color', () => {
      const { container } = render(
        <TextTagWithArrowIcon content="Test" testId="t2" icon="arrow_down" color="negative" />
      );
      expect(container.querySelector('.bg-error')).toBeInTheDocument();
    });

    it('applies neutral background color', () => {
      const { container } = render(
        <TextTagWithArrowIcon content="Test" testId="t3" icon="arrow_left" color="neutral" />
      );
      expect(container.querySelector('.bg-warning')).toBeInTheDocument();
    });

    it('applies default background color for unknown color', () => {
      const { container } = render(
        <TextTagWithArrowIcon content="Test" testId="t4" icon="arrow_right" color="unknown" />
      );
      expect(container.querySelector('.bg-warning')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(
        <TextTagWithArrowIcon
          content="Test"
          testId="t5"
          icon="arrow_up"
          color="positive"
          className="custom-class"
        />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('renders only arrow when content is undefined', () => {
      render(
        <TextTagWithArrowIcon content={undefined} testId="t6" icon="arrow_up" color="positive" />
      );
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
      expect(document.getElementById('t6')).toBeInTheDocument();
    });

    it('renders only arrow when content is empty string', () => {
      render(<TextTagWithArrowIcon content="" testId="t7" icon="arrow_up" color="positive" />);
      expect(document.getElementById('t7')).toBeInTheDocument();
    });

    it('renders only arrow when content is whitespace only', () => {
      render(<TextTagWithArrowIcon content="   " testId="t8" icon="arrow_up" color="positive" />);
      expect(document.getElementById('t8')).toBeInTheDocument();
    });

    it('renders text first then arrow when textPosition is first (default)', () => {
      const { container } = render(
        <TextTagWithArrowIcon
          content="Label"
          testId="t9"
          icon="arrow_up"
          color="positive"
          textPosition="first"
        />
      );
      const wrapper = container.querySelector('.gap-1');
      expect(wrapper).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
      const arrowSpan = document.getElementById('t9');
      expect(wrapper?.contains(arrowSpan)).toBe(true);
      expect(wrapper?.firstChild?.textContent?.trim()).toBe('Label');
    });

    it('renders arrow first then text when textPosition is last', () => {
      const { container } = render(
        <TextTagWithArrowIcon
          content="After"
          testId="t10"
          icon="arrow_down"
          color="neutral"
          textPosition="last"
        />
      );
      const wrapper = container.querySelector('.gap-1');
      expect(wrapper).toBeInTheDocument();
      const arrowSpan = document.getElementById('t10');
      expect(wrapper?.firstChild).toBe(arrowSpan);
      expect(screen.getByText('After')).toBeInTheDocument();
    });

    it('applies justify-end when align is right (default)', () => {
      const { container } = render(
        <TextTagWithArrowIcon
          content="X"
          testId="t11"
          icon="arrow_up"
          color="positive"
          align="right"
        />
      );
      expect(container.querySelector('.justify-end')).toBeInTheDocument();
    });

    it('applies justify-start when align is left', () => {
      const { container } = render(
        <TextTagWithArrowIcon
          content="X"
          testId="t12"
          icon="arrow_up"
          color="positive"
          align="left"
        />
      );
      expect(container.querySelector('.justify-start')).toBeInTheDocument();
    });
  });

  describe('MyDataIcon', () => {
    it('renders a span with Heart icon', () => {
      const { container } = render(<MyDataIcon />);
      const wrapper = container.querySelector('.flex.items-center.gap-1');
      expect(wrapper).toBeInTheDocument();
      const heart = container.querySelector('svg');
      expect(heart).toBeInTheDocument();
    });
  });

  describe('AlertIcon', () => {
    it('renders a span with TriangleAlertIcon', () => {
      const { container } = render(<AlertIcon />);
      const wrapper = container.querySelector('.flex.items-center.gap-1');
      expect(wrapper).toBeInTheDocument();
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('MyDataBadge', () => {
    it('renders displayText inside Badge', () => {
      render(<MyDataBadge displayText="Badge text" />);
      expect(screen.getByText('Badge text')).toBeInTheDocument();
    });

    it('renders HTML in displayText via RenderHTML', () => {
      render(<MyDataBadge displayText="<strong>Bold</strong>" />);
      const strong = document.querySelector('strong');
      expect(strong).toBeInTheDocument();
      expect(strong?.textContent).toBe('Bold');
    });
  });

  describe('WarningIconTiny', () => {
    it('renders with default size', () => {
      const { container } = render(<WarningIconTiny />);
      expect(container.querySelector('.text-error-text')).toBeInTheDocument();
      expect(container.querySelector('.size-4')).toBeInTheDocument();
    });

    it('renders with custom size prop', () => {
      const { container } = render(<WarningIconTiny size={6} />);
      expect(container.querySelector('.size-6')).toBeInTheDocument();
    });
  });
});
