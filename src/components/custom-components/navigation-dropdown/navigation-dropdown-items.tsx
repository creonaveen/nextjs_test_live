'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { NavigationDropdownContext } from './navigation-dropdown-core';

/* -------------------------------------------------------------------------- */
/* Items */
/* -------------------------------------------------------------------------- */

export function NavigationDropdownMenuItem({
  className,
  inset,
  variant = 'default',
  onSelect,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  const ctx = React.useContext(NavigationDropdownContext);

  return (
    <DropdownMenuPrimitive.Item
      data-inset={inset}
      data-variant={variant}
      onSelect={(e) => {
        onSelect?.(e);
        ctx?.closeMenu();
      }}
      className={cn(
        'relative flex cursor-pointer items-start gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
        'hover:bg-grey-100 dark:hover:bg-grey-900 focus:bg-accent-1',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10',
        'data-[inset]:pl-8 [&:not(:last-child)]:mb-1',
        className
      )}
      {...props}
    />
  );
}

export function NavigationDropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        'relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden',
        'focus:bg-accent-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function NavigationDropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        'relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden',
        'focus:bg-accent-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}
