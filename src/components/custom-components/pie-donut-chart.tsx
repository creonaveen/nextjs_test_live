import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import { ChartContainer, ChartTooltip, type ChartConfig } from 'investtech/external-components';
import { Cell, Pie, PieChart } from 'recharts';

import { PiesSection } from '@/lib/types/health-check';
import { getPieSectionColor } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface PieDonutChartProps {
  data: PiesSection;
}

interface PieCategory {
  id: number;
  name: string;
  color_name: string;
}

interface PieDataItem {
  label: string;
  value: string;
  description: string;
  category_id: number;
}

interface PieChartData {
  categories: PieCategory[];
  data: PieDataItem[];
  title: string;
  is_open: boolean;
  free_trial_link?: string;
  free_trial_label?: string;
  display_order: number;
}

interface ChartDataEntry {
  sectionLabel: string;
  value: number;
  description: string;
  fill: string;
}

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS                                   */
/* -------------------------------------------------------------------------- */

const chartConfig = {
  value: {
    label: 'value',
  },
} satisfies ChartConfig;

const DEMO_ORDER_URL = 'https://www.investtech.com/main/market.php';

/* -------------------------------------------------------------------------- */
/*                                HELPERS                                     */
/* -------------------------------------------------------------------------- */

function buildCategoryColorMap(categories: PieCategory[]): Record<number, string> {
  return categories.reduce(
    (acc, category) => {
      acc[category.id] = getPieSectionColor(category.color_name);
      return acc;
    },
    {} as Record<number, string>
  );
}

function buildChartData(pieChart: PieChartData): ChartDataEntry[] {
  const colorMap = buildCategoryColorMap(pieChart.categories);

  return pieChart.data.map((item) => ({
    sectionLabel: item.label,
    value: Number(item.value),
    description: item.description,
    fill: colorMap[item.category_id],
  }));
}

/* -------------------------------------------------------------------------- */
/*                              SUBCOMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function CategoryLegend({ categories, value }: { categories: PieCategory[]; value: number }) {
  const ordered = value === -1 ? [...categories].reverse() : categories;

  return (
    <div className="flex flex-col gap-2">
      {ordered.map((category) => {
        if (!category.name) return null;

        return (
          <div
            key={category.id}
            className="border-grey-100 dark:border-grey-700 flex items-center gap-3 rounded-md border px-2 text-sm"
          >
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: getPieSectionColor(category.color_name) }}
            />
            <span>{category.name}</span>
          </div>
        );
      })}
    </div>
  );
}

function LockedOverlay({ label, link }: { label?: string; link?: string }) {
  return (
    <div
      className="group dark:bg-grey-900/40 absolute inset-0 z-20 rounded-sm bg-black/2 hover:cursor-pointer"
      onClick={() => window.open(DEMO_ORDER_URL + (link ?? ''), '_blank', 'noopener,noreferrer')}
    >
      <div className="flex h-full items-center justify-center">
        <span className="text-grey-800 dark:text-grey-100 group-hover:text-primary w-fit px-6 text-sm font-semibold group-hover:underline">
          {label ?? 'Free Trial Now'}
        </span>
      </div>
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartDataEntry }>;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-grey-800 dark:bg-grey-50 rounded-md px-3 py-2 text-sm text-white shadow-md dark:text-black">
      <div className="text-muted-foreground">{payload[0].payload.description}</div>
    </div>
  );
}

function PieCard({ pie }: { pie: PieChartData }) {
  const chartData = buildChartData(pie);

  return (
    <Card className="col-span-1 flex flex-col rounded-none sm:rounded-xl">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-base font-medium">{pie.title}</CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-0">
        <div className="relative">
          {!pie.is_open && (
            <LockedOverlay label={pie.free_trial_label} link={pie.free_trial_link} />
          )}

          <ChartContainer
            config={chartConfig}
            className={`mx-auto aspect-square max-h-[250px] ${pie.is_open ? '' : 'blur-sm'}`}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) =>
                  PieTooltip({ active, payload: payload as { payload: ChartDataEntry }[] })
                }
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="sectionLabel"
                innerRadius={35}
                outerRadius={90}
                stroke="var(--color-card)"
                strokeWidth={1.8}
                isAnimationActive={false}
                label={pie.is_open ? renderLabel : false}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 px-2 text-sm">
        <CategoryLegend categories={pie.categories} value={pie.display_order} />
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*                              LABEL RENDERER                                 */
/* -------------------------------------------------------------------------- */

interface RenderLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  name: string;
  percent: number;
}

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  percent,
}: RenderLabelProps) => {
  const RADIAN = Math.PI / 180;
  const MIN_LABEL_ANGLE = 25;

  if (percent * 360 < MIN_LABEL_ANGLE) return null;

  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      pointerEvents="none"
      fill="#000"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={500}
    >
      {name.length > 4 ? `${name.slice(0, 4)}..` : name}
    </text>
  );
};

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function ChartPieDonut({ data }: PieDonutChartProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6 ${
        data.show_insider === 0 ? 'xl:grid-cols-4' : 'xl:grid-cols-5'
      }`}
    >
      {Object.entries(data.pie).map(([key, pie]) => {
        if (pie.data.length === 0) return null;
        if (key === 'inside' && data.show_insider === 0) return null;

        return <PieCard key={key} pie={pie} />;
      })}
    </div>
  );
}
