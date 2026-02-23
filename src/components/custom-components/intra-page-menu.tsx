'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { usePlatform } from '@/lib/platform';

/**
 * Section definition for table of contents
 */
export interface Section {
  /** Optional unique identifier for the section */
  id?: string | number;
  /** Display title of the section */
  title: string;
}

/**
 * Context type for table of contents functionality
 */
interface TableOfContentsContextType {
  /** Register a section element with its ref */
  registerSection: (sectionId: string, ref: HTMLDivElement | null) => void;
  /** Currently active section ID */
  activeSection: string | null;
  /** Scroll to a specific section */
  scrollToSection: (sectionId: string) => void;
  /** Set active section immediately (used during scroll) */
  setActiveNow: (sectionId: string) => void;
}

const TableOfContentsContext = createContext<TableOfContentsContextType | null>(null);

// Helper function to suppress updates until scroll stops
function suppressUntilScrollStops(
  suppressUpdatesUntilRef: React.MutableRefObject<number>,
  timeout = 1500
) {
  suppressUpdatesUntilRef.current = Date.now() + timeout;

  let lastScrollY = window.scrollY;
  let checks = 0;

  const interval = setInterval(() => {
    if (window.scrollY === lastScrollY) {
      checks++;

      // require 2 consecutive stable checks to confirm scroll has stopped
      if (checks >= 2) {
        suppressUpdatesUntilRef.current = Date.now() + 200; // tiny buffer
        clearInterval(interval);
      }
    } else {
      checks = 0;
      lastScrollY = window.scrollY;
      suppressUpdatesUntilRef.current = Date.now() + timeout;
    }
  }, 150);
}

// Helper function to compute active section from scroll position
function computeActiveSectionFromScroll(params: {
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  computeOffsetFor: (sectionId?: string) => number;
  activeSectionRef: React.MutableRefObject<string | null>;
  setActiveSection: (sectionId: string | null) => void;
  NEAR_TOP_THRESHOLD_PX: number;
}) {
  const {
    sectionRefs,
    computeOffsetFor,
    activeSectionRef,
    setActiveSection,
    NEAR_TOP_THRESHOLD_PX,
  } = params;

  const entries = Object.entries(sectionRefs.current).filter(([, el]) => Boolean(el)) as [
    string,
    HTMLDivElement,
  ][];

  if (!entries.length) return;

  const positioned = entries.map(([id, el]) => {
    const headerOffset = computeOffsetFor(id);
    const top = el!.getBoundingClientRect().top - headerOffset;
    const normalizedTop = Math.abs(top) <= NEAR_TOP_THRESHOLD_PX ? 0 : top;
    return { id, top: normalizedTop };
  });

  const above = positioned.filter((p) => p.top <= 0).sort((a, b) => b.top - a.top);
  const below = positioned.filter((p) => p.top > 0).sort((a, b) => a.top - b.top);

  const candidate = above[0] || below[0];
  if (candidate && activeSectionRef.current !== candidate.id) {
    activeSectionRef.current = candidate.id;
    setActiveSection(candidate.id);
  }
}

/**
 * Hook to access table of contents context
 * @throws Error if used outside TableOfContentsProvider
 */
export function useTableOfContentsContext() {
  const context = useContext(TableOfContentsContext);
  if (!context) {
    throw new Error('useTableOfContentsContext must be used within TableOfContentsProvider');
  }
  return context;
}

/**
 * Props for TableOfContentsProvider
 */
interface TableOfContentsProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Array of sections to track */
  sections: Section[];
}

function createScrollHandler(params: {
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  computeOffsetFor: (sectionId?: string) => number;
  activeSectionRef: React.MutableRefObject<string | null>;
  setActiveSection: (sectionId: string | null) => void;
  suppressUpdatesUntilRef: React.MutableRefObject<number>;
}) {
  const {
    sectionRefs,
    computeOffsetFor,
    activeSectionRef,
    setActiveSection,
    suppressUpdatesUntilRef,
  } = params;
  const NEAR_TOP_THRESHOLD_PX = 16;
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        if (Date.now() >= suppressUpdatesUntilRef.current) {
          computeActiveSectionFromScroll({
            sectionRefs,
            computeOffsetFor,
            activeSectionRef,
            setActiveSection,
            NEAR_TOP_THRESHOLD_PX,
          });
        }
        ticking = false;
      });
    }
  };
}

// Hook for managing scroll event listeners
function useScrollListeners({
  sections,
  platform,
  sectionRefs,
  setActiveSection,
  suppressUpdatesUntilRef,
  activeSectionRef,
  computeOffsetFor,
}: {
  sections: Section[];
  platform: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  setActiveSection: (sectionId: string | null) => void;
  suppressUpdatesUntilRef: React.MutableRefObject<number>;
  activeSectionRef: React.MutableRefObject<string | null>;
  computeOffsetFor: (sectionId?: string) => number;
}) {
  useEffect(() => {
    const onScroll = createScrollHandler({
      sectionRefs,
      computeOffsetFor,
      activeSectionRef,
      setActiveSection,
      suppressUpdatesUntilRef,
    });

    if (Date.now() >= suppressUpdatesUntilRef.current) {
      onScroll();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [
    sections.length,
    platform,
    computeOffsetFor,
    sectionRefs,
    setActiveSection,
    activeSectionRef,
    suppressUpdatesUntilRef,
  ]);
}

// Hook: scroll observation and active section tracking
function useScrollObservation(
  sections: Section[],
  platform: string,
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>,
  setActiveSection: (sectionId: string | null) => void
) {
  const suppressUpdatesUntilRef = useRef<number>(0);
  const activeSectionRef = useRef<string | null>(null);

  const computeOffsetFor = useCallback(
    (sectionId?: string) => {
      if (platform === 'tablet') return 70;
      if (sectionId === 'section-0') return 300;
      return 10;
    },
    [platform]
  );

  useScrollListeners({
    sections,
    platform,
    sectionRefs,
    setActiveSection,
    suppressUpdatesUntilRef,
    activeSectionRef,
    computeOffsetFor,
  });

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const target = sectionRefs.current[sectionId];
      if (!target) return;

      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);

      const rect = target.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const headerOffset = computeOffsetFor(sectionId);
      const targetTop = Math.max(absoluteTop - headerOffset, 0);

      suppressUntilScrollStops(suppressUpdatesUntilRef);
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    },
    [computeOffsetFor, sectionRefs, setActiveSection]
  );

  const setActiveNow = useCallback(
    (sectionId: string) => {
      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);
      suppressUntilScrollStops(suppressUpdatesUntilRef);
    },
    [setActiveSection]
  );

  return { scrollToSection, setActiveNow };
}

/**
 * TableOfContentsProvider - Context provider for table of contents functionality
 *
 * Manages section registration, active section tracking, and scroll behavior.
 * Uses IntersectionObserver and scroll position to determine active section.
 */
export function TableOfContentsProvider({ children, sections }: TableOfContentsProviderProps) {
  const platform = usePlatform();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const registerSection = useCallback((sectionId: string, ref: HTMLDivElement | null) => {
    sectionRefs.current[sectionId] = ref ?? null;
  }, []);

  const { scrollToSection, setActiveNow } = useScrollObservation(
    sections,
    platform,
    sectionRefs,
    setActiveSection
  );

  useEffect(() => {
    if (sections?.length > 0) {
      const firstSectionId = 'section-0';
      setActiveSection(firstSectionId);
    }
  }, [sections.length]);

  const value: TableOfContentsContextType = {
    registerSection,
    activeSection,
    scrollToSection,
    setActiveNow,
  };

  return (
    <TableOfContentsContext.Provider value={value}>{children}</TableOfContentsContext.Provider>
  );
}
