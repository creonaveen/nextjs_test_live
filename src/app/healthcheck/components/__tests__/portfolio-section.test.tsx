import { fireEvent, render, screen } from '@testing-library/react';

import type { StockItem } from '@/lib/types/health-check';

import { PortfolioSection } from '../portfolio-section';

const pushSpy = jest.fn();
const chartMaximizeSpy = jest.fn(({ children }: { children: React.ReactNode }) => (
  <div data-testid="chart-maximize">{children}</div>
));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushSpy }),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: () => 'desktop',
}));

jest.mock('@/lib/utils', () => ({
  getLanguageFromStorage: () => 'eng',
}));

jest.mock('@/components/custom-components/svg-renderer', () => ({
  __esModule: true,
  default: () => <div data-testid="svg-renderer" />,
}));

jest.mock('@/components/custom-components/chart/chart-maximize-with-trigger', () => ({
  ChartMaximizeWithTrigger: (props: { children: React.ReactNode }) => chartMaximizeSpy(props),
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Card: ({ children, ...props }: { children: React.ReactNode }) => (
      <div role="button" {...props}>
        {children}
      </div>
    ),
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe('PortfolioSection', () => {
  beforeEach(() => {
    pushSpy.mockClear();
    chartMaximizeSpy.mockClear();
  });

  const baseData: StockItem = {
    ticker: 'A',
    company_id: '123',
    market_id: '1',
    company_name: 'Company A',
    comment_text: 'Comment',
  } as StockItem;

  it('should return null when access is false', () => {
    const { container } = render(
      <PortfolioSection
        data={baseData}
        chartParams="?chart=1"
        hasAccess={false}
        chartMaximize={1}
        showMoreLabel="Show more"
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render chart maximize variant and navigate on click', () => {
    render(
      <PortfolioSection
        data={baseData}
        chartParams="?chart=1"
        hasAccess={true}
        chartMaximize={1}
        showMoreLabel="Show more"
      />
    );

    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByTestId('chart-maximize')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(pushSpy).toHaveBeenCalledWith('/company/123?market_id=1&language=eng');
  });
});
