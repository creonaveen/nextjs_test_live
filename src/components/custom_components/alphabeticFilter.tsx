'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Button } from '@/components/ui/button';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AlphabeticFilterProps {
  selectedLetter?: string;
  onSelect: (letter: string | undefined) => void;
  showAll?: boolean; // Whether to show "All" option
  className?: string; // Optional wrapper styling
}

export function AlphabeticFilter({
  selectedLetter,
  onSelect,
  showAll = true,
  className,
}: AlphabeticFilterProps) {
  const t = useTranslations('common');
  return (
    // mb-8 flex flex-wrap justify-center gap-1
    <div className={`mb-8 flex flex-wrap justify-center gap-1 ${className || ''}`}>
      {ALPHABETS.map((letter) => (
        <Button
          key={letter}
          size="sm"
          variant={selectedLetter === letter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect(letter)}
        >
          {letter}
        </Button>
      ))}

      {showAll && (
        <Button
          key="all"
          size="sm"
          variant={!selectedLetter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect(undefined)}
        >
          {t('all')}
        </Button>
      )}
    </div>
  );
}
