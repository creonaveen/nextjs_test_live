'use client';

import { Button } from 'investtech/external-components';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from 'investtech/external-components';
import { Popover, PopoverContent, PopoverTrigger } from 'investtech/external-components';
import { Check } from 'lucide-react';
import { useMemo } from 'react';
import * as React from 'react';

import { configuration } from '@/environment/configuration';
import { cn } from '@/lib/utils';

import { chevronDown, chevronUp } from '../../custom-components/icon';

import { useMarketCombobox } from './market-combobox.hooks';
import { MARKETS, type Market } from './market-combobox.types';

function MarketTrigger({
  open,
  selectedMarket,
}: {
  open: boolean;
  selectedMarket: { label: string; flag: React.ComponentType<{ className?: string }> } | null;
}) {
  return (
    <PopoverTrigger asChild className="max-w-[150px] rounded-md sm:max-w-none">
      <Button
        id="market-selector-dropdown"
        variant="headerDropdown"
        role="combobox"
        aria-expanded={open}
        aria-label={`Selected market: ${selectedMarket?.label || 'None'}`}
        suppressHydrationWarning
      >
        <div className="flex items-center gap-3 truncate" suppressHydrationWarning>
          {selectedMarket?.flag && (
            <selectedMarket.flag
              className="h-5 w-7 flex-shrink-0 object-contain"
              aria-hidden="true"
            />
          )}
          <span className="truncate text-sm font-medium" suppressHydrationWarning>
            {selectedMarket?.label || 'Select Market'}
          </span>
        </div>
        {open ? chevronUp('ml-2 h-4 w-4') : chevronDown('ml-2 h-4 w-4')}
      </Button>
    </PopoverTrigger>
  );
}

function MarketList({
  marketItems,
  notFoundLabel,
}: {
  marketItems: React.ReactNode;
  notFoundLabel: string;
}) {
  return (
    <PopoverContent className="w-full p-0 md:w-[200px]" align="start">
      <Command>
        <CommandList>
          <CommandEmpty>{notFoundLabel}</CommandEmpty>
          <CommandGroup>{marketItems}</CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}

function MarketItem({
  label,
  selected,
  navigateMarket,
  setOpen,
  m,
  current,
}: {
  label: string;
  selected: boolean;
  navigateMarket: (marketId: number, close: () => void) => void;
  setOpen: (open: boolean) => void;
  m: Market;
  current: boolean;
}) {
  const Flag = m.flag;
  return (
    <CommandItem
      key={m.marketId}
      value={label}
      onSelect={() => void navigateMarket(m.marketId, () => setOpen(false))}
      className={cn(
        'cursor-pointer transition-colors',
        selected && 'bg-primary-background dark:bg-primary dark:text-grey-900 text-black'
      )}
      aria-selected={current}
      id={label}
    >
      <div className="flex items-center gap-2">
        <Flag className="h-4 w-6 flex-shrink-0" aria-hidden="true" />
        <Check
          className={cn('mr-2 h-4 w-4 transition-opacity', current ? 'opacity-100' : 'opacity-0')}
          aria-hidden="true"
        />
        <span className="flex-1">{label}</span>
      </div>
    </CommandItem>
  );
}

export function MarketCombobox() {
  const {
    open,
    setOpen,
    selectedMarket,
    selectedIndex,
    hydrated,
    selectedId,
    queryId,
    navigateMarket,
    t,
    tMarkets,
  } = useMarketCombobox();

  // memoized items
  const marketItems = useMemo(
    () => (
      <>
        {MARKETS.map((m, i) => {
          const label = tMarkets(m.translationKey);
          const selected = i === selectedIndex;
          const current = hydrated
            ? selectedId === m.marketId
            : m.marketId === (queryId ? Number(queryId) : Number(configuration.DEFAULT_MARKET_ID));

          return (
            <MarketItem
              key={m.marketId}
              label={label}
              selected={selected}
              navigateMarket={navigateMarket}
              setOpen={setOpen}
              m={m}
              current={current}
            />
          );
        })}
      </>
    ),
    [hydrated, queryId, selectedId, selectedIndex, navigateMarket, tMarkets, setOpen]
  );

  // JSX
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <MarketTrigger open={open} selectedMarket={selectedMarket} />

      <MarketList marketItems={marketItems} notFoundLabel={t('notFound')} />
    </Popover>
  );
}
