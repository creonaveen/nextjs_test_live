'use client';

import { useScrollbarGutter } from '@/lib/hooks/use-scroll-bar-gutter';

export function ScrollbarGutterProvider() {
  useScrollbarGutter();

  return null;
}
