'use client';

import { Checkbox } from 'investtech/external-components';
import { Label } from 'investtech/external-components';

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}

export const checkboxExampleCode = `import { Checkbox } from "investtech/external-components"
import { Label } from "@/components/external-components"

// Basic checkbox with label
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Disabled checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled">Disabled Checkbox</Label>
</div>

// Checkbox with custom colors
<div className="flex items-center space-x-2">
  <Checkbox id="custom" className="data-[state=checked]:bg-green-500" />
  <Label htmlFor="custom">Custom Color Checkbox</Label>
</div>

// Checkbox with description
<div className="flex items-start space-x-2">
  <Checkbox id="description" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="description">Enable notifications</Label>
    <p className="text-grey-700 dark:text-grey-200 text-sm">Receive notifications about new messages.</p>
  </div>
</div>`;
