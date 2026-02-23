'use client';

import * as React from 'react';

import { DropdownMenuComponent } from '@/components/custom-components/dropdown-menu';

/**
 * Demo component for the DropdownMenuComponent.
 * Shows how to use the custom dropdown menu with options.
 *
 * @returns A demo of the DropdownMenuComponent
 */
export function DropdownMenuComponentDemo() {
  const [selectedOption, setSelectedOption] = React.useState<{ value: string; label: string }>({
    value: '1',
    label: 'Option 1',
  });

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const handleSelect = React.useCallback((option: { value: string; label: string }) => {
    setSelectedOption(option);
    // In a real application, you would handle the selection
    console.log('Selected option:', option);
  }, []);

  return (
    <DropdownMenuComponent
      selectedOption={selectedOption}
      onSelect={handleSelect}
      options={options}
    />
  );
}

export const dropdownMenuCode = `
'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/external-components/dropdown-menu';

/**
 * Option type for dropdown menu
 */
interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Props for the DropdownMenuComponent
 */
interface DropdownMenuComponentProps {
  /** Currently selected option */
  selectedOption?: DropdownOption;
  /** Callback function called when an option is selected */
  onSelect: (option: DropdownOption) => void;
  /** Array of options to display */
  options: DropdownOption[];
}

/**
 * Custom dropdown menu component with options.
 * Displays a button that opens a dropdown menu with selectable options.
 *
 * @param props - The component props
 * @returns A dropdown menu component
 */
export function DropdownMenuComponent({
  selectedOption,
  onSelect,
  options,
}: DropdownMenuComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const chevronUp = <ChevronUp size={12} className="mt-0.5" />;
  const chevronDown = <ChevronDown size={12} className="mt-0.5" />;

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm"
          aria-label="Select an option"
          aria-expanded={isOpen}
        >
          {selectedOption?.label || options[0]?.label || 'Select an option'}
          {isOpen ? chevronDown : chevronUp}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {options.length > 0 ? (
          options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={
                selectedOption?.value === option.value ? 'bg-accent-1' : ''
              }
              aria-selected={selectedOption?.value === option.value}
            >
              {option.label}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No options available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
`;
