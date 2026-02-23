'use client';

import { usePlatform } from '@/lib/platform';

export const ICON_SHEET_SIZE = 28;
export const ICON_SHEET_CLASS =
  'text-grey-500 dark:text-grey-400 hover:text-primary dark:hover:text-primary-text-hover dark:active:text-primary-text-active active:text-primary-text-active hover:bg-grey-100 dark:hover:bg-accent-1/50 ml-auto shrink-0 cursor-pointer rounded-full p-1.25';
export const ICON_SHEET_CLASS_ACTIVE = 'text-primary dark:text-primary';
export const BOTTOM_SHEET_CLASS = 'h-dvh max-h-dvh min-h-dvh rounded-t-xl border-none';

export function useResponsiveSheet(): boolean {
  const platform = usePlatform();
  return platform === 'desktop';
}
