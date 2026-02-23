'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'investtech/external-components';
import React, { useState } from 'react';

import { chevronDown, chevronUp } from './icon';

/**
 * Option type for dropdown menu items
 */
export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Props for the DropdownMenuComponent
 */
interface DropdownMenuComponentProps {
  /** Currently selected option */
  selectedOption?: DropdownOption;
  /** Callback when an option is selected */
  onSelect: (option: DropdownOption) => void;
  /** Array of options to display */
  options: DropdownOption[];
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Additional CSS classes for the trigger */
  className?: string;
}

/**
 * DropdownMenuComponent - A reusable dropdown menu component
 *
 * Provides a customizable dropdown menu with support for option selection,
 * placeholder text, and visual indication of the selected option.
 * Automatically manages open/close state and calls the onSelect callback
 * when an option is chosen.
 *
 * @example
 * ```tsx
 * <DropdownMenuComponent
 *   selectedOption={{ value: '1', label: 'Option 1' }}
 *   onSelect={(option) => {
 *     // Handle option selection
 *     setSelectedOption(option);
 *   }}
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 * />
 * ```
 */
function DropdownMenuTriggerComponent({
  displayLabel,
  isOpen,
}: {
  displayLabel: string;
  isOpen: boolean;
}) {
  return (
    <DropdownMenuTrigger
      aria-label="Select an option"
      aria-expanded={isOpen}
      id="dropdown-menu-trigger"
    >
      {displayLabel}
      {isOpen ? chevronUp('mt-0.5') : chevronDown('mt-0.5')}
    </DropdownMenuTrigger>
  );
}

function DropdownMenuContentComponent({
  options,
  selectedOption,
  onSelect,
  setIsOpen,
}: {
  options: DropdownOption[];
  selectedOption?: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  setIsOpen: (open: boolean) => void;
}) {
  const handleSelect = React.useCallback(
    (option: DropdownOption) => {
      onSelect(option);
      setIsOpen(false);
    },
    [onSelect, setIsOpen]
  );

  return (
    <DropdownMenuContent className="w-36" align="start">
      {options && options.length > 0 ? (
        options.map((option, index) => {
          const isSelected = selectedOption?.value === option.value;

          return (
            <DropdownMenuItem
              id={`dropdown-menu-item-${index + 1}`}
              key={option.value}
              onClick={() => handleSelect(option)}
              className={
                isSelected
                  ? 'bg-primary-background dark:bg-primary dark:text-grey-900 text-black'
                  : ''
              }
              aria-selected={isSelected}
            >
              {option.label}
            </DropdownMenuItem>
          );
        })
      ) : (
        <DropdownMenuItem disabled>No options available</DropdownMenuItem>
      )}
    </DropdownMenuContent>
  );
}

export function DropdownMenuComponent({
  selectedOption,
  onSelect,
  options,
  placeholder = 'Select an option',
}: DropdownMenuComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const displayLabel = selectedOption?.label || options[0]?.label || placeholder;

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTriggerComponent displayLabel={displayLabel} isOpen={isOpen} />
      <DropdownMenuContentComponent
        options={options}
        selectedOption={selectedOption}
        onSelect={onSelect}
        setIsOpen={setIsOpen}
      />
    </DropdownMenu>
  );
}
