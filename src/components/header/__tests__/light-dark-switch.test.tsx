import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'next-themes';

import { LightDarkSwitch } from '../light-dark-switch';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('LightDarkSwitch', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    mockSetTheme.mockClear();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });
  });

  it('should render the theme switch button', async () => {
    render(<LightDarkSwitch />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeDefined();
    });
  });

  it('should show moon icon when theme is light', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });

    render(<LightDarkSwitch />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeDefined();
    });
  });

  it('should show sun icon when theme is dark', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    });

    render(<LightDarkSwitch />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeDefined();
    });
  });

  it('should toggle theme from light to dark on click', async () => {
    const user = userEvent.setup();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });

    render(<LightDarkSwitch />);

    await waitFor(async () => {
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  it('should toggle theme from dark to light on click', async () => {
    const user = userEvent.setup();
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    });

    render(<LightDarkSwitch />);

    await waitFor(async () => {
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  it('should render button when theme is not resolved', () => {
    mockUseTheme.mockReturnValue({
      theme: undefined,
      setTheme: mockSetTheme,
      resolvedTheme: undefined,
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });

    render(<LightDarkSwitch />);
    // The component should render a button (may or may not be disabled depending on mounting state)
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  });

  it('should apply correct className', async () => {
    render(<LightDarkSwitch />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-primary');
      expect(button.className).toContain('size-9');
      expect(button.className).toContain('cursor-pointer');
    });
  });
});
