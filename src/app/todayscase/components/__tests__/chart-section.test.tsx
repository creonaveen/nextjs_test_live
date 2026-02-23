import { render } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import { usePlatform } from '@/lib/platform';

import ChartSection from '../chart-section/chart-section';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/components/custom-components/chart/chart-maximize-with-trigger', () => ({
  ChartMaximizeWithTrigger: ({ title, children }: unknown) => (
    <div data-testid="chart-maximize">
      {title} - {children}
    </div>
  ),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    getColorClass: jest.fn(() => 'text-success'),
    getTableColumnHideClass: jest.fn(() => ''),
  };
});

jest.mock('@/store/api-service/static-content-api-service', () => ({
  useGetStaticContent: jest.fn(() => ({
    data: { content: '<svg>test</svg>' },
    isLoading: false,
  })),
}));

jest.mock('@/utils/chart-dimensions', () => ({
  observeChartResize: jest.fn(() => jest.fn()),
}));

jest.mock('@/utils/main-chart-tooltip', () => ({
  attachOrDetachEventListeners: jest.fn(),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;

describe('ChartSection', () => {
  const mockCompanySectionMainChart = {
    data: {
      main_chart: {
        svg_id: 'chart1',
        chart_param: 'param1',
        chart_name: 'Main Chart',
        img_param: {
          id: 'chart1',
          show_tooltip: false,
          chart_tooltip_id: 1,
          chart_maximize: false,
        },
        static_svg_file: {
          reference: 'ref1',
          parameters: 'param1',
        },
      },
      insider_chart: {
        static_svg_file: {
          reference: 'ref2',
          parameters: 'param2',
        },
        img_param: {
          id: 'insider1',
        },
      },
      technical_comment: {
        analysis_title: 'Technical Comment',
        analysis_text: 'Comment text',
      },
    },
    insider_trade_table: {
      table_definition: [],
      content: [],
    },
  };

  const mockLabelsAndTexts = {
    title: 'Chart Title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUsePlatform.mockReturnValue('desktop');
  });

  it('should render chart section', () => {
    const { container } = render(
      <ChartSection
        company_section_main_chart={mockCompanySectionMainChart}
        labels_and_texts={mockLabelsAndTexts}
        id="1"
      />
    );

    // Check if the chart section is rendered (Card component should be present)
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
  });
});
