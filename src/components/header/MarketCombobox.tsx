'use client';

import { NO, SE, FI, DK } from 'country-flag-icons/react/3x2';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

const markets = [
  {
    value: 'no',
    label: 'Norway',
    flag: NO,
    marketId: 1,
  },
  {
    value: 'se',
    label: 'Sweden',
    flag: SE,
    marketId: 461,
  },
  {
    value: 'fi',
    label: 'Finland',
    flag: FI,
    marketId: 351,
  },
  {
    value: 'dk',
    label: 'Denmark',
    flag: DK,
    marketId: 451,
  },
  {
    value: 'dk',
    label: 'DK Inv.for.',
    flag: DK,
    marketId: 452,
  },
];

export function MarketCombobox() {
  const t = useTranslations('errors');
  const default_market = 351; // Default market value
  const [open, setOpen] = React.useState(false);

  const [customSelectedMarket, setCustomSelectedMarket] = React.useState(default_market);
  const selectedMarket = markets.find((market) => market.marketId === Number(customSelectedMarket));
  const FlagComponent = selectedMarket?.flag;

  const handleMarketChange = (marketId: number) => {
    setCustomSelectedMarket(marketId);
    const newSelectedMarket = markets.find((c) => c.marketId === Number(marketId));
    if (newSelectedMarket) {
      setOpen(false);
    }
    Storage.setMarketId(String(marketId));
    // Refresh the page to apply market changes
    window.location.reload();
  };

  useEffect(() => {
    const savedMarket = Storage.getMarketId();
    if (savedMarket) {
      setCustomSelectedMarket(Number(savedMarket));
    } else {
      setCustomSelectedMarket(default_market);
      Storage.setMarketId(String(default_market));
    }
  }, []);

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
            {FlagComponent && <FlagComponent className="h-5 w-7 object-contain" />}
            <span className="text-sm font-medium">{selectedMarket?.label || 'Select'}</span>
          </div>
          {open ? chevronDown : chevronUp}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandList>
            <CommandEmpty>{t('notFound')}</CommandEmpty>
            <CommandGroup>
              {markets.map((market) => {
                const CountryFlag = market.flag;
                return (
                  <CommandItem
                    key={market.marketId}
                    value={String(market.marketId)}
                    onSelect={() => {
                      handleMarketChange(market.marketId);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <CountryFlag className="h-4 w-6" />
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          customSelectedMarket === market.marketId ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {market.label}
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
