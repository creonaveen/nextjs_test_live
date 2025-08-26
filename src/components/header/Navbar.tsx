'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Link } from '@/components/ui/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import {
  marketComponents,
  myPagesComponents,
  recommendationsComponents,
  researchAndLearnComponents,
  stockPickingComponents,
} from './navbarMenu';

// Reusable NavSection component
function NavSection({ label, items }: { label: string; items: { title: string; href: string }[] }) {
  const params = useParams();
  const partner_slug = params.partner_slug as string;
  const t = useTranslations('navigation');

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-normal">{t(label)}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className={`grid gap-2 md:w-[150px] lg:w-[150px]`}>
          {items.map((item) => {
            let href = item.href;
            if (href.includes('[partner_slug]')) {
              href = href.replace('[partner_slug]', partner_slug);
            }
            return (
              <ListItem
                className="text-sm font-medium"
                key={t(item.title)}
                title={t(item.title)}
                href={href}
              />
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

// Navbar component using NavSection
export function Navbar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavSection label="myPages" items={myPagesComponents} />
        <NavSection label="market" items={marketComponents} />
        <NavSection label="recommendations" items={recommendationsComponents} />
        <NavSection label="stockPicking" items={stockPickingComponents} />
        <NavSection label="researchAndLearn" items={researchAndLearnComponents} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ListItem
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          {children && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
