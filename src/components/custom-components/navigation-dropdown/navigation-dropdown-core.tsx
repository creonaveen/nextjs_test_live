'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Context */
/* -------------------------------------------------------------------------- */

export const NavigationDropdownContext = React.createContext<{
  closeMenu: () => void;
} | null>(null);

/* -------------------------------------------------------------------------- */
/* Root */
/* -------------------------------------------------------------------------- */

export function NavigationDropdownMenu({
  onOpenChange,
  onClose,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root> & {
  onClose?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const suppressHoverRef = React.useRef(false);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) suppressHoverRef.current = false;
    onOpenChange?.(nextOpen);
    if (!nextOpen) onClose?.();
  };

  const closeMenu = React.useCallback(() => {
    setOpen(false);
    suppressHoverRef.current = true;
    onClose?.();
    setTimeout(() => {
      suppressHoverRef.current = false;
    }, 300);
  }, [onClose]);

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={handleOpenChange} {...props}>
      <NavigationDropdownContext.Provider value={{ closeMenu }}>
        <div
          className="relative inline-block [scrollbar-gutter:stable]"
          onMouseEnter={() => {
            if (!suppressHoverRef.current) setOpen(true);
          }}
          onMouseLeave={() => {
            suppressHoverRef.current = false;
            setOpen(false);
          }}
        >
          {props.children}
        </div>
      </NavigationDropdownContext.Provider>
    </DropdownMenuPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------- */
/* Trigger & Content */
/* -------------------------------------------------------------------------- */

export function NavigationDropdownMenuTrigger({
  className,
  chevronClassName,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  chevronClassName?: string;
}) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn('group inline-flex items-center gap-1', className)}
      {...props}
    >
      <span className="flex items-center">
        {children}
        <ChevronDownIcon
          aria-hidden
          className={cn(
            'text-grey-700 dark:text-grey-200 group-data-[state=open]:text-primary-text-hover size-3 transition-transform duration-300 group-data-[state=open]:rotate-180',
            chevronClassName
          )}
        />
      </span>
    </DropdownMenuPrimitive.Trigger>
  );
}

export function NavigationDropdownMenuContent({
  className,
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground border-divider z-50 -mt-2 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1.5 shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
