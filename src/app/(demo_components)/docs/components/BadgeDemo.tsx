import { Badge } from 'investtech/external-components';
import { Check, X } from 'lucide-react';

function BasicVariants() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Basic Variants</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="inverted">Inverted</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="warning">Warning</Badge>
      </div>
    </div>
  );
}

function BadgesWithIcons() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">With Icons</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="gap-1">
          <Check className="h-3 w-3" />
          Active
        </Badge>
        <Badge variant="error" className="gap-1">
          <X className="h-3 w-3" />
          Inactive
        </Badge>
        <Badge variant="inverted" className="gap-1">
          <Check className="h-3 w-3" />
          Verified
        </Badge>
      </div>
    </div>
  );
}

function CustomColors() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Custom Colors</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-blue-500 hover:bg-blue-600">Blue</Badge>
        <Badge className="bg-green-500 hover:bg-green-600">Green</Badge>
        <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
        <Badge className="bg-yellow-500 hover:bg-yellow-600">Yellow</Badge>
      </div>
    </div>
  );
}

function StatusBadges() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Status Badges</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
        <Badge className="bg-yellow-500 hover:bg-yellow-600">Away</Badge>
        <Badge className="bg-red-500 hover:bg-red-600">Offline</Badge>
        <Badge className="bg-gray-500 hover:bg-gray-600">Busy</Badge>
      </div>
    </div>
  );
}

function InteractiveBadges() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Interactive Badges</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="hover:bg-primary/80 cursor-pointer">Clickable</Badge>
        <Badge variant="inverted" className="hover:bg-secondary/80 cursor-pointer">
          Interactive
        </Badge>
        <Badge variant="primary" className="hover:bg-primary/10 cursor-pointer">
          Hover Me
        </Badge>
      </div>
    </div>
  );
}

function BadgesWithCount() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">With Count</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>5</Badge>
        <Badge variant="success">12</Badge>
        <Badge variant="error">3</Badge>
        <Badge variant="warning">99+</Badge>
      </div>
    </div>
  );
}

export function BadgeDemo() {
  return (
    <div className="space-y-8">
      <BasicVariants />
      <BadgesWithIcons />
      <CustomColors />
      <StatusBadges />
      <InteractiveBadges />
      <BadgesWithCount />
    </div>
  );
}

export const badgeExampleCode = `import { Badge } from "@/components/external-components/badge"
import { Check, X } from "lucide-react"

// Basic Variants
<div className="flex flex-wrap items-center gap-2">
  <Badge>Default</Badge>
  <Badge variant="inverted">Secondary</Badge>
  <Badge variant="error">Destructive</Badge>
  <Badge variant="warning">Outline</Badge>
</div>

// With Icons
<div className="flex flex-wrap items-center gap-2">
  <Badge className="gap-1">
    <Check className="h-3 w-3" />
    Active
  </Badge>
  <Badge variant="error" className="gap-1">
    <X className="h-3 w-3" />
    Inactive
  </Badge>
  <Badge variant="inverted" className="gap-1">
    <Check className="h-3 w-3" />
    Verified
  </Badge>
</div>

// Custom Colors
<div className="flex flex-wrap items-center gap-2">
  <Badge className="bg-blue-500 hover:bg-blue-600">Blue</Badge>
  <Badge className="bg-green-500 hover:bg-green-600">Green</Badge>
  <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
  <Badge className="bg-yellow-500 hover:bg-yellow-600">Yellow</Badge>
</div>`;
