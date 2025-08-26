'use client';

import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Storage } from '@/store/local_storage';

const languages = [
  { code: 'nor', label: 'Norsk' },
  { code: 'swe', label: 'Svenska' },
  { code: 'fin', label: 'Suomi' },
  { code: 'dan', label: 'Dansk' },
];

export function LanguageSelector() {
  const default_language = 'nor'; // Default language code
  const [open, setOpen] = React.useState(false);

  const [customSelectedLanguage, setCustomSelectedLanguage] = React.useState(default_language);
  const selectedLanguage = languages.find((language) => language.code === customSelectedLanguage);

  useEffect(() => {
    const savedLanguage = Storage.getLanguage();
    if (savedLanguage) {
      setCustomSelectedLanguage(savedLanguage);
    } else {
      setCustomSelectedLanguage(default_language);
      Storage.setLanguage(default_language);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCustomSelectedLanguage(lang);
    const newSelectedLanguage = languages.find((l) => l.code === lang);
    if (newSelectedLanguage) {
      setOpen(false);
    }
    Storage.setLanguage(lang);

    // Add language change logic here
    // Refresh the page to apply language changes
    window.location.reload();
  };

  const chevronUp = (
    <ChevronUp
      size={12}
      className="ml-2 h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 group-hover:opacity-100"
    />
  );
  const chevronDown = (
    <ChevronDown
      size={12}
      className="ml-2 h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 group-hover:opacity-100"
    />
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="headerDropdown" role="combobox" aria-expanded={open}>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{selectedLanguage?.label || 'Select'}</span>
          </div>
          {open ? chevronDown : chevronUp}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => {
                return (
                  <CommandItem
                    key={language.code}
                    value={language.code}
                    onSelect={() => {
                      handleLanguageChange(language.code);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          customSelectedLanguage === language.code ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {language.label}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
