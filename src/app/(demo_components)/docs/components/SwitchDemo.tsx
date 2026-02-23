'use client';

import { Label } from 'investtech/external-components';
import { Switch } from 'investtech/external-components';

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}

export const switchExampleCode = `import { Switch } from "@/components/external-components/switch"
import { Label } from "@/components/external-components/label"

// Basic switch with label
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// Disabled switch
<div className="flex items-center space-x-2">
  <Switch id="disabled" disabled />
  <Label htmlFor="disabled">Disabled Switch</Label>
</div>

// Switch with custom colors
<div className="flex items-center space-x-2">
  <Switch id="custom" className="data-[state=checked]:bg-green-500" />
  <Label htmlFor="custom">Custom Color Switch</Label>
</div>`;
