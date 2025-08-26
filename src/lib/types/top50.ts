export type Top50List = {
  count: number;
  results: Top50[];
};

export type Top50 = {
  id: string;
  name: string;
  ticker: string;
  score: string | null;
  close: string;
};
