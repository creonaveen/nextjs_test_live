'use client';

import { Badge } from 'investtech/external-components';
import { Button } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';
import { Tooltip, TooltipContent, TooltipTrigger } from 'investtech/external-components';
import { Trash } from 'lucide-react';
import { useState } from 'react';

import { Link } from '@/components/link';
import { arrowDown, arrowUp } from '@/components/custom-components/icon';
import Paginator from '@/components/custom-components/paginator';
import TableSkeleton from '@/components/custom-components/table-skeleton';
import { RenderHTML } from '@/utils/create-mark-up';
import { TableComponent } from '@/components/custom-components/table/table';

// Sample data for demos
const sampleStocks = [
  {
    id: '1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    close: '178.25',
    change: { value: '+2.50', sign: 'positive' },
    profit_loss_percent: { value: '+1.42%', sign: 'positive' },
    analysis_date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    close: '402.50',
    change: { value: '-1.25', sign: 'negative' },
    profit_loss_percent: { value: '-0.31%', sign: 'negative' },
    analysis_date: '2024-01-15',
  },
  {
    id: '3',
    name: 'Alphabet Inc.',
    ticker: 'GOOGL',
    close: '141.80',
    change: { value: '+0.75', sign: 'positive' },
    profit_loss_percent: { value: '+0.53%', sign: 'positive' },
    analysis_date: '2024-01-14',
  },
  {
    id: '4',
    name: 'Amazon.com Inc.',
    ticker: 'AMZN',
    close: '155.35',
    change: { value: '+3.20', sign: 'positive' },
    profit_loss_percent: { value: '+2.10%', sign: 'positive' },
    analysis_date: '2024-01-15',
  },
  {
    id: '5',
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    close: '547.10',
    change: { value: '-5.80', sign: 'negative' },
    profit_loss_percent: { value: '-1.05%', sign: 'negative' },
    analysis_date: '2024-01-14',
  },
];

const samplePortfolio = [
  { name: 'Model Portfolio', profit_loss_percent: { value: '+15.42%', sign: 'positive' } },
  { name: 'Benchmark Index', profit_loss_percent: { value: '+8.25%', sign: 'positive' } },
  { name: 'Market Average', profit_loss_percent: { value: '+5.10%', sign: 'positive' } },
];

const sampleLatestReports = [
  { date: '2024-01-15', company: 'Apple Inc.', signal: 'Buy', sign: 'positive' },
  { date: '2024-01-14', company: 'Tesla Inc.', signal: 'Sell', sign: 'negative' },
  { date: '2024-01-13', company: 'Meta Platforms', signal: 'Buy', sign: 'positive' },
];

// Helper function for color classes
const getColorClass = (sign?: string | number) => {
  if (sign === 'positive' || sign === 1) return 'text-green-600 dark:text-green-400';
  if (sign === 'negative' || sign === -1) return 'text-red-600 dark:text-red-400';
  return '';
};

// Helper function for badge variant
const getBadgeVariant = (
  sign?: string | number
): 'success' | 'error' | 'warning' | 'primary' | 'neutral' => {
  if (sign === 'positive' || sign === 1) return 'success';
  if (sign === 'negative' || sign === -1) return 'error';
  return sign === 0 ? 'warning' : 'neutral';
};

/**
 * Basic Table Demo
 * Shows the fundamental table structure with all components
 */
export function BasicTableDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              <TableHead>Name</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">Close</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocksTableJson?.results?.map((stock) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell className="text-right">{stock.close}</TableCell>
                <TableCell className={`text-right ${getColorClass(stock.change.sign.toString())}`}>
                  {stock.change.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Clean Table Demo
 * Shows the clean table example from API JSON
 */
export function CleanTableExample1Demo() {
  return <TableComponent data={cleanTableExample1Json.clean_table1.table} />;
}

export function CleanTableExample2Demo() {
  return <TableComponent data={cleanTableExample2Json.clean_table2.table} />;
}

/**
 * Standard Table Demo
 * Shows standard table example with headers and caption
 */
export function StandardTableExampleDemoHeaderAndData() {
  return <TableComponent data={standardTableExampleJson.standard_table.table1.table} />;
}

/**
 * Standard Table Demo
 * Shows standard table example with headers and caption
 */
export function StandardTableExampleDemoColumnHighlighting() {
  return <TableComponent data={standardTableExampleJson.standard_table.table2.table} />;
}

/**
 * Standard Table Demo
 * Shows standard table example with headers and caption
 */
export function StandardTableExampleDemoRowDecorationAndHover() {
  return <TableComponent data={standardTableExampleJson.standard_table.table3.table} />;
}

/**
 * Standard Table Demo
 * Shows standard table example with headers and caption
 */
export function StandardTableExampleDemoTransposed() {
  return <TableComponent data={standardTableExampleJson.standard_table.table4.table} />;
}

/**
 * Standard Table Demo
 * Shows standard table example with headers and caption
 */
export function StandardTableExampleDemoDataTriggeredStylingAndHiddenColumns() {
  return <TableComponent data={standardTableExampleJson.standard_table.table5.table} />;
}

/**
 * Research Table Demo
 * Shows research table example with headers and caption
 */
export function ResearchTableExampleDemo1() {
  return <TableComponent data={researchTableExampleJson.research_table.table1.table} />;
}

/**
 * Research Table Demo
 * Shows research table example with headers and caption
 */
export function ResearchTableExampleDemo2() {
  return <TableComponent data={researchTableExampleJson.research_table.table2.table} />;
}

/**
 * Research Table Demo
 * Shows research table example with headers and caption
 */
export function ResearchTableExampleDemo3() {
  return <TableComponent data={researchTableExampleJson.research_table.table3.table} />;
}

/**
 * Research Table Demo
 * Shows research table example with headers and caption
 */
export function ResearchTableExampleDemo4() {
  return <TableComponent data={researchTableExampleJson.research_table.table4.table} />;
}

/**
 * Numeric Datatype Demo
 * Shows numeric datatype example with headers and caption
 */
export function NumericDatatypeOverviewDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.overview} />;
}

/**
 * Numeric Datatype Price Demo
 * Shows numeric datatype price example with headers and caption
 */
export function NumericDatatypePriceDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table1} />;
}

/**
 * Numeric Datatype Price Currency Demo
 * Shows numeric datatype price currency example with headers and caption
 */
export function NumericDatatypePriceCurrencyDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table2} />;
}

/**
 * Numeric Datatype Price Precision 4 Demo
 * Shows numeric datatype price precision 4 example with headers and caption
 */
export function NumericDatatypePricePrecision4Demo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table3} />;
}

/**
 * Numeric Datatype Percent Demo
 * Shows numeric datatype percent example with headers and caption
 */
export function NumericDatatypePercentDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table4} />;
}

/**
 * Numeric Datatype Price Change Demo
 * Shows numeric datatype price change example with headers and caption
 */
export function NumericDatatypePriceChangeDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table5} />;
}

/**
 * Numeric Datatype Price Change Label Demo
 * Shows numeric datatype price change label example with headers and caption
 */
export function NumericDatatypePriceChangeLabelDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table6} />;
}

/**
 * Numeric Datatype Price Change Precision 4 Demo
 * Shows numeric datatype price change precision 4 example with headers and caption
 */
export function NumericDatatypePriceChangePrecision4Demo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table7} />;
}

/**
 * Numeric Datatype Price Change Precision 4 Label Demo
 * Shows numeric datatype price change precision 4 label example with headers and caption
 */
export function NumericDatatypePriceChangePrecision4LabelDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table8} />;
}

/**
 * Numeric Datatype Percent Change Demo
 * Shows numeric datatype percent change example with headers and caption
 */
export function NumericDatatypePercentChangeDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table9} />;
}

/**
 * Numeric Datatype Percent Color Demo
 * Shows numeric datatype percent color example with headers and caption
 */
export function NumericDatatypePercentColorDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table10} />;
}

/**
 * Numeric Datatype Percent Change Label Demo
 * Shows numeric datatype percent change label example with headers and caption
 */
export function NumericDatatypePercentChangeLabelDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table11} />;
}

/**
 * Numeric Datatype Percent Change Precision 4 Label Small Demo
 * Shows numeric datatype percent change precision 4 label example with headers and caption
 */
export function NumericDatatypePercentChangePrecision4LabelSmallDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table12} />;
}

/**
 * Numeric Datatype Percent Change Precision 4 Label Medium Demo
 * Shows numeric datatype percent change precision 4 label example with headers and caption
 */
export function NumericDatatypePercentChangePrecision4LabelMediumDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table13} />;
}

/**
 * Numeric Datatype Percent Change Precision 4 Label Big Demo
 * Shows numeric datatype percent change precision 4 label example with headers and caption
 */
export function NumericDatatypePercentChangePrecision4LabelBigDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table14} />;
}
/**
 * Numeric Datatype Value Demo
 * Shows numeric datatype value example with headers and caption
 */
export function NumericDatatypeValueDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table15} />;
}
/**
 * Numeric Datatype Count Demo
 * Shows numeric datatype count example with headers and caption
 */
export function NumericDatatypeCountDemo1() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table16} />;
}
/**
 * Numeric Datatype Count Demo
 * Shows numeric datatype count example with headers and caption
 */
export function NumericDatatypeCountDemo2() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table17} />;
}

/**
 * Numeric Datatype Integer Demo
 * Data type: integer
 */
export function NumericDatatypeIntegerDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table18} />;
}

/**
 * Numeric Datatype Signed Integer Demo
 * Data type: signedInteger
 */
export function NumericDatatypeSignedIntegerDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table19} />;
}

/**
 * Numeric Datatype Decimal1 Demo
 * Data type: decimal1
 */
export function NumericDatatypeDecimal1Demo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table20} />;
}

/**
 * Numeric Datatype Decimal2 Demo
 * Data type: decimal2
 */
export function NumericDatatypeDecimal2Demo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table21} />;
}

/**
 * Numeric Datatype Decimal3 Demo
 * Data type: decimal3
 */
export function NumericDatatypeDecimal3Demo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table22} />;
}

/**
 * Numeric Datatype DecimalPos Demo
 * Data type: decimalPos (positive decimals only; negative shows empty)
 */
export function NumericDatatypeDecimalPosDemo() {
  return <TableComponent data={numericDatatypeExampleJson.numeric.single_type_examples.table23} />;
}

/**
 * Date Datatype: Overview Demo
 * Overview table for date and time data types (dateLong, dateYYYYMMDD, dateAndTime, time).
 */
export function DateDatatypeOverviewDemo() {
  return <TableComponent data={dateDatatypeExampleJson.date_and_time.overview} />;
}

/**
 * Date Datatype: dateLong Demo
 */
export function DateDatatypeDateLongDemo() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table1} />
  );
}

/**
 * Date Datatype: dateYYYYMMDD Demo
 */
export function DateDatatypeDateYYYYMMDDDemo() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table2} />
  );
}

/**
 * Date Datatype: dateYYYYMMDD (string/integer input) Demo
 */
export function DateDatatypeDateYYYYMMDDDemo2() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table3} />
  );
}

/**
 * Date Datatype: dateYYYYMMDD (unix timestamp) Demo
 */
export function DateDatatypeDateYYYYMMDDUnixDemo() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table4} />
  );
}

/**
 * Date Datatype: dateAndTime Demo
 */
export function DateDatatypeDateAndTimeDemo() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table5} />
  );
}

/**
 * Date Datatype: time Demo
 */
export function DateDatatypeTimeDemo() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table6} />
  );
}

/**
 * Date Datatype: time (from datetime or zero) Demo
 */
export function DateDatatypeTimeDemo2() {
  return (
    <TableComponent data={dateDatatypeExampleJson.date_and_time.single_type_examples.table7} />
  );
}

/**
 * Strings Datatype: Overview Demo
 */
export function StringsDatatypeOverviewDemo() {
  return <TableComponent data={stringsDatatypesExampleJson.strings.overview} />;
}

/**
 * Strings Datatype: string Demo
 */
export function StringsDatatypeStringDemo() {
  return <TableComponent data={stringsDatatypesExampleJson.strings.single_type_examples.table1} />;
}

/**
 * Strings Datatype: string(10) Demo
 */
export function StringsDatatypeString10Demo() {
  return <TableComponent data={stringsDatatypesExampleJson.strings.single_type_examples.table2} />;
}

/**
 * Strings Datatype: stringWrap(10) Demo
 */
export function StringsDatatypeStringWrap10Demo() {
  return <TableComponent data={stringsDatatypesExampleJson.strings.single_type_examples.table3} />;
}

/**
 * Strings Datatype: stringWrap(15) Demo
 */
export function StringsDatatypeStringWrap15Demo() {
  return <TableComponent data={stringsDatatypesExampleJson.strings.single_type_examples.table4} />;
}

/**
 * Alerts Datatype: Overview Demo
 * Overview table for alert data types (alarm).
 */
export function AlertsDatatypeOverviewDemo() {
  return <TableComponent data={alertsDatatypes.alerts.overview} />;
}

/**
 * Alerts Datatype: alarm Demo
 * Data type: alarm — alert icon shown when field is not empty; may contain popup code or js/ajax calls.
 */
export function AlertsDatatypeAlarmDemo() {
  return <TableComponent data={alertsDatatypes.alerts.single_type_examples.table1} />;
}

/**
 * MyData Datatype: Overview Demo
 * Overview table for myData types (myDataIcon, myDataIcons, myWatchlistIcon, myWatchlist, myWatchlistUI, myPortfolio, myRating, myRatingUI).
 */
export function MyDataDatatypeOverviewDemo() {
  return <TableComponent data={myDataDatatype.my_data.overview} />;
}

/**
 * MyData Datatype: myWatchlist Demo
 */
export function MyDataDatatypeMyWatchlistDemo() {
  return <TableComponent data={myDataDatatype.my_data.single_type_examples.table1} />;
}

/**
 * MyData Datatype: myPortfolio Demo
 */
export function MyDataDatatypeMyPortfolioDemo() {
  return <TableComponent data={myDataDatatype.my_data.single_type_examples.table2} />;
}

/**
 * MyData Datatype: myRating Demo
 */
export function MyDataDatatypeMyRatingDemo() {
  return <TableComponent data={myDataDatatype.my_data.single_type_examples.table3} />;
}

/**
 * MyData Datatype: myNotes Demo
 */
export function MyDataDatatypeMyNotesDemo() {
  return <TableComponent data={myDataDatatype.my_data.single_type_examples.table4} />;
}

/**
 * MyData Datatype: myAlerts Demo
 */
export function MyDataDatatypeMyAlertsDemo() {
  return <TableComponent data={myDataDatatype.my_data.single_type_examples.table5} />;
}

/**
 * MyData Datatype: myDataAny Demo
 */
export function MyDataDatatypeMyDataAnyDemo() {
  return <TableComponent data={myDataDatatype.my_data.single_type_examples.table6} />;
}

/**
 * Company and Analysis Datatype: Overview Demo
 */
export function CompanyAndAnalysisOverviewDemo() {
  return <TableComponent data={companyAndAnalysisDatatypes.company_and_analysis.overview} />;
}

/**
 * Company and Analysis Datatype: flag Demo
 */
export function CompanyAndAnalysisFlagDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table1}
    />
  );
}

/**
 * Company and Analysis Datatype: techScoreArrow Demo
 */
export function CompanyAndAnalysisTechScoreArrowDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table2}
    />
  );
}

/**
 * Company and Analysis Datatype: techScoreText Demo
 */
export function CompanyAndAnalysisTechScoreTextDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table3}
    />
  );
}

/**
 * Company and Analysis Datatype: techScoreWithArrow Demo
 */
export function CompanyAndAnalysisTechScoreWithArrowDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table4}
    />
  );
}

/**
 * Company and Analysis Datatype: evaluationArrow Demo
 */
export function CompanyAndAnalysisEvaluationArrowDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table5}
    />
  );
}

/**
 * Company and Analysis Datatype: evaluationText Demo
 */
export function CompanyAndAnalysisEvaluationTextDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table6}
    />
  );
}

/**
 * Company and Analysis Datatype: evaluationArrowWithText Demo
 */
export function CompanyAndAnalysisEvaluationArrowWithTextDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table7}
    />
  );
}

/**
 * Company and Analysis Datatype: risk Demo
 */
export function CompanyAndAnalysisRiskDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table8}
    />
  );
}

/**
 * Company and Analysis Datatype: risk(colored) Demo
 */
export function CompanyAndAnalysisRiskColoredDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table9}
    />
  );
}

/**
 * Company and Analysis Datatype: risk(label) Demo
 */
export function CompanyAndAnalysisRiskLabelDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table10}
    />
  );
}

/**
 * Company and Analysis Datatype: risk(label,big) Demo
 */
export function CompanyAndAnalysisRiskLabelBigDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table11}
    />
  );
}

/**
 * Company and Analysis Datatype: companyLink Demo
 */
export function CompanyAndAnalysisCompanyLinkDemo() {
  return (
    <TableComponent
      data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table12}
    />
  );
}

export function DataExportOverviewDemo() {
  return <TableComponent data={dataExportDatatypes.data_export.overview} />;
}

export function DataExportWordpressCompanyMacroDemo() {
  return <TableComponent data={dataExportDatatypes.data_export.single_type_examples.table1} />;
}

export function ChartsOverviewDemo() {
  return <TableComponent data={chartDataType.charts.overview} />;
}

export function ChartsFactorDiagramTinyDemo() {
  return <TableComponent data={chartDataType.charts.single_type_examples.table1} />;
}

export function ChartsFactorDiagramSmallDemo() {
  return <TableComponent data={chartDataType.charts.single_type_examples.table2} />;
}

export function ChartsTechChartTinyDemo() {
  return <TableComponent data={chartDataType.charts.single_type_examples.table3} />;
}

export function ChartsTechChartTinyLinkDemo() {
  return <TableComponent data={chartDataType.charts.single_type_examples.table4} />;
}

export function ChartsTechChartSmallDemo() {
  return <TableComponent data={chartDataType.charts.single_type_examples.table5} />;
}

export function ChartsTechChartMediumDemo() {
  return <TableComponent data={chartDataType.charts.single_type_examples.table6} />;
}

/**
 * Mixed Datatypes: Overview Demo
 */
export function MixedDatatypesTableDemo() {
  return (
    <TableComponent data={mixedDatatypesTable.mixed_data_types_tables.table_company_mix1.table} />
  );
}

/**
 * Sortable Table Demo
 * Demonstrates table with sortable columns using arrow indicators
 */
export function SortableTableDemo() {
  const [ordering, setOrdering] = useState('name');

  const handleOrdering = (key: string) => {
    setOrdering(ordering === key ? '-' + key : key);
  };

  const columns = [
    { key: 'name', label: 'Name', align: 'left' as const },
    { key: 'ticker', label: 'Ticker', align: 'left' as const },
    { key: 'close', label: 'Close', align: 'right' as const },
    { key: 'profit_loss_percent', label: '+/- %', align: 'right' as const },
  ];

  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {columns.map((col) => {
                const isActive = ordering === col.key || ordering === `-${col.key}`;
                const isDesc = ordering === `-${col.key}`;

                return (
                  <TableHead
                    key={col.key}
                    onClick={() => handleOrdering(col.key)}
                    className={`cursor-pointer ${isActive ? 'text-primary' : ''}`}
                  >
                    <div
                      className={`column-header flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : ''}`}
                    >
                      <span>{col.label}</span>
                      {isActive
                        ? isDesc
                          ? arrowUp('text-primary')
                          : arrowDown('text-primary')
                        : arrowUp('text-muted-foreground')}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {top50TableJson?.results?.map((stock) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell className="text-right">{stock.close}</TableCell>
                <TableCell
                  className={`text-right ${getColorClass(stock.profit_loss_percent.sign.toString())}`}
                >
                  {stock.profit_loss_percent.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Table with Links Demo
 * Shows clickable rows/cells that navigate to detail pages
 */
export function TableWithLinksDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              <TableHead>Company</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">Close</TableHead>
              <TableHead className="text-right">Analysis Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlistTableJson?.results?.map((stock) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell className="company-link-button">
                  <Link href={`#company-${stock.id}`} className="whitespace-nowrap">
                    {stock.name}
                  </Link>
                </TableCell>
                <TableCell className="company-link-button">
                  <Link href={`#company-${stock.id}`} className="whitespace-nowrap">
                    {stock.ticker}
                  </Link>
                </TableCell>
                <TableCell className="text-right">{stock.close}</TableCell>
                <TableCell className="text-right">{stock.analysis_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Table with Badges Demo
 * Shows how to use badges for status indicators in tables
 */
export function TableWithBadgesDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {latestReportsTableJson?.table_definition?.map((col, index) => (
                <TableHead key={index} className="text-start">
                  {col.column_name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestReportsTableJson?.data?.map((report, index) => (
              <TableRow key={index} showHover={false}>
                <TableCell className="whitespace-nowrap">{report.date}</TableCell>
                <TableCell>{report.company}</TableCell>
                <TableCell className="text-start">
                  <Badge variant={getBadgeVariant(report.buy_or_sell.sign)} size="small">
                    {report.buy_or_sell.value}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Table with Return Indicators Demo
 * Shows portfolio return style table with profit/loss badges
 */
export function TableWithReturnDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <div className="text-grey-900 dark:text-grey-200 mb-4 text-lg font-semibold">
          Portfolio Return
        </div>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {portfolioHoldingsTableJson?.portfolio_return?.table_definition?.map((col, index) => (
                <TableHead key={index} className="text-start">
                  {col?.column_name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioHoldingsTableJson?.portfolio_return?.content?.map((item, index) => (
              <TableRow key={index} showHover={false}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-start">
                  <Badge
                    variant={getBadgeVariant(item.profit_loss_percent.sign)}
                    size="small"
                    className="whitespace-nowrap"
                  >
                    {item.profit_loss_percent.value}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Delete Stock Dialog Component
 * Confirmation dialog for deleting a stock from the table
 */
// Helper hook for delete operation
function useDeleteOperation(
  stock: (typeof sampleStocks)[0] | null,
  onDelete: (id: string) => void
) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!stock?.id) return;

    setIsDeleting(true);
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));
      onDelete(stock.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleDelete };
}

// Helper function to get button aria label
const getDeleteButtonAriaLabel = (isOperationInProgress: boolean, stockName?: string) => {
  return isOperationInProgress
    ? `Deleting ${stockName || 'stock'}`
    : `Delete ${stockName || 'stock'}`;
};

function DeleteStockDialog({
  stock,
  onDelete,
  isLoading,
}: {
  stock: (typeof sampleStocks)[0] | null;
  onDelete: (id: string) => void;
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { isDeleting, handleDelete } = useDeleteOperation(stock, onDelete);

  const canOpenDialog = !isLoading && !isDeleting;
  const isOperationInProgress = isLoading || isDeleting;
  const heading = 'text-grey-700 dark:text-grey-200 text-[10px] font-medium';
  const text = 'font-medium text-sm flex break-words break-all whitespace-normal';

  const StockInfoDisplay = () => (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex flex-col">
        <div className="flex flex-1 space-x-5 pb-3">
          <div className="flex flex-col">
            <span className={heading}>COMPANY</span>
            <span className={text}>{stock?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className={heading}>TICKER</span>
            <span className={text}>{stock?.ticker}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={heading}>CLOSE PRICE</span>
          <span className={text + ' numeric-table-cell table-cell'}>${stock?.close}</span>
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8" aria-live="polite" aria-busy="true">
      <div className="border-grey-300 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
      <span className="sr-only">Loading</span>
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (canOpenDialog) {
          setOpen(isOpen);
        }
      }}
    >
      <DialogTrigger asChild>
        <Trash
          size={32}
          aria-hidden="true"
          aria-label="Delete stock"
          className="hover:text-primary hover:bg-grey-100 dark:hover:bg-accent-1/50 ml-auto cursor-pointer rounded-full p-2"
        />
      </DialogTrigger>
      <DialogContent
        className="gap-6 sm:max-w-md"
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Stock</DialogTitle>
          <span className="text-grey-700 dark:text-grey-300 text-sm">
            Are you sure you want to delete this stock? This action cannot be undone.
          </span>
        </DialogHeader>
        {isOperationInProgress ? <LoadingSpinner /> : <StockInfoDisplay />}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={isOperationInProgress}
              aria-label="Cancel deletion"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogAction asChild>
            <Button
              type="button"
              variant="default"
              className="cursor-pointer"
              onClick={() => {
                handleDelete()
                  .then(() => setOpen(false))
                  .catch(() => {});
              }}
              disabled={isOperationInProgress || !stock?.id}
              aria-label={getDeleteButtonAriaLabel(isOperationInProgress, stock?.name)}
              aria-busy={isOperationInProgress}
            >
              Delete
            </Button>
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Table with Actions Demo
 * Shows table with action buttons (delete, edit) in rows
 */
export function TableWithActionsDemo() {
  const [items, setItems] = useState(myNotesTableJson?.results || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setItems(items.filter((item) => item.company_id !== id));
    setIsLoading(false);
  };

  const handleReset = () => {
    setItems(myNotesTableJson?.results || []);
  };

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow showHover={false}>
                <TableHead>Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Close</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow showHover={false}>
                  <TableCell colSpan={4} className="py-4 text-center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                items.map((stock) => (
                  <TableRow key={stock.company_id} showHover={false}>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.ticker}</TableCell>
                    <TableCell className="text-right">{stock.close}</TableCell>
                    <TableCell className="text-right">
                      <DeleteStockDialog
                        stock={stock as unknown as (typeof sampleStocks)[0]}
                        onDelete={(id) => void handleDelete(id)}
                        isLoading={isLoading}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {items.length < 3 && (
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset Demo
        </Button>
      )}
    </div>
  );
}

/**
 * Table with Tooltips Demo
 * Shows table cells with tooltips for additional information
 */
export function TableWithTooltipsDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleStocks.slice(0, 3).map((stock, index) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">{(85 - index * 5).toString()}</TableCell>
                <TableCell className="text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer underline decoration-dotted">Details</span>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p>
                        {stock.name} - Analysis date: {stock.analysis_date}
                      </p>
                      <p>Current price: ${stock.close}</p>
                      <p>Daily change: {stock.change.value}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Table Skeleton Demo
 * Shows loading state skeleton for tables
 */
export function TableSkeletonDemo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-4">
      <Button variant="outline" size="sm" onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? 'Show Data' : 'Show Skeleton'}
      </Button>
      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow showHover={false}>
                <TableHead>Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-center">Close</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableSkeleton rows={5} columns={4} />
            ) : (
              <TableBody>
                {sampleStocks.map((stock) => (
                  <TableRow key={stock.id} showHover={false}>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.ticker}</TableCell>
                    <TableCell className="text-right">{stock.close}</TableCell>
                    <TableCell className={`text-right ${getColorClass(stock.change.sign)}`}>
                      {stock.change.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Table with Pagination Demo
 * Shows table with pagination controls
 */
export function TableWithPaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const totalCount = sampleStocks.length;

  const paginatedData = tableWithPaginationJson?.results?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow showHover={false}>
                <TableHead>Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Close</TableHead>
                <TableHead className="text-right">+/- %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((stock) => (
                <TableRow key={stock.id} showHover={false}>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell className="text-right">{stock.close}</TableCell>
                  <TableCell
                    className={`text-right ${getColorClass(stock.profit_loss_percent.sign)}`}
                  >
                    {stock.profit_loss_percent.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex w-full justify-end">
        <Paginator
          pageParent={setPage}
          pageSizeParent={setPageSize}
          pageSize={pageSize}
          isAPILoad={false}
          countRow={totalCount}
        />
      </div>
    </div>
  );
}

/**
 * Empty State Table Demo
 * Shows how to display empty state in tables
 */
export function EmptyTableDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              <TableHead>Name</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">Close</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow showHover={false}>
              <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                No data available.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Table without Header Demo
 * Shows a table with no header row - just data rows
 */
export function TableWithoutHeaderDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableBody>
            {tableWithoutHeaderJson?.results?.map((stock) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell className="text-right">{stock.close}</TableCell>
                <TableCell className={`text-right ${getColorClass(stock.change.sign)}`}>
                  {stock.change.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function ResearchTableDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {researchTableJson.table_definition?.map((col) => (
                <TableHead key={col.key} className="border-divider dark:border-grey-750 border-t">
                  {col.column_name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {researchTableJson.data?.map((row, index) => (
              <TableRow key={index} showHover={false} className="border-none dark:border-none">
                {row.col_0.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
                {row.col_1.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
                {row.col_2.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
                {row.col_3.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TableWithSingleHeaderDemo() {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {tableWithSingleHeaderJson?.table_definition?.map((col) => (
                <TableHead
                  key={col.key}
                  className="border-divider dark:border-grey-750 border-t text-center"
                  colSpan={col.colspan}
                >
                  <RenderHTML html={col.column_name} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableWithSingleHeaderJson?.data?.map((row, index) => (
              <TableRow key={index} showHover={false}>
                {row.col_0.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <RenderHTML html={cell.text} />
                  </TableCell>
                ))}
                {row.col_1.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <RenderHTML html={cell.text} />
                  </TableCell>
                ))}
                {row.col_2.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <RenderHTML html={cell.text} />
                  </TableCell>
                ))}
                {row.col_3.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <RenderHTML html={cell.text} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Export example codes for documentation
export const cleanTableExampleCode = `import { CleanTableExample } from '@/components/custom-components/clean-table-example';

<TableExample  data={cleanTableExampleJson.clean_table.table} />`;

export const standardTableExampleCode = `import { StandardTableExample } from '@/components/custom-components/standard-table-example';

<TableExample  data={standardTableExampleJson.standard_table.table} />`;

export const researchTableExampleCode = `import { ResearchTableExample } from '@/components/custom-components/research-table-example';

<TableExample  data={researchTableExampleJson.research_table.table1.table} />`;

export const numericDatatypeOverviewCode = `import { NumericDatatypeExample } from '@/components/custom-components/numeric-datatype-example';

<TableExample  data={numericDatatypeExampleJson.numeric.overview} />`;

export const numericDatatypePriceCode = `import { NumericDatatypePriceExample } from '@/components/custom-components/numeric-datatype-price-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table1} />`;

export const numericDatatypePriceCurrencyCode = `import { NumericDatatypePriceCurrencyExample } from '@/components/custom-components/numeric-datatype-price-currency-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table2} />`;

export const numericDatatypePricePrecision4Code = `import { NumericDatatypePricePrecision4Example } from '@/components/custom-components/numeric-datatype-price-precision-4-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table3} />`;

export const numericDatatypePercentCode = `import { NumericDatatypePercentExample } from '@/components/custom-components/numeric-datatype-percent-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table4} />`;

export const numericDatatypePriceChangeCode = `import { NumericDatatypePriceChangeExample } from '@/components/custom-components/numeric-datatype-price-change-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table5} />`;

export const numericDatatypePriceChangeLabelCode = `import { NumericDatatypePriceChangeLabelExample } from '@/components/custom-components/numeric-datatype-price-change-label-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table6} />`;

export const numericDatatypePriceChangePrecision4Code = `import { NumericDatatypePriceChangePrecision4Example } from '@/components/custom-components/numeric-datatype-price-change-precision-4-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table7} />`;

export const numericDatatypePriceChangePrecision4LabelCode = `import { NumericDatatypePriceChangePrecision4LabelExample } from '@/components/custom-components/numeric-datatype-price-change-precision-4-label-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table8} />`;

export const numericDatatypePercentChangeCode = `import { NumericDatatypePercentChangeExample } from '@/components/custom-components/numeric-datatype-percent-change-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table9} />`;

export const numericDatatypePercentColorCode = `import { NumericDatatypePercentColorExample } from '@/components/custom-components/numeric-datatype-percent-color-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table10} />`;

export const numericDatatypePercentChangeLabelCode = `import { NumericDatatypePercentChangeLabelExample } from '@/components/custom-components/numeric-datatype-percent-change-label-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table11} />`;

export const numericDatatypePercentChangePrecision4LabelSmallCode = `import { NumericDatatypePercentChangePrecision4LabelExample } from '@/components/custom-components/numeric-datatype-percent-change-precision-4-label-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table12} />`;

export const numericDatatypePercentChangePrecision4LabelMediumCode = `import { NumericDatatypePercentChangePrecision4LabelExample } from '@/components/custom-components/numeric-datatype-percent-change-precision-4-label-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table13} />`;

export const numericDatatypePercentChangePrecision4LabelBigCode = `import { NumericDatatypePercentChangePrecision4LabelExample } from '@/components/custom-components/numeric-datatype-percent-change-precision-4-label-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table14} />`;

export const numericDatatypeValueCode = `import { NumericDatatypeValueExample } from '@/components/custom-components/numeric-datatype-value-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table15} />`;

export const numericDatatypeCountCode1 = `import { NumericDatatypeCountExample } from '@/components/custom-components/numeric-datatype-count-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table16} />`;

export const numericDatatypeCountCode2 = `import { NumericDatatypeCountExample } from '@/components/custom-components/numeric-datatype-count-example';

<TableExample  data={numericDatatypeExampleJson.numeric.single_type_examples.table17} />`;

export const numericDatatypeIntegerCode = `import { TableExample } from '@/components/custom-components/table-example';
import { numericDatatypeExampleJson } from '@/store/api-service/dummy-json/numeric-datatype';

<TableExample data={numericDatatypeExampleJson.numeric.single_type_examples.table18} />`;

export const numericDatatypeSignedIntegerCode = `import { TableExample } from '@/components/custom-components/table-example';
import { numericDatatypeExampleJson } from '@/store/api-service/dummy-json/numeric-datatype';

<TableExample data={numericDatatypeExampleJson.numeric.single_type_examples.table19} />`;

export const numericDatatypeDecimal1Code = `import { TableExample } from '@/components/custom-components/table-example';
import { numericDatatypeExampleJson } from '@/store/api-service/dummy-json/numeric-datatype';

<TableExample data={numericDatatypeExampleJson.numeric.single_type_examples.table20} />`;

export const numericDatatypeDecimal2Code = `import { TableExample } from '@/components/custom-components/table-example';
import { numericDatatypeExampleJson } from '@/store/api-service/dummy-json/numeric-datatype';

<TableExample data={numericDatatypeExampleJson.numeric.single_type_examples.table21} />`;

export const numericDatatypeDecimal3Code = `import { TableExample } from '@/components/custom-components/table-example';
import { numericDatatypeExampleJson } from '@/store/api-service/dummy-json/numeric-datatype';

<TableExample data={numericDatatypeExampleJson.numeric.single_type_examples.table22} />`;

export const numericDatatypeDecimalPosCode = `import { TableExample } from '@/components/custom-components/table-example';
import { numericDatatypeExampleJson } from '@/store/api-service/dummy-json/numeric-datatype';

<TableExample data={numericDatatypeExampleJson.numeric.single_type_examples.table23} />`;

export const dateDatatypeOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.overview} />`;

export const dateDatatypeDateLongCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table1} />`;

export const dateDatatypeDateYYYYMMDDCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table2} />`;

export const dateDatatypeDateYYYYMMDDCode2 = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table3} />`;

export const dateDatatypeDateYYYYMMDDUnixCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table4} />`;

export const dateDatatypeDateAndTimeCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table5} />`;

export const dateDatatypeTimeCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table6} />`;

export const dateDatatypeTimeCode2 = `import { TableExample } from '@/components/custom-components/table-example';
import { dateDatatypeExampleJson } from '@/store/api-service/dummy-json/date-datatype';

<TableExample data={dateDatatypeExampleJson.date_and_time.single_type_examples.table7} />`;

export const stringsDatatypeOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { stringsDatatypesExampleJson } from '@/store/api-service/dummy-json/strings-datatypes';

<TableExample data={stringsDatatypesExampleJson.strings.overview} />`;

export const stringsDatatypeStringCode = `import { TableExample } from '@/components/custom-components/table-example';
import { stringsDatatypesExampleJson } from '@/store/api-service/dummy-json/strings-datatypes';

<TableExample data={stringsDatatypesExampleJson.strings.single_type_examples.table1} />`;

export const stringsDatatypeString10Code = `import { TableExample } from '@/components/custom-components/table-example';
import { stringsDatatypesExampleJson } from '@/store/api-service/dummy-json/strings-datatypes';

<TableExample data={stringsDatatypesExampleJson.strings.single_type_examples.table2} />`;

export const stringsDatatypeStringWrap10Code = `import { TableExample } from '@/components/custom-components/table-example';
import { stringsDatatypesExampleJson } from '@/store/api-service/dummy-json/strings-datatypes';

<TableExample data={stringsDatatypesExampleJson.strings.single_type_examples.table3} />`;

export const stringsDatatypeStringWrap15Code = `import { TableExample } from '@/components/custom-components/table-example';
import { stringsDatatypesExampleJson } from '@/store/api-service/dummy-json/strings-datatypes';

<TableExample data={stringsDatatypesExampleJson.strings.single_type_examples.table4} />`;

export const alertsDatatypeOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { alertsDatatypes } from '@/store/api-service/dummy-json/alerts-datatype';

<TableExample data={alertsDatatypes.alerts.overview} />`;

export const alertsDatatypeAlarmCode = `import { TableExample } from '@/components/custom-components/table-example';
import { alertsDatatypes } from '@/store/api-service/dummy-json/alerts-datatype';

<TableExample data={alertsDatatypes.alerts.single_type_examples.table1} />`;

export const myDataDatatypeOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.overview} />`;

export const myDataDatatypeMyWatchlistCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.single_type_examples.table1} />`;

export const myDataDatatypeMyPortfolioCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.single_type_examples.table2} />`;

export const myDataDatatypeMyRatingCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.single_type_examples.table3} />`;

export const myDataDatatypeMyNotesCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.single_type_examples.table4} />`;

export const myDataDatatypeMyAlertsCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.single_type_examples.table5} />`;

export const myDataDatatypeMyDataAnyCode = `import { TableExample } from '@/components/custom-components/table-example';
import { myDataDatatype } from '@/store/api-service/dummy-json/my-data-datatype';

<TableExample data={myDataDatatype.my_data.single_type_examples.table6} />`;

export const companyAndAnalysisOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.overview} />`;

export const companyAndAnalysisFlagCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table1} />`;

export const companyAndAnalysisTechScoreArrowCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table2} />`;

export const companyAndAnalysisTechScoreTextCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table3} />`;

export const companyAndAnalysisTechScoreWithArrowCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table4} />`;

export const companyAndAnalysisEvaluationArrowCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table5} />`;

export const companyAndAnalysisEvaluationTextCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table6} />`;

export const companyAndAnalysisEvaluationArrowWithTextCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table7} />`;

export const companyAndAnalysisRiskCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table8} />`;

export const companyAndAnalysisRiskColoredCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table9} />`;

export const companyAndAnalysisRiskLabelCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table10} />`;

export const companyAndAnalysisRiskLabelBigCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table11} />`;

export const companyAndAnalysisCompanyLinkCode = `import { TableExample } from '@/components/custom-components/table-example';
import { companyAndAnalysisDatatypes } from '@/store/api-service/dummy-json/company-and-analysis-datatypes';

<TableExample data={companyAndAnalysisDatatypes.company_and_analysis.single_type_examples.table12} />`;

export const dataExportOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dataExportDatatypes } from '@/store/api-service/dummy-json/data-export-datatype';

<TableExample data={dataExportDatatypes.data_export.overview} />`;

export const dataExportWordpressCompanyMacroCode = `import { TableExample } from '@/components/custom-components/table-example';
import { dataExportDatatypes } from '@/store/api-service/dummy-json/data-export-datatype';

<TableExample data={dataExportDatatypes.data_export.single_type_examples.table1} />`;

export const chartsOverviewCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.overview} />`;

export const chartsFactorDiagramTinyCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.single_type_examples.table1} />`;

export const chartsFactorDiagramSmallCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.single_type_examples.table2} />`;

export const chartsTechChartTinyCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.single_type_examples.table3} />`;

export const chartsTechChartTinyLinkCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.single_type_examples.table4} />`;

export const chartsTechChartSmallCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.single_type_examples.table5} />`;

export const chartsTechChartMediumCode = `import { TableExample } from '@/components/custom-components/table-example';
import { chartDataType } from '@/store/api-service/dummy-json/chart-datatype';

<TableExample data={chartDataType.charts.single_type_examples.table6} />`;

export const mixedDatatypesTableCode = `import { TableExample } from '@/components/custom-components/table-example';
import { mixedDatatypesTable } from '@/store/api-service/dummy-json/mixed-datatypes-table';

<TableExample data={mixedDatatypesTable.mixed_data_types_tables.table_company_mix1.table} />`;

export const basicTableCode = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/external-components/table';

 <Table>
          <TableHeader>
            <TableRow showHover={false}>
              <TableHead>Name</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">Close</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocksTableJson?.results?.map((stock) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell className="text-right">{stock.close}</TableCell>
                <TableCell>
                  {stock.change.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>`;

export const sortableTableCode = `import { arrowDown, arrowUp } from '@/components/custom-components/icon';

const [ordering, setOrdering] = useState('name');

const handleOrdering = (key: string) => {
  setOrdering(ordering === key ? '-' + key : key);
};

<TableHead
  onClick={() => handleOrdering(col.key)}
  className="cursor-pointer"
>
  <div className="column-header flex items-center gap-1">
    <span>{col.label}</span>
    {isActive
      ? isDesc
        ? arrowUp('text-primary')
        : arrowDown('text-primary')
      : arrowUp('text-muted-foreground')}
  </div>
</TableHead>`;

export const tableWithLinksCode = `import { Link } from '@/components/external-components/link';

<TableCell className="company-link-button">
  <Link href={\`/company/\${stock.id}\`} className="whitespace-nowrap">
    {stock.name}
  </Link>
   <Link href={\`/company/\${stock.id}\`} className="whitespace-nowrap">
    {stock.ticker}
  </Link>
</TableCell>`;

export const tableWithBadgesCode = `import { Badge } from '@/components/external-components/badge';

const getBadgeVariant = (
  sign?: string | number
): 'success' | 'error' | 'warning' | 'primary' | 'neutral' => {
  if (sign === 'positive' || sign === 1) return 'success';
  if (sign === 'negative' || sign === -1) return 'error';
  return sign === 0 ? 'warning' : 'neutral';
};

<TableCell className="text-right">
  <Badge variant={getBadgeVariant(report.sign)} size="small">
    {report.signal}
  </Badge>
</TableCell>`;

export const tableSkeletonCode = `import TableSkeleton from '@/components/custom-components/table-skeleton';

{isLoading ? (
  <TableSkeleton rows={5} columns={4} />
) : (
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        {/* cells */}
      </TableRow>
    ))}
  </TableBody>
)}`;

export const tableWithPaginationCode = `import Paginator from '@/components/custom-components/paginator';

const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

<Paginator
  pageParent={setPage}
  pageSizeParent={setPageSize}
  pageSize={pageSize}
  isAPILoad={isLoading}
  countRow={totalCount}
/>`;

export const tableWithActionsCode = `<TableCell className="text-right">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleDelete(item.id)}
    className="text-destructive hover:text-destructive/80"
  >
    Delete
  </Button>
</TableCell>`;

export const emptyTableCode = `<TableBody>
  {data.length === 0 ? (
    <TableRow showHover={false}>
      <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
        No data available
      </TableCell>
    </TableRow>
  ) : (
    data.map((item) => (
      <TableRow key={item.id}>
        {/* cells */}
      </TableRow>
    ))
  )}
</TableBody>`;

export const tableWithoutHeaderCode = ` <Table>
          <TableBody>
            {tableWithoutHeaderJson?.results?.map((stock) => (
              <TableRow key={stock.id} showHover={false}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell className="text-right">{stock.close}</TableCell>
                <TableCell>
                  {stock.change.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>`;

export const researchTableCode = `   <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {researchTableJson.table_definition?.map((col) => (
                <TableHead key={col.key} className="border-divider dark:border-grey-750 border-t">
                  {col.column_name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {researchTableJson.data?.map((row,index) => (
              <TableRow key={index} showHover={false} className="border-none dark:border-none">
                {row.col_0.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
                {row.col_1.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
                {row.col_2.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
                {row.col_3.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}>{cell.text}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>`;

export const tableWithSingleHeaderCode = `  <Table>
          <TableHeader>
            <TableRow showHover={false}>
              {tableWithSingleHeaderJson?.table_definition?.map((col) => (
                <TableHead key={col.key} className="text-center border-divider dark:border-grey-750 border-t" colSpan={col.colspan}>
                  <RenderHTML html={col.column_name} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableWithSingleHeaderJson?.data?.map((row,index) => (
              <TableRow key={index} showHover={false}>
                {row.col_0.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}><RenderHTML html={cell.text} /></TableCell>
                ))}
                {row.col_1.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}><RenderHTML html={cell.text} /></TableCell>
                ))}
                {row.col_2.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}><RenderHTML html={cell.text} /></TableCell>
                ))}
                {row.col_3.map((cell,cellIndex) => (
                  <TableCell key={cellIndex}><RenderHTML html={cell.text} /></TableCell>
                ))}
              </TableRow>
            ))} 
          </TableBody>
        </Table>`;

// ============================================
// JSON Examples for all Table Types
// ============================================

export const cleanTableExample1Json = {
  clean_table1: {
    table: {
      component_name: 'cleanTable',
      params: {
        data: {
          l0: {
            c0: 'Geir Linløkken',
            c1: 44,
            c2: 'no formatting',
          },
          l1: {
            c0: 'Asbjørn Taugbøl',
            c1: 44,
            c2: 'just a text, do not use formatting from backend',
          },
          l2: {
            c0: 'Fredrik Fyvand',
            c1: 40,
            c2: '55.4 %',
          },
        },
      },
    },
    guide: {
      component_name: 'cleanTable',
      usage:
        'For simple tables with minimal formatting, e.g. health check inlines, company header.',
      best_practice: 'Use for small tables with regular text. Content can be mixed and formatted.',
    },
  },
};

export const cleanTableExample2Json = {
  clean_table2: {
    suited_for_auto_test: true,
    table: {
      component_name: 'cleanTable',
      params: {
        data: {
          l0: {
            c0: 'Geir Linløkken',
            c1: 44,
          },
          l1: {
            c0: 'Asbjørn Taugbøl',
            c1: 44,
          },
        },
      },
    },
    guide: [],
  },
};

export const standardTableExampleJson = {
  standard_table: {
    table1: {
      suited_for_auto_test: true,
      table: {
        component_name: 'standardTable',
        params: {
          data: {
            l0: {
              c0: 'Geir Doe',
              c1: '44',
              c2: '-2.00',
              c3: '-2.5 %',
              c4: '55.33',
            },
            l1: {
              c0: 'Asbjørn Doe',
              c1: '44',
              c2: '+3.00',
              c3: '+3.6 %',
              c4: '32.99',
            },
            l2: {
              c0: 'Fredrik Doe',
              c1: '38',
              c2: '0.00',
              c3: '0.0 %',
              c4: '21.50',
            },
            l3: {
              c0: 'Christian Boss',
              c1: '31',
              c2: '+23.00',
              c3: '+44.0 %',
              c4: '15.00',
            },
            l4: {
              c0: 'Kari Doe',
              c1: '19',
              c2: '+23.00',
              c3: '+44.0 %',
              c4: '15.00',
            },
            l5: {
              c0: 'Investtech mean',
              c1: '33',
              c2: '',
              c3: '+14.0 %',
              c4: '',
            },
          },
          column_headers: {
            i0: 'Name',
            i1: 'Age',
            i2: 'Change',
            i3: 'ChangePct',
            i4: 'Price',
          },
          column_data_type: {
            i0: 'string',
            i1: 'numstring',
            i2: 'numstring',
            i3: 'numstring',
            i4: 'numstring',
          },
          caption: 'caption.Table test',
          width: '',
          backend_converted_from_type: {
            i0: '',
            i1: 'integer',
            i2: 'priceChange',
            i3: 'percentChange',
            i4: 'price',
          },
        },
      },
      guide: {
        component_name: 'standardTable',
        usage: 'For most small and medium sized tables, e.g. dashboard lists, insider trades.',
        best_practice:
          'Flexible, supports header/data formatting, column/row decoration, and more.',
        example_highlights: 'StandardTable: Header and data',
        example_description:
          'Use standardTable for most small and medium sized tables. Simple and flexible.',
      },
    },
    table2: {
      suited_for_auto_test: true,
      table: {
        component_name: 'standardTable',
        params: {
          data: {
            l0: {
              c0: 'Geir Doe',
              c1: '44',
              c2: '-2.00',
              c3: '-2.5 %',
              c4: '55.33',
            },
            l1: {
              c0: 'Asbjørn Doe',
              c1: '44',
              c2: '+3.00',
              c3: '+3.6 %',
              c4: '32.99',
            },
            l2: {
              c0: 'Fredrik Doe',
              c1: '38',
              c2: '0.00',
              c3: '0.0 %',
              c4: '21.50',
            },
            l3: {
              c0: 'Christian Boss',
              c1: '31',
              c2: '+23.00',
              c3: '+44.0 %',
              c4: '15.00',
            },
            l4: {
              c0: 'Kari Doe',
              c1: '19',
              c2: '+23.00',
              c3: '+44.0 %',
              c4: '15.00',
            },
            l5: {
              c0: 'Investtech mean',
              c1: '33',
              c2: '',
              c3: '+14.0 %',
              c4: '',
            },
          },
          column_headers: {
            i0: 'Name',
            i1: 'Age',
            i2: 'Change',
            i3: 'ChangePct',
            i4: 'Price',
          },
          column_data_type: {
            i0: 'string',
            i1: 'numstring',
            i2: 'numstring',
            i3: 'numstring',
            i4: 'numstring',
          },
          caption: 'caption.Table test',
          width: '',
          backend_converted_from_type: {
            i0: '',
            i1: 'integer',
            i2: 'priceChange',
            i3: 'percentChange',
            i4: 'price',
          },
          column_class: {
            i0: 'Header',
            i1: '',
            i2: '',
            i3: '',
            i4: 'Highlight',
          },
        },
      },
      guide: {
        component_name: 'standardTable',
        usage: 'Highlight important columns using column_class.',
        best_practice: 'Use column_class "Header" or "Highlight" to make columns stand out.',
        example_highlights: 'StandardTable: Column highlighting',
        example_description:
          'Use columnClass "Header" or "Highlight" to make important columns stand out.',
      },
    },
    table3: {
      suited_for_auto_test: true,
      table: {
        component_name: 'standardTable',
        params: {
          data: {
            l0: {
              c0: 'Geir Doe',
              c1: '44',
              c2: '-2.00',
              c3: '-2.5 %',
              c4: '55.33',
            },
            l1: {
              c0: 'Asbjørn Doe',
              c1: '44',
              c2: '+3.00',
              c3: '+3.6 %',
              c4: '32.99',
            },
            l2: {
              c0: 'Fredrik Doe',
              c1: '38',
              c2: '0.00',
              c3: '0.0 %',
              c4: '21.50',
            },
            l3: {
              c0: 'Christian Boss',
              c1: '31',
              c2: '+23.00',
              c3: '+44.0 %',
              c4: '15.00',
            },
            l4: {
              c0: 'Kari Doe',
              c1: '19',
              c2: '+23.00',
              c3: '+44.0 %',
              c4: '15.00',
            },
            l5: {
              c0: 'Investtech mean',
              c1: '33',
              c2: '',
              c3: '+14.0 %',
              c4: '',
            },
          },
          column_headers: {
            i0: 'Name',
            i1: 'Age',
            i2: 'Change',
            i3: 'ChangePct',
            i4: 'Price',
          },
          column_data_type: {
            i0: 'string',
            i1: 'numstring',
            i2: 'numstring',
            i3: 'numstring',
            i4: 'numstring',
          },
          caption: 'caption.Table test',
          width: '',
          backend_converted_from_type: {
            i0: '',
            i1: 'integer',
            i2: 'priceChange',
            i3: 'percentChange',
            i4: 'price',
          },
          text_size: 'sm',
          row_class: {
            i0: '',
            i1: 'Lowlight',
            i2: '',
            i3: 'Highlight',
            i4: '',
            i5: 'Summary',
          },
          hover_class: 'Hover',
        },
      },
      guide: {
        component_name: 'standardTable',
        usage: 'Decorate rows and add hover effects.',
        best_practice:
          'Keep styling minimal for a clean look. Use row_class and hover_class as needed.',
        example_highlights: 'StandardTable: Row decoration and hover',
        example_description:
          'Use parameters rowClass and hoverClass. Also overrides default textSize (md) and sets to sm=small to make space for more content.',
      },
    },
    table4: {
      suited_for_auto_test: true,
      table: {
        component_name: 'standardTable',
        params: {
          data: {
            l0: {
              c0: 'Revenues',
              c1: 10791,
              c2: 8478,
              c3: 7581,
              c4: 6883,
            },
            l1: {
              c0: 'Profit for the year',
              c1: 2871,
              c2: -283,
              c3: 2040,
              c4: 1848,
            },
            l2: {
              c0: 'Profit margin',
              c1: 3.5,
              c2: 3.3,
              c3: 2.7,
              c4: 2.7,
            },
            l3: {
              c0: 'Book value',
              c1: 14115,
              c2: 12901,
              c3: 11705,
              c4: 7217,
            },
            l4: {
              c0: 'Equity ratio',
              c1: 40.3,
              c2: 38.3,
              c3: 36.3,
              c4: 35.3,
            },
            l5: {
              c0: 'Revenue per share',
              c1: 6.3,
              c2: 4.9,
              c3: 4.4,
              c4: 4,
            },
            l6: {
              c0: 'Earnings per share',
              c1: 1.7,
              c2: -0.2,
              c3: 1.2,
              c4: 1.1,
            },
            l7: {
              c0: 'Dividend per share',
              c1: 0.7,
              c2: 0.7,
              c3: 0.7,
              c4: 0.7,
            },
            l8: {
              c0: 'Dividend yield',
              c1: 3.5,
              c2: 3.5,
              c3: 3.5,
              c4: 3.5,
            },
          },
          row_class: {
            i0: '',
            i1: '',
            i2: 'Highlight',
            i3: '',
            i4: 'Highlight',
            i5: '',
            i6: '',
            i7: '',
            i8: 'Highlight',
          },
          row_data_type: {
            i0: 'value',
            i1: 'value',
            i2: 'percent',
            i3: 'value',
            i4: 'percent',
            i5: 'price',
            i6: 'price',
            i7: 'price',
            i8: 'priceChange',
          },
          column_headers: {
            i0: 'MNOK',
            i1: '2021',
            i2: '2022',
            i3: '2023',
            i4: '2024-Q1',
          },
          column_class: {
            i0: '',
            i1: '',
            i2: '',
            i3: '',
            i4: 'Highlight',
          },
          column_align: {
            i0: 'left',
            i1: 'right',
            i2: 'right',
            i3: 'right',
            i4: 'right',
          },
          caption: 'caption.Table test',
          text_size: 'sm',
          width: '1/2',
          hover_class: 'Hover',
        },
      },
      guide: {
        component_name: 'standardTable',
        usage: 'Transposed table with row_data_type for each row.',
        best_practice: 'Use row_data_type for tables where each row is a different metric.',
        example_highlights:
          'StandardTable: Transposed, i.e dataType-settings for rows instead of columns',
        example_description:
          'If each line contains same type of data, the dataType-parameter may be set for rows instead of columns. Note that rowDataType is set below, but that columnDataType is not set.',
      },
    },
    table5: {
      suited_for_auto_test: true,
      table: {
        component_name: 'standardTable',
        params: {
          data: {
            l0: {
              c0: 'Stolt-Nielsen',
              c1: '1',
              c2: '1',
              c3: 'CEO buys stocks for 400 kNOK',
              c4: '44',
              c5: '44',
              c6: 'TechScore is positive',
              c7: 'TechBuy',
            },
            l1: {
              c0: 'Autostore',
              c1: '-1',
              c2: '-1',
              c3: 'CFO sells stocks for 2800 kNOK',
              c4: '22',
              c5: '22',
              c6: 'TechScore is neutral',
              c7: 'TechNeutral',
            },
            l2: {
              c0: 'Orkla',
              c1: '1',
              c2: '1',
              c3: 'Peter Parker buys stocks for 20000 kNOK',
              c4: '-55',
              c5: '-55',
              c6: 'TechScore is negative',
              c7: 'TechSell',
            },
          },
          column_headers: {
            i0: 'Name',
            i1: 'InsideSignalTrigger',
            i2: 'InsideSignal',
            i3: 'InsiderText',
            i4: 'TechScoreTrigger',
            i5: 'TechScore',
            i6: 'Tech text',
            i7: 'Tech recommendation',
          },
          column_data_type: {
            i0: 'string',
            i1: 'numstring',
            i2: 'numstring',
            i3: 'string',
            i4: 'numstring',
            i5: 'numstring',
            i6: 'string',
            i7: 'string',
          },
          column_style_trigger: {
            i0: '',
            i1: 'styleTrigger.signToColor',
            i2: '',
            i3: 'styleUser.signToColor',
            i4: 'styleTrigger.techScoreTocolor',
            i5: '',
            i6: 'styleUser.techScoreTocolor',
            i7: 'styleUser.techScoreTocolor',
          },
          column_hidden: {
            i0: '',
            i1: 'hiddenForAll',
            i2: '',
            i3: '',
            i4: 'hiddenForAll',
            i5: '',
            i6: '',
            i7: '',
          },
          width: '',
          backend_converted_from_type: {
            i0: '',
            i1: 'integer',
            i2: 'integer',
            i3: '',
            i4: 'integer',
            i5: 'integer',
            i6: '',
            i7: '',
          },
        },
      },
      guide: {
        component_name: 'standardTable',
        usage: 'Data triggered styling and hidden columns.',
        best_practice: 'Use column_style_trigger and column_hidden for advanced formatting.',
        example_highlights: 'Data triggered styling and hidden columns',
        example_description:
          'Value of one trigger column can decide styling of one or more other columns.',
      },
    },
  },
};

export const researchTableExampleJson = {
  research_table: {
    table1: {
      suited_for_auto_test: true,
      table: {
        component_name: 'researchTable',
        params: {
          data: {
            l0: {
              c0: 'Positive signals medium term',
              c1: '16.3%',
            },
            l1: {
              c0: 'Reference index',
              c1: '9.7%',
            },
            l2: {
              c0: 'Excess return',
              c1: '6.5pp',
            },
          },
          table_header: 'Annualised return (based on 66-day figures)',
          column_align: {
            i0: 'left',
            i1: 'right',
          },
        },
      },
      guide: {
        component_name: 'researchTable',
        usage: 'For research articles, reports, and Investtech research data.',
        best_practice: 'Use for tables with special header formatting and spacing.',
        example_highlights: 'ResearchTable: For research type data',
        example_description:
          'Use researchTable in research articles and reports, and on help/info pages containing Investtech-research data.',
      },
    },
    table2: {
      suited_for_auto_test: true,
      table: {
        component_name: 'researchTable',
        params: {
          data: {
            l0: {
              c0: 'Buy signal',
              c1: '21.9%',
              c2: '20.4%',
              c3: '20.9%',
              c4: '12.4%',
              c5: '20.0%',
            },
            l1: {
              c0: 'Sell signal',
              c1: '-0.3%',
              c2: '5.6%',
              c3: '-3.1%',
              c4: '1.0%',
              c5: '2.2%',
            },
            l2: {
              c0: 'Benchmark',
              c1: '12.2 %',
              c2: '14.2 %',
              c3: '10.1 %',
              c4: '4.5 %',
              c5: '12.1 %',
            },
            l3: {
              c0: 'Excess return buy signal',
              c1: '9.8 pp',
              c2: '6.1 pp',
              c3: '10.8 pp',
              c4: '7.9 pp',
              c5: '7.9 pp',
            },
            l4: {
              c0: 'Excess return sell signal',
              c1: '-12.4 pp',
              c2: '-8.6 pp',
              c3: '-13.2 pp',
              c4: '-3.5 pp',
              c5: '-9.9 pp',
            },
          },
          column_headers: {
            i0: 'Annualised return (based on 66-day figures)',
            i1: 'Norway',
            i2: 'Sweden',
            i3: 'Denmark',
            i4: 'Finland',
            i5: 'Weighted average',
          },
          column_align: {
            i0: 'left',
            i1: 'right',
            i2: 'right',
            i3: 'right',
            i4: 'right',
            i5: 'right',
          },
          caption: 'Investtech research. (C) Investtech',
        },
      },
      guide: {
        component_name: 'researchTable',
        usage: 'For research tables with multiple columns and caption.',
        best_practice: 'Use column_headers and caption for clarity.',
        example_highlights: 'ResearchTable: Example 2',
        example_description: '',
      },
    },
    table3: {
      suited_for_auto_test: true,
      table: {
        component_name: 'researchTable',
        params: {
          data: {
            l0: {
              c0: 'Buy signal, rising trend',
              c1: 12349,
              c2: 23327,
              c3: 5663,
              c4: 4619,
              c5: 45958,
            },
            l1: {
              c0: 'Sell signal, falling trend',
              c1: 8343,
              c2: 12234,
              c3: 5663,
              c4: 4619,
              c5: 26951,
            },
            l2: {
              c0: 'Total',
              c1: 20692,
              c2: 35561,
              c3: 11326,
              c4: 9238,
              c5: 72909,
            },
            l3: {
              c0: 'Share of total',
              c1: 28.3,
              c2: 48.8,
              c3: 15.5,
              c4: 12.7,
              c5: 100,
            },
          },
          column_headers: {
            i0: '',
            i1: 'Norway',
            i2: 'Sweden',
            i3: 'Denmark',
            i4: 'Finland',
            i5: 'Total',
          },
          column_align: {
            i0: 'left',
            i1: 'right',
            i2: 'right',
            i3: 'right',
            i4: 'right',
            i5: 'right',
          },
          row_class: {
            i0: '',
            i1: '',
            i2: '',
            i3: 'Summary',
          },
          row_data_type: {
            i0: 'count',
            i1: 'count',
            i2: 'count',
            i3: 'percent',
          },
        },
      },
      guide: {
        component_name: 'researchTable',
        usage: 'Research table with summary row and row_data_type.',
        best_practice: 'Use row_class and row_data_type for summary and percent rows.',
        example_highlights: 'ResearchTable: Example 3',
        example_description: '',
      },
    },
    table4: {
      suited_for_auto_test: true,
      table: {
        component_name: 'researchTable',
        params: {
          data: {
            l0: {
              c0: 'Buy signal',
              c1: '21.9%',
              c2: '20.4%',
              c3: '20.9%',
              c4: '12.4%',
              c5: '20.0%',
            },
            l1: {
              c0: 'Sell signal',
              c1: '-0.3%',
              c2: '5.6%',
              c3: '-3.1%',
              c4: '1.0%',
              c5: '2.2%',
            },
            l2: {
              c0: 'Benchmark',
              c1: '12.2 %',
              c2: '14.2 %',
              c3: '10.1 %',
              c4: '4.5 %',
              c5: '12.1 %',
            },
            l3: {
              c0: 'Excess return buy signal',
              c1: '9.8 pp',
              c2: '6.1 pp',
              c3: '10.8 pp',
              c4: '7.9 pp',
              c5: '7.9 pp',
            },
            l4: {
              c0: 'Excess return sell signal',
              c1: '-12.4 pp',
              c2: '-8.6 pp',
              c3: '-13.2 pp',
              c4: '-3.5 pp',
              c5: '-9.9 pp',
            },
          },
          column_headers: {
            i0: 'Annualised return (based on 66-day figures)',
            i1: 'Norway',
            i2: 'Sweden',
            i3: 'Denmark',
            i4: 'Finland',
            i5: 'Weighted average',
          },
          column_align: {
            i0: 'left',
            i1: 'right',
            i2: 'right',
            i3: 'right',
            i4: 'right',
            i5: 'right',
          },
          caption: 'Investtech research. (C) Investtech',
          column_hidden: {
            i0: '',
            i1: 'hiddenForAll',
            i2: 'hiddenForMobile',
            i3: 'hiddenForMobile',
            i4: 'hiddenForMobile',
            i5: 'hiddenForDesktop',
          },
        },
      },
      guide: {
        component_name: 'researchTable',
        usage: 'Research table with hidden columns for different devices.',
        best_practice: 'Use column_hidden for responsive design.',
        example_highlights: 'ResearchTable: Example 4. Hidden columns on Mobile and Pad',
        example_description:
          'In this example columns 2 is hidden for all, columns 3,4 and 5 are hidden on mobile, column 6 hidden for desktop.',
      },
    },
  },
};

export const mixedDatatypesTable = {
  mixed_data_types_tables: {
    table_company_mix1: {
      suited_for_auto_test: true,
      table: {
        component_name: 'standardTable',
        params: {
          data: {
            l0: {
              c0: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'no',
              },
              c1: {
                c_name: 'companyLink',
                url: '?company_id=100103',
                text: 'Norsk Hydro',
              },
              c2: '89.64',
              c3: {
                c_name: 'labelValueColored',
                text: '+2.2 %',
                size: 'medium',
                color: 'positive',
              },
              c4: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
                text: '88',
                text_position: 'first',
              },
              c5: {
                c_name: 'textValueColored',
                text: '<!--01-->Medium',
                color: 'neutral',
              },
              c6: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100103,
                chart_param: 'chartId=4&CompanyID=100103&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100103%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=100103',
                alt_text: 'Click to view company page',
              },
              c7: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 100103,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100103',
                api_full: '?context=factor_diagram&company_id=100103',
              },
            },
            l1: {
              c0: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'no',
              },
              c1: {
                c_name: 'companyLink',
                url: '?company_id=100275',
                text: 'Telenor',
              },
              c2: '150.25',
              c3: {
                c_name: 'labelValueColored',
                text: '-1.5 %',
                size: 'medium',
                color: 'negative',
              },
              c4: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
                text: '45',
                text_position: 'first',
              },
              c5: {
                c_name: 'textValueColored',
                text: '<!--00-->Lav',
                color: 'positive',
              },
              c6: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100275,
                chart_param: 'chartId=4&CompanyID=100275&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100275%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=100275',
                alt_text: 'Click to view company page',
              },
              c7: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 100275,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100275',
                api_full: '?context=factor_diagram&company_id=100275',
              },
            },
            l2: {
              c0: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'no',
              },
              c1: {
                c_name: 'companyLink',
                url: '?company_id=100782',
                text: 'Oncoinvent ASA',
              },
              c2: '42.97',
              c3: {
                c_name: 'labelValueColored',
                text: '-1.1 %',
                size: 'medium',
                color: 'negative',
              },
              c4: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'negative',
                direction: 'down',
                text: '-66',
                text_position: 'first',
              },
              c5: {
                c_name: 'textValueColored',
                text: '<!--03-->Ekstrem',
                color: 'negative',
                icon: 'warning',
                text_position: 'last',
              },
              c6: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100782,
                chart_param: 'chartId=4&CompanyID=100782&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100782%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=100782',
                alt_text: 'Click to view company page',
              },
              c7: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 100782,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100782',
                api_full: '?context=factor_diagram&company_id=100782',
              },
            },
            l3: {
              c0: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'se',
              },
              c1: {
                c_name: 'companyLink',
                url: '?company_id=46100637',
                text: 'Ericsson B',
              },
              c2: '100.60',
              c3: {
                c_name: 'labelValueColored',
                text: '-0.1 %',
                size: 'medium',
                color: 'negative',
              },
              c4: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'neutral',
                direction: 'right',
                text: '12',
                text_position: 'first',
              },
              c5: {
                c_name: 'textValueColored',
                text: '<!--01-->Medium',
                color: 'neutral',
              },
              c6: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 46100637,
                chart_param: 'chartId=4&CompanyID=46100637&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D46100637%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=46100637',
                alt_text: 'Click to view company page',
              },
              c7: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 46100637,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=46100637',
                api_full: '?context=factor_diagram&company_id=46100637',
              },
            },
            l4: {
              c0: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'no',
              },
              c1: {
                c_name: 'companyLink',
                url: '?company_id=46109100',
                text: 'Immunovia',
              },
              c2: '0.19',
              c3: {
                c_name: 'labelValueColored',
                text: '+3.8 %',
                size: 'medium',
                color: 'positive',
              },
              c4: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'negative',
                direction: 'down',
                text: '-96',
                text_position: 'first',
              },
              c5: {
                c_name: 'textValueColored',
                text: '<!--03-->Ekstrem',
                color: 'negative',
                icon: 'warning',
                text_position: 'last',
              },
              c6: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 46109100,
                chart_param: 'chartId=4&CompanyID=46109100&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D46109100%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=46109100',
                alt_text: 'Click to view company page',
              },
              c7: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 46109100,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=46109100',
                api_full: '?context=factor_diagram&company_id=46109100',
              },
            },
          },
          column_headers: {
            i0: '',
            i1: 'Company name',
            i2: 'Price',
            i3: 'Change',
            i4: 'Investtech score',
            i5: 'Risk',
            i6: 'Chart w link',
            i7: 'FactorDiagram',
          },
          column_data_type: {
            i0: 'icon_struct',
            i1: 'link_struct',
            i2: 'numstring',
            i3: 'label_struct',
            i4: 'icon_struct',
            i5: 'string_struct',
            i6: 'img_tech_chart_struct',
            i7: 'img_factor_diagram_struct',
          },
          caption: 'CompanyMix1. Table with different data types for company and analysis.',
          width: '',
          backend_converted_from_type: {
            i0: 'flag',
            i1: 'companyLink',
            i2: 'price',
            i3: 'percentChange(label,medium)',
            i4: 'techScoreWithArrow',
            i5: 'risk(colored)',
            i6: 'techChartTiny(chartId=4,link)',
            i7: 'factorDiagramTiny',
          },
        },
      },
      guide: {
        info: 'Mix of different numeric, date, company and myData types in one table.',
      },
    },
  },
};

export const numericDatatypeExampleJson = {
  numeric: {
    overview: {
      suited_for_auto_test: false,
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'price',
            c1: 123.45,
            c2: 0.12,
            c3: 0.01523,
            c4: 'Stock price',
          },
          l1: {
            c0: 'priceCurrency',
            c1: '123.45;NOK',
            c2: '0.12;EUR',
            c3: '0.01523;EUR',
            c4: 'Stock price with currency',
          },
          l2: {
            c0: 'pricePrecision4',
            c1: 123.45,
            c2: 0.12,
            c3: 0.01523,
            c4: 'Stock price',
          },
          l3: {
            c0: 'percent',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent',
          },
          l4: {
            c0: 'priceChange',
            c1: 12.34,
            c2: 0,
            c3: -3.123,
            c4: 'Absolute change in stock price',
          },
          l5: {
            c0: 'priceChange(label)',
            c1: 12.34,
            c2: 0,
            c3: -3.123,
            c4: 'Absolute change in stock price, with colored label',
          },
          l6: {
            c0: 'priceChangePrecision4',
            c1: 12.34,
            c2: 0,
            c3: -3.123,
            c4: 'Absolute change in stock price, 4 decimals',
          },
          l7: {
            c0: 'priceChangePrecision4(label)',
            c1: 12.34,
            c2: 0,
            c3: -3.123,
            c4: 'Absolute change in stock price, 4 decimals, with colored label',
          },
          l8: {
            c0: 'percentChange',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent change in stock price',
          },
          l9: {
            c0: 'percentChange(colored)',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent change in stock price, colored',
          },
          l10: {
            c0: 'percentChange(label)',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent change in stock price, with label',
          },
          l11: {
            c0: 'percentChange(label,small)',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent change in stock price, with small label',
          },
          l12: {
            c0: 'percentChange(label,medium)',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent change in stock price, with medium label',
          },
          l13: {
            c0: 'percentChange(label,big)',
            c1: 12.34,
            c2: 0,
            c3: -0.17,
            c4: 'Percent change in stock price, with big label',
          },
          l14: {
            c0: 'value',
            c1: 123456789,
            c2: 0,
            c3: -987654,
            c4: 'Value of company, portfolio, equity etc.',
          },
          l15: {
            c0: 'count',
            c1: 123456,
            c2: 0,
            c3: -987654,
            c4: 'Number of stocks, number of samples etc.',
          },
          l16: {
            c0: 'count',
            c1: 3.1,
            c2: 20,
            c3: 432,
            c4: 'Number of stocks, number of samples etc.',
          },
          l17: {
            c0: 'integer',
            c1: 1234,
            c2: 0,
            c3: 18.81,
            c4: 'Integer value',
          },
          l18: {
            c0: 'signedInteger',
            c1: 1234,
            c2: 0,
            c3: -457,
            c4: 'Signed integer value',
          },
          l19: {
            c0: 'decimal1',
            c1: 1234,
            c2: 0.02,
            c3: -8.87,
            c4: 'Decimal with 1 decimal place',
          },
          l20: {
            c0: 'decimal2',
            c1: 1234,
            c2: 0.02,
            c3: -8.87,
            c4: 'Decimal with 2 decimal places',
          },
          l21: {
            c0: 'decimal3',
            c1: 1234,
            c2: 0.02,
            c3: -8.87,
            c4: 'Decimal with 3 decimal places',
          },
          l22: {
            c0: 'decimalPos',
            c1: 1234,
            c2: 0.02,
            c3: -8.87,
            c4: 'Decimal with positive/negative sign',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Input1',
          i2: 'Input2',
          i3: 'Input3',
          i4: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'general',
          i2: 'general',
          i3: 'general',
          i4: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Numeric',
      usage: 'Examples of numeric data types.',
      best_practice:
        'Use most specific data type for each column to ensure consistent and proper formatting in frontend. For example, use "price" or "pricePrecision4" for stock prices (not "decimal2" or "string"), "percentChange" for price percentage change, etc.',
      front_developer_notes:
        'Use the json for single_type_examples as direct input to the front end table component. Display should be using data type formatting rules for the "formatted output" column, that are provided with the data type in columnDataType.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'price',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: price',
          data: {
            l0: {
              c0: 'value1',
              c1: 123.45,
              c2: '123.45',
            },
            l1: {
              c0: 'value2',
              c1: 0.12,
              c2: '0.12',
            },
            l2: {
              c0: 'value3',
              c1: 0.01523,
              c2: '0.02',
            },
          },
          column_headers: {
            i0: 'price-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'price',
          },
        },
      },
      table2: {
        component_name: 'standardTable',
        data_type_example_name: 'priceCurrency',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: priceCurrency',
          data: {
            l0: {
              c0: 'value1',
              c1: '123.45;NOK',
              c2: '123.45 NOK',
            },
            l1: {
              c0: 'value2',
              c1: '0.12;EUR',
              c2: '0.12 EUR',
            },
            l2: {
              c0: 'value3',
              c1: '0.01523;EUR',
              c2: '0.02 EUR',
            },
          },
          column_headers: {
            i0: 'priceCurrency-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'priceCurrency',
          },
        },
      },
      table3: {
        component_name: 'standardTable',
        data_type_example_name: 'pricePrecision4',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: pricePrecision4',
          data: {
            l0: {
              c0: 'value1',
              c1: 123.45,
              c2: '123.45',
            },
            l1: {
              c0: 'value2',
              c1: 0.12,
              c2: '0.12',
            },
            l2: {
              c0: 'value3',
              c1: 0.01523,
              c2: '0.0152',
            },
          },
          column_headers: {
            i0: 'pricePrecision4-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'pricePrecision4',
          },
        },
      },
      table4: {
        component_name: 'standardTable',
        data_type_example_name: 'percent',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percent',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: '12.3 %',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0.0 %',
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: '-0.2 %',
            },
          },
          column_headers: {
            i0: 'percent-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percent',
          },
        },
      },
      table5: {
        component_name: 'standardTable',
        data_type_example_name: 'priceChange',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: priceChange',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: '+12.34',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0.00',
            },
            l2: {
              c0: 'value3',
              c1: -3.123,
              c2: '-3.12',
            },
          },
          column_headers: {
            i0: 'priceChange-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'priceChange',
          },
        },
      },
      table6: {
        component_name: 'standardTable',
        data_type_example_name: 'priceChange(label)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: priceChange(label)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'labelValueColored',
                text: '+12.34',
                size: 'medium',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'labelValueColored',
                text: '0.00',
                size: 'medium',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -3.123,
              c2: {
                c_name: 'labelValueColored',
                text: '-3.12',
                size: 'medium',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'priceChange(label)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'priceChange(label)',
          },
        },
      },
      table7: {
        component_name: 'standardTable',
        data_type_example_name: 'priceChangePrecision4',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: priceChangePrecision4',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: '+12.34',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0.00',
            },
            l2: {
              c0: 'value3',
              c1: -3.123,
              c2: '-3.1230',
            },
          },
          column_headers: {
            i0: 'priceChangePrecision4-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'priceChangePrecision4',
          },
        },
      },
      table8: {
        component_name: 'standardTable',
        data_type_example_name: 'priceChangePrecision4(label)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: priceChangePrecision4(label)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'labelValueColored',
                text: '+12.34',
                size: 'medium',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'labelValueColored',
                text: '0.00',
                size: 'medium',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -3.123,
              c2: {
                c_name: 'labelValueColored',
                text: '-3.1230',
                size: 'medium',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'priceChangePrecision4(label)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'priceChangePrecision4(label)',
          },
        },
      },
      table9: {
        component_name: 'standardTable',
        data_type_example_name: 'percentChange',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percentChange',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: '+12.3 %',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0.0 %',
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: '-0.2 %',
            },
          },
          column_headers: {
            i0: 'percentChange-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percentChange',
          },
        },
      },
      table10: {
        component_name: 'standardTable',
        data_type_example_name: 'percentChange(colored)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percentChange(colored)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'textValueColored',
                text: '+12.3 %',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'textValueColored',
                text: '0.0 %',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: {
                c_name: 'textValueColored',
                text: '-0.2 %',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'percentChange(colored)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percentChange(colored)',
          },
        },
      },
      table11: {
        component_name: 'standardTable',
        data_type_example_name: 'percentChange(label)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percentChange(label)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'labelValueColored',
                text: '+12.3 %',
                size: 'medium',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'labelValueColored',
                text: '0.0 %',
                size: 'medium',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: {
                c_name: 'labelValueColored',
                text: '-0.2 %',
                size: 'medium',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'percentChange(label)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percentChange(label)',
          },
        },
      },
      table12: {
        component_name: 'standardTable',
        data_type_example_name: 'percentChange(label,small)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percentChange(label,small)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'labelValueColored',
                text: '+12.3 %',
                size: 'small',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'labelValueColored',
                text: '0.0 %',
                size: 'small',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: {
                c_name: 'labelValueColored',
                text: '-0.2 %',
                size: 'small',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'percentChange(label,small)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percentChange(label,small)',
          },
        },
      },
      table13: {
        component_name: 'standardTable',
        data_type_example_name: 'percentChange(label,medium)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percentChange(label,medium)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'labelValueColored',
                text: '+12.3 %',
                size: 'medium',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'labelValueColored',
                text: '0.0 %',
                size: 'medium',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: {
                c_name: 'labelValueColored',
                text: '-0.2 %',
                size: 'medium',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'percentChange(label,medium)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percentChange(label,medium)',
          },
        },
      },
      table14: {
        component_name: 'standardTable',
        data_type_example_name: 'percentChange(label,big)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: percentChange(label,big)',
          data: {
            l0: {
              c0: 'value1',
              c1: 12.34,
              c2: {
                c_name: 'labelValueColored',
                text: '+12.3 %',
                size: 'big',
                color: 'positive',
              },
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: {
                c_name: 'labelValueColored',
                text: '0.0 %',
                size: 'big',
                color: 'neutral',
              },
            },
            l2: {
              c0: 'value3',
              c1: -0.17,
              c2: {
                c_name: 'labelValueColored',
                text: '-0.2 %',
                size: 'big',
                color: 'negative',
              },
            },
          },
          column_headers: {
            i0: 'percentChange(label,big)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'percentChange(label,big)',
          },
        },
      },
      table15: {
        component_name: 'standardTable',
        data_type_example_name: 'value',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: value',
          data: {
            l0: {
              c0: 'value1',
              c1: 123456789,
              c2: '123&nbsp;456&nbsp;789',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0',
            },
            l2: {
              c0: 'value3',
              c1: -987654,
              c2: '-987&nbsp;654',
            },
          },
          column_headers: {
            i0: 'value-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'value',
          },
        },
      },
      table16: {
        component_name: 'standardTable',
        data_type_example_name: 'count',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: count',
          data: {
            l0: {
              c0: 'value1',
              c1: 123456,
              c2: '123&nbsp;456',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0',
            },
            l2: {
              c0: 'value3',
              c1: -987654,
              c2: '-987&nbsp;654',
            },
          },
          column_headers: {
            i0: 'count-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'count',
          },
        },
      },
      table17: {
        component_name: 'standardTable',
        data_type_example_name: 'count',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: count',
          data: {
            l0: {
              c0: 'value1',
              c1: 3.1,
              c2: '3',
            },
            l1: {
              c0: 'value2',
              c1: 20,
              c2: '20',
            },
            l2: {
              c0: 'value3',
              c1: 432,
              c2: '432',
            },
          },
          column_headers: {
            i0: 'count-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'count',
          },
        },
      },
      table18: {
        component_name: 'standardTable',
        data_type_example_name: 'integer',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: integer',
          data: {
            l0: {
              c0: 'value1',
              c1: 1234,
              c2: '1234',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0',
            },
            l2: {
              c0: 'value3',
              c1: 18.81,
              c2: '19',
            },
          },
          column_headers: {
            i0: 'integer-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'integer',
          },
        },
      },
      table19: {
        component_name: 'standardTable',
        data_type_example_name: 'signedInteger',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: signedInteger',
          data: {
            l0: {
              c0: 'value1',
              c1: 1234,
              c2: '+1234',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '0',
            },
            l2: {
              c0: 'value3',
              c1: -457,
              c2: '-457',
            },
          },
          column_headers: {
            i0: 'signedInteger-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'signedInteger',
          },
        },
      },
      table20: {
        component_name: 'standardTable',
        data_type_example_name: 'decimal1',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: decimal1',
          data: {
            l0: {
              c0: 'value1',
              c1: 1234,
              c2: '1234.0',
            },
            l1: {
              c0: 'value2',
              c1: 0.02,
              c2: '0.0',
            },
            l2: {
              c0: 'value3',
              c1: -8.87,
              c2: '-8.9',
            },
          },
          column_headers: {
            i0: 'decimal1-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'decimal1',
          },
        },
      },
      table21: {
        component_name: 'standardTable',
        data_type_example_name: 'decimal2',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: decimal2',
          data: {
            l0: {
              c0: 'value1',
              c1: 1234,
              c2: '1234.00',
            },
            l1: {
              c0: 'value2',
              c1: 0.02,
              c2: '0.02',
            },
            l2: {
              c0: 'value3',
              c1: -8.87,
              c2: '-8.87',
            },
          },
          column_headers: {
            i0: 'decimal2-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'decimal2',
          },
        },
      },
      table22: {
        component_name: 'standardTable',
        data_type_example_name: 'decimal3',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: decimal3',
          data: {
            l0: {
              c0: 'value1',
              c1: 1234,
              c2: '1234.000',
            },
            l1: {
              c0: 'value2',
              c1: 0.02,
              c2: '0.020',
            },
            l2: {
              c0: 'value3',
              c1: -8.87,
              c2: '-8.870',
            },
          },
          column_headers: {
            i0: 'decimal3-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'decimal3',
          },
        },
      },
      table23: {
        component_name: 'standardTable',
        data_type_example_name: 'decimalPos',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: decimalPos',
          data: {
            l0: {
              c0: 'value1',
              c1: 1234,
              c2: '1234.00',
            },
            l1: {
              c0: 'value2',
              c1: 0.02,
              c2: '0.02',
            },
            l2: {
              c0: 'value3',
              c1: -8.87,
              c2: '',
            },
          },
          column_headers: {
            i0: 'decimalPos-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'numstring',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'decimalPos',
          },
        },
      },
    },
  },
};

export const dateDatatypeExampleJson = {
  date_and_time: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'dateLong',
            c1: '2026-02-03',
            c2: '2024-12-31',
            c3: 'Long date format (YYYY-MM-DD)',
          },
          l1: {
            c0: 'dateYYYYMMDD',
            c1: '2026-02-03',
            c2: '2024-12-31',
            c3: 'Date as YYYY-MM-DD or YYYYMMDD',
          },
          l2: {
            c0: 'dateYYYYMMDD',
            c1: '2024-3-22',
            c2: 20240322,
            c3: 'Date as string or integer YYYYMMDD',
          },
          l3: {
            c0: 'dateYYYYMMDD',
            c1: 1742607600,
            c2: 1764844800,
            c3: 'Date as unix timestamp',
          },
          l4: {
            c0: 'dateAndTime',
            c1: '2026-02-03 12:34:56',
            c2: '2026-02-03',
            c3: 'Date and time (YYYY-MM-DD HH:MM:SS)',
          },
          l5: {
            c0: 'time',
            c1: '12:34:56',
            c2: '02:49',
            c3: 'Time as HH:MM:SS or HHMM',
          },
          l6: {
            c0: 'time',
            c1: '2026-02-03 12:34:56',
            c2: 0,
            c3: 'Time from datetime or zero',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Input1',
          i2: 'Input2',
          i3: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'general',
          i2: 'general',
          i3: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Date and Time',
      usage: 'Examples of date and time data types.',
      best_practice:
        'Use the most specific date/time type for each column. Accepts string, integer, or unix timestamp as input.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'dateLong',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: dateLong',
          data: {
            l0: {
              c0: 'value1',
              c1: '2026-02-03',
              c2: '3. feb 2026',
            },
            l1: {
              c0: 'value2',
              c1: '2024-12-31',
              c2: '31. des 2024',
            },
          },
          column_headers: {
            i0: 'dateLong-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'dateLong',
          },
        },
      },
      table2: {
        component_name: 'standardTable',
        data_type_example_name: 'dateYYYYMMDD',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: dateYYYYMMDD',
          data: {
            l0: {
              c0: 'value1',
              c1: '2026-02-03',
              c2: '2026-02-03',
            },
            l1: {
              c0: 'value2',
              c1: '2024-12-31',
              c2: '2024-12-31',
            },
          },
          column_headers: {
            i0: 'dateYYYYMMDD-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'dateYYYYMMDD',
          },
        },
      },
      table3: {
        component_name: 'standardTable',
        data_type_example_name: 'dateYYYYMMDD',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: dateYYYYMMDD',
          data: {
            l0: {
              c0: 'value1',
              c1: '2024-3-22',
              c2: 'dateerror: got "2024-3-22", required YYYYMMDD or YYYY-MM-DD.',
            },
            l1: {
              c0: 'value2',
              c1: 20240322,
              c2: '2024-03-22',
            },
          },
          column_headers: {
            i0: 'dateYYYYMMDD-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'dateYYYYMMDD',
          },
        },
      },
      table4: {
        component_name: 'standardTable',
        data_type_example_name: 'dateYYYYMMDD',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: dateYYYYMMDD',
          data: {
            l0: {
              c0: 'value1',
              c1: 1742607600,
              c2: '2025-03-22',
            },
            l1: {
              c0: 'value2',
              c1: 1764844800,
              c2: '2025-12-04',
            },
          },
          column_headers: {
            i0: 'dateYYYYMMDD-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'dateYYYYMMDD',
          },
        },
      },
      table5: {
        component_name: 'standardTable',
        data_type_example_name: 'dateAndTime',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: dateAndTime',
          data: {
            l0: {
              c0: 'value1',
              c1: '2026-02-03 12:34:56',
              c2: '3. feb 2026, 12:34',
            },
            l1: {
              c0: 'value2',
              c1: '2026-02-03',
              c2: '3. feb 2026, ',
            },
          },
          column_headers: {
            i0: 'dateAndTime-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'dateAndTime',
          },
        },
      },
      table6: {
        component_name: 'standardTable',
        data_type_example_name: 'time',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: time',
          data: {
            l0: {
              c0: 'value1',
              c1: '12:34:56',
              c2: '12:34',
            },
            l1: {
              c0: 'value2',
              c1: '02:49',
              c2: '02:49',
            },
          },
          column_headers: {
            i0: 'time-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'time',
          },
        },
      },
      table7: {
        component_name: 'standardTable',
        data_type_example_name: 'time',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: time',
          data: {
            l0: {
              c0: 'value1',
              c1: '2026-02-03 12:34:56',
              c2: '12:34',
            },
            l1: {
              c0: 'value2',
              c1: 0,
              c2: '00:00',
            },
          },
          column_headers: {
            i0: 'time-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'time',
          },
        },
      },
    },
  },
};

export const stringsDatatypesExampleJson = {
  strings: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'string',
            c1: 'Petroleum Geo Services',
            c2: 'Equinor',
            c3: 'Norsk Hydro',
            c4: 'General string',
          },
          l1: {
            c0: 'string(10)',
            c1: 'Petroleum Geo Services',
            c2: 'Equinor',
            c3: 'Norsk Hydro',
            c4: 'String with max length 10',
          },
          l2: {
            c0: 'stringWrap(10)',
            c1: 'long text that is wrapped by client when needed',
            c2: 'xxx',
            c3: 'xxx',
            c4: 'String with wrapping, max length 10',
          },
          l3: {
            c0: 'stringWrap(15)',
            c1: 'long text that is wrapped by client when needed',
            c2: 'xxx',
            c3: 'xxx',
            c4: 'String with wrapping, max length 15',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Input1',
          i2: 'Input2',
          i3: 'Input3',
          i4: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'general',
          i2: 'general',
          i3: 'general',
          i4: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Strings',
      usage: 'Examples of string data types.',
      best_practice:
        'Use string with two arguments if length/space is not an issue, even on small screens. Use string($length) to limit length. Use stringWrap($length) to allow wrapping. Avoid stringTruncate($length).',
      front_developer_notes:
        'Use the json for single_type_examples as direct input to the front end table component. Display should be using data type formatting rules for the "formatted output" column, that are provided with the data type in columnDataType.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'string',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: string',
          data: {
            l0: {
              c0: 'value1',
              c1: 'Petroleum Geo Services',
              c2: 'Petroleum Geo Services',
            },
            l1: {
              c0: 'value2',
              c1: 'Equinor',
              c2: 'Equinor',
            },
            l2: {
              c0: 'value3',
              c1: 'Norsk Hydro',
              c2: 'Norsk Hydro',
            },
          },
          column_headers: {
            i0: 'string-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
        },
      },
      table2: {
        component_name: 'standardTable',
        data_type_example_name: 'string(10)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: string(10)',
          data: {
            l0: {
              c0: 'value1',
              c1: 'Petroleum Geo Services',
              c2: 'Petroleum Geo Services',
            },
            l1: {
              c0: 'value2',
              c1: 'Equinor',
              c2: 'Equinor',
            },
            l2: {
              c0: 'value3',
              c1: 'Norsk Hydro',
              c2: 'Norsk Hydro',
            },
          },
          column_headers: {
            i0: 'string(10)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string(10)',
          },
        },
      },
      table3: {
        component_name: 'standardTable',
        data_type_example_name: 'stringWrap(10)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: stringWrap(10)',
          data: {
            l0: {
              c0: 'value1',
              c1: 'long text that is wrapped by client when needed',
              c2: 'long text that is wrapped by client when needed',
            },
            l1: {
              c0: 'value2',
              c1: 'xxx',
              c2: 'xxx',
            },
            l2: {
              c0: 'value3',
              c1: 'xxx',
              c2: 'xxx',
            },
          },
          column_headers: {
            i0: 'stringWrap(10)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'stringWrap(10)',
          },
        },
      },
      table4: {
        component_name: 'standardTable',
        data_type_example_name: 'stringWrap(15)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: stringWrap(15)',
          data: {
            l0: {
              c0: 'value1',
              c1: 'long text that is wrapped by client when needed',
              c2: 'long text that is wrapped by client when needed',
            },
            l1: {
              c0: 'value2',
              c1: 'xxx',
              c2: 'xxx',
            },
            l2: {
              c0: 'value3',
              c1: 'xxx',
              c2: 'xxx',
            },
          },
          column_headers: {
            i0: 'stringWrap(15)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'stringWrap(15)',
          },
        },
      },
    },
  },
};

export const alertsDatatypes = {
  alerts: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'alarm',
            c1: 'alarm icon with popup?',
            c2: '',
            c3: 1,
            c4: 'Alert icon is shown if field is not empty. Field may contain popup code or js/ajax calls.',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Explanation',
          i2: 'Input1',
          i3: 'Input2',
          i4: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'string',
          i2: 'general',
          i3: 'general',
          i4: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Alerts',
      usage: 'Examples of alert data types.',
      best_practice: 'Needs a boolean input, but will trigger for non-empty values.',
      front_developer_notes: 'See other sections.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'alarm',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: alarm',
          data: {
            l0: {
              c0: 'value1',
              c1: '',
              c2: '',
            },
            l1: {
              c0: 'value2',
              c1: 1,
              c2: 1,
            },
          },
          column_headers: {
            i0: 'alarm-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'alarm',
          },
        },
      },
    },
  },
};

export const myDataDatatype = {
  my_data: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'myWatchlist',
            c1: 'CompanyId',
            c2: 100129,
            c3: 100103,
            c4: 'Watchlist info and call to user-action',
          },
          l1: {
            c0: 'myPortfolio',
            c1: 'CompanyId',
            c2: 100129,
            c3: 100103,
            c4: 'Portfolio info and call to user-action',
          },
          l2: {
            c0: 'myRating',
            c1: 'CompanyId',
            c2: 100129,
            c3: 100103,
            c4: 'Rating info and call to user-action',
          },
          l3: {
            c0: 'myNotes',
            c1: 'CompanyId',
            c2: 100129,
            c3: 100103,
            c4: 'Notes info and call to user-action',
          },
          l4: {
            c0: 'myAlerts',
            c1: 'CompanyId',
            c2: 100129,
            c3: 100103,
            c4: 'Alerts info and call to user-action',
          },
          l5: {
            c0: 'myDataAny',
            c1: 'CompanyId',
            c2: 100129,
            c3: 100103,
            c4: 'Any my data set? Used for mobile to link to myData menu/panel.',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Explanation',
          i2: 'Input1',
          i3: 'Input2',
          i4: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'string',
          i2: 'general',
          i3: 'general',
          i4: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'MyData',
      usage: 'Examples of myData types for user-specific data.',
      best_practice: '',
      front_developer_notes: 'See other sections.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'myWatchlist',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: myWatchlist',
          data: {
            l0: {
              c0: 'value1',
              c1: 100129,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100129,
                feature: 'myWatchlist',
                is_set: false,
                value: null,
                what_to_display: 'icon',
                status_text: '',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100103,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100103,
                feature: 'myWatchlist',
                is_set: false,
                value: null,
                what_to_display: 'icon',
                status_text: '',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
          },
          column_headers: {
            i0: 'myWatchlist-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'myData_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'myWatchlist',
          },
        },
      },
      table2: {
        component_name: 'standardTable',
        data_type_example_name: 'myPortfolio',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: myPortfolio',
          data: {
            l0: {
              c0: 'value1',
              c1: 100129,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100129,
                feature: 'myPortfolio',
                is_set: true,
                value: {
                  l0: {
                    number_of_shares: '0',
                    portfolio_name: 'BigSmallPosts',
                  },
                },
                what_to_display: 'icon',
                status_text: '0 aksjer',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100103,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100103,
                feature: 'myPortfolio',
                is_set: true,
                value: {
                  l0: {
                    number_of_shares: '10',
                    portfolio_name: 'BigSmallPosts',
                  },
                  l1: {
                    number_of_shares: '100',
                    portfolio_name: 'NorgeSverige',
                  },
                  l2: {
                    number_of_shares: '1000',
                    portfolio_name: 'usa-test',
                  },
                  l3: {
                    number_of_shares: '200',
                    portfolio_name: '_styletoolbox portfolio',
                  },
                },
                what_to_display: 'icon',
                status_text: '1310 aksjer',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
          },
          column_headers: {
            i0: 'myPortfolio-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'myData_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'myPortfolio',
          },
        },
      },
      table3: {
        component_name: 'standardTable',
        data_type_example_name: 'myRating',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: myRating',
          data: {
            l0: {
              c0: 'value1',
              c1: 100129,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100129,
                feature: 'myRating',
                is_set: true,
                value: '7',
                what_to_display: 'icon',
                status_text: 'Score: 7',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100103,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100103,
                feature: 'myRating',
                is_set: true,
                value: '7',
                what_to_display: 'icon',
                status_text: 'Score: 7',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
          },
          column_headers: {
            i0: 'myRating-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'myData_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'myRating',
          },
        },
      },
      table4: {
        component_name: 'standardTable',
        data_type_example_name: 'myNotes',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: myNotes',
          data: {
            l0: {
              c0: 'value1',
              c1: 100129,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100129,
                feature: 'myNotes',
                is_set: false,
                value: null,
                what_to_display: 'icon',
                status_text: '',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100103,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100103,
                feature: 'myNotes',
                is_set: true,
                value: {
                  l0: {
                    note: 'æøå\\\\n123',
                    company_name: 'Norsk Hydro',
                    date: '2025-11-06 08:14:38',
                    ticker: 'NHY',
                    country: 'no',
                  },
                },
                what_to_display: 'icon',
                status_text: '1 notes',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
          },
          column_headers: {
            i0: 'myNotes-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'myData_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'myNotes',
          },
        },
      },
      table5: {
        component_name: 'standardTable',
        data_type_example_name: 'myAlerts',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: myAlerts',
          data: {
            l0: {
              c0: 'value1',
              c1: 100129,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100129,
                feature: 'myAlerts',
                is_set: false,
                value: null,
                what_to_display: 'icon',
                status_text: '0 alarmer',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100103,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100103,
                feature: 'myAlerts',
                is_set: true,
                value: {
                  l0: {
                    alert_id: '383682',
                    criteria: '210',
                    ticker: 'NHY',
                    market_id: '1',
                    company_name: 'Norsk Hydro',
                    close: '84.4400',
                    country: 'no',
                  },
                },
                what_to_display: 'icon',
                status_text: '1 alarmer',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
          },
          column_headers: {
            i0: 'myAlerts-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'myData_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'myAlerts',
          },
        },
      },
      table6: {
        component_name: 'standardTable',
        data_type_example_name: 'myDataAny',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: myDataAny',
          data: {
            l0: {
              c0: 'value1',
              c1: 100129,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100129,
                feature: 'myDataAny',
                is_set: true,
                value: {
                  m: {
                    l0: {
                      number_of_shares: '0',
                      portfolio_name: 'BigSmallPosts',
                    },
                  },
                  r: {
                    l0: {
                      rating: '7',
                      company_name: 'Frontline Plc',
                      ticker: 'FRO',
                      country: 'no',
                      score: '89.38',
                      chng_pct1: '1.6224',
                    },
                  },
                },
                what_to_display: 'icon',
                status_text: 'MyData set',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100103,
              c2: {
                c_name: 'my_data_struct',
                user_id: 990040,
                company_id: 100103,
                feature: 'myDataAny',
                is_set: true,
                value: {
                  m: {
                    l0: {
                      number_of_shares: '10',
                      portfolio_name: 'BigSmallPosts',
                    },
                    l1: {
                      number_of_shares: '100',
                      portfolio_name: 'NorgeSverige',
                    },
                    l2: {
                      number_of_shares: '1000',
                      portfolio_name: 'usa-test',
                    },
                    l3: {
                      number_of_shares: '200',
                      portfolio_name: '_styletoolbox portfolio',
                    },
                  },
                  n: {
                    l0: {
                      note: 'æøå\\\\n123',
                      company_name: 'Norsk Hydro',
                      date: '2025-11-06 08:14:38',
                      ticker: 'NHY',
                      country: 'no',
                    },
                  },
                  a: {
                    l0: {
                      alert_id: '383682',
                      criteria: '210',
                      ticker: 'NHY',
                      market_id: '1',
                      company_name: 'Norsk Hydro',
                      close: '84.4400',
                      country: 'no',
                    },
                  },
                  r: {
                    l0: {
                      rating: '7',
                      company_name: 'Norsk Hydro',
                      ticker: 'NHY',
                      country: 'no',
                      score: '70.82',
                      chng_pct1: '-1.6080',
                    },
                  },
                },
                what_to_display: 'icon',
                status_text: 'MyData set',
                what_user_action: 'togglePanel',
                api_guide:
                  'Structure for "value" is not yet decided. Maybe content will be returned by separate API if user triggers action.',
              },
            },
          },
          column_headers: {
            i0: 'myDataAny-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'myData_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'myDataAny',
          },
        },
      },
    },
  },
};

export const companyAndAnalysisDatatypes = {
  company_and_analysis: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'flag',
            c1: 'CountryCode',
            c2: 'no',
            c3: 'se',
            c4: 'dk',
            c5: 'fi',
            c6: 'Country flag by code',
          },
          l1: {
            c0: 'techScoreArrow',
            c1: 'TechScore',
            c2: 75,
            c3: 33,
            c4: 0,
            c5: -88,
            c6: 'Technical score as arrow',
          },
          l2: {
            c0: 'techScoreText',
            c1: 'TechScore',
            c2: 75,
            c3: 33,
            c4: 0,
            c5: -88,
            c6: 'Technical score as text',
          },
          l3: {
            c0: 'techScoreWithArrow',
            c1: 'TechScore',
            c2: 75,
            c3: 33,
            c4: 0,
            c5: -88,
            c6: 'Technical score with arrow',
          },
          l4: {
            c0: 'evaluationArrow',
            c1: 'EvalCode',
            c2: 2,
            c3: 1,
            c4: 0,
            c5: -2,
            c6: 'Evaluation as arrow',
          },
          l5: {
            c0: 'evaluationText',
            c1: 'EvalCode',
            c2: 2,
            c3: 1,
            c4: 0,
            c5: -2,
            c6: 'Evaluation as text',
          },
          l6: {
            c0: 'evaluationArrowWithText',
            c1: 'EvalCode',
            c2: 2,
            c3: 1,
            c4: 0,
            c5: -2,
            c6: 'Evaluation as arrow with text',
          },
          l7: {
            c0: 'risk',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100001,
            c4: 100782,
            c5: 46100637,
            c6: 'Risk indicator',
          },
          l8: {
            c0: 'risk(colored)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100001,
            c4: 100782,
            c5: 46100637,
            c6: 'Risk indicator, colored',
          },
          l9: {
            c0: 'risk(label)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100001,
            c4: 100782,
            c5: 46100637,
            c6: 'Risk indicator as label',
          },
          l10: {
            c0: 'risk(label,big)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100001,
            c4: 100782,
            c5: 46100637,
            c6: 'Risk indicator as big label',
          },
          l11: {
            c0: 'companyLink',
            c1: 'LinkText;CompanyId',
            c2: 'Norsk Hydro;100103',
            c3: 'Telenor;100275',
            c4: 'Telenor;100275',
            c5: 'Telenor;100275',
            c6: 'Company link with text and ID',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Data value',
          i2: 'Input1',
          i3: 'Input2',
          i4: 'Input3',
          i5: 'Input4',
          i6: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'string',
          i2: 'general',
          i3: 'general',
          i4: 'general',
          i5: 'general',
          i6: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Company and Analysis',
      usage: 'Examples of company and analysis data types.',
      best_practice:
        'Use the most specific data type for company, risk, evaluation, and technical score fields. Use companyLink for linking to company pages.',
      front_developer_notes:
        'Use the json for single_type_examples as direct input to the front end table component. Display should be using data type formatting rules for the "formatted output" column, that are provided with the data type in columnDataType.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'flag',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: flag',
          data: {
            l0: {
              c0: 'value1',
              c1: 'no',
              c2: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'no',
              },
            },
            l1: {
              c0: 'value2',
              c1: 'se',
              c2: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'se',
              },
            },
            l2: {
              c0: 'value3',
              c1: 'dk',
              c2: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'dk',
              },
            },
            l3: {
              c0: 'value4',
              c1: 'fi',
              c2: {
                c_name: 'icon',
                icon_class: 'flag',
                value: 'fi',
              },
            },
          },
          column_headers: {
            i0: 'flag-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'icon_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'flag',
          },
        },
      },
      table2: {
        component_name: 'standardTable',
        data_type_example_name: 'techScoreArrow',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techScoreArrow',
          data: {
            l0: {
              c0: 'value1',
              c1: 75,
              c2: {
                c_name: 'techScoreArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
              },
            },
            l1: {
              c0: 'value2',
              c1: 33,
              c2: {
                c_name: 'techScoreArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
              },
            },
            l2: {
              c0: 'value3',
              c1: 0,
              c2: {
                c_name: 'techScoreArrow',
                icon_class: 'arrow',
                color: 'neutral',
                direction: 'right',
              },
            },
            l3: {
              c0: 'value4',
              c1: -88,
              c2: {
                c_name: 'techScoreArrow',
                icon_class: 'arrow',
                color: 'negative',
                direction: 'down',
              },
            },
          },
          column_headers: {
            i0: 'techScoreArrow-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'icon_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techScoreArrow',
          },
        },
      },
      table3: {
        component_name: 'standardTable',
        data_type_example_name: 'techScoreText',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techScoreText',
          data: {
            l0: {
              c0: 'value1',
              c1: 75,
              c2: 'Kjøp',
            },
            l1: {
              c0: 'value2',
              c1: 33,
              c2: 'Svak kjøp',
            },
            l2: {
              c0: 'value3',
              c1: 0,
              c2: 'Neutral',
            },
            l3: {
              c0: 'value4',
              c1: -88,
              c2: 'Selg',
            },
          },
          column_headers: {
            i0: 'techScoreText-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techScoreText',
          },
        },
      },
      table4: {
        component_name: 'standardTable',
        data_type_example_name: 'techScoreWithArrow',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techScoreWithArrow',
          data: {
            l0: {
              c0: 'value1',
              c1: 75,
              c2: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
                text: '75',
                text_position: 'first',
              },
            },
            l1: {
              c0: 'value2',
              c1: 33,
              c2: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
                text: '33',
                text_position: 'first',
              },
            },
            l2: {
              c0: 'value3',
              c1: 0,
              c2: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'neutral',
                direction: 'right',
                text: '0',
                text_position: 'first',
              },
            },
            l3: {
              c0: 'value4',
              c1: -88,
              c2: {
                c_name: 'techScoreWithArrow',
                icon_class: 'arrow',
                color: 'negative',
                direction: 'down',
                text: '-88',
                text_position: 'first',
              },
            },
          },
          column_headers: {
            i0: 'techScoreWithArrow-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'icon_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techScoreWithArrow',
          },
        },
      },
      table5: {
        component_name: 'standardTable',
        data_type_example_name: 'evaluationArrow',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: evaluationArrow',
          data: {
            l0: {
              c0: 'value1',
              c1: 2,
              c2: {
                c_name: 'evaluationArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
              },
            },
            l1: {
              c0: 'value2',
              c1: 1,
              c2: {
                c_name: 'evaluationArrow',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
              },
            },
            l2: {
              c0: 'value3',
              c1: 0,
              c2: {
                c_name: 'evaluationArrow',
                icon_class: 'arrow',
                color: 'neutral',
                direction: 'right',
              },
            },
            l3: {
              c0: 'value4',
              c1: -2,
              c2: {
                c_name: 'evaluationArrow',
                icon_class: 'arrow',
                color: 'negative',
                direction: 'down',
              },
            },
          },
          column_headers: {
            i0: 'evaluationArrow-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'icon_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'evaluationArrow',
          },
        },
      },
      table6: {
        component_name: 'standardTable',
        data_type_example_name: 'evaluationText',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: evaluationText',
          data: {
            l0: {
              c0: 'value1',
              c1: 2,
              c2: 'Kjøp',
            },
            l1: {
              c0: 'value2',
              c1: 1,
              c2: 'Svak kjøp',
            },
            l2: {
              c0: 'value3',
              c1: 0,
              c2: 'Neutral',
            },
            l3: {
              c0: 'value4',
              c1: -2,
              c2: 'Selg',
            },
          },
          column_headers: {
            i0: 'evaluationText-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'evaluationText',
          },
        },
      },
      table7: {
        component_name: 'standardTable',
        data_type_example_name: 'evaluationArrowWithText',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: evaluationArrowWithText',
          data: {
            l0: {
              c0: 'value1',
              c1: 2,
              c2: {
                c_name: 'evaluationArrowWithText',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
                text: 'Kjøp',
                text_position: 'last',
              },
            },
            l1: {
              c0: 'value2',
              c1: 1,
              c2: {
                c_name: 'evaluationArrowWithText',
                icon_class: 'arrow',
                color: 'positive',
                direction: 'up',
                text: 'Svak kjøp',
                text_position: 'last',
              },
            },
            l2: {
              c0: 'value3',
              c1: 0,
              c2: {
                c_name: 'evaluationArrowWithText',
                icon_class: 'arrow',
                color: 'neutral',
                direction: 'right',
                text: 'Neutral',
                text_position: 'last',
              },
            },
            l3: {
              c0: 'value4',
              c1: -2,
              c2: {
                c_name: 'evaluationArrowWithText',
                icon_class: 'arrow',
                color: 'negative',
                direction: 'down',
                text: 'Selg',
                text_position: 'last',
              },
            },
          },
          column_headers: {
            i0: 'evaluationArrowWithText-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'icon_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'evaluationArrowWithText',
          },
        },
      },
      table8: {
        component_name: 'standardTable',
        data_type_example_name: 'risk',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: risk',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: '<!--01-->Medium',
            },
            l1: {
              c0: 'value2',
              c1: 100001,
              c2: '<!--00-->Lav',
            },
            l2: {
              c0: 'value3',
              c1: 100782,
              c2: {
                c_name: 'iconWithText',
                icon: 'warning',
                text: '<!--03-->Ekstrem',
                text_position: 'last',
              },
            },
            l3: {
              c0: 'value4',
              c1: 46100637,
              c2: '<!--01-->Medium',
            },
          },
          column_headers: {
            i0: 'risk-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'risk',
          },
        },
      },
      table9: {
        component_name: 'standardTable',
        data_type_example_name: 'risk(colored)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: risk(colored)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'textValueColored',
                text: '<!--01-->Medium',
                color: 'neutral',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100001,
              c2: {
                c_name: 'textValueColored',
                text: '<!--00-->Lav',
                color: 'positive',
              },
            },
            l2: {
              c0: 'value3',
              c1: 100782,
              c2: {
                c_name: 'textValueColored',
                text: '<!--03-->Ekstrem',
                color: 'negative',
                icon: 'warning',
                text_position: 'last',
              },
            },
            l3: {
              c0: 'value4',
              c1: 46100637,
              c2: {
                c_name: 'textValueColored',
                text: '<!--01-->Medium',
                color: 'neutral',
              },
            },
          },
          column_headers: {
            i0: 'risk(colored)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'risk(colored)',
          },
        },
      },
      table10: {
        component_name: 'standardTable',
        data_type_example_name: 'risk(label)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: risk(label)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--01-->Medium',
                size: 'medium',
                color: 'neutral',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100001,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--00-->Lav',
                size: 'medium',
                color: 'positive',
              },
            },
            l2: {
              c0: 'value3',
              c1: 100782,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--03-->Ekstrem',
                size: 'medium',
                color: 'negative',
                icon: 'warning',
                text_position: 'last',
              },
            },
            l3: {
              c0: 'value4',
              c1: 46100637,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--01-->Medium',
                size: 'medium',
                color: 'neutral',
              },
            },
          },
          column_headers: {
            i0: 'risk(label)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'risk(label)',
          },
        },
      },
      table11: {
        component_name: 'standardTable',
        data_type_example_name: 'risk(label,big)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: risk(label,big)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--01-->Medium',
                size: 'big',
                color: 'neutral',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100001,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--00-->Lav',
                size: 'big',
                color: 'positive',
              },
            },
            l2: {
              c0: 'value3',
              c1: 100782,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--03-->Ekstrem',
                size: 'big',
                color: 'negative',
                icon: 'warning',
                text_position: 'last',
              },
            },
            l3: {
              c0: 'value4',
              c1: 46100637,
              c2: {
                c_name: 'labelValueColored',
                text: '<!--01-->Medium',
                size: 'big',
                color: 'neutral',
              },
            },
          },
          column_headers: {
            i0: 'risk(label,big)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'label_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'risk(label,big)',
          },
        },
      },
      table12: {
        component_name: 'standardTable',
        data_type_example_name: 'companyLink',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: companyLink',
          data: {
            l0: {
              c0: 'value1',
              c1: 'Norsk Hydro;100103',
              c2: {
                c_name: 'companyLink',
                url: '?company_id=100103',
                text: 'Norsk Hydro',
              },
            },
            l1: {
              c0: 'value2',
              c1: 'Telenor;100275',
              c2: {
                c_name: 'companyLink',
                url: '?company_id=100275',
                text: 'Telenor',
              },
            },
            l2: {
              c0: 'value3',
              c1: 'Telenor;100275',
              c2: {
                c_name: 'companyLink',
                url: '?company_id=100275',
                text: 'Telenor',
              },
            },
            l3: {
              c0: 'value4',
              c1: 'Telenor;100275',
              c2: {
                c_name: 'companyLink',
                url: '?company_id=100275',
                text: 'Telenor',
              },
            },
          },
          column_headers: {
            i0: 'companyLink-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'link_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'companyLink',
          },
        },
      },
    },
  },
};

export const dataExportDatatypes = {
  data_export: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'wordpressCompanyMacro',
            c1: 'CompanyId;PriceDate',
            c2: '100103;20250728',
            c3: 'Wordpress macro for company and price date',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Data value',
          i2: 'Input1',
          i3: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'string',
          i2: 'general',
          i3: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Data Export',
      usage: 'Examples of data export types, e.g. for Wordpress macros.',
      best_practice: '',
      front_developer_notes: 'See other sections.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'wordpressCompanyMacro',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: wordpressCompanyMacro',
          data: {
            l0: {
              c0: 'value1',
              c1: '100103;20250728',
              c2: "MACRO_STATIC_CHART_START(type='techMedium', companyId=100103, date='20250728', makeCompanyHeader='standard', makeCompanyComment='analysisWithRecommendation')MACRO_STATIC_CHART_STOP",
            },
          },
          column_headers: {
            i0: 'wordpressCompanyMacro-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'string',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'wordpressCompanyMacro',
          },
        },
      },
    },
  },
};

export const chartDataType = {
  charts: {
    overview: {
      component_name: 'standardTable',
      params: {
        data: {
          l0: {
            c0: 'factorDiagramTiny',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100782,
            c4: 'Tiny factor diagram for company',
          },
          l1: {
            c0: 'factorDiagramSmall',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100782,
            c4: 'Small factor diagram for company',
          },
          l2: {
            c0: 'techChartTiny(chartId=4)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100782,
            c4: 'Tiny technical chart for company',
          },
          l3: {
            c0: 'techChartTiny(chartId=4,link)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100782,
            c4: 'Tiny technical chart with link',
          },
          l4: {
            c0: 'techChartSmall(chartId=5)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100782,
            c4: 'Small technical chart for company',
          },
          l5: {
            c0: 'techChartMedium(chartId=4)',
            c1: 'CompanyId',
            c2: 100103,
            c3: 100782,
            c4: 'Medium technical chart for company',
          },
        },
        column_headers: {
          i0: 'Data type',
          i1: 'Data value',
          i2: 'Input1',
          i3: 'Input2',
          i4: 'Usage notes',
        },
        column_data_type: {
          i0: 'string',
          i1: 'string',
          i2: 'general',
          i3: 'general',
          i4: 'string',
        },
        hover_class: 'Hover',
      },
    },
    guide: {
      section_label: 'Charts',
      usage: 'Examples of chart data types for companies.',
      best_practice: 'Mostly for use by stock picking tables.',
      front_developer_notes: 'See other sections.',
    },
    single_type_examples: {
      table1: {
        component_name: 'standardTable',
        data_type_example_name: 'factorDiagramTiny',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: factorDiagramTiny',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 100103,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100103',
                api_full: '?context=factor_diagram&company_id=100103',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100782,
              c2: {
                c_name: 'imgFactorDiagram',
                size: 'tiny',
                usage: 'inline',
                company_id: 100782,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100782',
                api_full: '?context=factor_diagram&company_id=100782',
              },
            },
          },
          column_headers: {
            i0: 'factorDiagramTiny-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'img_factor_diagram_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'factorDiagramTiny',
          },
        },
      },
      table2: {
        component_name: 'standardTable',
        data_type_example_name: 'factorDiagramSmall',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: factorDiagramSmall',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'imgFactorDiagram',
                size: 'small',
                usage: 'inline',
                company_id: 100103,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100103',
                api_full: '?context=factor_diagram&company_id=100103',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100782,
              c2: {
                c_name: 'imgFactorDiagram',
                size: 'small',
                usage: 'inline',
                company_id: 100782,
                api_base: '?context=factor_diagram',
                api_param: 'company_id=100782',
                api_full: '?context=factor_diagram&company_id=100782',
              },
            },
          },
          column_headers: {
            i0: 'factorDiagramSmall-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'img_factor_diagram_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'factorDiagramSmall',
          },
        },
      },
      table3: {
        component_name: 'standardTable',
        data_type_example_name: 'techChartTiny(chartId=4)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techChartTiny(chartId=4)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100103,
                chart_param: 'chartId=4&CompanyID=100103&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                  chart_maximize: true,
                  chart_maximize_title: '',
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100103%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100782,
              c2: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100782,
                chart_param: 'chartId=4&CompanyID=100782&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                  chart_maximize: true,
                  chart_maximize_title: '',
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100782%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
              },
            },
          },
          column_headers: {
            i0: 'techChartTiny(chartId=4)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'img_tech_chart_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techChartTiny(chartId=4)',
          },
        },
      },
      table4: {
        component_name: 'standardTable',
        data_type_example_name: 'techChartTiny(chartId=4,link)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techChartTiny(chartId=4,link)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100103,
                chart_param: 'chartId=4&CompanyID=100103&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100103%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=100103',
                alt_text: 'Click to view company page',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100782,
              c2: {
                c_name: 'imgTechChart',
                size: 'tiny',
                usage: 'inline',
                company_id: 100782,
                chart_param: 'chartId=4&CompanyID=100782&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100782%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
                url: '?company_id=100782',
                alt_text: 'Click to view company page',
              },
            },
          },
          column_headers: {
            i0: 'techChartTiny(chartId=4,link)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'img_tech_chart_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techChartTiny(chartId=4,link)',
          },
        },
      },
      table5: {
        component_name: 'standardTable',
        data_type_example_name: 'techChartSmall(chartId=5)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techChartSmall(chartId=5)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'imgTechChart',
                size: 'small',
                usage: 'inline',
                company_id: 100103,
                chart_param: 'chartId=5&CompanyID=100103&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                  chart_maximize: true,
                  chart_maximize_title: '',
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D5%26CompanyID%3D100103%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100782,
              c2: {
                c_name: 'imgTechChart',
                size: 'small',
                usage: 'inline',
                company_id: 100782,
                chart_param: 'chartId=5&CompanyID=100782&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                  chart_maximize: true,
                  chart_maximize_title: '',
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D5%26CompanyID%3D100782%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
              },
            },
          },
          column_headers: {
            i0: 'techChartSmall(chartId=5)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'img_tech_chart_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techChartSmall(chartId=5)',
          },
        },
      },
      table6: {
        component_name: 'standardTable',
        data_type_example_name: 'techChartMedium(chartId=4)',
        suited_for_auto_test: true,
        params: {
          caption: 'Data type: techChartMedium(chartId=4)',
          data: {
            l0: {
              c0: 'value1',
              c1: 100103,
              c2: {
                c_name: 'imgTechChart',
                size: 'medium',
                usage: 'inline',
                company_id: 100103,
                chart_param: 'chartId=4&CompanyID=100103&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                  chart_maximize: true,
                  chart_maximize_title: '',
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100103%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
              },
            },
            l1: {
              c0: 'value2',
              c1: 100782,
              c2: {
                c_name: 'imgTechChart',
                size: 'medium',
                usage: 'inline',
                company_id: 100782,
                chart_param: 'chartId=4&CompanyID=100782&indicators=83,80,88,82,84,81,85',
                img_param: {
                  show_image_border: false,
                  chart_maximize: true,
                  chart_maximize_title: '',
                },
                api_full:
                  '?context=svgchart&chart_param=chartId%3D4%26CompanyID%3D100782%26indicators%3D83%2C80%2C88%2C82%2C84%2C81%2C85&show_image_border=0',
              },
            },
          },
          column_headers: {
            i0: 'techChartMedium(chartId=4)-examples',
            i1: 'Input value',
            i2: 'Formatted output',
          },
          column_data_type: {
            i0: 'string',
            i1: 'general',
            i2: 'img_tech_chart_struct',
          },
          backend_converted_from_type: {
            i0: '',
            i1: '',
            i2: 'techChartMedium(chartId=4)',
          },
        },
      },
    },
  },
};

/**
 * Stocks Table JSON
 * Used in: stocks-table.tsx, indices-table.tsx
 */
export const stocksTableJson = {
  count: 150,
  results: [
    {
      id: '12345',
      name: 'Apple Inc.',
      ticker: 'AAPL',
      close: '178.25',
      change: { value: '+2.50', sign: 1 },
      profit_loss_percent: { value: '+1.42%', sign: 1 },
      analysis_date: '2024-01-15',
      investtech_score: '85',
    },
    {
      id: '12346',
      name: 'Microsoft Corporation',
      ticker: 'MSFT',
      close: '402.50',
      change: { value: '-1.25', sign: -1 },
      profit_loss_percent: { value: '-0.31%', sign: -1 },
      analysis_date: '2024-01-15',
      investtech_score: '78',
    },
    {
      id: '12347',
      name: 'Alphabet Inc.',
      ticker: 'GOOGL',
      close: '141.80',
      change: { value: '+0.75', sign: 1 },
      profit_loss_percent: { value: '+0.53%', sign: 1 },
      analysis_date: '2024-01-14',
      investtech_score: '72',
    },
  ],
  meta: {
    title: 'Stocks Overview',
    description: 'Complete list of stocks with technical analysis',
  },
};

/**
 * Watchlist Table JSON
 * Used in: watchlist-table.tsx
 */
export const watchlistTableJson = {
  watchlist_id: 'wl_12345',
  count: 25,
  results: [
    {
      id: '12345',
      name: 'Apple Inc.',
      ticker: 'AAPL',
      market_id: 'NASDAQ',
      close: '178.25',
      change: { sign: 1, value: '+2.50' },
      profit_loss_percent: { sign: 1, value: '+1.42%' },
      analysis_date: '2024-01-15',
      investtech_score: '85',
      rating: 'A',
    },
    {
      id: '12346',
      name: 'Tesla Inc.',
      ticker: 'TSLA',
      market_id: 'NASDAQ',
      close: '248.50',
      change: { sign: -1, value: '-5.25' },
      profit_loss_percent: { sign: -1, value: '-2.07%' },
      analysis_date: '2024-01-15',
      investtech_score: '62',
      rating: 'B',
    },
  ],
};

/**
 * Top50 Table JSON
 * Used in: top50-table.tsx
 */
export const top50TableJson = {
  count: 50,
  results: [
    {
      id: '12345',
      name: 'NVIDIA Corporation',
      ticker: 'NVDA',
      close: '547.10',
      change: { value: '+15.80', sign: 1 },
      profit_loss_percent: { value: '+2.97%', sign: 1 },
      analysis_date: '2024-01-15',
      investtech_score: '95',
      score: '95',
    },
    {
      id: '12346',
      name: 'Meta Platforms',
      ticker: 'META',
      close: '385.25',
      change: { value: '+8.50', sign: 1 },
      profit_loss_percent: { value: '+2.26%', sign: 1 },
      analysis_date: '2024-01-15',
      investtech_score: '92',
      score: '92',
    },
  ],
  meta: {
    title: 'Top 50 Stocks',
    description: 'Best performing stocks based on technical analysis',
  },
};

/**
 * Indices Table JSON
 * Used in: indices-table.tsx
 */
export const indicesTableJson = {
  count: 25,
  results: [
    {
      id: '1001',
      name: 'S&P 500',
      ticker: 'SPX',
      close: '4,850.25',
      change: { value: '+25.50', sign: 1 },
      profit_loss_percent: { value: '+0.53%', sign: 1 },
      analysis_date: '2024-01-15',
      investtech_score: '78',
    },
    {
      id: '1002',
      name: 'NASDAQ Composite',
      ticker: 'IXIC',
      close: '15,250.80',
      change: { value: '-45.20', sign: -1 },
      profit_loss_percent: { value: '-0.30%', sign: -1 },
      analysis_date: '2024-01-15',
      investtech_score: '72',
    },
    {
      id: '1003',
      name: 'Dow Jones Industrial',
      ticker: 'DJI',
      close: '37,850.00',
      change: { value: '+120.00', sign: 1 },
      profit_loss_percent: { value: '+0.32%', sign: 1 },
      analysis_date: '2024-01-15',
      investtech_score: '75',
    },
  ],
  meta: {
    title: 'Market Indices',
    description: 'Overview of major market indices',
  },
};

/**
 * My Notes Table JSON
 * Used in: my-notes-table.tsx
 */
export const myNotesTableJson = {
  count: 15,
  results: [
    {
      company_id: '12345',
      name: 'Apple Inc.',
      ticker: 'AAPL',
      market_id: 'NASDAQ',
      note: 'Strong buy signal detected. Consider adding to position on pullback.',
      date: '2024-01-15T10:30:00Z',
      redirect_url: '/company/12345',
      close: '178.25',
    },
    {
      company_id: '12346',
      name: 'Microsoft Corporation',
      ticker: 'MSFT',
      market_id: 'NASDAQ',
      note: 'Approaching resistance level. Watch for breakout confirmation.',
      date: '2024-01-14T14:45:00Z',
      redirect_url: '/company/12346',
      close: '128.25',
    },
    {
      company_id: '12347',
      name: 'Tesla Inc.',
      ticker: 'TSLA',
      market_id: 'NASDAQ',
      note: 'High volatility expected. Set stop-loss at $235.',
      date: '2024-01-13T09:15:00Z',
      redirect_url: '/company/12347',
      close: '378.25',
    },
  ],
};

/**
 * Model Portfolio - Current Holdings Table JSON
 * Used in: portfolio-holdings.tsx
 */
export const portfolioHoldingsTableJson = {
  portfolio_return: {
    num_columns: 2,
    table_definition: [
      { key: 'name', column_name: 'Name' },
      { key: 'profit_loss_percent', column_name: 'Return' },
    ],
    content: [
      {
        name: 'Model Portfolio',
        profit_loss_percent: { value: '+15.42%', sign: 1, is_badge: true },
      },
      {
        name: 'Benchmark Index',
        profit_loss_percent: { value: '+8.25%', sign: 1, is_badge: true },
      },
      { name: 'Difference', profit_loss_percent: { value: '+7.17%', sign: 1, is_badge: true } },
    ],
  },
};

/**
 * Model Portfolio - Latest Sales Table JSON
 * Used in: most-recent-sale.tsx
 */
export const latestSalesTableJson = {
  num_columns: 5,
  table_definition: [
    { key: 'name', column_name: 'Company' },
    { key: 'date_out', column_name: 'Sold', hidden_on_mobile: true },
    { key: 'price_out', column_name: 'Price', hidden_on_mobile: true },
    { key: 'profit_loss_percent', column_name: '+/- %' },
  ],
  content: [
    {
      id: 1,
      name: 'Adobe Inc.',
      ticker: 'ADBE',
      date_out: '2024-01-10',
      price_out: 625.5,
      profit_loss_percent: { value: '+18.25%', sign: 1, is_badge: true },
      own_stocks: 0,
    },
    {
      id: 2,
      name: 'Netflix Inc.',
      ticker: 'NFLX',
      date_out: '2024-01-05',
      price_out: 485.75,
      profit_loss_percent: { value: '-2.50%', sign: -1, is_badge: true },
      own_stocks: 0,
    },
  ],
};

/**
 * Today's Case - Latest Reports Table JSON
 * Used in: latest-reports.tsx
 */
export const latestReportsTableJson = {
  title: 'Latest Reports',
  num_cases: 10,
  num_columns: 4,
  table_definition: [
    { key: 'date', column_name: 'Date', hidden_on_mobile: true },
    { key: 'company', column_name: 'Company' },
    { key: 'buy_or_sell', column_name: 'Signal' },
  ],
  data: [
    {
      company: 'Apple Inc. (AAPL)',
      date: 'January 15, 2024',
      date_short: 'Jan 15',
      ticker: 'AAPL',
      price_date: '2024-01-15',
      buy_or_sell: { value: 'Buy', sign: 1, is_badge: true },
    },
    {
      company: 'Tesla Inc. (TSLA)',
      date: 'January 14, 2024',
      date_short: 'Jan 14',
      ticker: 'TSLA',
      price_date: '2024-01-14',
      buy_or_sell: { value: 'Sell', sign: -1, is_badge: true },
    },
    {
      company: 'Meta Platforms (META)',
      date: 'January 13, 2024',
      date_short: 'Jan 13',
      ticker: 'META',
      price_date: '2024-01-13',
      buy_or_sell: { value: 'Buy', sign: 1, is_badge: true },
    },
    {
      company: 'Amazon.com Inc. (AMZN)',
      date: 'January 12, 2024',
      date_short: 'Jan 12',
      ticker: 'AMZN',
      price_date: '2024-01-12',
      buy_or_sell: { value: 'Hold', sign: 0, is_badge: true },
    },
  ],
};

/**
 * Insider Trade Table JSON
 * Used in: todays-case-details.tsx
 */
export const insiderTradeTableJson = {
  caption: 'Insider Trades',
  num_trades: 5,
  num_columns: 5,
  table_definition: [
    { key: 'date', column_name: 'Date' },
    { key: 'insider', column_name: 'Insider', hidden_on_mobile: true },
    { key: 'count', column_name: 'Shares', hidden_on_mobile: true },
    { key: 'price', column_name: 'Price' },
    { key: 'value', column_name: 'Value', hidden_on_tablet: true },
  ],
  data: [
    {
      date: '2024-01-10',
      count: '10,000',
      price: '$175.50',
      value: '$1,755,000',
      insider: { value: 'CEO - Tim Cook', sign: 1 },
      importance: 'High',
    },
    {
      date: '2024-01-08',
      count: '5,000',
      price: '$172.25',
      value: '$861,250',
      insider: { value: 'CFO - Luca Maestri', sign: 1 },
      importance: 'Medium',
    },
    {
      date: '2024-01-05',
      count: '-2,500',
      price: '$170.00',
      value: '-$425,000',
      insider: { value: 'Director - Al Gore', sign: -1 },
      importance: 'Low',
    },
  ],
};

/**
 * Annualized Return Table JSON
 * Used in: return.tsx
 */
export const annualizedReturnTableJson = {
  num_columns: 6,
  table_definition: [
    { key: 'name', column_name: '' },
    { key: 'annual_percentage_year', column_name: '1 Year' },
    { key: 'annual_percentage_3year', column_name: '3 Years' },
    { key: 'annual_percentage_5year', column_name: '5 Years' },
    { key: 'annual_percentage_10year', column_name: '10 Years', hidden_on_mobile: true },
    {
      key: 'annual_percentage_since_inception',
      column_name: 'Since Start',
      hidden_on_mobile: true,
    },
  ],
  content: [
    {
      name: 'Model Portfolio',
      annual_percentage_year: { value: '+15.42%', sign: 1 },
      annual_percentage_3year: { value: '+12.85%', sign: 1 },
      annual_percentage_5year: { value: '+18.25%', sign: 1 },
      annual_percentage_10year: { value: '+14.50%', sign: 1 },
      annual_percentage_since_inception: { value: '+285.75%', sign: 1 },
    },
    {
      name: 'Benchmark Index',
      annual_percentage_year: { value: '+8.25%', sign: 1 },
      annual_percentage_3year: { value: '+7.50%', sign: 1 },
      annual_percentage_5year: { value: '+10.15%', sign: 1 },
      annual_percentage_10year: { value: '+9.80%', sign: 1 },
      annual_percentage_since_inception: { value: '+165.25%', sign: 1 },
    },
  ],
};

/**
 * Table without Header JSON
 * Used in: table-without-header.tsx
 * Simple data structure for tables that don't require headers
 */
export const tableWithoutHeaderJson = {
  count: 3,
  results: [
    {
      id: '1',
      name: 'Apple Inc.',
      ticker: 'AAPL',
      close: '178.25',
      change: { value: '+2.50', sign: 'positive' },
    },
    {
      id: '2',
      name: 'Microsoft Corporation',
      ticker: 'MSFT',
      close: '402.50',
      change: { value: '-1.25', sign: 'negative' },
    },
    {
      id: '3',
      name: 'Alphabet Inc.',
      ticker: 'GOOGL',
      close: '141.80',
      change: { value: '+0.75', sign: 'positive' },
    },
  ],
  meta: {
    title: 'Simple Data List',
    description: 'Table data without header structure',
  },
};

/**
 * Table with Pagination JSON
 * Used in: table-with-pagination.tsx
 * API response structure for paginated tables with page and limit parameters
 */
export const tableWithPaginationJson = {
  count: 150, // total number of items in the dataset
  results: [
    // items on the current page
    {
      id: '12345',
      name: 'Apple Inc.',
      ticker: 'AAPL',
      close: '178.25',
      profit_loss_percent: { value: '+1.42%', sign: 1 },
      analysis_date: '2024-01-15',
    },
    {
      id: '12346',
      name: 'Microsoft Corporation',
      ticker: 'MSFT',
      close: '402.50',
      profit_loss_percent: { value: '-0.31%', sign: -1 },
      analysis_date: '2024-01-15',
    },
    {
      id: '12347',
      name: 'Alphabet Inc.',
      ticker: 'GOOGL',
      close: '141.80',
      profit_loss_percent: { value: '+0.53%', sign: 1 },
      analysis_date: '2024-01-14',
    },
  ],
  meta: {
    title: 'Paginated Stocks Table',
    description: 'API accepts page and limit parameters for server-side pagination',
    pagination: {
      has_next: true,
      has_previous: false,
      next_page: 2,
      previous_page: null,
    },
  },
};

export const researchTableJson = {
  type: 'table',
  table_type: 'research_table',
  table_definition: [
    {
      column_name: 'Avkastning og relativ avkastning etter 66-dager',
      key: 'col_0',
      align: '',
      colspan: 1,
    },
    {
      column_name: 'Norge',
      key: 'col_1',
      align: '',
      colspan: 1,
    },
    {
      column_name: 'Sverige',
      key: 'col_2',
      align: '',
      colspan: 1,
    },
    {
      column_name: 'Danmark',
      key: 'col_3',
      align: '',
      colspan: 1,
    },
  ],
  data: [
    {
      col_0: [
        {
          text: 'Kjøpssignal',
        },
      ],
      col_1: [
        {
          text: '4.1 %',
        },
      ],
      col_2: [
        {
          text: '3.8 %',
        },
      ],
      col_3: [
        {
          text: '4.5 %',
        },
      ],
    },
    {
      col_0: [
        {
          text: 'Referanseindeks i samme periode',
        },
      ],
      col_1: [
        {
          text: '3.1 %',
        },
      ],
      col_2: [
        {
          text: '3.1 %',
        },
      ],
      col_3: [
        {
          text: '3.2 %',
        },
      ],
    },
    {
      col_0: [
        {
          text: 'Meravkastning kjøpssignal',
        },
      ],
      col_1: [
        {
          text: '1.0 %p',
        },
      ],
      col_2: [
        {
          text: '0.7 %p',
        },
      ],
      col_3: [
        {
          text: '1.3 %p',
        },
      ],
    },
  ],
};

export const tableWithSingleHeaderJson = {
  type: 'table',
  table_type: 'standard_table',
  table_definition: [
    {
      column_name: '<b>Aksjer med kjøpssignal der Volbal22 går over 70</b>',
      key: 'col_0',
      align: '',
      colspan: 4,
    },
  ],
  data: [
    {
      col_0: [
        {
          text: '<b>Relativ avkastning etter 66 dager</b>',
        },
      ],
      col_1: [
        {
          text: '<b>Norge</b>',
          align: 'center',
        },
      ],
      col_2: [
        {
          text: '<b>Sverige</b>',
          align: 'center',
        },
      ],
      col_3: [
        {
          text: '<b>Danmark</b>',
          align: 'center',
        },
      ],
    },
    {
      col_0: [
        {
          text: '<b>Småselskaper</b>',
        },
      ],
      col_1: [
        {
          text: '2.3 %p',
          align: 'center',
        },
      ],
      col_2: [
        {
          text: '0.4 %p',
          align: 'center',
        },
      ],
      col_3: [
        {
          text: '0.9 %p',
          align: 'center',
        },
      ],
    },
    {
      col_0: [
        {
          text: '<b>Storselskaper</b>',
        },
      ],
      col_1: [
        {
          text: '-0.3 %p',
          align: 'center',
        },
      ],
      col_2: [
        {
          text: '0.1 %p',
          align: 'center',
        },
      ],
      col_3: [
        {
          text: '1.3 %p',
          align: 'center',
        },
      ],
    },
  ],
};

// Combined sample data export for backward compatibility
export const sampleTableData = {
  stocks: sampleStocks,
  portfolio: samplePortfolio,
  latestReports: sampleLatestReports,
};

// All JSON examples combined
export const allTableJsonExamples = {
  stocksTable: stocksTableJson,
  watchlistTable: watchlistTableJson,
  top50Table: top50TableJson,
  indicesTable: indicesTableJson,
  myNotesTable: myNotesTableJson,
  portfolioHoldings: portfolioHoldingsTableJson,
  latestSales: latestSalesTableJson,
  latestReports: latestReportsTableJson,
  insiderTrade: insiderTradeTableJson,
  annualizedReturn: annualizedReturnTableJson,
  tableWithoutHeader: tableWithoutHeaderJson,
  tableWithPagination: tableWithPaginationJson,
};
