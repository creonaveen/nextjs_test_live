'use client';

import { Label } from 'investtech/external-components';
import { RadioGroup, RadioGroupItem } from 'investtech/external-components';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}

export const radioGroupExampleCode = `import { RadioGroup, RadioGroupItem } from "investtech/external-components"
import { Label } from "investtech/external-components"

// Basic radio group
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>

// Disabled radio group
<RadioGroup defaultValue="disabled" disabled>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="disabled" id="r4" />
    <Label htmlFor="r4">Disabled</Label>
  </div>
</RadioGroup>

// Radio group with description
<RadioGroup defaultValue="card">
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="r5" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="r5">Card Payment</Label>
      <p className="text-grey-700 dark:text-grey-200 text-sm">Pay with your credit card.</p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="paypal" id="r6" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="r6">PayPal</Label>
      <p className="text-grey-700 dark:text-grey-200 text-sm">Pay with your PayPal account.</p>
    </div>
  </div>
</RadioGroup>`;
