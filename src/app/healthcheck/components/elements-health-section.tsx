import { Button } from 'investtech/external-components';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';

import { ProgressBarTooltip } from '@/components/custom-components/progress-bar-tooltip';
import { usePlatform } from '@/lib/platform';
import { ElementsHealthSection, ScoreBarCategory } from '@/lib/types/health-check';
import { createCategoryColorMap, getIndicatorStyle, getBackgroundStyle } from '@/lib/utils';

interface ElementsHealthProps {
  data?: ElementsHealthSection;
  categories?: ScoreBarCategory[];
}

export function ElementsHealth({ data, categories }: ElementsHealthProps) {
  const platform = usePlatform();
  const categoryColorMap = createCategoryColorMap(categories ?? []);

  const handleFullHealthReportClick = () => {
    const element = document.getElementById('full-health-report-section');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Card className="rounded-none px-4 py-3 sm:rounded-xl sm:p-5">
      <CardHeader>
        <CardTitle className="text-grey-900 dark:text-grey-50 text-lg font-semibold">
          {data?.title ?? ''}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-grey-800 dark:text-grey-200 px-0 text-sm font-normal md:space-y-0 lg:space-y-1">
        {data?.data?.map((item, index) => {
          const indicatorStyle = getIndicatorStyle(item.score_bar_category_id, categoryColorMap);
          const backgroundStyle = getBackgroundStyle(item.score_bar_category_id, categoryColorMap);
          return (
            <ProgressBarTooltip
              key={index}
              value={item.score}
              indicatorStyle={indicatorStyle}
              style={backgroundStyle}
              barTitle={item.label ?? ''}
              barValue={platform === 'desktop' ? item.score_text : item.score_text}
              tooltipText={item.info_text1 + '\n\n' + item.info_text2}
            />
          );
        })}
      </CardContent>
      <CardFooter className="mt-3 flex flex-col items-start gap-3">
        <hr className="horizontal-divider" />
        <Button
          variant="default"
          size="sm"
          className="mt-3 w-full sm:w-auto"
          onClick={handleFullHealthReportClick}
        >
          {data?.full_health_report_link_text ?? ''}
        </Button>
      </CardFooter>
    </Card>
  );
}
