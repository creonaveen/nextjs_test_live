'use client';

import { CorrelationMatrix } from '@/components/custom-components/table-with-popover';

/**
 * Demo component for the InteractiveTable (Table with Popover) component.
 * Shows how to use TableCellTooltip in table cells for interactive tooltips.
 *
 * @returns A demo of the InteractiveTable component
 */
export function TableWithPopoverDemo() {
  return <CorrelationMatrix data={correlationMatrixJson.correlation_analysis} />;
}

export const tableWithPopoverCode = `'use client';

import * as React from 'react';

import { usePlatform } from '@/lib/platform';

import { Popover, PopoverContent, PopoverTrigger } from '../external-components/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '../external-components/tooltip';

interface TableCellTooltipProps {
  value: React.ReactNode;
  tooltip: React.ReactNode;
  style?: React.CSSProperties;
}

export function TableCellTooltip({ value, tooltip, style }: TableCellTooltipProps) {
const platform = usePlatform();
const [open, setOpen] = React.useState(false);

  if (!tooltip) {
    return <div style={style}>{value}</div>;
  }

  const triggerContent = (
    <>
      <span className="absolute -top-1 right-0 left-0 h-1" />
      {value}
    </>
  );

  if (platform !== 'desktop') {
    // Use Popover for touch devices

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cursor-pointer pt-0.5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Show tooltip"
            style={style}
          >
            {triggerContent}
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" align="center" className="p-2 text-sm">
          {tooltip}
        </PopoverContent>
      </Popover>
    );
  }

  // Use Tooltip for desktop (hover-based)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-pointer pt-0.5" style={style}>
          {triggerContent}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="p-2 text-sm">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
`;

export const correlationMatrixJson = {
  data_and_calculation_warnings_section: {
    has_warnings: false,
    warning_count: 0,
    warnings: [],
    api_guide: {
      source:
        'factorCompany warnings relate to data availability/quality. healthElement warnings relate to calculation assumptions.',
      health_key:
        'For healthElement warnings, use healthKey to reference specific health element data.',
      rendering:
        'Display below overall and elements health scores. Important to warn users on assumptiona and possible data errors affecting the correctness of the health analysis.',
    },
  },
  correlation_analysis: {
    title: 'Correlation matrix',
    correlation_matrix: {
      l0: {
        c0: 1,
        c1: 0.191,
        c2: 0.206,
        c3: 0.242,
      },
      l1: {
        c0: 0.191,
        c1: 1,
        c2: 0.147,
        c3: 0.146,
      },
      l2: {
        c0: 0.206,
        c1: 0.147,
        c2: 1,
        c3: 0.987,
      },
      l3: {
        c0: 0.242,
        c1: 0.146,
        c2: 0.987,
        c3: 1,
      },
    },
    company_keys: {
      i0: 100103,
      i1: 100718,
      i2: 46100637,
      i3: 46100638,
    },
    company_keys_info:
      'The companyIds for corresponding columns and rows of the correlation matrix. Use for lookup of tickers etc.',
    categories: [
      {
        category_id: 0,
        name: 'correlationLow',
        corr_limit_low: 0,
        corr_limit_high: 0.3,
        color_class: 'tableCellPositive',
      },
      {
        category_id: 1,
        name: 'correlationMedium',
        corr_limit_low: 0.3,
        corr_limit_high: 0.5,
        color_class: 'tableCellNeutral',
      },
      {
        category_id: 2,
        name: 'correlationHigh',
        corr_limit_low: 0.5,
        corr_limit_high: 0.85,
        color_class: 'tableCellNegative',
      },
      {
        category_id: 3,
        name: 'correlationExtremelyHigh',
        corr_limit_low: 0.85,
        corr_limit_high: 1,
        color_class: 'tableCellExtremelyNegative',
      },
    ],
    correlation_table: {
      c_name: 'cleanTable',
      id: 'correlationMatrix',
      column_headers: {
        i0: 'corr',
        i1: 'NHY',
        i2: 'NEL',
        i3: 'ERICB',
      },
      column_data_type: {
        i0: 'string',
        i1: 'general',
        i2: 'general',
        i3: 'general',
      } as const,
      caption: 'Calculated correlation is based on price changes in the past 66 days.',
      cell_content: {
        l0: {
          c0: 'NEL',
          c1: '0.2',
          c2: '',
          c3: '',
        },
        l1: {
          c0: 'ERICB',
          c1: '0.2',
          c2: '0.1',
          c3: '',
        },
        l2: {
          c0: 'ERICA',
          c1: '0.2',
          c2: '0.1',
          c3: '1.0',
        },
      },
      cell_category: {
        l0: {
          c0: null,
          c1: 0,
          c2: null,
          c3: null,
        },
        l1: {
          c0: null,
          c1: 0,
          c2: 0,
          c3: null,
        },
        l2: {
          c0: null,
          c1: 0,
          c2: 0,
          c3: 3,
        },
      },
      cell_tooltip: {
        l0: {
          c0: '',
          c1: 'corr(NEL,NHY)=0.2',
          c2: '',
          c3: '',
        },
        l1: {
          c0: '',
          c1: 'corr(ERICB,NHY)=0.2',
          c2: 'corr(ERICB,NEL)=0.1',
          c3: '',
        },
        l2: {
          c0: '',
          c1: 'corr(ERICA,NHY)=0.2',
          c2: 'corr(ERICA,NEL)=0.1',
          c3: 'corr(ERICA,ERICB)=1.0',
        },
      },
      cell_class: {
        l0: {
          c0: '',
          c1: 'tableCellPositive',
        },
        l1: {
          c0: '',
          c1: 'tableCellPositive',
          c2: 'tableCellPositive',
        },
        l2: {
          c0: '',
          c1: 'tableCellPositive',
          c2: 'tableCellPositive',
          c3: 'tableCellExtremelyNegative',
        },
      },
    },
    correlation_table_info:
      'correlationTable contains: columnHeaders, cellContent (raw values), cellCategory (0-3), cellTooltip (hover text), cellClass (CSS classes)',
    mean_correlation: '0.34',
    num_not_correlated: 5,
    num_highly_correlated: 1,
    num_medium_correlated: 0,
    frac_not_correlated: '0.83',
    frac_highly_correlated: '0.17',
    frac_medium_correlated: '0.00',
    highlights_text: 'Average correlation factor is 0.34.',
    details_text:
      '83% of the stocks have low correlation, 0% have medium correlation and 17% have strong correlation.',
    warning_text: '',
    help_data: {
      title: 'Stock correlation',
      text_primary: '',
      text_secondary:
        '<p>Correlation is a statistical term for the degree of covariation between two quantities. When two stocks fluctuate strongly in sync, for example two oil stocks that rise when oil prices rise, correlation is strong. When there is little correlation between how two stocks perform, for example a bank and an oil company, correlation is weak.</p><br><p>Stocks that fluctuate completely in sync get a correlation factor of c=1.0. If the correlation factor is above 0.5, the stocks are considered strongly correlated, while above 0.3 are considered moderately correlated, and below 0.3 are considered uncorrelated. Stocks that move in the opposite direction will have a negative correlation factor.</p>',
      display_guide: 'helper card (desktop), hover tip (mobile)',
    },
  },
  api_info: {
    status: 'success',
    timestamp: '2026-01-28 06:04:05',
    market_id: '1',
    market_name: 'Oslo Børs',
    mode: 'pid',
    input_params: ['context', 'pid', 'lang', 'sections', 'factorDiagramWidth'],
    used_param: 'pid=39901',
  },
  api_guide: {
    title: 'Portfolio Health Check API Guide',
    description:
      'This API provides portfolio health analysis using existing Investtech algorithms and scoring.',
    endpoint: '/index.php?context=health_check',
    methods: ['GET'],
    version: '1.01',
    latest_additions: [
      '20260127, v 1.01: GL. Html specific code moved to class_PortfolioTools_html.php. class_PortfolioTools.php clean for handling API.',
      '20260127, v 1.0: GL. Full version with some cleanup done, i.e. removal of hex color codes.',
      '20260127, v 0.96: GL. Chart api param changes for stocks in the portfolio development section and the portfolio chart.',
      '20260126, v 0.95: GL. First complete version with all necessary sections and data. Not yet coordinated with front in details, and not well tested, yet some debug and test-functionality also implemented.',
      '20260123, v 0.93: GL. Bugfix in svgchart API when handling &type=myport.',
      '20260123, v 0.92: GL. New section, &sections=test_links, provided for links to test portfolios to ease back and front testing.',
      '20260123, v 0.91: GL. Handling parameter &factor_diagram_width=.',
      '20260123, v 0.9: GL. Portfolio development report (sections=portfolio_development_report), full version. Help data with same structure as for the other sections.',
      '20260122, v 0.83: GL. Portfolio development report, highlights section first version.',
      '20260121, v 0.82: GL. Color names for donut categories (used for legends and segments).',
      '20260121, v 0.81: GL. Updated factor diagram code. full_health_report_link_text moved from overall to elements-section.',
      '20260120, v 0.8: GL. Factor diagram using common code for company and health check.',
      '20260120, v 0.76: GL. Updated factor diagram and added health_check_viewer.html.',
      '20260119, v 0.73: GL. First version of factor diagram.',
      '20260116, v 0.72: GL. Added kpi_table_formatted.',
      '20260116, v 0.71: GL. Handling of long help text sections with header/text structs, like for static pages, using cf_htmlToJsonReady($structOrArray).',
      '20260114, v 0.7: GL. KPIs section and data_and_calculation_warnings section. Handling "&sections=kpis".',
      '20260114, v 0.61: GL. Pies section key renamed to pies, i.e. "&sections=pies". Now handling sections "health_data,pies,kpis,correlation_analysis"',
      '20260114, v 0.6: GL. Full health report.',
      '20260113, v 0.5: GL. Health data for overall health and the eight element healths. Used for making score bars on with hover info. Handling "&sections=health_data".',
      '20260113, v 0.45: GL. Associative arrays used throughout API data structures for better JSON compatibility (uses cf_ensureKeysSet).',
      '20260113, v 0.42: GL. Handling parameter &sections=, taking values for sections: correlation_analysis,pies,health_data.',
      '20260113, v 0.41: GL. Small changes to correlation matrix.',
      '20260112, v 0.4: GL. Correlation matrix added.',
      '20260112, v 0.31: GL. Color removed from pie members, and now only in the categories data.',
      '20260109, v 0.3: GL. New structure with pies contained in the pies section and members sorted by priority',
      '20260108, v 0.25: GL. Initial version of pies section and pie_charts',
    ],
    examples: {
      portfolio_health: '/index.php?context=health_check&portfolio_id=39901',
      watchlist_health: '/index.php?context=health_check&watchlist_id=12345',
      custom_portfolio:
        '/index.php?context=health_check&company_ids=100274,100359&ref_index_company_id=100001',
      ticker_analysis: '/index.php?context=health_check&portfolio_tickers=EQUI,DNB,TEL',
      weighted_portfolio:
        '/index.php?context=health_check&portfolio_tickers=AUSS,LSG,MOWI,SALM,BAKKA&portfolio_num_shares=100,100,100,200,10&ref_index_ticker=OSEBX',
      debug_mode: '/index.php?context=health_check&portfolio_id=39901&api_test=1',
      no_guide: '/index.php?context=health_check&portfolio_id=39901&api_guide=0',
    },
    parameters: {
      required: {
        context: {
          value: 'health_check',
          description: 'API context identifier',
        },
      },
      input_methods: {
        portfolio_id: {
          parameter: 'portfolio_id',
          type: 'integer',
          description: 'Portfolio ID from MY_PORTFOLIO table (previously pid)',
          example: '?context=health_check&portfolio_id=39901',
          priority: 1,
        },
        watchlist_id: {
          parameter: 'watchlist_id',
          type: 'integer',
          description: 'Watchlist ID from WATCHLIST table (previously wlid)',
          example: '?context=health_check&watchlist_id=12345',
          priority: 2,
        },
        company_ids: {
          parameter: 'company_ids',
          type: 'string',
          description: 'Comma-separated list of company IDs (previously portCompanyIds)',
          example: '?context=health_check&company_ids=100274,100359',
          priority: 3,
        },
        portfolio_tickers: {
          parameter: 'portfolio_tickers',
          type: 'string',
          description: 'Comma-separated list of ticker symbols (previously portTickers)',
          example: '?context=health_check&portfolio_tickers=EQUI,DNB,TEL',
          priority: 3,
        },
        weighted_portfolio: {
          parameters: ['portfolio_tickers', 'portfolio_num_shares'],
          type: 'string,string',
          description:
            'Ticker symbols with corresponding number of shares (previously portTickers + portNumShares)',
          example:
            '?context=health_check&portfolio_tickers=AUSS,LSG,MOWI,SALM,BAKKA&portfolio_num_shares=100,100,100,200,10',
          priority: 3,
          note: 'If portfolio_num_shares is not provided, portfolio will be equally weighted',
        },
      },
      optional: {
        ref_index_ticker: {
          type: 'string',
          description: 'Reference index ticker symbol (previously refIndexTicker)',
          example: 'OSEBX',
        },
        ref_index_company_id: {
          type: 'integer',
          description: 'Reference index company ID for comparison (previously refIndexCompanyId)',
          default: 'Auto-detected or OSEBX (100001)',
        },
        portfolio_num_shares: {
          type: 'string',
          description:
            'Comma-separated number of shares for each ticker (previously portNumShares)',
          example: '100,100,100,200,10',
          note: 'Must match order of tickers in portfolio_tickers parameter',
        },
        api_test: {
          type: 'integer',
          description: 'Enable test/debug mode (shows raw data structure)',
          values: [0, 1],
          default: 0,
        },
        api_guide: {
          type: 'integer',
          description: 'Include this API guide in response',
          values: [0, 1],
          default: 1,
        },
        sections: {
          type: 'string',
          description:
            'Comma-separated list of sections to include in calcApiData response. Valid values are: health_data, pies, kpis, factor_diagram, correlation_analysis, portfolio_development_report, test_links.',
          values: {
            health_data: 'Raw health calculation data (overall, elements, full report)',
            pies: 'Pie chart data for all health categories',
            kpis: 'Key performance indicators and metrics',
            factor_diagram: 'Factor diagram SVG and metadata',
            correlation_analysis: 'Correlation matrix analysis and data structures',
            portfolio_development_report: 'Portfolio development and performance data',
            test_links: 'Developer/test portfolio links (for testing only)',
          },
          examples: {
            correlation_analysis: 'Only correlation data',
            'correlation_analysis,pies': 'Correlation and pie chart data',
            all_sections: 'Leave empty or omit parameter to include all sections',
          },
          default: 'All sections included',
          note: 'Invalid section names will trigger an error response with a list of valid options. If omitted or empty, all sections are included.',
        },
      },
    },
    response_structure: {
      port_type: 'Portfolio type (myPortfolio, myWatchlist, url)',
      stat_port: 'Portfolio statistics and health scores',
      stat_ref: 'Reference index statistics',
      port_company: 'Individual company data and scores',
      api_info: 'API execution metadata',
      api_guide: 'This usage guide (if api_guide=1)',
    },
    health_scoring: {
      description: 'Portfolio health is calculated using weighted scores across multiple factors',
      factors: {
        num_stocks: {
          weight: 2,
          description: 'Number of stocks diversification',
        },
        volatility: {
          weight: 2,
          description: 'Portfolio volatility analysis',
        },
        liquidity: {
          weight: 1,
          description: 'Liquidity assessment',
        },
        equally_weighted: {
          weight: 1,
          description: 'Equal weighting analysis',
        },
        sector_diversification: {
          weight: 1,
          description: 'Sector spread analysis',
        },
        non_correlation: {
          weight: 2,
          description: 'Correlation analysis',
        },
        technical: {
          weight: 2,
          description: 'Technical analysis scores',
        },
        inside: {
          weight: 1,
          description: 'Insider trading analysis',
        },
      },
      total_weight: 12,
      scale: 'Scores typically range from 0-100 per factor',
    },
  },
  meta: {
    title: 'Technical Analysis',
    description: 'Technical analysis, signals, key figures and research.',
  },
};
