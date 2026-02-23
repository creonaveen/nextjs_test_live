'use client';

import { Button } from 'investtech/external-components';
import { useEffect, useRef } from 'react';

import type { Section } from './intra-page-menu';
import { useTableOfContentsContext } from './intra-page-menu';

/**
 * Props for TableOfContents component
 */
interface TableOfContentsProps {
  /** Array of sections to display */
  sections: Section[];
  /** Additional CSS classes */
  className?: string;
  /** Title to display above the table of contents */
  title?: string;
  /** Callback executed before scrolling to a section */
  beforeScroll?: () => void | Promise<void>;
}

// Hook for managing navigation scroll behavior
function useNavigationScroll(
  activeSection: string | null,
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
) {
  useEffect(() => {
    if (activeSection && itemRefs.current[activeSection]) {
      try {
        itemRefs.current[activeSection]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      } catch (err) {
        console.debug('Failed to scroll nav item into view:', err);
      }
    }
  }, [activeSection, itemRefs]);
}

function createSectionClickHandler(
  sectionId: string,
  setActiveNow: (sectionId: string) => void,
  scrollToSection: (sectionId: string) => void,
  beforeScroll?: () => void | Promise<void>
) {
  return () => {
    setActiveNow(sectionId);
    if (beforeScroll) {
      Promise.resolve(beforeScroll())
        .then(() => scrollToSection(sectionId))
        .catch((err: unknown) => {
          console.debug('Error in beforeScroll:', err);
          scrollToSection(sectionId);
        });
    } else {
      scrollToSection(sectionId);
    }
  };
}

// Section item component
function SectionItem({
  section,
  index,
  sectionId,
  isActive,
  itemRefs,
  setActiveNow,
  onClick,
  showDivider,
}: {
  section: Section;
  index: number;
  sectionId: string;
  isActive: boolean;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  setActiveNow: (sectionId: string) => void;
  onClick: () => void;
  showDivider: boolean;
}) {
  return (
    <div
      key={sectionId}
      ref={(el) => {
        itemRefs.current[sectionId] = el;
      }}
      className="relative"
      id={`section-${index + 1}`}
    >
      <Button
        id={`section-${index + 1}`}
        onMouseDown={() => setActiveNow(sectionId)}
        onClick={onClick}
        variant="sectionLink"
        size="section"
        className={`relative w-full cursor-pointer justify-start text-left whitespace-normal ${
          isActive ? 'text-primary font-semibold' : 'hover:text-foreground hover:bg-background'
        }`}
        aria-label={`Navigate to ${section.title}`}
        aria-current={isActive ? 'location' : undefined}
      >
        {isActive && (
          <span className="bg-primary absolute top-1/2 left-0 h-[70%] w-[3px] -translate-y-1/2 rounded-full" />
        )}
        <span className="break-words">{section.title}</span>
      </Button>
      {showDivider && <div className="bg-divider mx-3 my-1 h-px" />}
    </div>
  );
}

/**
 * TableOfContents - Navigation component for page sections
 *
 * Displays a sticky table of contents with active section highlighting.
 * Automatically scrolls to show the active section in the navigation.
 */
function renderSections(params: {
  sections: Section[];
  activeSection: string | null;
  scrollToSection: (sectionId: string) => void;
  setActiveNow: (sectionId: string) => void;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  beforeScroll?: () => void | Promise<void>;
}) {
  const { sections, activeSection, scrollToSection, setActiveNow, itemRefs, beforeScroll } = params;

  return sections?.map((section, index) => {
    const sectionId = `section-${index}`;
    const isActive = activeSection === sectionId;
    const onClick = createSectionClickHandler(
      sectionId,
      setActiveNow,
      scrollToSection,
      beforeScroll
    );

    return (
      <SectionItem
        key={sectionId}
        section={section}
        index={index}
        sectionId={sectionId}
        isActive={isActive}
        itemRefs={itemRefs}
        setActiveNow={setActiveNow}
        onClick={onClick}
        showDivider={index < sections.length - 1}
      />
    );
  });
}

export default function TableOfContents({
  sections,
  className,
  title,
  beforeScroll,
}: TableOfContentsProps) {
  const { activeSection, scrollToSection, setActiveNow } = useTableOfContentsContext();
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useNavigationScroll(activeSection, itemRefs);

  return (
    <nav
      className={`tooltip-content-scrollbar-hide sticky top-20 shrink-0 overflow-y-auto md:max-h-[55vh] md:w-56 lg:max-h-[70vh] lg:w-64 ${className || ''}`}
      aria-label={title || 'Table of contents'}
      id="table-of-contents-container"
    >
      <div
        className="bg-card rounded-lg border-none shadow-sm md:p-4 lg:p-5"
        id="table-of-contents"
      >
        <h2 className="text-foreground mb-4 hidden text-lg font-semibold uppercase md:block">
          {title}
        </h2>
        <nav className="space-y-1">
          {renderSections({
            sections,
            activeSection,
            scrollToSection,
            setActiveNow,
            itemRefs,
            beforeScroll,
          })}
        </nav>
      </div>
    </nav>
  );
}
