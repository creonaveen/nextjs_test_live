// Main Home Page Type
export type HomePageData = {
  market_commentary: MarketCommentary;
  todays_case: TodaysCase;
  watchlist: Watchlist;
  top_50: Top50;
  model_portfolio: ModelPortfolio;
  news: News;
  meta: Metadata;
};

export type Metadata = {
  title: string;
  description: string;
};

// Section Types
export type MarketCommentary = {
  help_text: string;
  label: Label;
  text: string;
  company: MarketCommentaryCompany;
  see_more: SeeMore;
};

export type MarketCommentaryCompany = {
  ticker: string;
  company_id: number;
  market_id: string;
  name: string;
  close: string;
  price_label: string;
  price_change: PriceChange;
  badge: Badge;
  chart_spec: ChartSpec;
};

export type PriceChange = {
  change: {
    value: string;
    sign: number;
    is_badge: boolean;
  };
};

export type Badge = {
  title: string;
  text: string;
  sign: number;
  risk_level: RiskLevel;
  popup: Popup;
};

export type RiskLevel = {
  text: string;
  sign: number;
  is_badge: boolean;
};

export type Popup = {
  title: string;
  text: string;
};

export type ChartSpec = {
  chart_param: string;
  img_param: ImgParam;
  caption?: string;
  chart_type?: string;
  active?: boolean;
};

export type TodaysCase = {
  help_text: string;
  label: Label;
  recommendation: Recommendation;
  company: Company;
  see_more: SeeMore;
};

export type Recommendation = {
  status: string;
  icon: string;
  color: string;
};

export type Watchlist = {
  help_text: string;
  label?: Label;
  table_data?: WatchlistTableData;
  caption_title?: string;
  caption_description?: string;
  see_more: SeeMore;
};

export type WatchlistTableData = {
  num_columns: number;
  table_definition: TableColumnDefinition[];
  data: WatchlistDataItem[];
};

export type WatchlistDataItem = {
  company: Company;
  score_arrow: ScoreArrow;
};

// Top 50 Types
export type Top50 = {
  help_text: string;
  label: Label;
  table_data: Top50TableData;
  see_more: SeeMore;
};

export type Top50TableData = {
  num_columns: number;
  table_definition: TableColumnDefinition[];
  data: Top50DataItem[];
};

export type Top50DataItem = {
  company: Company;
  profit_loss_percent: ProfitLossPercent;
};

// Model Portfolio Types
export type ModelPortfolio = {
  help_text: string;
  label: Label;
  table_data: ModelPortfolioTableData;
  see_more: SeeMore;
};

export type ModelPortfolioTableData = {
  num_columns: number;
  table_definition: TableColumnDefinition[];
  data: ModelPortfolioDataItem[];
};

export type ModelPortfolioDataItem = {
  company: Company;
  profit_loss_percent: ProfitLossPercent;
};

// Common/Shared Types
export type Label = {
  content: string;
  is_badge: boolean;
  sign: number;
};

export type Company = {
  ticker: string;
  name: string;
  id: number;
  chart_spec?: ChartSpec;
  market_id?: string;
};

export type CompanyInfo = {
  name: string;
  ticker: string;
};

export type ImgParam = {
  show_image_border: number;
  id: string;
  chart_tooltip_id?: number;
};

export type ScoreArrow = {
  score: number;
  arrow: Arrow;
};

export type Arrow = {
  icon: string;
  color: string;
};

export type TableColumnDefinition = {
  key: string;
  column_name: string;
};

export type ProfitLossPercent = {
  value: string;
  sign: number;
  is_badge: boolean;
};

export type News = {
  help_text: string;
  label: Label;
  news_type: string;
  data: NewsData;
  description: Description;
  see_more: SeeMore;
};

export type NewsData = {
  image_param: ImageParam;
};

export type ImageParam = {
  url: string;
  alt: string;
};

export type Description = {
  caption_title: string;
  caption_description: string;
};

export type SeeMore = {
  text: string;
  url?: string;
};
