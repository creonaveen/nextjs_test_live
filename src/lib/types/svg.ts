export type Svg = {
  svg_id: string;
  w: number | null;
  h: number | null;
  chart_param: string;
  full_chart_param: string;
  tooltip_settings: TooltipSettings;
  chart_tooltip_id: number | string;
  tooltip_legends?: TooltipLegends;
  chart_maximize: boolean;
  show_image_border: boolean;
  raw_svg: string;
};

export type TooltipSettings = {
  available: boolean;
  selected?: number;
  options?: TooltipSettingsOption;
};

export type TooltipLegends = {
  cterm_date: string;
  cterm_price: string;
  cterm_volume: string;
};

export type TooltipSettingsOption = {
  0?: Option;
  1?: Option;
  2?: Option;
};

export type Option = {
  id: string;
  caption: string;
  value: number;
};
