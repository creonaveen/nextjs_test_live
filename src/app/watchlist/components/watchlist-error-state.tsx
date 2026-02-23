import { Card, CardContent } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

interface WatchlistErrorStateProps {
  error: Error | null;
}

export function WatchlistErrorState({ error }: WatchlistErrorStateProps) {
  const e = useTranslations('errors');
  const n = useTranslations('navigation');

  return (
    <div>
      <div className="page-header-table" id="page-title">
        {n('watchlist')}
      </div>
      <Card className="w-full">
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-destructive mb-2">{e('errorLoadingData')}</p>
            <p className="text-muted-foreground text-sm">
              {error instanceof Error ? error.message : e('unknownError')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
