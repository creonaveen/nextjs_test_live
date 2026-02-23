'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { NavigationDropdownContext } from './navigation-dropdown-core';

/* -------------------------------------------------------------------------- */
/* Submenu */
/* -------------------------------------------------------------------------- */

export function NavigationDropdownMenuSub({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub {...props}>{children}</DropdownMenuPrimitive.Sub>;
}

export function NavigationDropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  const ctx = React.useContext(NavigationDropdownContext);

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-inset={inset}
      onClick={(e) => {
        e.stopPropagation();
        ctx?.closeMenu();
      }}
      className={cn(
        'flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden',
        'hover:bg-grey-100 dark:hover:bg-grey-900 focus:bg-accent-1',
        'data-[inset]:pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function NavigationDropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  const ctx = React.useContext(NavigationDropdownContext);

  return (
    <DropdownMenuPrimitive.SubContent
      onClick={(e) => {
        e.stopPropagation();
        ctx?.closeMenu();
      }}
      className={cn(
        'bg-popover border-divider z-50 -mt-2 ml-2 min-w-[8rem] overflow-y-auto rounded-md border p-1.5 shadow-md',
        className
      )}
      {...props}
    />
  );
}

export function NavigationDropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold', className)}
      {...props}
    />
  );
}

export function NavigationDropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-muted -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}
