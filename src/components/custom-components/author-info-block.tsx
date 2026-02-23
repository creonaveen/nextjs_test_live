'use client';

import { Card, CardContent } from 'investtech/external-components';
import Image from 'next/image';
import { Link } from '@/components/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { AuthorImage } from '@/lib/types/shared-components';

/**
 * Props for AuthorInfoBlock component
 */
interface AuthorInfoBlockProps {
  /** Whether the component is in loading state */
  isLoading?: boolean;
  /** Author image information */
  authorImage: AuthorImage;
  /** Author's full name */
  authorName: string;
  /** Author's job title */
  authorTitle: string;
  /** Publication date string */
  publishedDate: string;
  /** Author's email address */
  authorEmail: string;
}

/**
 * Loading state component
 */
function LoadingState() {
  const t = useTranslations('common');

  return (
    <Card className="bg-grey-100 dark:bg-card w-full rounded-xl py-0 shadow-none">
      <div className="flex flex-1 items-center justify-center gap-2 p-10">
        <div className="border-grey-400 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        <span className="text-sm font-medium">{t('loading')}...</span>
      </div>
    </Card>
  );
}

/**
 * Author info section component
 */
function AuthorInfoSection({
  authorImage,
  authorName,
  authorTitle,
}: Pick<AuthorInfoBlockProps, 'authorImage' | 'authorName' | 'authorTitle'>) {
  const t = useTranslations('common');

  return (
    <div className="col-span-1 flex flex-col items-start gap-4 md:flex-row md:items-center">
      <Image
        src={authorImage.src}
        alt={authorImage.alt}
        width={authorImage.width}
        height={authorImage.height}
        className="hidden h-12 w-12 rounded-full object-cover md:block"
        id="author-image"
      />
      <div className="flex flex-col gap-1">
        <span
          className="text-grey-700 dark:text-grey-300 text-[10px] font-medium uppercase"
          id="written-by"
        >
          {t('writtenBy')}
        </span>
        <span
          className="text-grey-900 text-xs font-semibold md:font-medium dark:text-white"
          id="author-name"
        >
          {authorName}
        </span>
        <span className="dark:text-grey-200 text-grey-700 text-xs font-normal" id="author-title">
          {authorTitle}
        </span>
      </div>
    </div>
  );
}

/**
 * Published date section component
 */
function PublishedDateSection({ publishedDate }: Pick<AuthorInfoBlockProps, 'publishedDate'>) {
  const t = useTranslations('common');

  return (
    <div className="col-span-1 flex flex-col items-end gap-1 text-right md:items-start md:text-left">
      <span className="dark:text-grey-200 text-grey-700 text-[10px] uppercase" id="published">
        {t('published')}
      </span>
      <span
        className="text-grey-900 text-xs font-semibold md:font-medium dark:text-white"
        id="published-date"
      >
        {publishedDate}
      </span>
    </div>
  );
}

/**
 * Contact section component
 */
function ContactSection({ authorEmail }: Pick<AuthorInfoBlockProps, 'authorEmail'>) {
  const t = useTranslations('common');

  return (
    <div className="col-span-2 flex flex-col items-start gap-1 md:col-span-1">
      <span
        className="dark:text-grey-200 text-grey-700 text-xs text-[10px] font-medium uppercase"
        id="contact"
      >
        {t('contact')}
      </span>
      <Link
        id="contact-link"
        href={`mailto:${authorEmail}`}
        className="text-primary text-xs font-medium underline"
      >
        {authorEmail}
      </Link>
    </div>
  );
}

/**
 * AuthorInfoBlock - Component displaying author information
 *
 * Displays author image, name, title, publication date, and contact email.
 * Shows loading state while data is being fetched.
 *
 * @example
 * ```tsx
 * <AuthorInfoBlock
 *   isLoading={false}
 *   authorImage={{ src: '/author.jpg', alt: 'Author', width: 48, height: 48 }}
 *   authorName="John Doe"
 *   authorTitle="Senior Analyst"
 *   publishedDate="2024-01-15"
 *   authorEmail="john@example.com"
 * />
 * ```
 */
const AuthorInfoBlock = React.memo(function AuthorInfoBlock({
  isLoading,
  authorImage,
  authorName,
  authorTitle,
  publishedDate,
  authorEmail,
}: AuthorInfoBlockProps) {
  return (
    <div id="author-info-block">
      {isLoading ? (
        <LoadingState />
      ) : (
        <Card
          className="bg-grey-100 dark:bg-card w-full rounded-xl py-0 shadow-none"
          id="author-info-block"
        >
          <CardContent className="grid grid-cols-2 gap-5 p-5 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
            <AuthorInfoSection
              authorImage={authorImage}
              authorName={authorName}
              authorTitle={authorTitle}
            />
            <PublishedDateSection publishedDate={publishedDate} />
            <ContactSection authorEmail={authorEmail} />
          </CardContent>
        </Card>
      )}
    </div>
  );
});

export default AuthorInfoBlock;
