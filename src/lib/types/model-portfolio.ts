export type ModelPortfolio = {
  headers: Headers;
  additional_texts: AdditionalTexts;
  count: number;
  current_holdings: CurrentHoldingsTable;
  latest_sales: LatestSalesTable;
  portfolio_return: PortfolioReturnTable;
  annualized_return: AnnualizedReturnTable;
  portfolio_comments: PortfolioComment;
  portfolio_return_chart: PortfolioReturnChart;
  publication: Publication;
  help: HelpSection;
  meta: Metadata;
};

export type Headers = {
  portfolio_holdings: string;
  most_recent_sales: string;
  return_port_and_idx: string;
  return_annualized: string;
  analyst_recommendation: string;
};

export type AdditionalTexts = {
  own_stocks_info: string;
};

export type Metadata = {
  title: string;
  description: string;
};

export type PortfolioReturnChart = {
  chart_param: string;
  img_param: {
    show_image_border: number;
    chart_maximize: boolean;
    chart_maximize_title: string;
    tw_width: string;
    id: string;
  };
  chart_type: string;
  active: boolean;
  caption: string;
  metadata: {
    datakey: string;
    years: number;
    market_id: number;
    width: string;
  };
};

// Table structure types
export type TableColumnDefinition = {
  key: string;
  column_name: string;
  hidden_on_mobile?: boolean;
  hidden_on_tablet?: boolean;
  hidden_on_desktop?: boolean;
};

export type TableStructure<T> = {
  num_columns: number;
  table_definition: TableColumnDefinition[];
  content: T[];
};

// Current Holdings
export type CurrentHoldingsTable = TableStructure<CurrentHolding>;

export type ProfitLossPercent = {
  value: string | number;
  sign: number;
  is_badge: boolean;
};

export type PriceChange = {
  change: {
    value: string | number;
    sign: number;
    is_badge: boolean;
  };
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

export type Badge = {
  title: string;
  text: string;
  sign: number;
  risk_level: RiskLevel;
  popup: Popup;
};

export type CurrentHolding = {
  id: number;
  name: string;
  ticker: string;
  date_entered: string;
  buying_price: string | number;
  close: string | number;
  profit_loss_percent: ProfitLossPercent;
  info: string | number;
  own_stocks: number;
};

// Latest Sales
export type LatestSalesTable = TableStructure<LatestSale>;

export type LatestSale = {
  id: number;
  name: string;
  ticker: string;
  date_out: string;
  price_out: number;
  profit_loss_percent: ProfitLossPercent;
  own_stocks: number;
};

// Portfolio Return
export type PortfolioReturnTable = TableStructure<PortfolioReturnItem>;

export type PortfolioReturnItem = {
  name: string;
  profit_loss_percent: ProfitLossPercent;
};

// Annualized Return
export type AnnualizedReturnTable = TableStructure<AnnualizedReturnItem>;

export type AnnualPercentage = {
  value: string | number;
  sign: number;
};

export type AnnualizedReturnItem = {
  name: string;
  id?: number;
  annual_percentage_year: AnnualPercentage;
  annual_percentage_3year: AnnualPercentage;
  annual_percentage_5year: AnnualPercentage;
  annual_percentage_10year: AnnualPercentage;
  annual_percentage_since_inception: AnnualPercentage;
};

// Portfolio Comments
export type PortfolioComment = {
  published_date: string;
  title: string;
  id: number;
  wordpress_post_id: string;
  blocks: ContentBlock[];
  ingress: TextBlock[];
  teaser_text_short: string;
  num_company_analyses: number;
  general_text: TextBlock[];
  analyses: Analysis[];
};

export type TextBlock = {
  type: 'text' | 'link';
  text: string;
  anchor_text?: string;
  href?: string;
};

export type Analysis = {
  ticker: string;
  market_id: string;
  timespan: string;
  recommendation: string;
  company_name: string;
  close: string;
  company_id: number;
  text: TextBlock[];
  newly_traded: number;
  own_stocks: string;
  price_change: PriceChange;
  price_label: string;
  badge: Badge;
  chart_spec: {
    chart_param: string;
    img_param: {
      show_image_border: number;
      id: string;
      chart_tooltip_id: number;
    };
    chart_type: string;
    active: boolean;
  };
  image?: {
    type: string;
    svg_id: string;
    tw_width: string;
  };
  profit_loss_percent: ProfitLossPercent;
  extra_header: ExtraHeader;
};

export type ExtraHeader = {
  text: string;
  sign: number;
};

export type AuthorImage = {
  type: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
};

export type Publication = {
  published_date: string;
  published_time: string;
  author_initials: string;
  author_name: string;
  author_email: string;
  author_title: string;
  author_analyst_id: string;
  author_image: AuthorImage;
};

export type ProductHelpPopup = {
  trigger_text: string;
  popup_text: string;
};

export type ProductHelpDescription = {
  info_text: string;
  popup: ProductHelpPopup;
};

export type ProductHelp = {
  title: string;
  product_description: ProductHelpDescription;
  content: ContentBlock[];
};

// Help Section
export type HelpSection = {
  product_description: ProductHelpDescription;
  product_help: ProductHelp;
};

export type ContentBlock = {
  type: string;
  text?: string;
  items?: [
    {
      text: string;
      type: string;
      content?: [
        {
          text: string;
          type: string;
          href?: string;
        },
      ];
    },
  ];
  image_dynamic?: {
    type: string;
    chart_param: string;
    width: string;
    caption: string;
    chart_maximize?: boolean;
  };
  href?: string;
  img?: string;
  src?: string;
  title?: string;
  chart_param?: string;
  width?: string;
  caption?: string;
};
