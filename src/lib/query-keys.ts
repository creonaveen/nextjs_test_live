/**
 * Centralized query key factory for TanStack Query
 * Provides type-safe query keys for all API endpoints
 */

import type { CompanyDetailsQueryParams } from '@/store/api-service/companies-api-service';
import type { MyNotesQueryParams } from '@/store/api-service/mynotes-api-service';
import type { StaticContentQueryParams } from '@/store/api-service/static-content-api-service';
import type { StocksQueryParams } from '@/store/api-service/stocks-api-service';
import type { SvgQueryParams } from '@/store/api-service/svg-api-service';
import type { WatchlistQueryParams } from '@/store/api-service/watchlist-api-service';

/**
 * Query key factory for my notes
 */
export const myNotesKeys = {
  all: ['mynotes'] as const,
  lists: () => [...myNotesKeys.all, 'list'] as const,
  list: (params?: MyNotesQueryParams) => [...myNotesKeys.lists(), params] as const,
  details: (companyId: string) => [...myNotesKeys.all, 'detail', companyId] as const,
  mutations: () => [...myNotesKeys.all, 'mutation'] as const,
  delete: (params?: { company_id: string; action: string }) =>
    [...myNotesKeys.mutations(), 'delete', params] as const,
  create: (params?: { company_id: string; action: string; note: string }) =>
    [...myNotesKeys.mutations(), 'create', params] as const,
};

/**
 * Query key factory for stocks
 */
export const stocksKeys = {
  all: ['stocks'] as const,
  lists: () => [...stocksKeys.all, 'list'] as const,
  list: (params?: StocksQueryParams) => [...stocksKeys.lists(), params] as const,
};

/**
 * Query key factory for companies
 */
export const companiesKeys = {
  all: ['companies'] as const,
  lists: () => [...companiesKeys.all, 'list'] as const,
  list: (params?: {
    page?: number;
    limit?: number;
    market_id?: string | null;
    q?: string | null;
    ordering?: string | null;
    id?: string | null;
  }) => [...companiesKeys.lists(), params] as const,
  details: (params?: CompanyDetailsQueryParams) =>
    [...companiesKeys.all, 'detail', params] as const,
};

/**
 * Query key factory for watchlist
 */
export const watchlistKeys = {
  all: ['watchlist'] as const,
  lists: () => [...watchlistKeys.all, 'list'] as const,
  list: (params?: WatchlistQueryParams) => [...watchlistKeys.lists(), params] as const,
  mutations: () => [...watchlistKeys.all, 'mutation'] as const,
  modify: (params?: WatchlistQueryParams) =>
    [...watchlistKeys.mutations(), 'modify', params] as const,
};

/**
 * Query key factory for indices
 */
export const indicesKeys = {
  all: ['indices'] as const,
  lists: () => [...indicesKeys.all, 'list'] as const,
  list: (params?: { page?: number; limit?: number; lang: string }) =>
    [...indicesKeys.lists(), params] as const,
};

/**
 * Query key factory for top 50
 */
export const top50Keys = {
  all: ['top50'] as const,
  lists: () => [...top50Keys.all, 'list'] as const,
  list: (params?: { page?: number; limit?: number; lang: string }) =>
    [...top50Keys.lists(), params] as const,
};

/**
 * Query key factory for research
 */
export const researchKeys = {
  all: ['research'] as const,
  lists: () => [...researchKeys.all, 'list'] as const,
  list: (params?: { page?: number; limit?: number; lang: string }) =>
    [...researchKeys.lists(), params] as const,
};

/**
 * Query key factory for model portfolio
 */
export const modelPortfolioKeys = {
  all: ['modelPortfolio'] as const,
  lists: () => [...modelPortfolioKeys.all, 'list'] as const,
  list: (params?: { lang: string }) => [...modelPortfolioKeys.lists(), params] as const,
};

/**
 * Query key factory for market commentary
 */
export const marketCommentaryKeys = {
  all: ['marketCommentary'] as const,
  lists: () => [...marketCommentaryKeys.all, 'list'] as const,
  list: (params?: { lang: string }) => [...marketCommentaryKeys.lists(), params] as const,
};

/**
 * Query key factory for SVG charts
 */
export const svgKeys = {
  all: ['svg'] as const,
  charts: () => [...svgKeys.all, 'chart'] as const,
  chart: (params?: SvgQueryParams) => [...svgKeys.charts(), params] as const,
};

/**
 * Query key factory for static content
 */
export const staticContentKeys = {
  all: ['staticContent'] as const,
  content: (params?: StaticContentQueryParams) => [...staticContentKeys.all, params] as const,
};

/**
 * Query key factory for user settings
 */
export const userSettingsKeys = {
  all: ['userSettings'] as const,
  settings: (params?: {
    company_id?: string;
    indicator_update?: number;
    product?: number;
    chart_tooltip_id?: number;
    lang?: string;
  }) => [...userSettingsKeys.all, params] as const,
};

/**
 * Query key factory for today's case
 */
export const todaysCaseKeys = {
  all: ['todaysCase'] as const,
  cases: () => [...todaysCaseKeys.all, 'list'] as const,
  list: (params?: { lang: string }) => [...todaysCaseKeys.cases(), params] as const,
};

/**
 * Query key factory for home page
 */
export const homeKeys = {
  all: ['home'] as const,
  pages: () => [...homeKeys.all, 'page'] as const,
  page: (params?: { market_id: string; lang: string }) => [...homeKeys.pages(), params] as const,
};

/**
 * Consolidated query keys object for easy access
 */
export const queryKeys = {
  myNotes: myNotesKeys,
  stocks: stocksKeys,
  companies: companiesKeys,
  watchlist: watchlistKeys,
  indices: indicesKeys,
  top50: top50Keys,
  research: researchKeys,
  modelPortfolio: modelPortfolioKeys,
  marketCommentary: marketCommentaryKeys,
  svg: svgKeys,
  staticContent: staticContentKeys,
  userSettings: userSettingsKeys,
  todaysCase: todaysCaseKeys,
  home: homeKeys,
} as const;
