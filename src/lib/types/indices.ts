export type IndicesList = {
  count: number;
  results: Index[];
  meta: Metadata;
};

export interface Metadata {
  title: string;
  description: string;
}

export type IndexChange = {
  value: string;
  sign: number;
};

export type IndexProfitLossPercent = {
  value: string;
  sign: number;
};

export type Index = {
  id: string;
  name: string;
  ticker: string;
  close: string;
  change: IndexChange;
  profit_loss_percent: IndexProfitLossPercent;
  analysis_date: string;
  investtech_score: string;
};
