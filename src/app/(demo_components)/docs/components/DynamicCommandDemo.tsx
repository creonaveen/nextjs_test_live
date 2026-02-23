'use client';

import { Check } from 'lucide-react';
import React from 'react';

import { Badge } from 'investtech/external-components';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'investtech/external-components';

// Sample data - in real app, this could come from an API
const frameworks = [
  {
    id: 'next.js',
    name: 'Next.js',
    description: 'The React framework for production',
    category: 'Framework',
  },
  {
    id: 'react',
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    category: 'Library',
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    category: 'Framework',
  },
  {
    id: 'angular',
    name: 'Angular',
    description: 'Platform for building mobile & desktop web applications',
    category: 'Framework',
  },
  {
    id: 'svelte',
    name: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    category: 'Framework',
  },
];

export function DynamicCommandDemo() {
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);

  // Filter frameworks based on search
  const filteredFrameworks = frameworks.filter(
    (framework) =>
      framework.name.toLowerCase().includes(search.toLowerCase()) ||
      framework.description.toLowerCase().includes(search.toLowerCase())
  );

  // Group frameworks by category
  const groupedFrameworks = filteredFrameworks.reduce(
    (acc, framework) => {
      if (!acc[framework.category]) {
        acc[framework.category] = [];
      }
      acc[framework.category].push(framework);
      return acc;
    },
    {} as Record<string, typeof frameworks>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selected.map((id) => {
          const framework = frameworks.find((f) => f.id === id);
          return (
            <Badge key={id} variant="primary" className="flex items-center gap-1">
              {framework?.name}
              <button
                onClick={() => setSelected(selected.filter((s) => s !== id))}
                className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className="sr-only">Remove {framework?.name}</span>×
              </button>
            </Badge>
          );
        })}
      </div>

      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search frameworks..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>No frameworks found.</CommandEmpty>
          {Object.entries(groupedFrameworks).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.id}
                  onSelect={() => {
                    setSelected((prev) =>
                      prev.includes(framework.id)
                        ? prev.filter((id) => id !== framework.id)
                        : [...prev, framework.id]
                    );
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${selected.includes(framework.id) ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <div className="flex flex-col">
                    <span>{framework.name}</span>
                    <span className="text-grey-700 dark:text-grey-200 text-sm">
                      {framework.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
