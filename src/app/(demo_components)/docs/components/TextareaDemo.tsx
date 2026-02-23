'use client';

import { Label } from 'investtech/external-components';
import { Textarea } from 'investtech/external-components';

export const textareaExampleCode = `import { Textarea } from "@/components/external-components/textarea"
import { Label } from "@/components/external-components/label"

export function TextareaExample() {
  return (
    <div className="space-y-4">
      {/* Default Size */}
      <Textarea placeholder="Type your message here." />

      {/* Small Size */}
      <Textarea placeholder="Small textarea" className="min-h-[80px]" />

      {/* Medium Size */}
      <Textarea placeholder="Medium textarea" className="min-h-[120px]" />

      {/* Large Size */}
      <Textarea placeholder="Large textarea" className="min-h-[200px]" />

      {/* Disabled State */}
      <Textarea placeholder="Disabled textarea" disabled />

      {/* With Label */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
    </div>
  )
}`;

export function TextareaDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Size</h4>
        <Textarea placeholder="Type your message here." />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Size</h4>
        <Textarea placeholder="Small textarea" className="min-h-[80px]" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Medium Size</h4>
        <Textarea placeholder="Medium textarea" className="min-h-[120px]" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Size</h4>
        <Textarea placeholder="Large textarea" className="min-h-[200px]" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Disabled State</h4>
        <Textarea placeholder="Disabled textarea" disabled />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Label</h4>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </div>
    </div>
  );
}
