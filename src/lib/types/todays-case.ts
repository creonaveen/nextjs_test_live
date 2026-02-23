export type TodaysCaseData = {
  publication: Publication;
  todays_case_section_header: TodaysCaseSectionHeader;
  company_section_main_chart: CompanySectionMainChart;
  labels_and_texts: LabelsAndTexts;
  latest_reports: LatestReports;
  meta: Metadata;
};

export type Publication = {
  published_date: string;
  published_time: string;
  author_initials: string;
  author_name: string;
  author_email: string;
  author_title: string;
  author_image: AuthorImage;
  author_analyst_id: string;
};

export type AuthorImage = {
  type: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
};

export type TodaysCaseSectionHeader = {
  data: TodaysCaseHeaderSectionData;
  labels_and_texts: TodaysCaseHeaderSectionLabels;
};

export type TodaysCaseHeaderSectionData = {
  general: General;
  price: Price;
  static_info: StaticInfo;
  sectors: Sectors;
  recommendation: Recommendation;
  risk: Risk;
  own_stocks: number;
  additional_texts: AdditionalTexts;
};

export type General = {
  id: string;
  name: string;
  ticker: string;
  ticker_full: string;
  include_name: number;
  date: string;
};

export type Price = {
  close: string;
  price_date: string;
  price_date_long: string;
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
  analyst: Analyst;
};

export type Analyst = {
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
  score: number;
  color: string;
};

export type TodaysCaseHeaderSectionLabels = {
  sub_title: string;
  close: string;
  updated: string;
  about_company: string;
  website: string;
  source: string;
  sector: string;
  recommendation: string;
  recommendation_card_help: string;
  extra_info: string;
  see_more: string;
  see_more_info: string;
};

export type CompanySectionMainChart = {
  data: CompanySectionMainChartData;
  insider_trade_table: InsiderTradeTable;
};

export type CompanySectionMainChartData = {
  meta: MainChartMeta;
  main_chart: MainChart;
  insider_chart: InsiderChart;
  technical_comment: TechnicalComment;
};

export type MainChartMeta = {
  is_investtech_index: boolean;
  free_version: number;
};

export type MainChart = {
  img_param: ChartImgParam;
  chart_name: string;
  static_svg_file: StaticSvgFile;
};
export type StaticSvgFile = {
  reference: string;
  parameters: string;
};

export type ChartImgParam = {
  show_tooltip?: boolean;
  chart_tooltip_id?: number;
  chart_maximize?: boolean;
  chart_maximize_title?: string;
  show_image_border: number;
  id: string;
};

export type InsiderChart = {
  // chart_param: string;
  static_svg_file: StaticSvgFile;
  img_param: ChartImgParam;
  chart_type: string;
  caption: string;
};

export type TechnicalComment = {
  analysis_title: string;
  analysis_text: string;
};

export type InsiderTradeTable = {
  caption: string;
  num_trades: number;
  num_columns: number;
  table_definition: TableColumnDefinition[];
  data: InsiderTradeData[];
};

export type TableColumnDefinition = {
  key: string;
  column_name: string;
  hidden_on_mobile?: boolean;
  hidden_on_tablet?: boolean;
  hidden_on_laptop?: boolean;
  hidden_on_desktop?: boolean;
};

export type InsiderTradeData = {
  date: string;
  count: string;
  price: string;
  value: string;
  insider: InsiderValue;
  importance: string;
};

export type InsiderValue = {
  value: string;
  sign: number;
};

export type LabelsAndTexts = {
  ses_language: string;
  module_title: string;
  read_more: string;
};

export type LatestReports = {
  title: string;
  num_cases: number;
  num_columns: number;
  table_definition: TableColumnDefinition[];
  data: LatestReportData[];
};

export type LatestReportData = {
  company: string;
  date: string;
  date_short: string;
  ticker: string;
  price_date: string;
  buy_or_sell: BuyOrSell;
};

export type BuyOrSell = {
  value: string;
  sign: number;
  is_badge: boolean;
};

export type AdditionalTexts = {
  own_stocks_info: string;
};

export type Metadata = {
  title: string;
  description: string;
};
