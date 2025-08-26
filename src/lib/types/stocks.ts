export type StockList = {
  count: number;
  results: Stock[];
};

export type Stock = {
  id: string;
  name: string;
  ticker: string;
  close: string;
  change: string;
  profit_loss_percent: string;
  analysis_date: string;
};
