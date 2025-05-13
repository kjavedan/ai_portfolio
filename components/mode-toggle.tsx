'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="link"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Sun className="h-[1.3rem] w-[1.3rem] scale-110 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.3rem] w-[1.3rem] scale-0 rotate-90 transition-all dark:scale-120 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
