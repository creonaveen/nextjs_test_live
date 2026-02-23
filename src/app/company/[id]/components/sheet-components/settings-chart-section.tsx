'use client';

import { Checkbox, RadioGroup, RadioGroupItem } from 'investtech/external-components';
import { useState } from 'react';

import { MainChartSettings, Option } from '@/lib/types/user-settings';

export function useChartSettingsState(
  main_chart_settings: MainChartSettings,
  onIndicatorToggle?: (indicatorId: number) => void,
  onSettingsChange?: (tooltipSetting: number) => void
) {
  const { chart_indicators, tooltip_settings } = main_chart_settings;

  const defaultSelected = Object.keys(chart_indicators.options).reduce(
    (acc, key) => {
      acc[key] = chart_indicators.selected?.includes(key) ?? false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const [selectedIndicators, setSelectedIndicators] = useState(defaultSelected);
  const [tooltipSetting, setTooltipSetting] = useState(
    tooltip_settings.selected?.toString() ?? '2'
  );

  const handleIndicatorToggle = (id: string) => {
    const next = !selectedIndicators[id];
    setSelectedIndicators((prev) => ({ ...prev, [id]: next }));
    onIndicatorToggle?.(next ? +id : -+id);
  };

  const handleTooltipChange = (value: string) => {
    setTooltipSetting(value);
    onSettingsChange?.(+value);
  };

  return {
    chart_indicators,
    tooltip_settings,
    selectedIndicators,
    tooltipSetting,
    handleIndicatorToggle,
    handleTooltipChange,
  };
}

const INDICATOR_GROUPS = [
  { title: 'Trend Indicators', items: ['80', '86'] },
  { title: 'Price Patterns & Levels', items: ['85', '84', '83'] },
  { title: 'Momentum', items: ['81', '89'] },
  { title: 'Data', items: ['82', '88'] },
] as const;

export function ChartSettings({
  main_chart_settings,
  onIndicatorToggle,
  onSettingsChange,
}: {
  main_chart_settings: MainChartSettings;
  onIndicatorToggle?: (indicatorId: number) => void;
  onSettingsChange?: (tooltipSetting: number) => void;
}) {
  const {
    chart_indicators,
    tooltip_settings,
    selectedIndicators,
    tooltipSetting,
    handleIndicatorToggle,
    handleTooltipChange,
  } = useChartSettingsState(main_chart_settings, onIndicatorToggle, onSettingsChange);

  return (
    <div className="space-y-6">
      <IndicatorGroups
        groups={INDICATOR_GROUPS}
        options={chart_indicators.options}
        selected={selectedIndicators}
        onToggle={handleIndicatorToggle}
      />

      <hr className="hr" />

      <TooltipSettings
        value={tooltipSetting}
        options={tooltip_settings.options}
        onChange={handleTooltipChange}
      />
    </div>
  );
}

function IndicatorGroups({
  groups,
  options,
  selected,
  onToggle,
}: {
  groups: readonly { title: string; items: readonly string[] }[];
  options: Record<string, Option | undefined>;
  selected: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <>
      {groups.map((group, index) => (
        <div key={group.title} className="space-y-4">
          <IndicatorList
            items={group.items}
            options={options}
            selected={selected}
            onToggle={onToggle}
          />
          {index < groups.length - 1 && <hr className="hr" />}
        </div>
      ))}
    </>
  );
}

function IndicatorList({
  items,
  options,
  selected,
  onToggle,
}: {
  items: readonly string[];
  options: Record<string, Option | undefined>;
  selected: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((id) => {
        const option = options[id];
        if (!option) return null;

        return (
          <label key={id} className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={selected[id]}
              onCheckedChange={() => onToggle(id)}
              className="size-5 cursor-pointer"
            />
            <span className="text-sm font-normal">{option.caption}</span>
          </label>
        );
      })}
    </div>
  );
}

function TooltipSettings({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Record<string, Option>;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <p className="text-base font-semibold text-black dark:text-white">Hover Info Mode</p>

      <RadioGroup value={value} onValueChange={onChange}>
        <div className="space-y-4">
          {Object.entries(options).map(([key, option]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <RadioGroupItem value={key} className="size-5" />
              <span className="text-sm font-normal">{option.caption}</span>
            </label>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}
