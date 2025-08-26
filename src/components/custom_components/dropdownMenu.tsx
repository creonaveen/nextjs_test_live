'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownMenuProps {
  selectedOption?: { value: string; label: string };
  onSelect: (option: { value: string; label: string }) => void;
  options: { value: string; label: string }[]; // Options can be an array of strings or objects with key-value pairs
}

export function DropdownMenuComponent({ selectedOption, onSelect, options }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const chevronUp = <ChevronUp size={12} className="mt-0.5" />;
  const chevronDown = <ChevronDown size={12} className="mt-0.5" />;

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger>
        {selectedOption?.label || options[0]?.label || 'Select an option'}
        {isOpen ? chevronDown : chevronUp}{' '}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options && options.length > 0 ? (
          options.map((option) => {
            const value = typeof option === 'string' ? option : option.value;
            const label = typeof option === 'string' ? option : option.label;

            return (
              <DropdownMenuItem
                key={value}
                onClick={() => {
                  onSelect({ value, label });
                  setIsOpen(false);
                }}
                className={
                  typeof selectedOption === 'object' && selectedOption?.value === value
                    ? 'bg-accent'
                    : ''
                }
              >
                {label}
              </DropdownMenuItem>
            );
          })
        ) : (
          <DropdownMenuItem disabled>No options available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
