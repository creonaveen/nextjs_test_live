'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'investtech/external-components';
import {
  Calendar,
  Search,
  Settings,
  LayoutDashboard,
  User,
  BarChart,
  FileText,
  Calculator,
  StickyNote,
  CheckSquare,
  Timer,
  LucideIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  group: string;
}

const commands: CommandItem[] = [
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'View your schedule',
    icon: Calendar,
    group: 'Suggestions',
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Find anything',
    icon: Search,
    group: 'Suggestions',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure app',
    icon: Settings,
    group: 'Suggestions',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview',
    icon: LayoutDashboard,
    group: 'Navigation',
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Your account',
    icon: User,
    group: 'Navigation',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View statistics',
    icon: BarChart,
    group: 'Navigation',
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Generate reports',
    icon: FileText,
    group: 'Navigation',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'Quick calculations',
    icon: Calculator,
    group: 'Tools',
  },
  {
    id: 'notes',
    title: 'Notes',
    description: 'Take notes',
    icon: StickyNote,
    group: 'Tools',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    description: 'Manage tasks',
    icon: CheckSquare,
    group: 'Tools',
  },
  {
    id: 'timer',
    title: 'Timer',
    description: 'Track time',
    icon: Timer,
    group: 'Tools',
  },
];

/**
 * Demo component for the Command palette.
 * Shows a searchable command interface with grouped items.
 *
 * @returns A demo of the Command component
 */
export function CommandDemo() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [open]);

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase();
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.group.toLowerCase().includes(searchLower)
    );
  });

  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.group]) {
        acc[command.group] = [];
      }
      acc[command.group].push(command);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Type a command or search..."
          onFocus={() => setOpen(true)}
          value={search}
          onValueChange={setSearch}
          aria-label="Search commands"
        />
        {open && (
          <CommandList className="bg-popover text-popover-foreground animate-in fade-in-80 absolute top-full left-0 mt-1 w-full rounded-md border shadow-md">
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(groupedCommands).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      setOpen(false);
                      setSearch('');
                      // Handle command selection here
                      console.log('Selected command:', item);
                    }}
                    className="hover:bg-primary-background flex cursor-pointer items-center px-4 py-2 transition-colors hover:text-black dark:hover:text-white"
                    aria-label={`${item.title}: ${item.description}`}
                  >
                    <item.icon className="text-primary mr-3 h-5 w-5" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-grey-700 dark:text-grey-200 text-sm">
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}

export const commandExampleCode = `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/external-components/command"
import { useState, useEffect } from "react"
import { Calendar, Search, Settings, LayoutDashboard, User, BarChart, FileText, Calculator, StickyNote, CheckSquare, Timer, LucideIcon } from "lucide-react"

interface CommandItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  group: string
}

const commands: CommandItem[] = [
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'View your schedule',
    icon: Calendar,
    group: 'Suggestions'
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Find anything',
    icon: Search,
    group: 'Suggestions'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure app',
    icon: Settings,
    group: 'Suggestions'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview',
    icon: LayoutDashboard,
    group: 'Navigation'
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Your account',
    icon: User,
    group: 'Navigation'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View statistics',
    icon: BarChart,
    group: 'Navigation'
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Generate reports',
    icon: FileText,
    group: 'Navigation'
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'Quick calculations',
    icon: Calculator,
    group: 'Tools'
  },
  {
    id: 'notes',
    title: 'Notes',
    description: 'Take notes',
    icon: StickyNote,
    group: 'Tools'
  },
  {
    id: 'tasks',
    title: 'Tasks',
    description: 'Manage tasks',
    icon: CheckSquare,
    group: 'Tools'
  },
  {
    id: 'timer',
    title: 'Timer',
    description: 'Track time',
    icon: Timer,
    group: 'Tools'
  }
]

export function CommandDemo() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Close when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [open])

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.group.toLowerCase().includes(searchLower)
    )
  })

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.group]) {
      acc[command.group] = []
    }
    acc[command.group].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Type a command or search..." 
          onFocus={() => setOpen(true)}
          value={search}
          onValueChange={setSearch}
          aria-label="Search commands"
        />
        {open && (
          <CommandList className="absolute top-full left-0 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(groupedCommands).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      setOpen(false)
                      setSearch('')
                      // Handle command selection here
                      console.log('Selected command:', item)
                    }}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-accent-1 hover:text-black dark:hover:text-white transition-colors"
                    aria-label={\`\${item.title}: \${item.description}\`}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-primary" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-grey-700 dark:text-grey-200">{item.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  )
}`;
