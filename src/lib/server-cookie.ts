// lib/serverCookies.ts
import { cookies } from 'next/headers';

import { configuration } from '@/environment/configuration';

// Default values from configuration
const DEFAULT_MARKET_ID = configuration.DEFAULT_MARKET_ID;
const DEFAULT_LANGUAGE = configuration.DEFAULT_LANGUAGE;

export async function getServerSideMarketId(): Promise<string> {
  const cookieStore = await cookies();
  const value = cookieStore.get('market_id')?.value;

  // Return the value if it exists and is not empty, otherwise return default
  return value && value.trim() !== '' ? value : DEFAULT_MARKET_ID;
}

export async function getServerSideLanguage(): Promise<string> {
  const cookieStore = await cookies();
  const value = cookieStore.get('language')?.value;

  // Return the value if it exists and is not empty, otherwise return default
  return value && value.trim() !== '' ? value : DEFAULT_LANGUAGE;
}
