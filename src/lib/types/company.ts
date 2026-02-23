/* eslint-disable max-lines -- type/API shape definitions; split in follow-up if needed */
export type CompanyList = {
  count: number;
  results: Company[];
};

export type CompanyChange = {
  sign: number;
  value: string;
};

export type CompanyProfitLossPercent = {
  sign: number;
  value: string;
};

export type Company = {
  id: string;
  name: string;
  ticker: string;
  market_id: number;
  country_code: string;
  currency: string;
  close: string;
  change: CompanyChange;
  profit_loss_percent: CompanyProfitLossPercent;
  external_code?: string | null;
};

// Company Details API Response Types
export type CompanyDetail = {
  market: Market;
  country: Country;
  company_section_header: CompanySectionHeader;
  company_section_main_chart: CompanySectionMainChart;
  company_section_key_info: CompanySectionKeyInfo;
  company_section_current_signals: CompanySectionCurrentSignals;
  company_section_alerts: CompanySectionAlerts;
  own_stocks: number;
  additional_texts: AdditionalTexts;
  meta: MetaData;
};

export type Market = {
  market_id: string;
  market_code: string;
  market_name: string;
  country_id: string;
  price_date: string;
  floating_format: string;
  priority: string;
  external_code: string;
  currency_code: string;
  euro_currency_factor: string;
  primary_company_id: string;
  hidden: string;
  start_page_template_id: string;
};

export type Country = {
  country_id: string;
  default_language_id: string;
  country_name: string;
  country_code: string;
  country_group_id: string;
  date_format_long: string;
  currency: string;
  bloomberg_country_code: string;
  warning: string;
  hidden: string;
  home_directory: string;
};

export type CompanySectionHeader = {
  data: CompanySectionHeaderData;
  labels_and_texts: HeaderLabelsAndTexts;
};

export type CompanySectionHeaderData = {
  general: General;
  price: Price;
  static_info: StaticInfo;
  sectors: Sectors;
  recommendation: Recommendation;
  factor_diagram_thumb: string;
  risk: Risk;
  my_data: MyData;
};

export type General = {
  id: string;
  name: string;
  ticker: string;
  ticker_full: string;
  include_name: number;
};

export type Price = {
  close: string;
  profit_loss_percent: ProfitLossPercent;
  price_date: string;
  price_date_long: string;
};

export type ProfitLossPercent = {
  sign: number;
  value: string;
  is_badge: boolean;
};

export type StaticInfo = {
  about_header_text: string;
  description: string;
  description_suggested_clip_length: number;
  company_url: string;
  source: string;
};

export type Sectors = {
  sector: SectorGroup;
  group: SectorGroup;
  industry: SectorGroup;
};

export type SectorGroup = {
  id: string;
  name: string;
  link?: string;
};

export type Recommendation = {
  type: string;
  free_version: number;
  investtech: RecommendationInvesttech;
};

export type RecommendationInvesttech = {
  score: string;
  eval_code: number;
  eval_text: string;
  color: string;
  color_tailwind: string;
};

export type Risk = {
  calculated: boolean;
  liquidity: RiskLevel;
  volatility: RiskLevel;
  total: TotalRisk;
};

export type RiskLevel = {
  text: string;
  level: string;
  score: number;
};

export type TotalRisk = {
  icon: boolean;
  text_long: string;
  text_short: string;
  level: string;
  score: string | number;
  color: string;
};

export type MyData = {
  info: string;
  status: MyDataStatus;
  icons: string;
};

export type MyDataStatus = {
  w: MyDataWatchlist[];
  n: MyDataNotes[];
};

export type MyDataWatchlist = {
  watchlist_id: string;
  watchlist_name: string;
  rating: string;
};

export type MyDataNotes = {
  note: string;
  company_name: string;
  date: string;
  ticker: string;
  country: string;
};

export type HeaderLabelsAndTexts = {
  close: string;
  updated: string;
  about_company: string;
  website: string;
  source: string;
  sector: string;
  watchlist_action: string;
  my_notes_action: string;
  recommendation: string;
  risk: string;
  liquidity_risk: string;
  volatility_risk: string;
  recommendation_card_help: string[];
  watchlist_action_add: string;
  watchlist_response_add: string;
  watchlist_action_remove: string;
  watchlist_response_remove: string;
  my_notes_place_holder: string;
  my_notes_action_add: string;
  my_notes_action_edit: string;
  my_notes_response_saved: string;
  my_notes_response_deleted: string;
};

export type CompanySectionMainChart = {
  data: CompanySectionMainChartData;
  labels_and_texts: MainChartLabelsAndTexts;
};

export type CompanySectionMainChartData = {
  meta: MainChartMeta;
  main_chart: MainChart;
  rsi_chart: Chart;
  insider_chart: InsiderChart;
  technical_comment: TechnicalComment;
};

export type MainChartMeta = {
  is_investtech_index: boolean;
  free_version: number;
};

export type MainChartImgParam = {
  show_tooltip: boolean; // true for 1, false for 0 (for API)
  chart_tooltip_id: number; // 0 for off, 1 for on
  chart_maximize: boolean; // true for 1, false for 0 (for API)
  chart_maximize_title: string;
  show_image_border: boolean; // true for 1, false for 0 (for API)
  id: string;
};

export type MainChart = {
  chart_param: string;
  img_param: MainChartImgParam;
  chart_name: string;
};

export type ChartSettings = {
  current_product: number;
  show_chart_settings: number;
  chart_indicators: ChartIndicators;
  tooltip_settings: TooltipSettings;
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

export type CiOption = {
  caption: string;
  active: number;
  access: number;
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
  value: number;
};

export type TooltipSettingsLabelsAndTexts = {
  info_mode_selection_header: string;
};

export type MainChartTypeOptions = {
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

export type Chart = {
  chart_param: string;
  img_param: ChartImgParam;
  chart_type: string;
  active: boolean;
};

export type ChartImgParam = {
  chart_param: string;
  show_image_border: number;
  id: string;
};

export type InsiderChart = {
  chart_param: string;
  img_param: ChartImgParam;
  chart_type: string;
  active: boolean;
};

export type TechnicalComment = {
  active: boolean;
  tech_score: string;
  assessment: string;
  conclusion: string;
  conclusion_short: string;
  analysis: string;
  time_span_id: number;
  time_span_string: string;
};

export type MainChartLabelsAndTexts = {
  ses_language: string;
  module_title: string;
  chart_settings: string;
  technical_indicators: string;
  chart_elements: string;
  candlestick: string;
  technical_analysis: string;
  rsi_index: string;
  short: string;
  medium: string;
  long: string;
  full_history: string;
  month: string;
  months: string;
  algorithmic_technical_analysis: string;
  tech_score: string;
  score: string;
  tooltip_off: string;
  tooltip_price_info: string;
  tooltip_technical_info: string;
  free_trial_info: string;
};

export type CompanySectionKeyInfo = {
  data: CompanySectionKeyInfoData;
  labels_and_texts: KeyInfoLabelsAndTexts;
};

export type CompanySectionKeyInfoData = {
  risk_assessment: RiskAssessment;
  key_stats: KeyStats;
  factor_diagram: FactorDiagram;
  factor_diagram_meta: FactorDiagramMeta;
};

export type RiskAssessment = {
  liquidity: RiskAssessmentLevel;
  volatility: RiskAssessmentLevel;
};

export type RiskAssessmentLevel = {
  title: string;
  label: Label;
  explanation: string;
};

export type Label = {
  type: string;
  content: string;
  sign: number;
  size: string;
};

export type KeyStats = {
  is_investtech_index: boolean;
  periods: Periods;
  volatility: KeyStatsVolatility;
};

export type Periods = {
  day1: Period;
  day5: Period;
  day22: Period;
  day66: Period;
  year_to_date: Period;
};

export type Period = {
  period: string;
  liquidity: string;
  change_pct: PeriodChangePct;
};

export type PeriodChangePct = {
  sign: number;
  value: string;
};

export type KeyStatsVolatility = {
  day1: string;
  day5: string;
  day22: string;
  day66: string;
};

export type FactorDiagram = {
  active: boolean;
  svg: string;
  tooltips: FactorDiagramTooltips;
  svg_with_tooltips_just_for_reference: string;
  frontend_guide: FactorDiagramFrontendGuide;
  is_dummy: boolean;
  labels: FactorDiagramLabelsAndTexts;
  meta: FactorDiagramMeta;
};

export type FactorDiagramLabelsAndTexts = {
  context: string;
  title: string;
  explanation: string;
  cterm_element: string;
  cterm_value: string;
  cterm_score: string;
  cterm_see_more: string;
  help_source: string;
};

export type FactorDiagramTooltips = {
  slice1: FactorTooltip;
  slice2: FactorTooltip;
  slice3: FactorTooltip;
  slice4: FactorTooltip;
  slice5: FactorTooltip;
};

export type FactorTooltip = {
  title: string;
  status: string;
  score: string;
  description: string;
  elements: TooltipElement[];
};

export type TooltipElement = {
  name: string;
  value: string;
  score: string;
};

export type FactorDiagramFrontendGuide = {
  overview: string;
  structure: GuideStructure;
  factors: GuideFactors;
  implementation: GuideImplementation;
  examples: GuideExamples;
  tooltip_structure: GuideTooltipStructure;
  css_classes: GuideCssClasses;
};

export type GuideStructure = {
  svg: string;
  svg_with_tooltips: string;
  tooltips: string;
};

export type GuideFactors = {
  teknisk: string;
  kvantitativt: string;
  innside: string;
  stabilitet: string;
  fundamentalt: string;
};

export type GuideImplementation = {
  hover: string;
  mobile: string;
  positioning: string;
  styling: string;
};

export type GuideExamples = {
  react: Example;
  vanilla: Example;
};
export type Example = {
  description: string;
  code: string;
};

export type GuideTooltipStructure = {
  title: string;
  status: string;
  score: string;
  description: string;
  elements: string;
};

export type GuideCssClasses = {
  factorTooltip: string;
  factorTooltipTable: string;
  hidden: string;
};

export type FactorDiagramMeta = {
  available?: boolean;
  free_version?: number;
  variant_id: number;
  width?: number;
  height?: number;
};

export type KeyInfoLabelsAndTexts = {
  risk_assessment_card_title: string;
  risk_assessment_card_help: string;
  key_statistics_card_title: string;
  key_statistics_card_help: string;
  liquidity_column: string;
  change_column: string;
  volatility_info: string;
  and: string;
};

export type CompanySectionCurrentSignals = {
  data: CompanySectionCurrentSignalsData;
  labels_and_texts: CurrentSignalsLabelsAndTexts;
};

export type CompanySectionCurrentSignalsData = {
  signal_stat_criteria: SignalStatCriteria;
  signals: Signals;
  has_signals: boolean;
};

export type SignalStatCriteria = {
  market_id: string;
  market_term_code: string;
  description: string;
};

export type Signals = {
  trbr_u: Signal;
  srres_close: Signal;
  thor: Signal;
  rsi_low: Signal;
  pvcpos_thor: Signal;
};

export type Signal = {
  post_name: string;
  indicator_pseudo: string;
  importance: string;
  title: string;
  ingress: string;
  help_teaser_image: SignalImage;
  help_url: string;
  has_statistics: boolean;
  priority: string;
  statistics: Statistics;
  recommendation: string;
  arrow_direction: string;
  arrow_image: SignalImage;
};

export type SignalImage = {
  type: string;
  src: string;
  src_light: string;
  src_dark: string;
  src_light_big: string;
  src_dark_big: string;
  width?: string;
  height?: string;
};

export type Statistics = {
  info: string;
  annual_excess_return: string;
  num_signals: string;
  num_signals_text: string;
  color: string;
};

export type CurrentSignalsLabelsAndTexts = {
  module_title: string;
  sub_title: string;
  help_source: string;
  help_data: HelpData;
  pp: string;
  market_term: string;
  see_more: string;
};

export type HelpData = {
  post_name: string;
  found: boolean;
  data: HelpDataData;
  meta: HelpDataMeta;
};

export type HelpDataData = {
  title: string;
  teaser_text_short: string;
  teaser_text: string;
  content: string;
  full_text?: string;
};

export type HelpDataMeta = {
  post_id: string;
  language: string;
};

export type CompanySectionAlerts = {
  data: CompanySectionAlertsData;
  labels_and_texts: AlertsLabelsAndTexts[];
};

export type CompanySectionAlertsData = {
  alerts: Alert[];
  has_alerts: boolean;
};

export type Alert = Record<string, unknown>;

export type AlertsLabelsAndTexts = Record<string, unknown>;

export type AdditionalTexts = {
  own_stocks_info: string;
};

export type MetaData = {
  title: string;
  description: string;
};

export type MainChartSectionData = {
  company_section_main_chart: CompanySectionMainChart;
  meta: MetaData;
};
