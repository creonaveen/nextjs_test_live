import type { Top50List } from '@/lib/types/top50';

/** Option type for dropdown menus */
export type Option = {
  value: string;
  label: string;
};

/** Column definition type for table headers */
export type ColumnDefinition = {
  key: string;
  label: string;
  align: 'left' | 'right';
  hideOn?: string[];
};

/** Props for Top50Table component */
export interface Top50TableProps {
  serverData: Top50List;
}

/** Props for Top50TableContent component */
export interface Top50TableContentProps {
  serverData: Top50List;
  buyOrSellOptions: Option[];
  timeSpanOptions: Option[];
  defaultBuyOrSell: Option;
  defaultTimeSpan: Option;
  buyOrSell: Option | null;
  setBuyOrSell: (value: Option | null) => void;
  timeSpan: Option | null;
  setTimeSpan: (value: Option | null) => void;
  marketId: string;
  ordering: string;
  setOrdering: (value: string) => void;
  platform: string;
  pageFromUrl: number;
  setPageFromUrl: (value: number) => void;
  limitFromUrl: number;
  setLimitFromUrl: (value: number) => void;
  t: (key: string) => string;
  e: (key: string) => string;
  n: (key: string) => string;
}

/** Minimum number of results to show pagination */
export const PAGINATION_THRESHOLD = 5;
