import { getServerSideLanguage, getServerSideMarketId } from '@/lib/server-cookie';

export async function getServerQueryParams() {
  const defaultMarketId = '1';
  const defaultLanguage = 'eng';
  const market_id = (await getServerSideMarketId()) ?? defaultMarketId;
  const lang = (await getServerSideLanguage()) ?? defaultLanguage;

  return { market_id, lang };
}
