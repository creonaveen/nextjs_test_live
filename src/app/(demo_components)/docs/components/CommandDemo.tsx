'use client';

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
import { useState, useRef, useEffect } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

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

export function CommandDemo() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="relative" ref={commandRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Type a command or search..."
          onFocus={() => setOpen(true)}
          value={search}
          onValueChange={setSearch}
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
                    }}
                    className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center px-4 py-2 transition-colors"
                  >
                    <item.icon className="text-primary mr-3 h-5 w-5" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-muted-foreground text-sm">{item.description}</span>
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
} from "@/components/ui/command"
import { useState, useRef, useEffect } from "react"
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
  const commandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
    <div className="relative" ref={commandRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Type a command or search..." 
          onFocus={() => setOpen(true)}
          value={search}
          onValueChange={setSearch}
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
                    }}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-primary" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-muted-foreground">{item.description}</span>
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
