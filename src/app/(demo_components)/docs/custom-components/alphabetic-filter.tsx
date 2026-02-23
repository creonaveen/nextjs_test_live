'use client';

import * as React from 'react';

import { AlphabeticFilter } from '@/components/custom-components/alphabetic-filter';

/**
 * Demo component for the AlphabeticFilter component.
 * Shows how to use the alphabetic filter with letter selection.
 *
 * @returns A demo of the AlphabeticFilter component
 */
export function AlphabeticFilterDemo() {
  const [selectedLetter, setSelectedLetter] = React.useState<string | undefined>('A');

  const handleSelect = React.useCallback((letter?: string) => {
    setSelectedLetter(letter);
    // In a real application, you would filter data based on the selected letter
    console.log('Selected letter:', letter);
  }, []);

  return (
    <div>
      <AlphabeticFilter selectedLetter={selectedLetter} onSelect={handleSelect} showAll={true} />
    </div>
  );
}

export const alphabeticFilterCode = `
'use client';

import * as React from 'react';

import { Button } from '@/components/external-components/button';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Props for the AlphabeticFilter component
 */
interface AlphabeticFilterProps {
  /** Callback function called when a letter is selected */
  onSelect?: (letter?: string) => void;
  /** Currently selected letter */
  selectedLetter?: string;
  /** Whether to show the "All" option */
  showAll?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Alphabetic filter component that displays all letters and optionally an "All" button.
 * Used for filtering content by the first letter.
 *
 * @param props - The component props
 * @returns An alphabetic filter component
 */
export function AlphabeticFilter({
  onSelect = () => {},
  selectedLetter,
  showAll = true,
  className,
}: AlphabeticFilterProps) {
  return (
    <div className={\`flex flex-wrap justify-start gap-1 \${className || ''}\`}>
      {ALPHABETS.map((letter) => (
        <Button
          key={letter}
          size="sm"
          variant={selectedLetter === letter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect?.(letter)}
          aria-label={\`Filter by letter \${letter}\`}
          aria-pressed={selectedLetter === letter}
        >
          {letter}
        </Button>
      ))}

      {showAll && (
        <Button
          key="all"
          size="sm"
          variant={!selectedLetter ? 'selectedAlphabetic' : 'alphabetic'}
          onClick={() => onSelect?.(undefined)}
          aria-label="Show all"
          aria-pressed={!selectedLetter}
        >
          All
        </Button>
      )}
    </div>
  );
}
`;
