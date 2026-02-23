export type UserSettingsData = {
  debug_info: string;
  update_info: UpdateInfo;
  main_chart_settings: MainChartSettings;
};

export type UpdateInfo = {
  status: string;
  update: string[];
  message: string;
  status_code: number;
  chart_tooltip_id: number;
};

export type MainChartSettings = {
  info: string;
  current_product: number;
  chart_type: ChartType;
  chart_indicators: ChartIndicators;
  tooltip_settings: TooltipSettings;
};

export type ChartType = {
  allowed: number[];
  selected: number;
  group_candlesticks: Group;
  group_technical_analysis: Group;
};

export type Group = {
  0?: Candlestick;
  1?: Candlestick;
  2?: Candlestick;
  3?: Candlestick;
  4?: Candlestick;
  5?: Candlestick;
  6?: Candlestick;
  7?: Candlestick;
  8?: Candlestick;
  9?: Candlestick;
  10?: Candlestick;
};

export type Candlestick = {
  id: string;
  caption: string;
};

export type ChartIndicators = {
  selected: string[];
  options: ChartIndicatorsOption;
};

export type ChartIndicatorsOption = {
  80?: Option;
  81?: Option;
  82?: Option;
  83?: Option;
  84?: Option;
  85?: Option;
  86?: Option;
  87?: Option;
  88?: Option;
  89?: Option;
};

export type TooltipSettings = {
  available: boolean;
  selected: number;
  options: TooltipSettingsOption;
  labels_and_texts: TooltipSettingsLabelsAndTexts;
};

export type TooltipSettingsOption = {
  0?: Option;
  1?: Option;
  2?: Option;
};

export type Option = {
  id: string;
  caption: string;
  // value: number;
  cterm?: string;
  active?: number;
  access?: number;
};

export type TooltipSettingsLabelsAndTexts = {
  info_mode_selection_header: string;
};
