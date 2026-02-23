'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { handleExternalClick } from './components/home-card-primitives';
import { HomePageData } from '@/lib/types/home';
import { isExternalUrl } from '@/lib/utils';
import { getUrlWithParams } from '@/utils/navigation-utils';

import { MarketCommentaryCard } from './components/market-commentary-card';
import { ModelPortfolioCard } from './components/model-portfolio-card';
import { NewsCard } from './components/news-card';
import { TodaysCaseCard } from './components/todays-case-card';
import { Top50Card } from './components/top50-card';
import { WatchlistCard } from './components/watchlist-card';

interface HomeTabProps {
  data: HomePageData;
}

function useHomeTabNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const to = (path: string) => router.push(getUrlWithParams(path, searchParams));
  const toNews = (link: string) =>
    isExternalUrl(link) ? handleExternalClick(link) : to(`/${link}`);
  return {
    toMarketCommentary: () => to('/marketcommentary'),
    toTodaysCase: () => to('/todayscase'),
    toNews,
    toWatchlist: () => to('/watchlist'),
  };
}

export default function HomeTab({ data }: HomeTabProps) {
  const n = useTranslations('navigation');
  const nav = useHomeTabNavigation();

  return (
    <div>
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {data.market_commentary && (
          <MarketCommentaryCard
            data={data.market_commentary}
            title={n('marketCommentary')}
            onNavigate={nav.toMarketCommentary}
          />
        )}
        {data.todays_case && (
          <TodaysCaseCard
            data={data.todays_case}
            title={n('todaysCase')}
            onNavigate={nav.toTodaysCase}
          />
        )}
        {data.news && <NewsCard data={data.news} onNavigate={nav.toNews} />}
        {data.watchlist && (
          <WatchlistCard
            data={data.watchlist}
            title={n('watchlist')}
            onWatchlistNavigate={nav.toWatchlist}
          />
        )}
        {data.top_50 && <Top50Card data={data.top_50} title={n('top50')} />}
        {data.model_portfolio && (
          <ModelPortfolioCard data={data.model_portfolio} title={n('modelPortfolio')} />
        )}
      </div>
    </div>
  );
}
