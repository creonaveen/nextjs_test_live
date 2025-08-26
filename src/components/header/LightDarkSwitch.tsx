import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '@/components/ui/button';

export function LightDarkSwitch() {
  const { setTheme, theme } = useTheme();

  // Show actual theme switch after mount
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunMedium /> : <MoonStar />}
    </Button>
  );
}
