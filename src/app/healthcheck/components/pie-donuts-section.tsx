import { ChartPieDonut } from '@/components/custom-components/pie-donut-chart';
import { PiesSection } from '@/lib/types/health-check';

export function PieDonutsSection({ data }: { data: PiesSection }) {
  return <ChartPieDonut data={data} />;
}
