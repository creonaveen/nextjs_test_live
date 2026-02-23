'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import { Toaster } from 'investtech/external-components';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import TableOfContents from '@/components/custom-components/table-of-contents';
import {
  TableOfContentsProvider,
  useTableOfContentsContext,
} from '@/components/custom-components/intra-page-menu';
import { CorrelationMatrix } from '@/components/custom-components/table-with-popover';

import { AccordionDemo, accordionExampleCode } from './components/AccordionDemo';
import { AlertDemo, alertExampleCode } from './components/AlertDemo';
import { AvatarDemo, avatarExampleCode } from './components/AvatarDemo';
import { BadgeDemo, badgeExampleCode } from './components/BadgeDemo';
import { BreadcrumbDemo, breadcrumbExampleCode } from './components/BreadcrumbDemo';
import { ButtonDemo, buttonExampleCode } from './components/ButtonDemo';
import { CardDemo, cardExampleCode } from './components/CardDemo';
import { CheckboxDemo, checkboxExampleCode } from './components/CheckboxDemo';
import { CodeExampleDialog } from './components/CodeExampleDialog';
import { ComboboxDemo, comboboxExampleCode } from './components/ComboboxDemo';
import { CommandDemo, commandExampleCode } from './components/CommandDemo';
import { DialogDemo, dialogExampleCode } from './components/DialogDemo';
import { DrawerDemo, drawerExampleCode } from './components/DrawerDemo';
import { DropdownMenuDemo, dropdownMenuExampleCode } from './components/DropdownMenuDemo';
import { HoverCardDemo, hoverCardExampleCode } from './components/HoverCardDemo';
import { InputDemo, inputExampleCode } from './components/InputDemo';
import { JsonExampleDialog } from './components/JsonExampleDialog';
import { MenubarDemo, menubarExampleCode } from './components/MenubarDemo';
import { ProgressBarDemo, progressBarExampleCode } from './components/ProgressBarDemo';
import { RadioGroupDemo, radioGroupExampleCode } from './components/RadioGroupDemo';
import { SearchBarDemo, searchBarExampleCode } from './components/SearchBarDemo';
import { SelectDemo, selectExampleCode } from './components/SelectDemo';
import { SheetDemo, sheetExampleCode } from './components/SheetDemo';
import { SkeletonDemo, skeletonExampleCode } from './components/SkeletonDemo';
import { SwitchDemo, switchExampleCode } from './components/SwitchDemo';
import { TextareaDemo, textareaExampleCode } from './components/TextareaDemo';
import { ToastDemo, toastExampleCode } from './components/ToastDemo';
import { TooltipDemo, tooltipExampleCode } from './components/TooltipDemo';
import { AlphabeticFilterDemo, alphabeticFilterCode } from './custom-components/alphabetic-filter';
import { DropdownMenuComponentDemo, dropdownMenuCode } from './custom-components/dropdown-menu';
import {
  FactorDiagramDemo,
  factorDiagramCode,
  factorDiagramJson,
} from './custom-components/factor-diagram';
import { IntraPageMenuDemo, intraPageMenuCode } from './custom-components/intra-page-menu';
import { PaginatorDemo, paginatorCode } from './custom-components/paginator';
import {
  ChartPieDonutDemo,
  pieDonutChartCode,
  pieDonutChartJson,
} from './custom-components/pie-donut-chart';
import {
  progressBarTooltipCode,
  ProgressBarTooltipDemo,
} from './custom-components/progress-bar-tooltip';
import { signalsSectionCode, signalsSectionJson } from './custom-components/signals-section';
import SpinnerDemo, { spinnerCode } from './custom-components/spinner';
import {
  BasicTableDemo,
  SortableTableDemo,
  TableWithLinksDemo,
  TableWithBadgesDemo,
  TableWithReturnDemo,
  TableWithActionsDemo,
  TableWithTooltipsDemo,
  TableSkeletonDemo,
  TableWithPaginationDemo,
  EmptyTableDemo,
  TableWithoutHeaderDemo,
  basicTableCode,
  sortableTableCode,
  tableWithLinksCode,
  tableWithBadgesCode,
  tableSkeletonCode,
  tableWithPaginationCode,
  tableWithActionsCode,
  emptyTableCode,
  tableWithoutHeaderCode,
  stocksTableJson,
  watchlistTableJson,
  top50TableJson,
  latestReportsTableJson,
  portfolioHoldingsTableJson,
  myNotesTableJson,
  tableWithoutHeaderJson,
  tableWithPaginationJson,
  allTableJsonExamples,
  ResearchTableDemo,
  researchTableCode,
  TableWithSingleHeaderDemo,
  tableWithSingleHeaderCode,
  researchTableJson,
  tableWithSingleHeaderJson,
} from './table/components/table';
import {
  correlationMatrixJson,
  tableWithPopoverCode,
} from './custom-components/table-with-popover';
import {
  TechAnalysisHeaderDemo,
  techAnalysisHeaderCode,
  techAnalysisHeaderJson,
} from './custom-components/tech-analysis-header';
import { formExampleCode } from './form-example';

const FormExample = dynamic(
  () => import('./form-example').then((mod) => ({ default: mod.FormExample })),
  { ssr: false }
);
import { Link } from '@/components/link';

// Define all component sections for table of contents
const componentSections = [
  { title: 'Progress Bar Tooltip' },
  { title: 'Progress Bar' },
  { title: 'Table with Popover' },
  { title: 'Chart Pie Donut' },
  { title: 'Factor Diagram' },
  { title: 'Tech Analysis Header' },
  { title: 'Signals Section' },
  { title: 'Basic Table' },
  { title: 'Sortable Table' },
  { title: 'Table with Links' },
  { title: 'Table with Badges' },
  { title: 'Portfolio Return Table' },
  { title: 'Table with Actions' },
  { title: 'Table with Tooltips' },
  { title: 'Table Skeleton' },
  { title: 'Table with Pagination' },
  { title: 'Empty Table State' },
  { title: 'Table without Header' },
  { title: 'Research Table' },
  { title: 'Table with single header' },
  { title: 'Search Bar' },
  { title: 'Button' },
  { title: 'Input' },
  { title: 'Textarea' },
  { title: 'Switch' },
  { title: 'Checkbox' },
  { title: 'Radio Group' },
  { title: 'Select' },
  { title: 'Alert' },
  { title: 'Alert Dialog' },
  { title: 'Breadcrumb' },
  { title: 'Avatar' },
  { title: 'Badge' },
  { title: 'Skeleton' },
  { title: 'Dialog' },
  { title: 'Drawer' },
  { title: 'Hover Card' },
  { title: 'Tooltip' },
  { title: 'Command' },
  { title: 'Card' },
  { title: 'Accordion' },
  { title: 'Menubar' },
  { title: 'Sheet' },
  { title: 'Aspect Ratio' },
  { title: 'Combobox' },
  { title: 'Dropdown Menu' },
  { title: 'Toast' },
  { title: 'Form' },
  { title: 'Alphabetic Filter' },
  { title: 'Paginator' },
  { title: 'Spinner' },
  { title: 'Custom Dropdown Menu' },
  { title: 'Intra Page Menu (Table of Contents)' },
];

/**
 * Component wrapper that adds section ref for table of contents
 */
function SectionWrapper({
  sectionIndex,
  children,
}: {
  sectionIndex: number;
  children: React.ReactNode;
}) {
  const { registerSection } = useTableOfContentsContext();
  const sectionId = `section-${sectionIndex}`;

  return (
    <div id={sectionId} ref={(el) => registerSection(sectionId, el)}>
      {children}
    </div>
  );
}

/**
 * Main components demo page.
 * Displays all available UI components with examples and code snippets.
 *
 * @returns The components demo page
 */
export default function ComponentsPage() {
  const cardClasses = 'p-5';
  let sectionIndex = 0;
  const firstSectionRef = React.useRef<HTMLDivElement>(null);

  // Scroll to first section on component mount to ensure "Basic Table" is active
  useEffect(() => {
    // Use setTimeout to ensure this runs after the TableOfContentsProvider has initialized
    const timer = setTimeout(() => {
      if (firstSectionRef.current) {
        firstSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableOfContentsProvider sections={componentSections}>
      <div className="container mx-auto py-6" ref={firstSectionRef}>
        <div className="mb-8">
          <Link
            href="/docs/table"
            className="text-primary hover:text-primary-text-hover font-medium underline"
          >
            Table
          </Link>
        </div>
        <header>
          <h1 className="mb-8 text-4xl font-bold">Components</h1>
          <p className="text-muted-foreground mb-8">
            Browse and test all available UI components with interactive examples and code snippets.
          </p>
        </header>

        <div className="flex gap-8">
          <main className="grid flex-1 gap-8" role="main" aria-label="Component examples">
            {/* Progress Bar Tooltip Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Progress Bar Tooltip</CardTitle>
                    <CodeExampleDialog
                      title="Progress Bar Tooltip Example"
                      description="Progress bar tooltip component with customizable indicator color."
                      code={progressBarTooltipCode}
                    />
                  </div>
                  <CardDescription>
                    Progress bar with tooltip that appears on hover.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressBarTooltipDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Progress Bar Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Progress Bar</CardTitle>
                    <CodeExampleDialog
                      title="Progress Bar Example"
                      description="Progress bar component with customizable indicator color."
                      code={progressBarExampleCode}
                    />
                  </div>
                  <CardDescription>
                    Simple progress bar component with customizable indicator color.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressBarDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Popover Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Table with Popover</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Table with Popover Example"
                      description="Table cells with interactive popover tooltips that work on both desktop (hover) and mobile (click)."
                      code={tableWithPopoverCode}
                    />
                  </div>
                  <CardDescription>
                    Interactive table cells with popover tooltips. Hover on desktop or click on
                    mobile/tablet to view additional information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CorrelationMatrix data={correlationMatrixJson.correlation_analysis} />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Chart Pie Donut Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Chart Pie Donut</CardTitle>
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Pie Donut Chart Example"
                        description="Here's how to use the Pie Donut Chart component in your code."
                        code={pieDonutChartCode}
                      />
                      <JsonExampleDialog
                        title="Pie Donut Chart JSON"
                        description="API response structure for pie donut chart."
                        json={JSON.stringify(pieDonutChartJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    A donut chart component that displays data in a circular pie format with a
                    hollow center. Features custom labels, tooltips, and category legends. Uses
                    Recharts library for rendering.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPieDonutDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Factor Diagram Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Factor Diagram</CardTitle>
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Factor Diagram Example"
                        description="Here's how to use the Factor Diagram component in your code."
                        code={factorDiagramCode}
                      />
                      <JsonExampleDialog
                        title="Factor Diagram JSON"
                        description="API response structure for factor diagram with SVG and tooltips."
                        json={JSON.stringify(factorDiagramJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    A radial diagram component that visualizes stock factors (Technical,
                    Quantitative, Insider, Stability, Fundamental) in a circular format. Features
                    interactive tooltips on hover (desktop) or bottom sheets on click (mobile) that
                    display detailed information about each factor including scores, values, and
                    descriptions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FactorDiagramDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Tech Analysis Header Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Tech Analysis Header</CardTitle>
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Tech Analysis Header Example"
                        description="Here's how to use the Tech Analysis Header component in your code."
                        code={techAnalysisHeaderCode}
                      />
                      <JsonExampleDialog
                        title="Tech Analysis Header JSON"
                        description="API response structure for tech analysis header with price, company info, sectors, recommendation, and risk data."
                        json={JSON.stringify(techAnalysisHeaderJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    A comprehensive header component for technical analysis pages that displays
                    company price information, description, sector classification, Investtech
                    recommendation score with factor diagram thumbnail, and risk level indicator.
                    Responsively adapts layout for mobile and desktop views with different column
                    arrangements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TechAnalysisHeaderDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Signals Section Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Signals Section</CardTitle>
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Signals Section Example"
                        description="Here's how to use the Signals Section component in your code."
                        code={signalsSectionCode}
                      />
                      <JsonExampleDialog
                        title="Signals Section JSON"
                        description="API response structure for signals section with signal cards, statistics, and help data."
                        json={JSON.stringify(signalsSectionJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    A grid-based section component that displays technical analysis signals as
                    interactive cards. Each signal card shows a chart image, statistics badge with
                    annual excess return, and signal count. Features responsive grid layout (2
                    columns on mobile, up to 5 on desktop), clickable cards that navigate to signal
                    documentation, and a help dialog with additional information. Supports both
                    light and dark mode images for different viewport sizes.
                  </CardDescription>
                </CardHeader>
                <CardContent>{/* <SignalsSectionDemo /> */}</CardContent>
              </Card>
            </SectionWrapper>

            {/* Basic Table Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Basic Table</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Basic Table Example"
                        description="Basic table with header, body, footer, and caption."
                        code={basicTableCode}
                      />
                      <JsonExampleDialog
                        title="Stocks Table JSON"
                        description="API response structure for stocks table (stocks-table.tsx, indices-table.tsx)."
                        json={JSON.stringify(stocksTableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Basic table structure with TableHeader, TableBody.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BasicTableDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Sortable Table Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sortable Table</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Sortable Table Example"
                        description="Table with sortable columns using arrow indicators."
                        code={sortableTableCode}
                      />
                      <JsonExampleDialog
                        title="Top50 Table JSON"
                        description="API response structure for top50 table with score-based sorting."
                        json={JSON.stringify(top50TableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Click on column headers to sort. Supports ascending and descending order. The
                    column header is clickable and will sort the table by the column. The current
                    sorting state is indicated by the arrow icon in the column header. The column
                    which is currently sorted is highlighted in the header.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SortableTableDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Links Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table with Links</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table with Links Example"
                        description="Table cells with clickable links for navigation."
                        code={tableWithLinksCode}
                      />
                      <JsonExampleDialog
                        title="Watchlist Table JSON"
                        description="API response structure for watchlist with company links."
                        json={JSON.stringify(watchlistTableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Clickable cells that navigate to detail pages.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithLinksDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Badges Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table with Badges</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table with Badges Example"
                        description="Table using badges for status indicators."
                        code={tableWithBadgesCode}
                      />
                      <JsonExampleDialog
                        title="Latest Reports JSON"
                        description="API response for today's case latest reports with buy/sell badges."
                        json={JSON.stringify(latestReportsTableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Using badges for buy/sell signals and status indicators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithBadgesDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Return Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Portfolio Return Table</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Portfolio Return Table Example"
                        description="Compact table showing portfolio returns with badges."
                        code={tableWithBadgesCode}
                      />
                      <JsonExampleDialog
                        title="Portfolio Holdings JSON"
                        description="API response for model portfolio with holdings and return data."
                        json={JSON.stringify(portfolioHoldingsTableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Compact table format for displaying portfolio performance metrics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithReturnDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Actions Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table with Actions</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table with Actions Example"
                        description="Table with action buttons for delete, edit operations."
                        code={tableWithActionsCode}
                      />
                      <JsonExampleDialog
                        title="My Notes Table JSON"
                        description="API response for my notes table with delete actions."
                        json={JSON.stringify(myNotesTableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Table rows with delete and edit action buttons.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithActionsDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Tooltips Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table with Tooltips</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table with Tooltips Example"
                        description="Table cells with tooltips for additional information."
                        code={basicTableCode}
                      />
                      <JsonExampleDialog
                        title="All Table JSON Examples"
                        description="Complete collection of all table JSON structures used in the project."
                        json={JSON.stringify(allTableJsonExamples, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Hover over cells to see additional information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithTooltipsDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table Skeleton Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table Skeleton</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Table Skeleton Example"
                      description="Loading skeleton for tables while data is being fetched."
                      code={tableSkeletonCode}
                    />
                  </div>
                  <CardDescription>
                    Loading skeleton animation shown while table data is loading.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TableSkeletonDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with Pagination Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table with Pagination</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table with Pagination Example"
                        description="Table with pagination controls for large datasets."
                        code={tableWithPaginationCode}
                      />
                      <JsonExampleDialog
                        title="Table with Pagination JSON"
                        description="API response structure for paginated tables with page and limit parameters."
                        json={JSON.stringify(tableWithPaginationJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Paginated table component designed for handling large datasets efficiently. The
                    table automatically splits data into multiple pages, allowing users to navigate
                    through results using previous/next buttons and direct page number selection.
                    Features include customizable page size options (e.g., 10, 25, 50, 100 items per
                    page), total count display, and intuitive navigation controls. This approach
                    lets the API accept 'limit' & 'page' to fetch the data from the server and
                    improves performance by rendering only the current page's data, reduces initial
                    load time, and provides a better user experience when working with extensive
                    data collections.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithPaginationDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Empty Table Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Empty Table State</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Empty Table Example"
                      description="How to display an empty state when no data is available."
                      code={emptyTableCode}
                    />
                  </div>
                  <CardDescription>Display state when table has no data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmptyTableDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table without Header Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table without Header</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table without Header Example"
                        description="Table with no header row - just data rows."
                        code={tableWithoutHeaderCode}
                      />
                      <JsonExampleDialog
                        title="Table without Header JSON"
                        description="API response structure for tables without headers."
                        json={JSON.stringify(tableWithoutHeaderJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Table structure without TableHeader component.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithoutHeaderDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Research Table Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Research Table</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Research Table Example"
                        description="Research table"
                        code={researchTableCode}
                      />
                      <JsonExampleDialog
                        title="Research Table JSON"
                        description="API response structure for research table."
                        json={JSON.stringify(researchTableJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Table structure for research pages.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResearchTableDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Table with single header Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Table with single header</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Table with single header Example"
                        description="Table with single header"
                        code={tableWithSingleHeaderCode}
                      />
                      <JsonExampleDialog
                        title="Table with single header JSON"
                        description="API response structure for table with single header."
                        json={JSON.stringify(tableWithSingleHeaderJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Table structure with single header.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableWithSingleHeaderDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Search Bar Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Search Bar</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Search Bar Component Example"
                      description="Here's how to use the Search Bar component in your code."
                      code={searchBarExampleCode}
                    />
                  </div>
                  <CardDescription>Search input with icon and placeholder.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SearchBarDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Button Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Button</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Button Component Example"
                      description="Here's how to use the Button component in your code."
                      code={buttonExampleCode}
                    />
                  </div>
                  <CardDescription>Various button styles and variants.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ButtonDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Input Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Input</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Input Component Example"
                      description="Here's how to use the Input component in your code."
                      code={inputExampleCode}
                    />
                  </div>
                  <CardDescription>Text input field with label.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InputDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Textarea Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Textarea</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Textarea Component Example"
                      description="Here's how to use the Textarea component in your code."
                      code={textareaExampleCode}
                    />
                  </div>
                  <CardDescription>Multi-line text input field.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TextareaDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Switch Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Switch</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Switch Component Example"
                      description="Here's how to use the Switch component in your code."
                      code={switchExampleCode}
                    />
                  </div>
                  <CardDescription>Toggle switch with label.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SwitchDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Checkbox Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Checkbox</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Checkbox Component Example"
                      description="Here's how to use the Checkbox component in your code."
                      code={checkboxExampleCode}
                    />
                  </div>
                  <CardDescription>Checkbox with label.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CheckboxDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Radio Group Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Radio Group</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Radio Group Component Example"
                      description="Here's how to use the Radio Group component in your code."
                      code={radioGroupExampleCode}
                    />
                  </div>
                  <CardDescription>Radio button group with labels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroupDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Select Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Select</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Select Component Example"
                      description="Here's how to use the Select component in your code."
                      code={selectExampleCode}
                    />
                  </div>
                  <CardDescription>Dropdown select with options.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Alert Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Alert</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Alert Component Example"
                      description="Here's how to use the Alert component in your code."
                      code={alertExampleCode}
                    />
                  </div>
                  <CardDescription>Alert message with title and description.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Breadcrumb Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Breadcrumb</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Breadcrumb Component Example"
                      description="Here's how to use the Breadcrumb component in your code."
                      code={breadcrumbExampleCode}
                    />
                  </div>
                  <CardDescription>Navigation breadcrumb trail.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BreadcrumbDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Avatar Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Avatar</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Avatar Component Example"
                      description="Here's how to use the Avatar component in your code."
                      code={avatarExampleCode}
                    />
                  </div>
                  <CardDescription>User avatar with fallback.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AvatarDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Badge Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Badge</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Badge Component Example"
                      description="Here's how to use the Badge component in your code."
                      code={badgeExampleCode}
                    />
                  </div>
                  <CardDescription>Various badge styles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <BadgeDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Skeleton Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Skeleton</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Skeleton Component Example"
                      description="Here's how to use the Skeleton component in your code."
                      code={skeletonExampleCode}
                    />
                  </div>
                  <CardDescription>Loading skeleton animation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SkeletonDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Dialog Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Dialog</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Dialog Component Example"
                      description="Here's how to use the Dialog component in your code."
                      code={dialogExampleCode}
                    />
                  </div>
                  <CardDescription>Modal dialog with form.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DialogDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Drawer Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Drawer</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Drawer Component Example"
                      description="Here's how to use the Drawer component in your code."
                      code={drawerExampleCode}
                    />
                  </div>
                  <CardDescription>Side drawer with form.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DrawerDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Hover Card Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Hover Card</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Hover Card Component Example"
                      description="Here's how to use the Hover Card component in your code."
                      code={hoverCardExampleCode}
                    />
                  </div>
                  <CardDescription>Card that appears on hover.</CardDescription>
                </CardHeader>
                <CardContent>
                  <HoverCardDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Tooltip Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tooltip</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Tooltip Component Example"
                      description="Here's how to use the Tooltip component in your code."
                      code={tooltipExampleCode}
                    />
                  </div>
                  <CardDescription>Tooltip that appears on hover.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Command Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Command</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Command Component Example"
                      description="Here's how to use the Command component in your code."
                      code={commandExampleCode}
                    />
                  </div>
                  <CardDescription>Command palette with search.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CommandDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Card Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Card</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Card Component Example"
                      description="Here's how to use the Card component in your code."
                      code={cardExampleCode}
                    />
                  </div>
                  <CardDescription>
                    Card component with header, content, and footer.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Accordion Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Accordion</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Accordion Component Example"
                      description="Here's how to use the Accordion component in your code."
                      code={accordionExampleCode}
                    />
                  </div>
                  <CardDescription>Collapsible accordion sections.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccordionDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Menubar Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Menubar</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Menubar Component Example"
                      description="Here's how to use the Menubar component in your code."
                      code={menubarExampleCode}
                    />
                  </div>
                  <CardDescription>Navigation menubar with dropdowns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MenubarDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Sheet Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sheet</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Sheet Component Example"
                      description="Here's how to use the Sheet component in your code."
                      code={sheetExampleCode}
                    />
                  </div>
                  <CardDescription>Side sheet with form.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SheetDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Combobox Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Combobox</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Combobox Component Example"
                      description="Here's how to use the Combobox component in your code."
                      code={comboboxExampleCode}
                    />
                  </div>
                  <CardDescription>Combobox with search and selection.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComboboxDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Dropdown Menu Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Dropdown Menu</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Dropdown Menu Component Example"
                      description="Here's how to use the Dropdown Menu component in your code."
                      code={dropdownMenuExampleCode}
                    />
                  </div>
                  <CardDescription>Dropdown menu with items.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenuDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Toast Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Toast</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Toast Component Example"
                      description="Here's how to use the Toast component in your code."
                      code={toastExampleCode}
                    />
                  </div>
                  <CardDescription>Toast notification system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ToastDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Form Example */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Form</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Form Component Example"
                      description="Here's how to use the Form component in your code."
                      code={formExampleCode}
                    />
                  </div>
                  <CardDescription>Form with validation and various input types.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormExample />
                </CardContent>
              </Card>
            </SectionWrapper>

            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Alphabetic Filter</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Alphabetic Filter Component Example"
                      description="Here's how to use the Alphabetic Filter component in your code."
                      code={alphabeticFilterCode}
                    />
                  </div>
                  <CardDescription>
                    Alphabetic filter with all letters and "All" option.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AlphabeticFilterDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Paginator</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Paginator Component Example"
                      description="Here's how to use the Paginator component in your code."
                      code={paginatorCode}
                    />
                  </div>
                  <CardDescription>Paginator with page size dropdown.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PaginatorDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Spinner</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Spinner Component Example"
                      description="Here's how to use the Spinner component in your code."
                      code={spinnerCode}
                    />
                  </div>
                  <CardDescription>Spinner component.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SpinnerDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Custom Dropdown Menu</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Dropdown Menu Component Example"
                      description="Here's how to use the Dropdown Menu component in your code."
                      code={dropdownMenuCode}
                    />
                  </div>
                  <CardDescription>Custom dropdown menu with items.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenuComponentDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Intra Page Menu (Table of Contents)</CardTitle>{' '}
                    <CodeExampleDialog
                      title="Intra Page Menu Component Example"
                      description="Here's how to use the Intra Page Menu (Table of Contents) component in your code."
                      code={intraPageMenuCode}
                    />
                  </div>
                  <CardDescription>
                    Sticky table of contents navigation component that automatically highlights the
                    active section as you scroll. Features smooth scrolling, active section
                    tracking, and responsive design. Perfect for long-form content with multiple
                    sections.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[600px]">
                    <IntraPageMenuDemo />
                  </div>
                </CardContent>
              </Card>
            </SectionWrapper>
          </main>

          <TableOfContents sections={componentSections} title="Components" />
        </div>

        <Toaster />
      </div>
    </TableOfContentsProvider>
  );
}
