'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InputDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Size</h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Size</h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="small">Small Input</Label>
          <Input type="text" id="small" placeholder="Small input" className="h-8" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Size</h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="large">Large Input</Label>
          <Input type="text" id="large" placeholder="Large input" className="h-12" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Icon</h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Input type="search" id="search" placeholder="Search..." className="pl-8" />
            <span className="text-muted-foreground absolute top-2.5 left-2">🔍</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Disabled State</h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="disabled">Disabled Input</Label>
          <Input type="text" id="disabled" placeholder="Disabled input" disabled />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Error</h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="error">Error Input</Label>
          <Input type="text" id="error" placeholder="Error input" className="border-red-500" />
          <p className="text-sm text-red-500">This field is required</p>
        </div>
      </div>
    </div>
  );
}
export const inputExampleCode = `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Default input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>

// Small input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="small">Small Input</Label>
  <Input type="text" id="small" placeholder="Small input" className="h-8" />
</div>

// Large input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="large">Large Input</Label>
  <Input type="text" id="large" placeholder="Large input" className="h-12" />
</div>

// With icon
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="search">Search</Label>
  <div className="relative">
    <Input type="search" id="search" placeholder="Search..." className="pl-8" />
    <span className="text-muted-foreground absolute top-2.5 left-2">🔍</span>
  </div>
</div>

// Disabled state
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled">Disabled Input</Label>
  <Input type="text" id="disabled" placeholder="Disabled input" disabled />
</div>

// With error
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="error">Error Input</Label>
  <Input type="text" id="error" placeholder="Error input" className="border-red-500" />
  <p className="text-sm text-red-500">This field is required</p>
</div>`;
