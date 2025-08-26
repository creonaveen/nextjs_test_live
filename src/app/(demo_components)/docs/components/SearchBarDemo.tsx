import { Search } from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';

export function SearchBarDemo() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
      <Input placeholder="Search..." className="pl-8" />
    </div>
  );
}

export const searchBarExampleCode = `import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-8"
      />
    </div>
  )
}`;
