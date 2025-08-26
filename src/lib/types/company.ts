export type CompanyList = {
  count: number;
  results: Company[];
};

export type Company = {
  id: string;
  name: string;
  ticker: string;
  country_code: string;
  currency: string;
  close: string;
  change: string;
  profit_loss_percent: string;
  external_code?: string | null;
};
