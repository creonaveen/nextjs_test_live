export type IndicesList = {
  count: number;
  results: Index[];
};

export type Index = {
  id: string;
  name: string;
  ticker: string;
  close: string;
  change: string;
  profit_loss_percent: string;
  analysis_date: string;
};
