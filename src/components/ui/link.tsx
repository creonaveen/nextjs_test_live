'use client';
import NextLink from 'next/link';
interface EnhancedLinkProps extends React.ComponentProps<typeof NextLink> {
  href: string;
  children: React.ReactNode;
}
export const Link = ({ href, children, ...props }: EnhancedLinkProps) => {
  const processedHref = href.replace('/', '');
  return (
    <NextLink prefetch={true} href={processedHref} {...props}>
      {children}
    </NextLink>
  );
};

Link.displayName = 'Link';
