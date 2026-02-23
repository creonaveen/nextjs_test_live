export type Watchlists = {
  watchlist_id: string;
  count: number;
  results: WatchlistResult[];
};

export type WatchlistChange = {
  sign: number;
  value: string;
};

export type WatchlistProfitLossPercent = {
  sign: number;
  value: string;
};

export type WatchlistResult = {
  id: string;
  name: string;
  ticker: string;
  market_id: string;
  close: string | null;
  change: WatchlistChange | null;
  profit_loss_percent: WatchlistProfitLossPercent | null;
  analysis_date: string | null;
  investtech_score: string | null;
  rating: string;
};

export type WatchlistCompany = {
  id: string;
  name: string;
  country_code?: string | null;
};
