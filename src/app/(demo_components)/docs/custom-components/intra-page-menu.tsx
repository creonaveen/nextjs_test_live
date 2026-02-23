'use client';

import TableOfContents from '@/components/custom-components/table-of-contents';
import {
  TableOfContentsProvider,
  useTableOfContentsContext,
} from '@/components/custom-components/intra-page-menu';

// Sample sections for demo
const sampleSections = [
  { id: 'section-0', title: 'Introduction' },
  { id: 'section-1', title: 'Getting Started' },
  { id: 'section-2', title: 'Components' },
  { id: 'section-3', title: 'API Reference' },
  { id: 'section-4', title: 'Examples' },
  { id: 'section-5', title: 'Best Practices' },
  { id: 'section-6', title: 'Troubleshooting' },
  { id: 'section-7', title: 'FAQ' },
];

// Component to register sections with refs
function SectionContent({ sections }: { sections: typeof sampleSections }) {
  const { registerSection } = useTableOfContentsContext();

  return (
    <div className="space-y-32">
      {sections.map((section, index) => {
        const sectionId = `section-${index}`;
        return (
          <div
            key={sectionId}
            ref={(el) => registerSection(sectionId, el)}
            id={sectionId}
            className="min-h-[400px] rounded-lg border p-8"
          >
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            <p className="text-muted-foreground">
              This is the content for {section.title}. Scroll down to see the table of contents
              highlight the active section. Click on any item in the table of contents to navigate
              to that section.
            </p>
            <div className="mt-4 space-y-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * TableOfContents Demo
 * Shows the intra-page menu component with sections
 */
export function IntraPageMenuDemo() {
  return (
    <div className="flex gap-8">
      <TableOfContentsProvider sections={sampleSections}>
        <div className="flex-1">
          <SectionContent sections={sampleSections} />
        </div>
        <TableOfContents sections={sampleSections} title="Table of Contents" />
      </TableOfContentsProvider>
    </div>
  );
}

export const intraPageMenuCode = `'use client';

import TableOfContents, {
  TableOfContentsProvider,
  useTableOfContentsContext,
} from '@/components/custom-components/intra-page-menu';

// Define your sections
const sections = [
  { id: 'section-0', title: 'Introduction' },
  { id: 'section-1', title: 'Getting Started' },
  { id: 'section-2', title: 'Components' },
  // ... more sections
];

// Component to register sections with refs
function SectionContent({ sections }: { sections: typeof sections }) {
  const { registerSection } = useTableOfContentsContext();

  return (
    <div className="space-y-32">
      {sections.map((section, index) => {
        const sectionId = \`section-\${index}\`;
        return (
          <div
            key={sectionId}
            ref={(el) => registerSection(sectionId, el)}
            id={sectionId}
            className="min-h-[400px] rounded-lg border p-8"
          >
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            {/* Your section content */}
          </div>
        );
      })}
    </div>
  );
}

// Usage
export function MyPage() {
  return (
    <TableOfContentsProvider sections={sections}>
      <div className="flex gap-8">
        <div className="flex-1">
          <SectionContent sections={sections} />
        </div>
        <TableOfContents sections={sections} title="Table of Contents" />
      </div>
    </TableOfContentsProvider>
  );
}`;
