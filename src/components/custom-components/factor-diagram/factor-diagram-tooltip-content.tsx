import { Card, CardContent } from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';

import { usePlatform } from '@/lib/platform';
import { FactorTooltip, FactorDiagramLabelsAndTexts } from '@/lib/types/shared-components';

import { CenteredProgress } from '../centered-progress-bar';

interface FactorTooltipContentProps {
  tooltip: FactorTooltip;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}

/**
 * FactorTooltipContent - Tooltip content component for factor diagram
 *
 * Displays factor information including title, status, score, description,
 * and a table of elements with their values and scores.
 *
 * @param tooltip - The tooltip data to display
 * @param labelsAndTexts - Optional labels and texts for internationalization
 */
function FactorTooltipHeader({
  tooltip,
  textClasses,
}: {
  tooltip: FactorTooltip;
  textClasses: string;
}) {
  return (
    <>
      <p
        className={`${textClasses} text-lg font-semibold md:text-2xl md:font-normal`}
        id="factor-tooltip-title"
      >
        {tooltip.title}: {tooltip.status} ({tooltip.score})
      </p>
      <p className={`${textClasses} text-xs leading-relaxed`} id="factor-tooltip-description">
        {tooltip.description}
      </p>
    </>
  );
}

function FactorTooltipTableHeader({
  labelsAndTexts,
  tableHeaderClasses,
}: {
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
  tableHeaderClasses: string;
}) {
  return (
    <TableHeader id="factor-tooltip-table-header">
      <TableRow
        className="border-grey-700 border-b"
        showHover={false}
        id="factor-tooltip-header-row"
      >
        <TableHead className={`${tableHeaderClasses} text-left`} id="factor-tooltip-header-element">
          {labelsAndTexts?.cterm_element}
        </TableHead>
        <TableHead className={`${tableHeaderClasses} text-right`} id="factor-tooltip-header-value">
          {labelsAndTexts?.cterm_value}
        </TableHead>
        <TableHead className={`${tableHeaderClasses} text-right`} id="factor-tooltip-header-score">
          {labelsAndTexts?.cterm_score}
        </TableHead>
        <TableHead className="w-1/3 p-2" id="factor-tooltip-header-progress"></TableHead>
      </TableRow>
    </TableHeader>
  );
}

function FactorTooltipTableRow({
  element,
  index,
  tableCellClasses,
}: {
  element: { name?: string; value?: string; score?: string };
  index: number;
  tableCellClasses: string;
}) {
  return (
    <TableRow
      key={index}
      className="border-grey-700 border-b last:border-b-0"
      showHover={false}
      id={`factor-tooltip-row-${index + 1}`}
    >
      <TableCell
        className={`${tableCellClasses} text-left whitespace-break-spaces`}
        id={`factor-tooltip-element-name-${index + 1}`}
      >
        {element.name ?? '-'}
      </TableCell>
      <TableCell
        className={`${tableCellClasses} text-right`}
        id={`factor-tooltip-element-value-${index + 1}`}
      >
        {element.value ?? '-'}
      </TableCell>
      <TableCell
        className={`${tableCellClasses} text-right`}
        id={`factor-tooltip-element-score-${index + 1}`}
      >
        {element.score ?? '-'}
      </TableCell>
      <TableCell className={`p-2 text-center`} id={`factor-tooltip-element-progress-${index + 1}`}>
        <CenteredProgress value={Number(element.score || 0)} variant="technical" />
      </TableCell>
    </TableRow>
  );
}

function FactorTooltipElementsTable({
  tooltip,
  labelsAndTexts,
  tableHeaderClasses,
  tableCellClasses,
  isMobileOrTablet,
}: {
  tooltip: FactorTooltip;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
  tableHeaderClasses: string;
  tableCellClasses: string;
  isMobileOrTablet: boolean;
}) {
  return (
    <Card
      className={`rounded-xl pt-0 ${isMobileOrTablet ? 'bg-card px-0 pb-3' : 'bg-grey-800 dark:bg-grey-100 px-5 pb-0'}`}
      id="factor-tooltip-elements-card"
    >
      <CardContent className="p-0">
        <Table id="factor-tooltip-elements-table">
          <FactorTooltipTableHeader
            labelsAndTexts={labelsAndTexts}
            tableHeaderClasses={tableHeaderClasses}
          />
          <TableBody id="factor-tooltip-table-body">
            {tooltip.elements.map((element, index) => (
              <FactorTooltipTableRow
                key={index}
                element={element}
                index={index}
                tableCellClasses={tableCellClasses}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function FactorTooltipContent({ tooltip, labelsAndTexts }: FactorTooltipContentProps) {
  const platform = usePlatform();
  const isMobileOrTablet = platform === 'mobile' || platform === 'tablet';

  const textClasses = `font-normal ${isMobileOrTablet ? 'text-grey-900 dark:text-grey-50' : 'text-contrast-foreground dark:text-contrast-foreground'}`;
  const tableHeaderClasses =
    'dark:text-grey-600 font-medium text-grey-700 uppercase text-[10px] px-1';
  const tableCellClasses = ` text-sm px-1 ${isMobileOrTablet ? 'font-semibold text-grey-900 dark:text-grey-100' : 'dark:text-grey-900 font-normal text-grey-100'}`;

  return (
    <div className="w-full max-w-full space-y-1.5 pt-3 sm:p-4" id="factor-tooltip-content-wrapper">
      <FactorTooltipHeader tooltip={tooltip} textClasses={textClasses} />

      {tooltip.elements.length > 0 && (
        <FactorTooltipElementsTable
          tooltip={tooltip}
          labelsAndTexts={labelsAndTexts}
          tableHeaderClasses={tableHeaderClasses}
          tableCellClasses={tableCellClasses}
          isMobileOrTablet={isMobileOrTablet}
        />
      )}
    </div>
  );
}
