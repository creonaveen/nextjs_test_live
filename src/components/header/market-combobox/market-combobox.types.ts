import { NO, SE, FI, DK } from 'country-flag-icons/react/3x2';

export interface Market {
  value: string;
  translationKey: string;
  flag: React.ComponentType<{ className?: string }>;
  marketId: number;
}

export const MARKETS: Market[] = [
  { value: 'no', translationKey: 'norway', flag: NO, marketId: 1 },
  { value: 'se', translationKey: 'sweden', flag: SE, marketId: 461 },
  { value: 'fi', translationKey: 'finland', flag: FI, marketId: 351 },
  { value: 'dk', translationKey: 'denmark', flag: DK, marketId: 451 },
  { value: 'dk', translationKey: 'denmarkInvFo', flag: DK, marketId: 452 },
] as const;
