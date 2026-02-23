'use client';

import { Popover, PopoverContent, PopoverTrigger } from 'investtech/external-components';
import { Tooltip, TooltipContent, TooltipTrigger } from 'investtech/external-components';
import * as React from 'react';

import { usePlatform } from '@/lib/platform';

interface TableCellTooltipProps {
  value: React.ReactNode;
  tooltip: React.ReactNode;
  style?: React.CSSProperties;
}

const triggerContentClasses =
  'text-sm font-semibold h-full w-full flex items-center justify-center';
const tooltipContentClasses = 'p-2 text-sm';

function TriggerContent({ value }: { value: React.ReactNode }) {
  return (
    <>
      <span className="absolute -top-1 right-0 left-0 h-1" />
      <span className="block overflow-hidden text-ellipsis whitespace-nowrap">{value}</span>
    </>
  );
}

function DesktopTooltip({ value, tooltip, style }: TableCellTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`${triggerContentClasses} ${!tooltip ? 'cursor-default' : 'cursor-pointer'}}`}
          style={style}
        >
          <TriggerContent value={value} />
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className={tooltipContentClasses}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

function MobilePopover({ value, tooltip, style }: TableCellTooltipProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={triggerContentClasses}
          onClick={() => setOpen((v) => !v)}
          aria-label="Show tooltip"
          style={style}
        >
          <TriggerContent value={value} />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className={tooltipContentClasses}>
        {tooltip}
      </PopoverContent>
    </Popover>
  );
}

export function TableCellTooltip({ value, tooltip, style }: TableCellTooltipProps) {
  const platform = usePlatform();

  if (!tooltip) {
    return (
      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap" style={style}>
        {value}
      </div>
    );
  }

  return platform !== 'desktop' ? (
    <MobilePopover value={value} tooltip={tooltip} style={style} />
  ) : (
    <DesktopTooltip value={value} tooltip={tooltip} style={style} />
  );
}
