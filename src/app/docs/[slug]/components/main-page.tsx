'use client';

import { Card, CardContent, CardHeader } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import AuthorInfoBlock from '@/components/custom-components/author-info-block';
import {
  TableOfContentsProvider,
  useTableOfContentsContext,
} from '@/components/custom-components/intra-page-menu';
import TableOfContents from '@/components/custom-components/table-of-contents';
import RelatedPosts from '@/components/custom-components/related-posts';
import { usePlatform } from '@/lib/platform';
import { Action, ResearchPage, ResearchPageSection } from '@/lib/types/research-page';

import MobileIndexButton from './mobile-index-button';
import { renderBlock, renderActions } from './render-component';

/* -------------------- HOOK -------------------- */

function useMobileMenuState() {
  const [hideIndexButton, setHideIndexButton] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setHideIndexButton(!!document.querySelector('.mobile-menu-overlay'));
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return hideIndexButton;
}

/* -------------------- SECTION CARD -------------------- */

function SectionCard({
  section,
  index,
  platform,
}: {
  section: ResearchPageSection;
  index: number;
  platform: string;
}) {
  return (
    <Card
      className="bg-primary-background dark:bg-card h-fit text-start lg:px-28 lg:py-28 xl:px-44"
      id={`research-page-section-${index + 1}`}
    >
      <CardHeader>
        <span
          className="font-headline text-grey-900 dark:text-grey-200 px-5 text-2xl font-semibold lg:px-0 lg:text-4xl"
          id={`research-page-section-title-${index + 1}`}
        >
          {section.title}
        </span>
      </CardHeader>

      <CardContent className="dark:text-grey-200 px-5 text-start text-black lg:px-0">
        {section.blocks?.map((block, i) => renderBlock(block, i, platform))}
        {renderActions((section as { actions?: Action[] }).actions)}
      </CardContent>
    </Card>
  );
}

/* -------------------- SECTIONS LIST -------------------- */

function SectionsList({ sections }: { sections: ResearchPageSection[] }) {
  const { registerSection } = useTableOfContentsContext();
  const platform = usePlatform();

  return (
    <>
      {sections.map((section, index) => {
        const id = `section-${index}`;

        return (
          <div
            key={section.id || index}
            ref={(e) => registerSection(id, e)}
            data-section-id={id}
            className={index !== 0 ? 'scroll-mt-32' : ''}
          >
            <SectionCard section={section} index={index} platform={platform} />
          </div>
        );
      })}
    </>
  );
}

/* -------------------- SIDEBAR -------------------- */

type MobileButtonConfig =
  | { type: 'menu'; sections: ResearchPageSection[] }
  | { type: 'related'; relatedPosts: ResearchPage['related_posts'] }
  | null;

function getMobileButtonConfig({
  showMenu,
  showRelated,
  hideIndexButton,
  sections,
  relatedPosts,
}: {
  showMenu: boolean;
  showRelated: boolean;
  hideIndexButton: boolean;
  sections: ResearchPageSection[];
  relatedPosts: ResearchPage['related_posts'];
}): MobileButtonConfig {
  if (hideIndexButton) return null;
  if (showMenu) return { type: 'menu', sections };
  if (showRelated) return { type: 'related', relatedPosts };
  return null;
}

function DesktopSidebar({
  showMenu,
  showRelated,
  sections,
  relatedPosts,
  t,
}: {
  showMenu: boolean;
  showRelated: boolean;
  sections: ResearchPageSection[];
  relatedPosts: ResearchPage['related_posts'];
  t: (key: string) => string;
}) {
  return (
    <>
      {showMenu && (
        <div className="hidden md:block">
          <TableOfContents sections={sections} title={t('index')} />
        </div>
      )}

      {showRelated && (
        <div className="hidden md:block">
          <RelatedPosts title={t('moreReports')} relatedPosts={relatedPosts} />
        </div>
      )}
    </>
  );
}

function MobileSidebarButton({
  mobileConfig,
}: {
  mobileConfig: ReturnType<typeof getMobileButtonConfig> | null;
}) {
  if (!mobileConfig) return null;

  let content: React.ReactNode = null;

  if (mobileConfig.type === 'menu') {
    content = <MobileIndexButton sections={mobileConfig.sections} />;
  }

  if (mobileConfig.type === 'related') {
    content = <MobileIndexButton relatedPosts={mobileConfig.relatedPosts} />;
  }

  if (!content) return null;

  return <div className="fixed right-6 bottom-5 z-50 md:hidden">{content}</div>;
}

function RightSidebar({
  data,
  hideIndexButton,
  t,
}: {
  data: ResearchPage;
  hideIndexButton: boolean;
  t: (key: string) => string;
}) {
  const sections = data?.sections ?? [];
  const relatedPosts = data?.related_posts ?? [];
  const intraMenu = data?.intra_page_menu ?? [];

  const showMenu = intraMenu.length > 0;
  const showRelated = relatedPosts.length > 0;

  if (!showMenu && !showRelated) {
    return null;
  }

  const mobileConfig = getMobileButtonConfig({
    showMenu,
    showRelated,
    hideIndexButton,
    sections,
    relatedPosts,
  });

  return (
    <>
      <DesktopSidebar
        showMenu={showMenu}
        showRelated={showRelated}
        sections={sections}
        relatedPosts={relatedPosts}
        t={t}
      />

      <MobileSidebarButton mobileConfig={mobileConfig} />
    </>
  );
}

/* -------------------- MAIN CONTENT -------------------- */

function MainPageContent({ data }: { data: ResearchPage }) {
  const t = useTranslations('common');
  const hideIndexButton = useMobileMenuState();
  const sections = useMemo(() => data?.sections ?? [], [data?.sections]);

  if (!sections.length) return null;

  return (
    <div className="container mx-auto space-y-8 py-3">
      <div className="flex gap-4 lg:gap-8">
        <div className="flex-1 space-y-6 overflow-y-auto rounded-lg">
          <SectionsList sections={sections} />
        </div>

        <RightSidebar data={data} hideIndexButton={hideIndexButton} t={t} />
      </div>
    </div>
  );
}

/* -------------------- WRAPPER -------------------- */

export default function MainPage({ data }: { data: ResearchPage }) {
  const sections = data?.sections ?? [];

  return (
    <div className="container mx-auto">
      <TableOfContentsProvider sections={sections}>
        {data?.publication && (
          <AuthorInfoBlock
            authorImage={data.publication.author_image}
            authorTitle={data.publication.author_title}
            authorName={data.publication.author_name}
            publishedDate={data.publication.published_date}
            authorEmail={data.publication.author_email}
          />
        )}

        <MainPageContent data={data} />
      </TableOfContentsProvider>
    </div>
  );
}
