'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import React from 'react';

import {
  TableOfContentsProvider,
  useTableOfContentsContext,
} from '@/components/custom-components/intra-page-menu';
import TableOfContents from '@/components/custom-components/table-of-contents';

import { CodeExampleDialog } from '../components/CodeExampleDialog';
import { JsonExampleDialog } from '../components/JsonExampleDialog';
import {
  CleanTableExample1Demo,
  CleanTableExample2Demo,
  cleanTableExampleCode,
  cleanTableExample1Json,
  cleanTableExample2Json,
  StandardTableExampleDemoHeaderAndData,
  StandardTableExampleDemoColumnHighlighting,
  StandardTableExampleDemoRowDecorationAndHover,
  StandardTableExampleDemoTransposed,
  StandardTableExampleDemoDataTriggeredStylingAndHiddenColumns,
  standardTableExampleCode,
  standardTableExampleJson,
  ResearchTableExampleDemo1,
  ResearchTableExampleDemo2,
  ResearchTableExampleDemo3,
  ResearchTableExampleDemo4,
  researchTableExampleCode,
  numericDatatypeOverviewCode,
  NumericDatatypeOverviewDemo,
  numericDatatypePriceCode,
  NumericDatatypePriceDemo,
  numericDatatypePriceCurrencyCode,
  NumericDatatypePriceCurrencyDemo,
  numericDatatypePricePrecision4Code,
  NumericDatatypePricePrecision4Demo,
  NumericDatatypePercentDemo,
  numericDatatypePercentCode,
  NumericDatatypePriceChangeDemo,
  numericDatatypePriceChangeCode,
  NumericDatatypePriceChangeLabelDemo,
  numericDatatypePriceChangeLabelCode,
  NumericDatatypePriceChangePrecision4LabelDemo,
  numericDatatypePriceChangePrecision4LabelCode,
  numericDatatypePriceChangePrecision4Code,
  NumericDatatypePriceChangePrecision4Demo,
  NumericDatatypePercentChangeDemo,
  numericDatatypePercentChangeCode,
  NumericDatatypePercentColorDemo,
  numericDatatypePercentColorCode,
  numericDatatypePercentChangeLabelCode,
  NumericDatatypePercentChangeLabelDemo,
  NumericDatatypePercentChangePrecision4LabelSmallDemo,
  numericDatatypePercentChangePrecision4LabelSmallCode,
  NumericDatatypePercentChangePrecision4LabelMediumDemo,
  numericDatatypePercentChangePrecision4LabelMediumCode,
  numericDatatypePercentChangePrecision4LabelBigCode,
  NumericDatatypePercentChangePrecision4LabelBigDemo,
  NumericDatatypeValueDemo,
  numericDatatypeValueCode,
  NumericDatatypeCountDemo1,
  numericDatatypeCountCode1,
  numericDatatypeCountCode2,
  NumericDatatypeCountDemo2,
  NumericDatatypeIntegerDemo,
  numericDatatypeIntegerCode,
  NumericDatatypeSignedIntegerDemo,
  numericDatatypeSignedIntegerCode,
  NumericDatatypeDecimal1Demo,
  numericDatatypeDecimal1Code,
  NumericDatatypeDecimal2Demo,
  numericDatatypeDecimal2Code,
  NumericDatatypeDecimal3Demo,
  numericDatatypeDecimal3Code,
  NumericDatatypeDecimalPosDemo,
  numericDatatypeDecimalPosCode,
  DateDatatypeOverviewDemo,
  dateDatatypeOverviewCode,
  DateDatatypeDateLongDemo,
  dateDatatypeDateLongCode,
  DateDatatypeDateYYYYMMDDDemo,
  dateDatatypeDateYYYYMMDDCode,
  DateDatatypeDateYYYYMMDDDemo2,
  dateDatatypeDateYYYYMMDDCode2,
  DateDatatypeDateYYYYMMDDUnixDemo,
  dateDatatypeDateYYYYMMDDUnixCode,
  DateDatatypeDateAndTimeDemo,
  dateDatatypeDateAndTimeCode,
  DateDatatypeTimeDemo,
  dateDatatypeTimeCode,
  DateDatatypeTimeDemo2,
  dateDatatypeTimeCode2,
  StringsDatatypeOverviewDemo,
  stringsDatatypeOverviewCode,
  StringsDatatypeStringDemo,
  stringsDatatypeStringCode,
  StringsDatatypeString10Demo,
  stringsDatatypeString10Code,
  StringsDatatypeStringWrap10Demo,
  stringsDatatypeStringWrap10Code,
  StringsDatatypeStringWrap15Demo,
  stringsDatatypeStringWrap15Code,
  AlertsDatatypeOverviewDemo,
  alertsDatatypeOverviewCode,
  AlertsDatatypeAlarmDemo,
  alertsDatatypeAlarmCode,
  MyDataDatatypeOverviewDemo,
  myDataDatatypeOverviewCode,
  MyDataDatatypeMyWatchlistDemo,
  myDataDatatypeMyWatchlistCode,
  MyDataDatatypeMyPortfolioDemo,
  myDataDatatypeMyPortfolioCode,
  MyDataDatatypeMyRatingDemo,
  myDataDatatypeMyRatingCode,
  CompanyAndAnalysisOverviewDemo,
  companyAndAnalysisOverviewCode,
  CompanyAndAnalysisFlagDemo,
  companyAndAnalysisFlagCode,
  CompanyAndAnalysisTechScoreArrowDemo,
  companyAndAnalysisTechScoreArrowCode,
  CompanyAndAnalysisTechScoreTextDemo,
  companyAndAnalysisTechScoreTextCode,
  CompanyAndAnalysisTechScoreWithArrowDemo,
  companyAndAnalysisTechScoreWithArrowCode,
  CompanyAndAnalysisEvaluationArrowDemo,
  companyAndAnalysisEvaluationArrowCode,
  CompanyAndAnalysisEvaluationTextDemo,
  companyAndAnalysisEvaluationTextCode,
  CompanyAndAnalysisEvaluationArrowWithTextDemo,
  companyAndAnalysisEvaluationArrowWithTextCode,
  CompanyAndAnalysisRiskDemo,
  companyAndAnalysisRiskCode,
  CompanyAndAnalysisRiskColoredDemo,
  companyAndAnalysisRiskColoredCode,
  CompanyAndAnalysisRiskLabelDemo,
  companyAndAnalysisRiskLabelCode,
  CompanyAndAnalysisRiskLabelBigDemo,
  companyAndAnalysisRiskLabelBigCode,
  CompanyAndAnalysisCompanyLinkDemo,
  companyAndAnalysisCompanyLinkCode,
  DataExportOverviewDemo,
  dataExportOverviewCode,
  DataExportWordpressCompanyMacroDemo,
  dataExportWordpressCompanyMacroCode,
  ChartsOverviewDemo,
  chartsOverviewCode,
  ChartsFactorDiagramTinyDemo,
  chartsFactorDiagramTinyCode,
  ChartsFactorDiagramSmallDemo,
  chartsFactorDiagramSmallCode,
  ChartsTechChartTinyDemo,
  chartsTechChartTinyCode,
  ChartsTechChartTinyLinkDemo,
  chartsTechChartTinyLinkCode,
  ChartsTechChartSmallDemo,
  chartsTechChartSmallCode,
  ChartsTechChartMediumDemo,
  chartsTechChartMediumCode,
  MixedDatatypesTableDemo,
  mixedDatatypesTableCode,
  MyDataDatatypeMyNotesDemo,
  MyDataDatatypeMyAlertsDemo,
  MyDataDatatypeMyDataAnyDemo,
  myDataDatatypeMyNotesCode,
  myDataDatatypeMyAlertsCode,
  myDataDatatypeMyDataAnyCode,
  researchTableExampleJson,
  mixedDatatypesTable,
  numericDatatypeExampleJson,
  dateDatatypeExampleJson,
  stringsDatatypesExampleJson,
  companyAndAnalysisDatatypes,
  dataExportDatatypes,
  chartDataType,
  alertsDatatypes,
  myDataDatatype,
} from './components/table';

const tableSections = [
  { title: 'Clean Table: Example 1' },
  { title: 'Clean Table: Example 2' },
  { title: 'Standard Table: Header and data' },
  { title: 'Standard Table: Column highlighting' },
  { title: 'Standard Table: Row decoration and hover' },
  { title: 'Standard Table: Transposed' },
  { title: 'Standard Table: Data triggered styling and hidden columns' },
  { title: 'Research Table: Example 1' },
  { title: 'Research Table: Example 2' },
  { title: 'Research Table: Example 3' },
  { title: 'Research Table: Example 4' },
  { title: 'Mixed Datatypes: Overview' },
  { title: 'Numeric Datatype Overview' },
  { title: 'Numeric Datatype: Price' },
  { title: 'Numeric Datatype: Price Currency' },
  { title: 'Numeric Datatype: Price Precision 4' },
  { title: 'Numeric Datatype: Percent' },
  { title: 'Numeric Datatype: Price Change' },
  { title: 'Numeric Datatype: Price Change Label' },
  { title: 'Numeric Datatype: Price Change Precision 4 Label' },
  { title: 'Numeric Datatype: Percent Change' },
  { title: 'Numeric Datatype: Percent Color' },
  { title: 'Numeric Datatype: Percent Change Label' },
  { title: 'Numeric Datatype: Percent Change Precision 4 Label Small' },
  { title: 'Numeric Datatype: Percent Change Precision 4 Label Medium' },
  { title: 'Numeric Datatype: Percent Change Precision 4 Label Big' },
  { title: 'Numeric Datatype: Value' },
  { title: 'Numeric Datatype: Count' },
  { title: 'Numeric Datatype: Integer' },
  { title: 'Numeric Datatype: Signed Integer' },
  { title: 'Numeric Datatype: Decimal1' },
  { title: 'Numeric Datatype: Decimal2' },
  { title: 'Numeric Datatype: Decimal3' },
  { title: 'Numeric Datatype: DecimalPos' },
  { title: 'Date Datatype: Overview' },
  { title: 'Date Datatype: dateLong' },
  { title: 'Date Datatype: dateYYYYMMDD' },
  { title: 'Date Datatype: dateYYYYMMDD (string/integer)' },
  { title: 'Date Datatype: dateYYYYMMDD (unix timestamp)' },
  { title: 'Date Datatype: dateAndTime' },
  { title: 'Date Datatype: time' },
  { title: 'Date Datatype: time (from datetime)' },
  { title: 'Strings Datatype: Overview' },
  { title: 'Strings Datatype: string' },
  { title: 'Strings Datatype: string(10)' },
  { title: 'Strings Datatype: stringWrap(10)' },
  { title: 'Strings Datatype: stringWrap(15)' },
  { title: 'Company and Analysis Datatype: Overview' },
  { title: 'Company and Analysis Datatype: flag' },
  { title: 'Company and Analysis Datatype: techScoreArrow' },
  { title: 'Company and Analysis Datatype: techScoreText' },
  { title: 'Company and Analysis Datatype: techScoreWithArrow' },
  { title: 'Company and Analysis Datatype: evaluationArrow' },
  { title: 'Company and Analysis Datatype: evaluationText' },
  { title: 'Company and Analysis Datatype: evaluationArrowWithText' },
  { title: 'Company and Analysis Datatype: risk' },
  { title: 'Company and Analysis Datatype: risk(colored)' },
  { title: 'Company and Analysis Datatype: risk(label)' },
  { title: 'Company and Analysis Datatype: risk(label,big)' },
  { title: 'Company and Analysis Datatype: companyLink' },
  { title: 'Data Export Datatype: Overview' },
  { title: 'Data Export Datatype: wordpressCompanyMacro' },
  { title: 'Charts Datatype: Overview' },
  { title: 'Charts Datatype: factorDiagramTiny' },
  { title: 'Charts Datatype: factorDiagramSmall' },
  { title: 'Charts Datatype: techChartTiny(chartId=4)' },
  { title: 'Charts Datatype: techChartTiny(chartId=4,link)' },
  { title: 'Charts Datatype: techChartSmall(chartId=5)' },
  { title: 'Charts Datatype: techChartMedium(chartId=4)' },
  { title: 'Alerts Datatype: Overview' },
  { title: 'Alerts Datatype: alarm' },
  { title: 'MyData Datatype: Overview' },
  { title: 'MyData Datatype: myWatchlist' },
  { title: 'MyData Datatype: myPortfolio' },
  { title: 'MyData Datatype: myRating' },
  { title: 'MyData Datatype: myNotes' },
  { title: 'MyData Datatype: myAlerts' },
  { title: 'MyData Datatype: myDataAny' },
];

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

export default function TableDocsPage() {
  const cardClasses = 'p-5';
  let sectionIndex = 0;

  return (
    <TableOfContentsProvider sections={tableSections}>
      <div className="container mx-auto py-6">
        <header>
          <h1 className="mb-8 text-4xl font-bold">Table</h1>
          <p className="text-muted-foreground mb-8">
            Table component demos: Clean, Standard, and Research table variants with JSON-driven
            data.
          </p>
        </header>

        <div className="flex gap-8">
          <main className="grid flex-1 gap-8" role="main" aria-label="Table examples">
            {/* Clean Table Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Clean Table</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Clean Table Example"
                        description="Simple table based on cleanTable JSON structure."
                        code={cleanTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="Clean Table JSON"
                        description="API response structure for cleanTable JSON structure."
                        json={JSON.stringify(cleanTableExample1Json, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Minimal table rendering from cleanTable API example.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CleanTableExample1Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Clean Table Demo: Example 2 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Clean Table: Example 2</CardTitle>
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Clean Table Example"
                        description="Simple table based on cleanTable JSON structure."
                        code={cleanTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="Clean Table JSON"
                        description="API response structure for cleanTable JSON structure."
                        json={JSON.stringify(cleanTableExample2Json, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Minimal table rendering from cleanTable API example.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CleanTableExample2Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Standard Table Demo: Header and data */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>StandardTable: Header and data</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="StandardTable: Header and data"
                        description="Simple table based on standardTable JSON structure. "
                        code={standardTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="StandardTable JSON"
                        description="API response structure for standardTable JSON structure."
                        json={JSON.stringify(standardTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Minimal table rendering from standardTable API example. Use standardTable for
                    most small and medium sized tables. Simple and flexible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StandardTableExampleDemoHeaderAndData />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Standard Table Demo:  Column highlighting */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>StandardTable: Column highlighting</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="StandardTable: Column highlighting"
                        description="Simple table based on standardTable JSON structure. "
                        code={standardTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="StandardTable JSON"
                        description="API response structure for standardTable JSON structure."
                        json={JSON.stringify(standardTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Use columnClass "Header" or "Highlight" to make important columns stand out.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StandardTableExampleDemoColumnHighlighting />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Standard Table Demo: Row decoration and hover */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>StandardTable: Row decoration and hover</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="StandardTable: Row decoration and hover"
                        description="Simple table based on standardTable JSON structure. "
                        code={standardTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="StandardTable JSON"
                        description="API response structure for standardTable JSON structure."
                        json={JSON.stringify(standardTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    This kind of styling shold be kept to a minimum! Investtech has a clean and
                    simple style, and we should not mix different table styles unless there is a
                    very good reason. Use parameters rowClass and hoverClass. Also overrides default
                    textSize (md) and sets to sm=small to make space for more content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StandardTableExampleDemoRowDecorationAndHover />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Standard Table Demo: Transposed, i.e dataType-settings for rows instead of columns */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>StandardTable: Transposed</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="StandardTable: Transposed"
                        description="Simple table based on standardTable JSON structure. "
                        code={standardTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="StandardTable JSON"
                        description="API response structure for standardTable JSON structure."
                        json={JSON.stringify(standardTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    If each line contains same type of data, the dataType -parameter may be set for
                    rows instead of columns. Note that rowClass is set below, but that columnClass
                    is not set . Example for Company key accounting numbers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StandardTableExampleDemoTransposed />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Standard Table Demo: Data triggered styling and hidden columns */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>StandardTable: Data triggered styling and hidden columns</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="StandardTable: Data triggered styling and hidden columns"
                        description="Simple table based on standardTable JSON structure. "
                        code={standardTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="StandardTable JSON"
                        description="API response structure for standardTable JSON structure."
                        json={JSON.stringify(standardTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Value of one trigger column can decide styling of one or more other columns. Use
                    column_style_trigger and column_hidden for advanced formatting.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StandardTableExampleDemoDataTriggeredStylingAndHiddenColumns />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Research Table Demo: Example 1 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ResearchTable: Example 1</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="ResearchTable: Example 1"
                        description=""
                        code={researchTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="ResearchTable JSON"
                        description="API response structure for researchTable JSON structure."
                        json={JSON.stringify(researchTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Use researchTable in research articles and reports, and on help/ info pages
                    containing Investtech-research data. Class type is used to strengthen the
                    Investtech brand.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResearchTableExampleDemo1 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Research Table Demo: Example 2 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ResearchTable: Example 2</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="ResearchTable: Example 2"
                        description=""
                        code={researchTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="ResearchTable JSON"
                        description="API response structure for researchTable JSON structure."
                        json={JSON.stringify(researchTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <ResearchTableExampleDemo2 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Research Table Demo: Example 3 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ResearchTable: Example 3</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="ResearchTable: Example 3"
                        description=""
                        code={researchTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="ResearchTable JSON"
                        description="API response structure for researchTable JSON structure."
                        json={JSON.stringify(researchTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <ResearchTableExampleDemo3 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Research Table Demo: Example 4 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ResearchTable: Example 4</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="ResearchTable: Example 4"
                        description=""
                        code={researchTableExampleCode}
                      />
                      <JsonExampleDialog
                        title="ResearchTable JSON"
                        description="API response structure for researchTable JSON structure."
                        json={JSON.stringify(researchTableExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <ResearchTableExampleDemo4 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Mixed Datatypes Table Demo */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Mixed Datatypes Table</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Mixed Datatypes Table"
                        description=""
                        code={mixedDatatypesTableCode}
                      />
                      <JsonExampleDialog
                        title="Mixed Datatypes Table JSON"
                        description="API response structure for mixedDatatypesTable JSON structure."
                        json={JSON.stringify(mixedDatatypesTable, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Table with mixed datatypes: icon, companyLink, labelValueColored,
                    techScoreWithArrow, textValueColored, imgChart, imgChartSmall, imgChartTiny,
                    imgChartTiny2, imgChartTiny3, imgChartTiny4, imgChartTiny5, imgChartTiny6,
                    imgChartTiny7, imgChartTiny8, imgChartTiny9, imgChartTiny10.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MixedDatatypesTableDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype Overview"
                        description=""
                        code={numericDatatypeOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype Overview JSON"
                        description="API response structure for numericDatatypeOverview JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    NOTE: Use price, percent, priceChange, percentChange, value and count for stock
                    specific values. The more general integer, signedInteger, decimal1, decimal2 and
                    decimal3 should be avoided in stock context, but may be used for research data
                    and other data types. PriceChange and percentChange may be styled as colored
                    labels. Default is medium size, but also small and large is allowed, see
                    examples.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price"
                        description=""
                        code={numericDatatypePriceCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price JSON"
                        description="API response structure for numericDatatypePrice JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of price data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePriceDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price Currency */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price Currency</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price Currency"
                        description=""
                        code={numericDatatypePriceCurrencyCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price Currency JSON"
                        description="API response structure for numericDatatypePriceCurrency JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of price currency data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePriceCurrencyDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price Precision 4 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price Precision 4</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price Precision 4"
                        description=""
                        code={numericDatatypePricePrecision4Code}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price Precision 4 JSON"
                        description="API response structure for numericDatatypePricePrecision4 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of price precision 4 data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePricePrecision4Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent"
                        description=""
                        code={numericDatatypePercentCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent JSON"
                        description="API response structure for numericDatatypePercent JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of percent data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price Change */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price Change</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price Change"
                        description=""
                        code={numericDatatypePriceChangeCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price Change JSON"
                        description="API response structure for numericDatatypePriceChange JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of price change data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePriceChangeDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price Change Label */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price Change Label</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price Change Label"
                        description=""
                        code={numericDatatypePriceChangeLabelCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price Change Label JSON"
                        description="API response structure for numericDatatypePriceChangeLabel JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of price change label data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePriceChangeLabelDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price Change Precision 4*/}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price Change Precision 4</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price Change Precision 4"
                        description=""
                        code={numericDatatypePriceChangePrecision4Code}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price Change Precision 4 JSON"
                        description="API response structure for numericDatatypePriceChangePrecision4 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of price change precision 4 data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePriceChangePrecision4Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Price Change Precision 4 Label */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Price Change Precision 4 Label</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Price Change Precision 4 Label"
                        description=""
                        code={numericDatatypePriceChangePrecision4LabelCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Price Change Precision 4 Label JSON"
                        description="API response structure for numericDatatypePriceChangePrecision4Label JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of price change precision 4 label data type.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePriceChangePrecision4LabelDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent Change */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent Change</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent Change"
                        description=""
                        code={numericDatatypePercentChangeCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent Change JSON"
                        description="API response structure for numericDatatypePercentChange JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of percent change data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentChangeDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent Color */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent Color</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent Color"
                        description=""
                        code={numericDatatypePercentColorCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent Color JSON"
                        description="API response structure for numericDatatypePercentColor JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of percent color data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentColorDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent Change Label */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent Change Label</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent Change Label"
                        description=""
                        code={numericDatatypePercentChangeLabelCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent Change Label JSON"
                        description="API response structure for numericDatatypePercentChangeLabel JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Example of percent change label data type.</CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentChangeLabelDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent Change Precision 4 Label Small */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent Change Precision 4 Label Small</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent Change Precision 4 Label Small"
                        description=""
                        code={numericDatatypePercentChangePrecision4LabelSmallCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent Change Precision 4 Label Small JSON"
                        description="API response structure for numericDatatypePercentChangePrecision4LabelSmall JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of percent change precision 4 label small data type. The label is styled
                    with the color of the value. The size is small.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentChangePrecision4LabelSmallDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent Change Precision 4 Label Medium */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent Change Precision 4 Label Medium</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent Change Precision 4 Label Medium"
                        description=""
                        code={numericDatatypePercentChangePrecision4LabelMediumCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent Change Precision 4 Label Medium JSON"
                        description="API response structure for numericDatatypePercentChangePrecision4LabelMedium JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of percent change precision 4 label medium data type. The label is
                    styled with the color of the value. The size is medium.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentChangePrecision4LabelMediumDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Percent Change Precision 4 Label Big */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Percent Change Precision 4 Label Big</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Percent Change Precision 4 Label Big"
                        description=""
                        code={numericDatatypePercentChangePrecision4LabelBigCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Percent Change Precision 4 Label Big JSON"
                        description="API response structure for numericDatatypePercentChangePrecision4LabelBig JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of percent change precision 4 label big data type. The label is styled
                    with the color of the value. The size is big.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypePercentChangePrecision4LabelBigDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Value */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Value</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Value"
                        description=""
                        code={numericDatatypeValueCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Value JSON"
                        description="API response structure for numericDatatypeValue JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of value data type. The value is styled with the color of the value. The
                    size is default.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeValueDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Count */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Count 1</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Count 1"
                        description=""
                        code={numericDatatypeCountCode1}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Count 1 JSON"
                        description="API response structure for numericDatatypeCount1 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of count data type 1. The count is styled with the color of the count.
                    The size is default.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeCountDemo1 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Count */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Count 2</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Count 2"
                        description=""
                        code={numericDatatypeCountCode2}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Count 2 JSON"
                        description="API response structure for numericDatatypeCount2 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Example of count data type 2. The count is styled with the color of the count.
                    The size is default.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeCountDemo2 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Integer */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Integer</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Integer"
                        description=""
                        code={numericDatatypeIntegerCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Integer JSON"
                        description="API response structure for numericDatatypeInteger JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: integer. Formatted output displays whole numbers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeIntegerDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Signed Integer */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Signed Integer</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Signed Integer"
                        description=""
                        code={numericDatatypeSignedIntegerCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Signed Integer JSON"
                        description="API response structure for numericDatatypeSignedInteger JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: signedInteger. Formatted output displays whole numbers including
                    negative values.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeSignedIntegerDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Decimal1 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Decimal1</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Decimal1"
                        description=""
                        code={numericDatatypeDecimal1Code}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Decimal1 JSON"
                        description="API response structure for numericDatatypeDecimal1 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: decimal1. One decimal place in formatted output.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeDecimal1Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Decimal2 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Decimal2</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Decimal2"
                        description=""
                        code={numericDatatypeDecimal2Code}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Decimal2 JSON"
                        description="API response structure for numericDatatypeDecimal2 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: decimal2. Two decimal places in formatted output.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeDecimal2Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: Decimal3 */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: Decimal3</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: Decimal3"
                        description=""
                        code={numericDatatypeDecimal3Code}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: Decimal3 JSON"
                        description="API response structure for numericDatatypeDecimal3 JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: decimal3. Three decimal places in formatted output.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeDecimal3Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Numeric Datatype: DecimalPos */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Numeric Datatype: DecimalPos</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Numeric Datatype: DecimalPos"
                        description=""
                        code={numericDatatypeDecimalPosCode}
                      />
                      <JsonExampleDialog
                        title="Numeric Datatype: DecimalPos JSON"
                        description="API response structure for numericDatatypeDecimalPos JSON structure."
                        json={JSON.stringify(numericDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: decimalPos. Positive decimals only; negative values show empty
                    formatted output.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumericDatatypeDecimalPosDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: Overview"
                        description=""
                        code={dateDatatypeOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: Overview JSON"
                        description="API response structure for dateDatatypeOverview JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Overview of date and time data types: dateLong, dateYYYYMMDD, dateAndTime, and
                    time with example inputs and usage notes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: dateLong */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: dateLong</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: dateLong"
                        description=""
                        code={dateDatatypeDateLongCode}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: dateLong JSON"
                        description="API response structure for dateDatatypeDateLong JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: dateLong. Long date format (e.g. Feb 3, 2026).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeDateLongDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: dateYYYYMMDD */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: dateYYYYMMDD</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: dateYYYYMMDD"
                        description=""
                        code={dateDatatypeDateYYYYMMDDCode}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: dateYYYYMMDD JSON"
                        description="API response structure for dateDatatypeDateYYYYMMDD JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Data type: dateYYYYMMDD. Date as YYYY-MM-DD.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeDateYYYYMMDDDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: dateYYYYMMDD (string/integer) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: dateYYYYMMDD (string/integer input)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: dateYYYYMMDD"
                        description=""
                        code={dateDatatypeDateYYYYMMDDCode2}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: dateYYYYMMDD (string/integer) JSON"
                        description="API response structure for dateDatatypeDateYYYYMMDDCode2 JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: dateYYYYMMDD. Accepts string or integer YYYYMMDD; invalid format
                    shows error message.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeDateYYYYMMDDDemo2 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: dateYYYYMMDD (unix timestamp) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: dateYYYYMMDD (unix timestamp)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: dateYYYYMMDD Unix"
                        description=""
                        code={dateDatatypeDateYYYYMMDDUnixCode}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: dateYYYYMMDD (unix timestamp) JSON"
                        description="API response structure for dateDatatypeDateYYYYMMDDUnixCode JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: dateYYYYMMDD. Input as unix timestamp.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeDateYYYYMMDDUnixDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: dateAndTime */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: dateAndTime</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: dateAndTime"
                        description=""
                        code={dateDatatypeDateAndTimeCode}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: dateAndTime JSON"
                        description="API response structure for dateDatatypeDateAndTimeCode JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: dateAndTime. Date and time (YYYY-MM-DD HH:MM:SS).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeDateAndTimeDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: time */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: time</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: time"
                        description=""
                        code={dateDatatypeTimeCode}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: time JSON"
                        description="API response structure for dateDatatypeTimeCode JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Data type: time. Time as HH:MM:SS or HHMM.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeTimeDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Date Datatype: time (from datetime) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Date Datatype: time (from datetime or zero)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Date Datatype: time from datetime"
                        description=""
                        code={dateDatatypeTimeCode2}
                      />
                      <JsonExampleDialog
                        title="Date Datatype: time (from datetime or zero) JSON"
                        description="API response structure for dateDatatypeTimeCode2 JSON structure."
                        json={JSON.stringify(dateDatatypeExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: time. Time extracted from datetime string, or zero shown as 00:00.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateDatatypeTimeDemo2 />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Strings Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Strings Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Strings Datatype: Overview"
                        description=""
                        code={stringsDatatypeOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Strings Datatype: Overview JSON"
                        description="API response structure for stringsDatatypeOverview JSON structure."
                        json={JSON.stringify(stringsDatatypesExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Overview of string data types: string, string(10), stringWrap(10),
                    stringWrap(15) with example inputs and usage notes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StringsDatatypeOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Strings Datatype: string */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Strings Datatype: string</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Strings Datatype: string"
                        description=""
                        code={stringsDatatypeStringCode}
                      />
                      <JsonExampleDialog
                        title="Strings Datatype: string JSON"
                        description="API response structure for stringsDatatypeStringCode JSON structure."
                        json={JSON.stringify(stringsDatatypesExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: string. General string with no length limit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StringsDatatypeStringDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Strings Datatype: string(10) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Strings Datatype: string(10)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Strings Datatype: string(10)"
                        description=""
                        code={stringsDatatypeString10Code}
                      />
                      <JsonExampleDialog
                        title="Strings Datatype: string(10) JSON"
                        description="API response structure for stringsDatatypeString10Code JSON structure."
                        json={JSON.stringify(stringsDatatypesExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: string(10). String with max length 10.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StringsDatatypeString10Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Strings Datatype: stringWrap(10) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Strings Datatype: stringWrap(10)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Strings Datatype: stringWrap(10)"
                        description=""
                        code={stringsDatatypeStringWrap10Code}
                      />
                      <JsonExampleDialog
                        title="Strings Datatype: stringWrap(10) JSON"
                        description="API response structure for stringsDatatypeStringWrap10Code JSON structure."
                        json={JSON.stringify(stringsDatatypesExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: stringWrap(10). String with wrapping, max length 10.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StringsDatatypeStringWrap10Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Strings Datatype: stringWrap(15) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Strings Datatype: stringWrap(15)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Strings Datatype: stringWrap(15)"
                        description=""
                        code={stringsDatatypeStringWrap15Code}
                      />
                      <JsonExampleDialog
                        title="Strings Datatype: stringWrap(15) JSON"
                        description="API response structure for stringsDatatypeStringWrap15Code JSON structure."
                        json={JSON.stringify(stringsDatatypesExampleJson, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: stringWrap(15). String with wrapping, max length 15.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StringsDatatypeStringWrap15Demo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: Overview"
                        description=""
                        code={companyAndAnalysisOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: Overview JSON"
                        description="API response structure for companyAndAnalysisOverviewCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Overview of company and analysis data types (flag, tech score, evaluation, risk,
                    companyLink).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: flag */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: flag</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: flag"
                        description=""
                        code={companyAndAnalysisFlagCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: flag JSON"
                        description="API response structure for companyAndAnalysisFlagCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Country flag by code (icon_struct with icon_class flag).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisFlagDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: techScoreArrow */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: techScoreArrow</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: techScoreArrow"
                        description=""
                        code={companyAndAnalysisTechScoreArrowCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: techScoreArrow JSON"
                        description="API response structure for companyAndAnalysisTechScoreArrowCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Technical score as arrow (icon only).</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisTechScoreArrowDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: techScoreText */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: techScoreText</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: techScoreText"
                        description=""
                        code={companyAndAnalysisTechScoreTextCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: techScoreText JSON"
                        description="API response structure for companyAndAnalysisTechScoreTextCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Technical score as text (Positive, Neutral, etc.).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisTechScoreTextDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: techScoreWithArrow */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: techScoreWithArrow</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: techScoreWithArrow"
                        description=""
                        code={companyAndAnalysisTechScoreWithArrowCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: techScoreWithArrow JSON"
                        description="API response structure for companyAndAnalysisTechScoreWithArrowCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Technical score with arrow and text (TextTagWithArrowIcon).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisTechScoreWithArrowDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: evaluationArrow */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: evaluationArrow</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: evaluationArrow"
                        description=""
                        code={companyAndAnalysisEvaluationArrowCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: evaluationArrow JSON"
                        description="API response structure for companyAndAnalysisEvaluationArrowCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Evaluation as arrow (icon_struct arrow).</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisEvaluationArrowDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: evaluationText */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: evaluationText</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: evaluationText"
                        description=""
                        code={companyAndAnalysisEvaluationTextCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: evaluationText JSON"
                        description="API response structure for companyAndAnalysisEvaluationTextCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Evaluation as text (Positive, Neutral, Negative).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisEvaluationTextDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: evaluationArrowWithText */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: evaluationArrowWithText</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: evaluationArrowWithText"
                        description=""
                        code={companyAndAnalysisEvaluationArrowWithTextCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: evaluationArrowWithText JSON"
                        description="API response structure for companyAndAnalysisEvaluationArrowWithTextCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Evaluation as arrow with text (text_position last).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisEvaluationArrowWithTextDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: risk */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: risk</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: risk"
                        description=""
                        code={companyAndAnalysisRiskCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: risk JSON"
                        description="API response structure for companyAndAnalysisRiskCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Risk indicator (string or iconWithText with warning).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisRiskDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: risk(colored) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: risk(colored)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: risk(colored)"
                        description=""
                        code={companyAndAnalysisRiskColoredCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: risk(colored) JSON"
                        description="API response structure for companyAndAnalysisRiskColoredCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Risk indicator with colored text (textValueColored, string_struct with warning
                    icon).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisRiskColoredDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: risk(label) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: risk(label)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: risk(label)"
                        description=""
                        code={companyAndAnalysisRiskLabelCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: risk(label) JSON"
                        description="API response structure for companyAndAnalysisRiskLabelCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Risk indicator as label (labelValueColored badge).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisRiskLabelDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: risk(label,big) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: risk(label,big)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: risk(label,big)"
                        description=""
                        code={companyAndAnalysisRiskLabelBigCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: risk(label,big) JSON"
                        description="API response structure for companyAndAnalysisRiskLabelBigCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Risk indicator as big label (labelValueColored size big).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisRiskLabelBigDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Company and Analysis Datatype: companyLink */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Company and Analysis Datatype: companyLink</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Company and Analysis Datatype: companyLink"
                        description=""
                        code={companyAndAnalysisCompanyLinkCode}
                      />
                      <JsonExampleDialog
                        title="Company and Analysis Datatype: companyLink JSON"
                        description="API response structure for companyAndAnalysisCompanyLinkCode JSON structure."
                        json={JSON.stringify(companyAndAnalysisDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Company link with text and URL (link_struct).</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyAndAnalysisCompanyLinkDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Data Export Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Data Export Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Data Export Datatype: Overview"
                        description=""
                        code={dataExportOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Data Export Datatype: Overview JSON"
                        description="API response structure for dataExportOverviewCode JSON structure."
                        json={JSON.stringify(dataExportDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Overview of data export types (e.g. Wordpress macros for company and price
                    date).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataExportOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Data Export Datatype: wordpressCompanyMacro */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Data Export Datatype: wordpressCompanyMacro</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Data Export Datatype: wordpressCompanyMacro"
                        description=""
                        code={dataExportWordpressCompanyMacroCode}
                      />
                      <JsonExampleDialog
                        title="Data Export Datatype: wordpressCompanyMacro JSON"
                        description="API response structure for dataExportWordpressCompanyMacroCode JSON structure."
                        json={JSON.stringify(dataExportDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Wordpress macro for company and price date (formatted output).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataExportWordpressCompanyMacroDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: Overview"
                        description=""
                        code={chartsOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: Overview JSON"
                        description="API response structure for chartsOverviewCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Overview of chart data types (factor diagram and technical chart sizes).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: factorDiagramTiny */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: factorDiagramTiny</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: factorDiagramTiny"
                        description=""
                        code={chartsFactorDiagramTinyCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: factorDiagramTiny JSON"
                        description="API response structure for chartsFactorDiagramTinyCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Tiny factor diagram for company (img_factor_diagram_struct).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsFactorDiagramTinyDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: factorDiagramSmall */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: factorDiagramSmall</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: factorDiagramSmall"
                        description=""
                        code={chartsFactorDiagramSmallCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: factorDiagramSmall JSON"
                        description="API response structure for chartsFactorDiagramSmallCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Small factor diagram for company (img_factor_diagram_struct).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsFactorDiagramSmallDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: techChartTiny(chartId=4) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: techChartTiny(chartId=4)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: techChartTiny(chartId=4)"
                        description=""
                        code={chartsTechChartTinyCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: techChartTiny(chartId=4) JSON"
                        description="API response structure for chartsTechChartTinyCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Tiny technical chart for company (img_tech_chart_struct).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsTechChartTinyDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: techChartTiny(chartId=4,link) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: techChartTiny(chartId=4,link)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: techChartTiny(chartId=4,link)"
                        description=""
                        code={chartsTechChartTinyLinkCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: techChartTiny(chartId=4,link) JSON"
                        description="API response structure for chartsTechChartTinyLinkCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Tiny technical chart with link to company page (img_tech_chart_struct with url).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsTechChartTinyLinkDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: techChartSmall(chartId=5) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: techChartSmall(chartId=5)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: techChartSmall(chartId=5)"
                        description=""
                        code={chartsTechChartSmallCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: techChartSmall(chartId=5) JSON"
                        description="API response structure for chartsTechChartSmallCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Small technical chart for company (img_tech_chart_struct).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsTechChartSmallDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Charts Datatype: techChartMedium(chartId=4) */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Charts Datatype: techChartMedium(chartId=4)</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Charts Datatype: techChartMedium(chartId=4)"
                        description=""
                        code={chartsTechChartMediumCode}
                      />
                      <JsonExampleDialog
                        title="Charts Datatype: techChartMedium(chartId=4) JSON"
                        description="API response structure for chartsTechChartMediumCode JSON structure."
                        json={JSON.stringify(chartDataType, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Medium technical chart for company (img_tech_chart_struct).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartsTechChartMediumDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Alerts Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Alerts Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Alerts Datatype: Overview"
                        description=""
                        code={alertsDatatypeOverviewCode}
                      />
                      <JsonExampleDialog
                        title="Alerts Datatype: Overview JSON"
                        description="API response structure for alertsDatatypeOverviewCode JSON structure."
                        json={JSON.stringify(alertsDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Examples of alert data types. Needs a boolean input, but will trigger for
                    non-empty values. Alert icon is shown when field is not empty; field may contain
                    popup code or js/ajax calls.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertsDatatypeOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* Alerts Datatype: alarm */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>Alerts Datatype: alarm</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="Alerts Datatype: alarm"
                        description=""
                        code={alertsDatatypeAlarmCode}
                      />
                      <JsonExampleDialog
                        title="Alerts Datatype: alarm JSON"
                        description="API response structure for alertsDatatypeAlarmCode JSON structure."
                        json={JSON.stringify(alertsDatatypes, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: alarm. Alert icon is shown if field is not empty. Field may contain
                    popup code or js/ajax calls.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertsDatatypeAlarmDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: Overview */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: Overview</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: Overview"
                        description=""
                        code={myDataDatatypeOverviewCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: Overview JSON"
                        description="API response structure for myDataDatatypeOverviewCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Examples of myData types for user-specific data: myDataIcon, myDataIcons,
                    myWatchlistIcon, myWatchlist, myWatchlistUI, myPortfolio, myRating, myRatingUI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeOverviewDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: myWatchlist */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: myWatchlist</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: myWatchlist"
                        description=""
                        code={myDataDatatypeMyWatchlistCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: myWatchlist JSON"
                        description="API response structure for myDataDatatypeMyWatchlistCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Data type: myDataIcon. Mobile UI to menu; indicates if any myData set.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeMyWatchlistDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: myPortfolio */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: myPortfolio</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: myPortfolio"
                        description=""
                        code={myDataDatatypeMyPortfolioCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: myPortfolio JSON"
                        description="API response structure for myDataDatatypeMyPortfolioCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Data type: myPortfolio. All icons for myData.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeMyPortfolioDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: myRating */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: myRating</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: myRating"
                        description=""
                        code={myDataDatatypeMyRatingCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: myRating JSON"
                        description="API response structure for myDataDatatypeMyRatingCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Data type: myRating.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeMyRatingDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: myNotes */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: myNotes</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: myNotes"
                        description=""
                        code={myDataDatatypeMyNotesCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: myNotes JSON"
                        description="API response structure for myDataDatatypeMyNotesCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Data type: myNotes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeMyNotesDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: myAlerts */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: myAlerts</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: myAlerts"
                        description=""
                        code={myDataDatatypeMyAlertsCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: myAlerts JSON"
                        description="API response structure for myDataDatatypeMyAlertsCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>

                  <CardDescription>Data type: myAlerts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeMyAlertsDemo />
                </CardContent>
              </Card>
            </SectionWrapper>

            {/* MyData Datatype: myDataAny */}
            <SectionWrapper sectionIndex={sectionIndex++}>
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>MyData Datatype: myDataAny</CardTitle>{' '}
                    <div className="flex items-center gap-4">
                      <CodeExampleDialog
                        title="MyData Datatype: myDataAny"
                        description=""
                        code={myDataDatatypeMyDataAnyCode}
                      />
                      <JsonExampleDialog
                        title="MyData Datatype: myDataAny JSON"
                        description="API response structure for myDataDatatypeMyDataAnyCode JSON structure."
                        json={JSON.stringify(myDataDatatype, null, 2)}
                      />
                    </div>
                  </div>
                  <CardDescription>Data type: myDataAny.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MyDataDatatypeMyDataAnyDemo />
                </CardContent>
              </Card>
            </SectionWrapper>
          </main>

          <aside className="hidden w-64 shrink-0 lg:block" aria-label="Table of contents">
            <TableOfContents sections={tableSections} title="Table" />
          </aside>
        </div>
      </div>
    </TableOfContentsProvider>
  );
}
