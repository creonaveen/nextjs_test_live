export type Top50List = {
  count: number;
  results: Top50[];
  meta: Metadata;
};

export type Metadata = {
  title: string;
  description: string;
};

export type Top50Change = {
  value: string;
  sign: number;
};

export type Top50ProfitLossPercent = {
  value: string;
  sign: number;
};

export type Top50 = {
  id: string;
  name: string;
  ticker: string;
  close: string;
  change: Top50Change;
  profit_loss_percent: Top50ProfitLossPercent;
  analysis_date: string;
  investtech_score: string;
  score: string | null;
};
