import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-[#3C48DC1A] text-primary-foreground [a&]:hover:bg-[#3C48DC1A]/90 dark:text-white border-transparent text-[#656784]',
        inverted:
          'bg-[#3C48DC] text-inverted-foreground [a&]:hover:bg-[#3C48DC]/90 dark:text-white border-transparent text-white ',
        success: 'bg-[#E8F5E9] text-[#207025] [a&]:hover:bg-[#E8F5E9]/90 border-transparent',
        error: 'bg-[#FFE9EC] text-[#BF2E27] [a&]:hover:bg-[#FFE9EC]/90 border-transparent',
        warning: 'bg-[#F9F7D7] text-[#825F03] [a&]:hover:bg-[#F9F7D7]/90 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
