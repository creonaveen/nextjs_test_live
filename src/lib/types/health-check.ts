// Health Check API Response Types
/* eslint-disable max-lines -- type/API shape definitions; split in follow-up if needed */

export type HealthCheckResponse = {
  health_data?: HealthData;
  kpis?: KPIsSection;
  pies?: PiesSection;
  factor_diagram?: FactorDiagram;
  correlation_analysis?: CorrelationAnalysisSection;
  portfolio_development_report?: PortfolioDevelopmentReport;
  data_and_calculation_warnings_section: DataAndCalculationWarningsSection;
  api_info: ApiInfo;
  api_guide: ApiGuide;
  meta: Metadata;
  test_links?: TestLinks;
  status?: string;
  message?: string;
  mode?: string;
  parameters?: Parameters;
};
export type Parameters = {
  context: string;
  market_id: number;
  wlid: number;
  ref_index_company_id: number;
  factor_diagram_width: number;
};

// Health Data Types
export type HealthData = {
  overall_health_section: OverallHealthSection;
  elements_health_section: ElementsHealthSection;
  full_health_report_section: FullHealthReportSection;
  score_bar_data: ScoreBarData;
  overall_data_raw_for_debug_may_be_deleted?: Record<string, OverallDataRaw>;
  element_data_raw_for_debug_may_be_deleted?: Record<string, ElementDataRawItem>;
};

export type OverallHealthSection = {
  title: string;
  data: OverallHealthData;
  api_guide: ApiGuideSection;
};

export type OverallHealthData = {
  health_key: string;
  score: number;
  label: string;
  score_text: string;
  score_text_short: string;
  info_text1: string;
  info_text2: string;
  score_bar_category_id: number;
};

export type ElementsHealthSection = {
  title: string;
  data: ElementHealthData[];
  full_health_report_link_text: string;
  api_guide: ApiGuideSection;
};

export type ElementHealthData = {
  health_key: string;
  score: number;
  label: string;
  score_text: string;
  info_text1: string;
  info_text2: string;
  score_bar_category_id: number;
};

export type FullHealthReportSection = {
  header: FullHealthReportHeader;
  sections: Sections;
  help_data: HelpData;
};

export type FullHealthReportHeader = {
  title: string;
  sub_title: string;
  portfolio_composition: string;
  summary_text: string;
  disclaimer: string;
  api_guide: {
    health_score_bar: string;
    icon_types_references: string;
  };
};

export type Sections = {
  good_qualities: HealthReportSection;
  dangers: HealthReportSection;
  tips: TipsSection;
};

export type HealthReportSection = {
  section_type: string;
  title: string;
  elements: HealthReportElement[];
  count: number;
  status_messages: string[];
};

export type TipsSection = {
  section_type: string;
  title: string;
  primary_tips_elements: HealthReportElement[];
  secondary_tips_elements: HealthReportElement[];
  count: number;
  primary_count: number;
  secondary_count: number;
  expand_label: string;
  status_messages: string[];
};

export type HealthReportElement = {
  health_key: string;
  element_name: string;
  icon_type: string;
  icon_data_recommendation_style: {
    status: string;
    icon: string;
    color: string;
  };
  title: string;
  text_html: string;
  explanation: string;
  priority?: string;
};

export type HelpData = {
  type: string;
  title: string;
  text_primary: string;
  text_secondary: HelpTextSecondary[];
  api_guide: string;
};

export type HelpTextSecondary = {
  heading?: string;
  text?: string;
};

export type ScoreBarData = {
  graphics: ScoreBarGraphics;
  categories: ScoreBarCategory[];
  categories_info: {
    min_value: string;
    max_value: string;
  };
};

export type ScoreBarGraphics = {
  type: string;
  min_value: number;
  max_value: number;
};

export type ScoreBarCategory = {
  id: number;
  name: string;
  min_value: number;
  max_value: number;
  class: string;
};

export type OverallDataRaw = {
  score: number;
  score_bar_category_id: number;
  info: string;
  tip: string;
  status: string;
  algo: string;
};

export type ElementDataRawItem = {
  weight: number;
  score: number;
  score_bar_category_id: number;
  info: string;
  tip: string;
  good: string;
  status: string;
  algo: string;
  danger_text?: string;
  danger_algo?: string;
};

export type ApiGuideSection = {
  score_bar_category_id?: string;
  data_location?: string;
  sorting?: string;
};

// Data and Calculation Warnings Section
export type DataAndCalculationWarningsSection = {
  title?: string;
  has_warnings: boolean;
  warning_count: number;
  warnings: Warning[];
  api_guide: WarningsApiGuide;
};

export type Warning = {
  type?: string;
  health_key?: string;
  message?: string;
  severity?: string;
};

export type WarningsApiGuide = {
  source: string;
  health_key: string;
  rendering: string;
};

// API Info Types
export type ApiInfo = {
  status: string;
  timestamp: string;
  market_id: string;
  market_name: string;
  mode: string;
  input_params: string[];
  used_param: string;
};

// API Guide Types
export type ApiGuide = {
  title: string;
  description: string;
  endpoint: string;
  methods: string[];
  version: string;
  latest_additions: string[];
  examples: ApiGuideExamples;
  parameters: ApiGuideParameters;
  response_structure: Record<string, string>;
  health_scoring: HealthScoring;
};

export type ApiGuideExamples = {
  portfolio_health: string;
  watchlist_health: string;
  custom_portfolio: string;
  ticker_analysis: string;
  weighted_portfolio: string;
  debug_mode: string;
  no_guide: string;
};

export type ApiGuideParameters = {
  required: {
    context: {
      value: string;
      description: string;
    };
  };
  input_methods: {
    portfolio_id: InputMethod;
    watchlist_id: InputMethod;
    company_ids: InputMethod;
    portfolio_tickers: InputMethod;
    weighted_portfolio: WeightedPortfolioInputMethod;
  };
  optional: {
    ref_index_ticker?: OptionalParameter;
    ref_index_company_id?: OptionalParameter;
    portfolio_num_shares?: OptionalParameter;
    api_test?: OptionalParameter;
    api_guide?: OptionalParameter;
    sections?: SectionsParameter;
  };
};

export type InputMethod = {
  parameter: string;
  type: string;
  description: string;
  example: string;
  priority: number;
};

export type WeightedPortfolioInputMethod = {
  parameters: string[];
  type: string;
  description: string;
  example: string;
  priority: number;
  note?: string;
};

export type OptionalParameter = {
  type: string;
  description: string;
  example?: string;
  default?: number | string;
  values?: number[];
  note?: string;
};

export type SectionsParameter = {
  type: string;
  description: string;
  values: Record<string, string>;
  examples: Record<string, string>;
  default: number | string;
  note: string;
};

export type HealthScoring = {
  description: string;
  factors: Record<string, HealthScoringFactor>;
  total_weight: number;
  scale: string;
};

export type HealthScoringFactor = {
  weight: number;
  description: string;
};

// KPIs Section Types
export type KPIsSection = {
  title: string;
  has_data: boolean;
  kpi_table_formatted: KPITableFormattedItem[];
  kpi_table: KPITable;
  kpi_overall: KPIOverall;
  help_data: KPIsHelpData;
  status_message: string | null;
  kpi_data_for_debugging?: KPIDataForDebugging;
  api_guide: KPIsApiGuide;
};

export type KPITableFormattedItem = {
  key: string;
  value: string;
};

export type KPITable = {
  c_name: string;
  data: Record<string, KPITableRow>;
  row_data_type: Record<string, string>;
  column_align: Record<string, string>;
  caption: string;
  is_transposed: boolean;
  api_guide: Record<string, string | boolean>;
};

export type KPITableRow = {
  c0: string;
  c1: number;
};

export type KPIOverall = {
  pe: number;
  ps: number;
  pb: number;
  yield: number;
};

export type KPIsHelpData = {
  type: string;
  label: string;
  help_source: string;
};

export type KPIDataForDebugging = {
  sql: string;
  content_mode: string;
  metadata: KPIDebugMetadata;
  columns: string[];
  captions: string[];
  stat_calc_fields: string[];
  stat_data_fields: string[];
  stat_header_field: string;
  kpis_overall: KPIOverall;
  sql_data: KPISqlDataItem[];
};

export type KPIDebugMetadata = {
  financial_data_active: number;
  port_type: string;
  company_count: number;
};

export type KPISqlDataItem = {
  company_id: string;
  company_name: string;
  ticker: string;
  close: string;
  change_pct1: string;
  change_pct5: string;
  change_pct22: string;
  change_pct66: string;
  change_pct252: string;
  change_val1: string;
  buy_price: string;
  number_of_shares: string;
  value: string;
  change_since_bought: string;
  tech_score: string;
  liqu22: string;
  liqu66: string;
  volat22: string;
  rsi21: string;
  vol_bal22: string;
  ext_sector_level1: string;
  ext_sector_level2: string;
  ext_sector_level3: string;
  industry_name: string;
  group_name: string;
  sector_name: string;
  country_code: string;
  price_earnings: string;
  price_sales: string;
  price_book: string;
  dividend_yield: string;
  cmp_market_cap: string;
  market_cap: string;
  earnings: string;
  sales: string;
  book: string;
};

export type KPIsApiGuide = {
  structure: string;
  help_data: string;
};

// Pies Section Types
export type PiesSection = {
  available_charts: string[];
  insider_exists: number;
  show_insider: number;
  pie: Pie;
  api_guide: string[];
};

export type Pie = {
  volat: PieChart;
  liquidity: PieChart;
  technical: PieChart;
  inside: PieChart;
  sector_diversification: PieChart;
};

export type PieChart = {
  chart: PieChartConfig;
  title: string;
  display_order: number;
  order_function: string;
  is_open: boolean;
  categories: PieCategory[];
  data: PieDataItem[];
  free_trial_link?: string;
  free_trial_label?: string;
};

export type PieChartConfig = {
  type: string;
  variable: string;
};

export type PieCategory = {
  id: number;
  name: string;
  upper_limit: number | null;
  style_id: number;
  color_name: string;
};

export type PieDataItem = {
  order: number;
  category_id: number;
  label: string;
  description: string;
  value: string;
};

export interface PieChartData {
  categories: PieCategory[];
  data: PieDataItem[];
  title: string;
  is_open: boolean;
}

export interface CorrelationAnalysisSection {
  title: string;
  correlation_matrix: CorrelationMatrix;
  company_keys: CompanyKeys;
  company_keys_info: string;
  categories: CorrelationCategory[];
  correlation_table: CorrelationTable;
  correlation_table_info: string;
  mean_correlation: string;
  num_not_correlated: number;
  num_highly_correlated: number;
  num_medium_correlated: number;
  frac_not_correlated: string;
  frac_highly_correlated: string;
  frac_medium_correlated: string;
  highlights_text: string;
  details_text: string;
  warning_text: string;
  help_data: CorrelationAnalysisHelpData;
}

export type CorrelationAnalysisHelpData = {
  title: string;
  text_primary: string;
  text_secondary: string;
  display_guide: string;
};

export type CorrelationMatrix = Record<
  string, // l0, l1, l2...
  Record<
    string, // c0, c1, c2...
    number
  >
>;

export type CompanyKeys = Record<
  string, // i0, i1, i2...
  number // companyId
>;

export interface CorrelationCategory {
  category_id: number;
  name: string;
  corr_limit_low: number;
  corr_limit_high: number;
  color_class: string;
}

export interface CorrelationTable {
  c_name: string;
  id: string;
  column_headers: Record<string, string>;
  column_data_type: Record<string, 'string' | 'general'>;
  caption: string;
  cell_content: TableCellContent;
  cell_category: TableCellCategory;
  cell_tooltip: TableCellTooltip;
  cell_class: TableCellClass;
}

export type TableCellContent = Record<
  string, // l0, l1...
  Record<
    string, // c0, c1...
    string
  >
>;

export type TableCellCategory = Record<string, Record<string, number | null>>;

export type TableCellTooltip = Record<string, Record<string, string>>;

export type TableCellClass = Record<string, Record<string, string>>;

export type CorrelationAnalysisCategory = {
  category_id: number;
  name: string;
  corr_limit_low: number;
  corr_limit_high: number;
  color_class: string;
  color_bg: string;
  color_text: string;
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

export type FactorDiagramMeta = {
  variant_id: number;
  xy_size: number;
  ok_to_print_factor_diagram: number;
  inside_exist: number;
  kpi_set: number;
  eer_set: number;
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

export type FactorDiagramFrontendGuide = {
  overview: string;
  structure: GuideStructure;
  factors: GuideFactors;
  implementation: GuideImplementation;
  data_notes: GuideDataNotes;
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
  portfolio_specific: string;
};

export type GuideDataNotes = {
  weighted_average: string;
  availability: string;
  calculation: string;
};

// Portfolio Development Report Types
export type PortfolioDevelopmentReport = {
  is_available: boolean;
  ingress: PortfolioIngress;
  portfolio_statistics: PortfolioStatistics;
  portfolio_chart: PortfolioChart;
  main_report: MainReport;
};

export type PortfolioIngress = {
  title: string;
  ingress_main: string;
  ingress_full: string;
};

export type PortfolioStatistics = {
  return_pct: ReturnPctItem[];
  move_data: MoveData;
  volatility: VolatilityItem[];
  start_date: string;
  end_date: string;
  port_tickers: string;
  ref_index_ticker: string;
};

export type ReturnPctItem = {
  label: string;
  port: number;
  ref: number | null;
  rel: number | null;
};

export type MoveData = {
  info: string;
  num_stocks: number;
  num_up: number;
  num_down: number;
};

export type VolatilityItem = {
  label: string;
  name: string;
  port: number | null;
  ref: number | null;
};

export type PortfolioChart = {
  is_available: boolean;
  chart_spec: ChartSpec;
  time_span: TimeSpan;
};

export type ChartSpec = {
  chart_api_param: string;
  title: string;
  explanation: string;
};

export type TimeSpan = {
  selected: string;
  options: TimeSpanOptions;
};

export type TimeSpanOptions = {
  ytd: TimeSpanOption;
  '1m': TimeSpanOption;
  '3m': TimeSpanOption;
  '1y': TimeSpanOption;
  '3y': TimeSpanOption;
  '10y': TimeSpanOption;
  max: TimeSpanOption;
};

export type TimeSpanOption = {
  label: string;
  name: string;
  link: string;
  is_active: boolean;
};

export type MainReport = {
  title: string;
  sub_title: string;
  ingress_full: string;
  stocks: StocksSection;
  help_data: PortfolioHelpData;
};

export type StocksSection = {
  num_stocks: number;
  stocks: StockItem[];
  labels: StockLabels;
  api_guide: StockApiGuide;
};

export type StockItem = {
  company_id: string;
  market_id: string;
  company_name: string;
  ticker: string;
  comment_text: string;
  comment_direction: string;
  news_score: string;
  has_access: boolean;
  chart_api_param_common: string;
  chart_api_param_stock: string;
  chart_api_full: string;
};

export type StockLabels = {
  show_more: string;
  show_more_items: string;
  show_fewer_items: string;
};

export type StockApiGuide = {
  charts: string;
  chart_width: string;
  link_suggestion: string;
  sectioning: string;
  access: string;
};

export type PortfolioHelpData = {
  type: string;
  title: string;
  text_primary: string;
  text_secondary: string;
};

// Metadata Type
export type Metadata = {
  title: string;
  description: string;
};

// Test Links Type (for development/testing purposes)
export type TestLinks = TestLinkSection[];

export type TestLinkSection = {
  section_title: string;
  links: TestLink[];
};

export type TestLink = {
  label: string;
  url: string;
};
