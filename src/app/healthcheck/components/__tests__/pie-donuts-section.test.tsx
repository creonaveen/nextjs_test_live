import { render } from '@testing-library/react';

import type { PiesSection } from '@/lib/types/health-check';

import { PieDonutsSection } from '../pie-donuts-section';

const chartSpy = jest.fn(() => <div data-testid="pie-donut" />);

jest.mock('@/components/custom-components/pie-donut-chart', () => ({
  ChartPieDonut: (props: Record<string, unknown>) => chartSpy(props),
}));

describe('PieDonutsSection', () => {
  beforeEach(() => {
    chartSpy.mockClear();
  });

  it('should render pie donut chart', () => {
    const data: PiesSection = { available_charts: [] } as PiesSection;

    render(<PieDonutsSection data={data} />);

    expect(chartSpy).toHaveBeenCalledWith(expect.objectContaining({ data }));
  });
});
