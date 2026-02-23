'use client';

import { Button } from 'investtech/external-components';
import { Link } from '@/components/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
  NavigationDropdownMenu,
  NavigationDropdownMenuTrigger,
  NavigationDropdownMenuContent,
  NavigationDropdownMenuItem,
  NavigationDropdownMenuSub,
  NavigationDropdownMenuSubTrigger,
  NavigationDropdownMenuSubContent,
} from '@/components/custom-components/navigation-dropdown/navigation-dropdown'; // use your hover-enabled menu

import { useNavSections } from './navbar-menu';

// Types
export type NavNode = {
  title: string;
  href?: string;
  subItems?: NavNode[];
  description?: string;
};

function isNavNodeActive(node: NavNode, pathname: string): boolean {
  if (node.href) {
    let href = node.href;
    const normalizedPath = pathname.split('/').slice(2).join('/');
    if (normalizedPath.startsWith(href.replace(/^\//, ''))) {
      return true;
    }
  }

  // Recursively check children
  if (node.subItems) {
    return node.subItems.some((child) => isNavNodeActive(child, pathname));
  }
  return false;
}

// Recursive rendering of submenu items
function NavigationItems({ nodes, index }: { nodes: NavNode[]; index: number }) {
  return (
    <>
      {nodes.map((node) => (
        <NavigationItem key={`${node.title}-${node.href || 'no-href'}`} node={node} index={index} />
      ))}
    </>
  );
}

function NavigationItem({ node, index }: { node: NavNode; index: number }) {
  const hasChildren = !!node.subItems?.length;
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const isActive = isNavNodeActive(node, pathname);

  if (!hasChildren) {
    return (
      <NavigationDropdownMenuItem id={node.title} asChild>
        <Link
          href={node.href ?? '/'}
          className={`${isActive ? 'bg-primary-background dark:bg-primary dark:text-grey-900' : ''}`}
        >
          <span className="dark:hover:text-primary w-full rounded-md text-sm font-normal">
            {t(node.title)}
          </span>
        </Link>
      </NavigationDropdownMenuItem>
    );
  }

  return (
    <NavigationDropdownMenuSub>
      <NavigationDropdownMenuSubTrigger
        id={node.title}
        className={`justify-between text-sm font-normal ${isActive ? 'bg-primary-background dark:bg-primary dark:text-grey-900' : ''}`}
      >
        <span className="font-normal">{t(node.title)}</span>
      </NavigationDropdownMenuSubTrigger>
      <NavigationDropdownMenuSubContent className="text-foreground min-w-56">
        <NavigationItems nodes={node.subItems ?? []} index={index} />
      </NavigationDropdownMenuSubContent>
    </NavigationDropdownMenuSub>
  );
}

// NavSection component
function NavSection({ index, label, items }: { index: number; label: string; items: NavNode[] }) {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  // Check if any item in this section is active
  const isActive = items.some((item) => isNavNodeActive(item, pathname));

  return (
    <NavigationDropdownMenu>
      <NavigationDropdownMenuTrigger
        id={label}
        chevronClassName={`${isActive ? 'text-primary dark:text-primary' : ''}`}
        asChild
      >
        <Button
          variant="ghost"
          className={`text-grey-700 dark:text-grey-200 hover:text-primary-text-hover dark:hover:text-primary inline-flex items-center gap-3 px-0 py-2 text-xs font-medium no-underline ${isActive ? 'text-primary dark:text-primary' : ''}`}
        >
          {t(label)}
        </Button>
      </NavigationDropdownMenuTrigger>
      <NavigationDropdownMenuContent
        id={label}
        align="start"
        sideOffset={8}
        className="text-foreground md:w-[150px] lg:w-[170px]"
      >
        <NavigationItems nodes={items} index={index} />
      </NavigationDropdownMenuContent>
    </NavigationDropdownMenu>
  );
}

// Navbar component
export function Navbar() {
  const navSections = useNavSections();

  return (
    <nav id="navbar" className="flex items-center space-x-10">
      {navSections.map((section, index) => (
        <NavSection
          key={section.value}
          index={index + 1}
          label={section.label}
          items={section.items ?? []}
        />
      ))}
    </nav>
  );
}
