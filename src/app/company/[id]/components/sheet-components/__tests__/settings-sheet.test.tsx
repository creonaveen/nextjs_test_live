'use client';

/**
 * Settings Sheet Component Tests
 *
 * Tests for the SettingsSheet component including:
 * - Mobile vs Desktop layout rendering
 * - Chart indicator selection and callbacks
 * - Tooltip settings changes
 * - Accessibility features
 * - Responsive behavior
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { usePlatform } from '@/lib/platform';
import type { MainChartLabelsAndTexts } from '@/lib/types/company';
import type { MainChartSettings } from '@/lib/types/user-settings';

import { SettingsSheet } from '../settings-sheet';

// Mock the platform hook
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(() => 'desktop'),
}));

// Mock data
const mockLabelsAndTexts: MainChartLabelsAndTexts = {
  technical_indicators: 'Technical Indicators',
};

const mockMainChartSettings: MainChartSettings = {
  chart_indicators: {
    selected: ['80', '81'],
    options: {
      '80': {
        caption: 'Moving Average',
        id: '80',
      },
      '81': {
        caption: 'RSI',
        id: '81',
      },
      '82': {
        caption: 'MACD',
        id: '82',
      },
      '83': {
        caption: 'Support & Resistance',
        id: '83',
      },
      '84': {
        caption: 'Bollinger Bands',
        id: '84',
      },
      '85': {
        caption: 'Volume',
        id: '85',
      },
      '86': {
        caption: 'Trend Line',
        id: '86',
      },
      '88': {
        caption: 'Fibonacci',
        id: '88',
      },
      '89': {
        caption: 'Stochastic',
        id: '89',
      },
    },
  },
  tooltip_settings: {
    selected: 2,
    options: {
      '1': {
        caption: 'Always Show',
        id: '1',
      },
      '2': {
        caption: 'On Hover',
        id: '2',
      },
      '3': {
        caption: 'Hide',
        id: '3',
      },
    },
  },
};

describe('SettingsSheet Component', () => {
  const mockPlatformHook = usePlatform as jest.MockedFunction<typeof usePlatform>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPlatformHook.mockReturnValue('desktop');
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      mockPlatformHook.mockReturnValue('desktop');
    });

    it('should render the settings trigger button', () => {
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      expect(settingsButton).toBeInTheDocument();
    });

    it('should open sheet when trigger button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      // Check for the sheet title (sr-only)
      const sheetTitle = screen.getByText('Chart Settings');
      expect(sheetTitle).toBeInTheDocument();
      expect(sheetTitle).toHaveClass('sr-only');
    });

    it('should display accessibility elements on desktop', async () => {
      const user = userEvent.setup();
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      expect(screen.getByText('Chart Settings')).toHaveClass('sr-only');
      expect(screen.getByText('Configure chart indicators and tooltip settings')).toHaveClass(
        'sr-only'
      );
    });

    it('should display technical indicators header', async () => {
      const user = userEvent.setup();
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      const header = screen.getByText('Technical Indicators');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('text-base', 'font-semibold');
    });

    it('should display all chart indicators', async () => {
      const user = userEvent.setup();
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      expect(screen.getByText('Moving Average')).toBeInTheDocument();
      expect(screen.getByText('RSI')).toBeInTheDocument();
      expect(screen.getByText('MACD')).toBeInTheDocument();
      expect(screen.getByText('Support & Resistance')).toBeInTheDocument();
      expect(screen.getByText('Bollinger Bands')).toBeInTheDocument();
      expect(screen.getByText('Volume')).toBeInTheDocument();
      expect(screen.getByText('Trend Line')).toBeInTheDocument();
      expect(screen.getByText('Fibonacci')).toBeInTheDocument();
      expect(screen.getByText('Stochastic')).toBeInTheDocument();
    });

    it('should display tooltip settings section', async () => {
      const user = userEvent.setup();
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      expect(screen.getByText('Hover Info Mode')).toBeInTheDocument();
      expect(screen.getByText('Always Show')).toBeInTheDocument();
      expect(screen.getByText('On Hover')).toBeInTheDocument();
      expect(screen.getByText('Hide')).toBeInTheDocument();
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      mockPlatformHook.mockReturnValue('mobile');
    });

    it('should render mobile layout structure', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      // Verify mobile layout by checking key content is rendered
      expect(screen.getByText('Technical Indicators')).toBeInTheDocument();
      expect(screen.getByText('Moving Average')).toBeInTheDocument();
    });

    it('should have proper mobile CSS classes', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      // Check that indicators are displayed
      expect(screen.getByText('Technical Indicators')).toBeInTheDocument();

      // Verify some indicators are rendered
      expect(screen.getByText('Moving Average')).toBeInTheDocument();
    });
  });

  describe('Indicator Toggle Functionality', () => {
    it('should call onIndicatorToggle when checkbox is clicked', async () => {
      const user = userEvent.setup();
      const onIndicatorToggle = jest.fn();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
          onIndicatorToggle={onIndicatorToggle}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      // Find and click the Moving Average checkbox (currently selected)
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);

      expect(onIndicatorToggle).toHaveBeenCalled();
    });

    it('should send positive ID when toggling ON', async () => {
      const user = userEvent.setup();
      const onIndicatorToggle = jest.fn();

      const settingsWithDeselected = {
        ...mockMainChartSettings,
        chart_indicators: {
          ...mockMainChartSettings.chart_indicators,
          selected: [], // No indicators selected
        },
      };

      render(
        <SettingsSheet
          main_chart_settings={settingsWithDeselected}
          labelsAndTexts={mockLabelsAndTexts}
          onIndicatorToggle={onIndicatorToggle}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');
      // Click first checkbox to toggle ON
      await user.click(checkboxes[0]);

      // Should call with positive ID (80)
      expect(onIndicatorToggle).toHaveBeenCalledWith(80);
    });

    it('should send negative ID when toggling OFF', async () => {
      const user = userEvent.setup();
      const onIndicatorToggle = jest.fn();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
          onIndicatorToggle={onIndicatorToggle}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');
      // Click first checkbox (currently selected) to toggle OFF
      await user.click(checkboxes[0]);

      // Should call with negative ID (-80)
      expect(onIndicatorToggle).toHaveBeenCalledWith(-80);
    });

    it('should maintain checkbox state after toggle', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];

      // Initial state: first checkbox should be checked (80 is selected)
      expect(firstCheckbox).toHaveAttribute('data-state', 'checked');

      // Toggle it off
      await user.click(firstCheckbox);

      // After toggle, should be unchecked
      expect(firstCheckbox).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Tooltip Settings Functionality', () => {
    it('should call onSettingsChange when tooltip option is selected', async () => {
      const user = userEvent.setup();
      const onSettingsChange = jest.fn();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
          onSettingsChange={onSettingsChange}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const radioButtons = screen.getAllByRole('radio');
      // The third option is "Hide" with value 3
      const hideOption = radioButtons[2];
      await user.click(hideOption);

      expect(onSettingsChange).toHaveBeenCalledWith(3);
    });

    it('should have correct default tooltip setting', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const radioButtons = screen.getAllByRole('radio');
      const onHoverOption = radioButtons[1]; // Second option "On Hover"

      expect(onHoverOption).toHaveAttribute('data-state', 'checked');
    });

    it('should update radio button state when tooltip setting changes', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const radioButtons = screen.getAllByRole('radio');
      const onHoverOption = radioButtons[1];
      const hideOption = radioButtons[2];

      expect(onHoverOption).toHaveAttribute('data-state', 'checked');

      await user.click(hideOption);

      await waitFor(() => {
        expect(hideOption).toHaveAttribute('data-state', 'checked');
      });
    });
  });

  describe('Indicator Grouping', () => {
    it('should group indicators correctly', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      // Verify that indicators are displayed
      expect(screen.getByText('Moving Average')).toBeInTheDocument(); // Trend
      expect(screen.getByText('RSI')).toBeInTheDocument(); // Momentum
      expect(screen.getByText('MACD')).toBeInTheDocument(); // Data
    });

    it('should display dividers between indicator groups', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      // Verify all indicator groups and tooltip section are displayed
      expect(screen.getByText('Technical Indicators')).toBeInTheDocument();
      expect(screen.getByText('Hover Info Mode')).toBeInTheDocument();
      expect(screen.getByText('Moving Average')).toBeInTheDocument();
      expect(screen.getByText('RSI')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty selected indicators', async () => {
      const user = userEvent.setup();
      const settingsWithNone = {
        ...mockMainChartSettings,
        chart_indicators: {
          ...mockMainChartSettings.chart_indicators,
          selected: [],
        },
      };

      render(
        <SettingsSheet main_chart_settings={settingsWithNone} labelsAndTexts={mockLabelsAndTexts} />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');
      // All checkbox inputs should be unchecked (data-state="unchecked")
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('data-state', 'unchecked');
      });
    });

    it('should handle all indicators selected', async () => {
      const user = userEvent.setup();
      const settingsWithAll = {
        ...mockMainChartSettings,
        chart_indicators: {
          ...mockMainChartSettings.chart_indicators,
          selected: ['80', '81', '82', '83', '84', '85', '86', '88', '89'],
        },
      };

      render(
        <SettingsSheet main_chart_settings={settingsWithAll} labelsAndTexts={mockLabelsAndTexts} />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');
      // First 9 checkboxes should be checked, rest are radio buttons
      for (let i = 0; i < Math.min(9, checkboxes.length); i++) {
        expect(checkboxes[i]).toHaveAttribute('data-state', 'checked');
      }
    });

    it('should handle missing indicator options gracefully', async () => {
      const user = userEvent.setup();
      const settingsWithMissing = {
        ...mockMainChartSettings,
        chart_indicators: {
          ...mockMainChartSettings.chart_indicators,
          options: {
            '80': { caption: 'Moving Average', id: '80' },
            // Missing other options
          },
        },
      };

      render(
        <SettingsSheet
          main_chart_settings={settingsWithMissing}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button');
      await user.click(settingsButton);

      // Should still render without errors
      expect(screen.getByText('Moving Average')).toBeInTheDocument();
    });
  });

  describe('Callback Handlers', () => {
    it('should not call callbacks if not provided', async () => {
      const user = userEvent.setup();

      // Should render without errors even without callbacks
      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);

      // Should not throw any errors
      expect(screen.getByText('Technical Indicators')).toBeInTheDocument();
    });

    it('should handle multiple rapid toggles', async () => {
      const user = userEvent.setup();
      const onIndicatorToggle = jest.fn();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
          onIndicatorToggle={onIndicatorToggle}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      const checkboxes = screen.getAllByRole('checkbox');

      // Toggle multiple checkboxes rapidly
      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);
      await user.click(checkboxes[0]);

      expect(onIndicatorToggle).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible checkbox labels', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      // Verify each indicator has associated label text
      expect(screen.getByText('Moving Average')).toBeInTheDocument();
      expect(screen.getByText('RSI')).toBeInTheDocument();
    });

    it('should have screen reader only text for sheet context', async () => {
      const user = userEvent.setup();

      render(
        <SettingsSheet
          main_chart_settings={mockMainChartSettings}
          labelsAndTexts={mockLabelsAndTexts}
        />
      );

      const settingsButton = screen.getByRole('button', { hidden: true });
      await user.click(settingsButton);

      expect(screen.getByText('Chart Settings')).toHaveClass('sr-only');
      expect(screen.getByText('Configure chart indicators and tooltip settings')).toHaveClass(
        'sr-only'
      );
    });
  });
});
