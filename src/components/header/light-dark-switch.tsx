import { Button } from 'investtech/external-components';
import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function LightDarkSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a neutral state during SSR and initial load
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="border-primary size-9 cursor-pointer"
        disabled
      >
        <Moon className="size-4" />
      </Button>
    );
  }

  // Show actual theme switch after mount
  return (
    <Button
      id="light-dark-toggle"
      variant="outline"
      size="icon"
      className="border-primary size-9 cursor-pointer"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
