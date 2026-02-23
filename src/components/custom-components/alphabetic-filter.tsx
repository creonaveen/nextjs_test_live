'use client';

import { Button } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import * as React from 'react';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AlphabeticFilterProps {
  selectedLetter?: string;
  onSelect: (letter: string | undefined) => void;
  showAll?: boolean; // Whether to show "All" option
  className?: string; // Optional wrapper styling
}

/**
 * AlphabeticFilter - A filter component with alphabet buttons
 *
 * Renders a horizontal row of letter buttons (A-Z) for filtering content alphabetically.
 * Optionally includes an "All" button to clear the filter.
 * Highlights the currently selected letter for visual feedback.
 *
 * Memoized to prevent unnecessary re-renders when parent components update.
 *
 * @example
 * ```tsx
 * <AlphabeticFilter
 *   selectedLetter="A"
 *   onSelect={(letter) => setFilter(letter)}
 *   showAll={true}
 * />
 * ```
 */
export const AlphabeticFilter = React.memo(function AlphabeticFilter({
  selectedLetter,
  onSelect,
  showAll = true,
  className,
}: AlphabeticFilterProps) {
  const t = useTranslations('common');
  return (
    <div className={`mb-8 flex flex-wrap justify-center ${className || ''}`}>
      {ALPHABETS.map((letter) => (
        <Button
          id={`alphabetic-filter-button-${letter}`}
          key={letter}
          size="sm"
          variant={selectedLetter === letter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect(letter)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(letter);
            }
          }}
          aria-pressed={selectedLetter === letter}
          aria-label={`Filter by letter ${letter}`}
        >
          {letter}
        </Button>
      ))}

      {showAll && (
        <Button
          id="alphabetic-filter-all-button"
          key="all"
          size="sm"
          variant={!selectedLetter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect(undefined)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(undefined);
            }
          }}
          aria-pressed={!selectedLetter}
          aria-label={t('all') || 'Show all'}
        >
          {t('all')}
        </Button>
      )}
    </div>
  );
});
