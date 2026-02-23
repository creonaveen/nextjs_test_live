export type MarketCommentary = {
  market_id: string;
  market_code: string;
  language: string;
  companies: Company[];
  product_description: ProductDescription;
  statistics: Statistics[];
  meta: Metadata;
};

export interface Metadata {
  title: string;
  description: string;
}

export interface Company {
  ticker: string;
  company_id: number;
  market_id: string;
  name: string;
  close: string;
  price_label: string;
  price_change: PriceChange;
  badge: Badge;
  text: CompanyText[];
  chart_spec: {
    chart_param: string;
    img_param: {
      show_image_border: number;
      id: string;
      chart_tooltip_id: number;
    };
    chart_type: string;
    active: boolean;
    tw_width: string;
  };
  profit_loss_percent?: StockProfitLossPercent;
}
export interface StatisticsContent {
  id: string;
  name: string;
  ticker: string;
  close: string;
  change: PriceChange;
  profit_loss_percent?: StockProfitLossPercent;
  analysis_date: string;
  investtech_score: string;
  change_pct: PriceChange;
  [key: string]: unknown;
}

export interface Statistics {
  table_name: string;
  num_columns: number;
  table_definition: {
    key: string;
    column_name: string;
  }[];
  content: StatisticsContent[];
}

export interface StockProfitLossPercent {
  value: string;
  sign: number;
  is_badge: boolean;
}
export interface PriceChange {
  change: {
    value: string;
    sign: number;
    is_badge: boolean;
  };
}

export interface Badge {
  title: string;
  text: string;
  sign: number;
  risk_level: RiskLevel;
  popup: Popup;
}

export interface CompanyText {
  type: 'text';
  text: string;
}

export interface RiskLevel {
  text: string;
  sign: number;
  is_badge: boolean;
}

export interface Popup {
  title: string;
  text: string;
}

export interface ChartSpec {
  chartParam: string;
  imgParam: {
    showImageBorder: number;
    id: string;
  };
  chartType: string;
  active: boolean;
  twWidth: string;
}

export interface ProductDescription {
  info_text: string;
  popup: {
    trigger_text: string;
    popup_text: string;
  };
}
