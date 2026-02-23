'use client';

import { ChartPieDonut } from '@/components/custom-components/pie-donut-chart';

/**
 * Demo component for the ChartPieDonut component.
 * Shows how to use the pie donut chart with data from JSON.
 *
 * @returns A demo of the ChartPieDonut component
 */
export function ChartPieDonutDemo() {
  return <ChartPieDonut data={pieDonutChartJson.pie_section} />;
}

export const pieDonutChartCode = `
'use client';

import { Cell, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/external-components/card';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/external-components/chart';

import dummyDonutJson from './dummy-donut.json';

const volat = dummyDonutJson.pieData.volat;

function CategoryLegend({ categories }: { categories: typeof volat.categories }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center gap-3 text-sm">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: category.color }} />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

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
  const MIN_LABEL_ANGLE = 15; // degrees

  // Convert percent → angle
  const angle = percent * 360;

  // Not enough space → don't render label
  if (angle < MIN_LABEL_ANGLE) return null;

  // Position text in the middle of the slice
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {name}
    </text>
  );
};

// Create a lookup map for categories
const categoryColorMap = volat.categories.reduce(
  (acc, category) => {
    acc[category.id] = category.color;
    return acc;
  },
  {} as Record<number, string>
);

// Convert to array (Recharts needs array)
const chartData = volat.data.map((item) => ({
  sectionLabel: item.label, // ERICB, NEL, NHY
  value: item.value, // 53.84, 1.27, 44.89
  description: item.description,
  fill: categoryColorMap[item.categoryId], // color from category
}));

const chartConfig = {
  value: {
    label: 'value',
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-base font-medium">{volat.chart.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const data = payload[0].payload;

                return (
                  <div className="bg-grey-800 dark:bg-grey-50 rounded-md px-3 py-2 text-sm text-white shadow-md dark:text-black">
                    <div className="text-muted-foreground">{data.description}</div>
                  </div>
                );
              }}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="sectionLabel"
              innerRadius={40}
              stroke={\`var(--color-card)\`}
              strokeWidth={1.8}
              isAnimationActive={false}
              label={renderLabel}
              labelLine={false}
            />
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <CategoryLegend categories={volat.categories} />
      </CardFooter>
    </Card>
  );
}
`;

export const pieDonutChartJson = {
  pie_section: {
    available_charts: ['volat', 'liquidity', 'technical', 'inside', 'sector_diversification'],

    insider_exists: 1,

    show_insider: 0,

    pie: {
      volat: {
        chart: {
          type: 'pie',
          variable: 'VOLAT22',
        },
        title: 'Volatility',
        display_order: 1,
        order_function: '1*$category_id*100 + $sequence',
        is_open: true,
        categories: [
          {
            id: 0,
            name: 'Low',
            upper_limit: 10,
            style_id: 2,
            color_name: 'colPositive',
          },
          {
            id: 1,
            name: 'Medium',
            upper_limit: 20,
            style_id: 0,
            color_name: 'colNeutral',
          },
          {
            id: 2,
            name: 'High',
            upper_limit: 40,
            style_id: -1,
            color_name: 'colWeakNegative',
          },
          {
            id: 3,
            name: 'Extreme',
            upper_limit: null,
            style_id: -2,
            color_name: 'colNegative',
          },
        ],
        data: [
          {
            order: 101,
            category_id: 1,
            label: 'ERICA',
            description: 'Ericsson A: Medium',
            value: '9.92',
          },
          {
            order: 102,
            category_id: 1,
            label: 'ERICB',
            description: 'Ericsson B: Medium',
            value: '49.53',
          },
          {
            order: 103,
            category_id: 1,
            label: 'NHY',
            description: 'Norsk Hydro: Medium',
            value: '39.52',
          },
          {
            order: 204,
            category_id: 2,
            label: 'NEL',
            description: 'NEL: High',
            value: '1.03',
          },
        ],
      },
      liquidity: {
        chart: {
          type: 'pie',
          variable: 'MAINFACTOR_STABILITY_LIQ',
        },
        title: 'Liquidity',
        display_order: -1,
        order_function: '-1*$category_id*100 + $sequence',
        is_open: true,
        categories: [
          {
            id: 0,
            name: 'Illiquid',
            upper_limit: 10,
            style_id: -2,
            color_name: 'colNegative',
          },
          {
            id: 1,
            name: 'Bad',
            upper_limit: 33.3,
            style_id: -1,
            color_name: 'colWeakNegative',
          },
          {
            id: 2,
            name: 'Medium',
            upper_limit: 66.7,
            style_id: 0,
            color_name: 'colNeutral',
          },
          {
            id: 3,
            name: 'Good',
            upper_limit: null,
            style_id: 1,
            color_name: 'colPositive',
          },
        ],
        data: [
          {
            order: -298,
            category_id: 3,
            label: 'ERICB',
            description: 'Ericsson B: Good',
            value: '49.53',
          },
          {
            order: -296,
            category_id: 3,
            label: 'NHY',
            description: 'Norsk Hydro: Good',
            value: '39.52',
          },
          {
            order: -199,
            category_id: 2,
            label: 'ERICA',
            description: 'Ericsson A: Medium',
            value: '9.92',
          },
          {
            order: -197,
            category_id: 2,
            label: 'NEL',
            description: 'NEL: Medium',
            value: '1.03',
          },
        ],
      },
      technical: {
        chart: {
          type: 'pie',
          variable: 'MAINFACTOR_TECHNICAL',
        },
        title: 'Technical condition',
        display_order: -1,
        order_function: '-1*$category_id*100 + $sequence',
        is_open: true,
        categories: [
          {
            id: 0,
            name: 'Negative',
            upper_limit: 25,
            style_id: -2,
            color_name: 'colNegative',
          },
          {
            id: 1,
            name: 'Slight negative',
            upper_limit: 37.5,
            style_id: -1,
            color_name: 'colWeakNegative',
          },
          {
            id: 2,
            name: 'Neutral',
            upper_limit: 62.5,
            style_id: 0,
            color_name: 'colNeutral',
          },
          {
            id: 3,
            name: 'Slight positive',
            upper_limit: 75,
            style_id: 1,
            color_name: 'colWeakPositive',
          },
          {
            id: 4,
            name: 'Positive',
            upper_limit: null,
            style_id: 2,
            color_name: 'colPositive',
          },
        ],
        data: [
          {
            order: -399,
            category_id: 4,
            label: 'ERICA',
            description: 'Ericsson A: Positive',
            value: '9.92',
          },
          {
            order: -398,
            category_id: 4,
            label: 'ERICB',
            description: 'Ericsson B: Positive',
            value: '49.53',
          },
          {
            order: -396,
            category_id: 4,
            label: 'NHY',
            description: 'Norsk Hydro: Positive',
            value: '39.52',
          },
          {
            order: -197,
            category_id: 2,
            label: 'NEL',
            description: 'NEL: Neutral',
            value: '1.03',
          },
        ],
      },
      inside: {
        chart: {
          type: 'pie',
          variable: 'MAINFACTOR_INSIDE',
        },
        title: 'Insider trades',
        display_order: -1,
        order_function: '-1*$category_id*100 + $sequence',
        is_open: false,
        categories: [
          {
            id: 0,
            name: 'Negative',
            upper_limit: 25,
            style_id: -2,
            color_name: 'colNegative',
          },
          {
            id: 1,
            name: 'Slight negative',
            upper_limit: 37.5,
            style_id: -1,
            color_name: 'colWeakNegative',
          },
          {
            id: 2,
            name: 'Neutral',
            upper_limit: 62.5,
            style_id: 0,
            color_name: 'colNeutral',
          },
          {
            id: 3,
            name: 'Slight positive',
            upper_limit: 75,
            style_id: 1,
            color_name: 'colWeakPositive',
          },
          {
            id: 4,
            name: 'Positive',
            upper_limit: null,
            style_id: 2,
            color_name: 'colPositive',
          },
        ],
        data: [
          {
            order: -199,
            category_id: 2,
            label: 'TICKER',
            description: 'TICKER',
            value: '9.92',
          },
          {
            order: -198,
            category_id: 2,
            label: 'TICKER',
            description: 'TICKER',
            value: '49.53',
          },
          {
            order: -197,
            category_id: 2,
            label: 'TICKER',
            description: 'TICKER',
            value: '1.03',
          },
          {
            order: -196,
            category_id: 2,
            label: 'TICKER',
            description: 'TICKER',
            value: '39.52',
          },
        ],
        free_trial_link: '?CountryID=1&product=0&lp=trial',
        free_trial_label: 'Free Trial Now',
      },
      sector_diversification: {
        chart: {
          type: 'pie',
          variable: 'EXT_SECTOR_LEVEL1',
        },
        title: 'Diversification',
        display_order: 1,
        order_function: '1*$category_id*100 + $sequence',
        is_open: true,
        categories: [
          {
            id: 0,
            name: 'Technology',
            upper_limit: null,
            style_id: 0,
            color_name: 'colSectorIT',
          },
          {
            id: 1,
            name: 'Basic Materials',
            upper_limit: null,
            style_id: 0,
            color_name: 'colSectorBasicMaterials',
          },
          {
            id: 2,
            name: 'Energy',
            upper_limit: null,
            style_id: 0,
            color_name: 'colSectorEnergy',
          },
        ],
        data: [
          {
            order: 1,
            category_id: 0,
            label: 'ERICA',
            description: 'Ericsson A: Technology',
            value: '9.92',
          },
          {
            order: 2,
            category_id: 0,
            label: 'ERICB',
            description: 'Ericsson B: Technology',
            value: '49.53',
          },
          {
            order: 104,
            category_id: 1,
            label: 'NHY',
            description: 'Norsk Hydro: Basic Materials',
            value: '39.52',
          },
          {
            order: 203,
            category_id: 2,
            label: 'NEL',
            description: 'NEL: Energy',
            value: '1.03',
          },
        ],
      },
    },

    api_guide: [
      'categories upper_limit: Upper limit for category. Null means no upper limit (infinite).',

      'order_function: used on members when populating the pie to make the order of pie segments match the order of categories.',

      'is_open: whether the pie chart is open or hidden. Used for setting free trial teaser/link in marketing pages.',
    ],
  },
};
