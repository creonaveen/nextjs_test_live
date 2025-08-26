'use client';

import { Button } from '@/components/ui/button';

export function ButtonDemo() {
  return (
    <div className="space-y-8">
      {/* Default variant with sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* Secondary variant with sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="secondary" size="sm">
          Small
        </Button>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" size="lg">
          Large
        </Button>
      </div>

      {/* Destructive variant with sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="destructive" size="sm">
          Small
        </Button>
        <Button variant="destructive">Default</Button>
        <Button variant="destructive" size="lg">
          Large
        </Button>
      </div>

      {/* Outline variant with sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline">Default</Button>
        <Button variant="outline" size="lg">
          Large
        </Button>
      </div>

      {/* Ghost variant with sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="ghost" size="sm">
          Small
        </Button>
        <Button variant="ghost">Default</Button>
        <Button variant="ghost" size="lg">
          Large
        </Button>
      </div>

      {/* Link variant with sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="link" size="sm">
          Small
        </Button>
        <Button variant="link">Default</Button>
        <Button variant="link" size="lg">
          Large
        </Button>
      </div>
    </div>
  );
}

export const buttonExampleCode = `import { Button } from "@/components/ui/button"

// Default variant with sizes
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>

// Secondary variant with sizes
<Button variant="secondary" size="sm">Small</Button>
<Button variant="secondary">Default</Button>
<Button variant="secondary" size="lg">Large</Button>

// Destructive variant with sizes
<Button variant="destructive" size="sm">Small</Button>
<Button variant="destructive">Default</Button>
<Button variant="destructive" size="lg">Large</Button>

// Outline variant with sizes
<Button variant="outline" size="sm">Small</Button>
<Button variant="outline">Default</Button>
<Button variant="outline" size="lg">Large</Button>

// Ghost variant with sizes
<Button variant="ghost" size="sm">Small</Button>
<Button variant="ghost">Default</Button>
<Button variant="ghost" size="lg">Large</Button>

// Link variant with sizes
<Button variant="link" size="sm">Small</Button>
<Button variant="link">Default</Button>
<Button variant="link" size="lg">Large</Button>`;
