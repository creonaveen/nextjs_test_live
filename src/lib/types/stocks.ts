export type StockList = {
  count: number;
  results: Stock[];
  meta: Metadata;
};

export type Metadata = {
  title: string;
  description: string;
};

export type StockChange = {
  value: string;
  sign: number;
};

export type StockProfitLossPercent = {
  value: string;
  sign: number;
};

export type Stock = {
  id: string;
  name: string;
  ticker: string;
  close: string;
  change: StockChange;
  profit_loss_percent: StockProfitLossPercent;
  analysis_date: string;
  investtech_score: string;
};
