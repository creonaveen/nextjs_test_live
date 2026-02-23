'use client';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'investtech/external-components';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { configuration } from '@/environment/configuration';
import { useKeyboardNavigation } from '@/lib/hooks/use-keyboard-navigation';
import { cn } from '@/lib/utils';
import { Storage } from '@/store/local-storage';
import logger from '@/utils/logger';

import { chevronDown, chevronUp } from '../custom-components/icon';

type LanguageCode = 'eng' | 'nor' | 'swe' | 'dan';

interface Language {
  code: LanguageCode;
  label: string;
}

const LANGUAGES: Language[] = [
  { code: 'nor', label: 'Norsk' },
  { code: 'swe', label: 'Svenska' },
  { code: 'dan', label: 'Dansk' },
  { code: 'eng', label: 'English' },
];

function isValidLanguage(value: string): boolean {
  return LANGUAGES.some((lang) => lang.code === value);
}

function resolveInitialLanguage(
  queryLanguage: string | null,
  defaultLanguage: LanguageCode
): LanguageCode {
  if (queryLanguage && isValidLanguage(queryLanguage)) {
    return queryLanguage as LanguageCode;
  }

  const stored = Storage.getLanguage();
  if (stored && isValidLanguage(stored)) {
    return stored as LanguageCode;
  }

  return defaultLanguage;
}

function useLanguageState() {
  const router = useRouter();
  const defaultLanguage = configuration.DEFAULT_LANGUAGE as LanguageCode;
  const [queryLanguage, setQueryLanguage] = useQueryState('language');

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    const resolved = resolveInitialLanguage(queryLanguage, defaultLanguage);
    setLanguage(resolved);
    Storage.setLanguage(resolved);

    if (queryLanguage !== resolved) {
      void setQueryLanguage(resolved);
    }
  }, [defaultLanguage, queryLanguage, setQueryLanguage]);

  const changeLanguage = useCallback(
    async (lang: LanguageCode) => {
      try {
        setLanguage(lang);
        setOpen(false);
        Storage.setLanguage(lang);
        await setQueryLanguage(lang);
        router.refresh();
      } catch (error) {
        logger.error(
          'Language change failed',
          error instanceof Error ? error : new Error(String(error)),
          { language: lang }
        );
        window.location.reload();
      }
    },
    [router, setQueryLanguage]
  );

  return { open, setOpen, language, changeLanguage };
}

function useLanguageSelectorLogic() {
  const { open, setOpen, language, changeLanguage } = useLanguageState();

  const selectedLanguage = useMemo(
    () => LANGUAGES.find((lang) => lang.code === language),
    [language]
  );

  const initialIndex = useMemo(
    () => LANGUAGES.findIndex((lang) => lang.code === language),
    [language]
  );

  const { selectedIndex } = useKeyboardNavigation({
    items: LANGUAGES,
    isOpen: open,
    initialIndex,
    onSelect: (lang) => void changeLanguage(lang.code),
    onClose: () => setOpen(false),
  });

  return {
    open,
    setOpen,
    language,
    changeLanguage,
    selectedLanguage,
    selectedIndex,
  };
}

interface LanguageListProps {
  selectedIndex: number;
  language: LanguageCode;
  onSelect: (code: LanguageCode) => void | Promise<void>;
}

function LanguageList({ selectedIndex, language, onSelect }: LanguageListProps) {
  return (
    <>
      {LANGUAGES.map((lang, index) => (
        <CommandItem
          key={lang.code}
          value={lang.label}
          onSelect={() => void onSelect(lang.code)}
          className={cn(
            'cursor-pointer',
            index === selectedIndex &&
              'bg-primary-background dark:bg-primary dark:text-grey-900 text-black'
          )}
        >
          <Check
            className={cn('mr-2 h-4 w-4', language === lang.code ? 'opacity-100' : 'opacity-0')}
          />
          {lang.label}
        </CommandItem>
      ))}
    </>
  );
}

export const LanguageSelector = React.memo(function LanguageSelector() {
  const { open, setOpen, language, changeLanguage, selectedLanguage, selectedIndex } =
    useLanguageSelectorLogic();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="rounded-md">
        <Button
          id="language-selector-dropdown"
          variant="headerDropdown"
          role="combobox"
          aria-expanded={open}
        >
          <span className="text-sm font-medium">{selectedLanguage?.label ?? 'Select'}</span>
          {open ? chevronUp('ml-2 h-4 w-4') : chevronDown('ml-2 h-4 w-4')}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              <LanguageList
                selectedIndex={selectedIndex}
                language={language}
                onSelect={changeLanguage}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
