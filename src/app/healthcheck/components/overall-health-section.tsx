import { ProgressBarTooltip } from '@/components/custom-components/progress-bar-tooltip';
import { usePlatform } from '@/lib/platform';
import type { OverallHealthSection, ScoreBarCategory } from '@/lib/types/health-check';
import { createCategoryColorMap, getIndicatorStyle, getBackgroundStyle } from '@/lib/utils';

interface OverallHealthProps {
  data?: OverallHealthSection;
  categories?: ScoreBarCategory[];
}

function getSectionDisplayValues(sectionData: NonNullable<OverallHealthSection['data']>) {
  const score = typeof sectionData.score === 'number' ? sectionData.score : 0;
  const categoryId =
    typeof sectionData.score_bar_category_id === 'number' ? sectionData.score_bar_category_id : 0;
  return {
    score,
    categoryId,
    label: sectionData.label ?? '',
    scoreText: sectionData.score_text ?? '',
    scoreTextShort: sectionData.score_text_short ?? '',
    infoText1: sectionData.info_text1 ?? '',
    infoText2: sectionData.info_text2 ?? '',
  };
}

export function OverallHealth({ data, categories }: OverallHealthProps) {
  const platform = usePlatform();
  const sectionData = data?.data ?? null;

  if (!sectionData) {
    return null;
  }

  const { score, categoryId, label, scoreText, scoreTextShort, infoText1, infoText2 } =
    getSectionDisplayValues(sectionData);
  const safeCategories: ScoreBarCategory[] = categories?.length ? categories : [];
  const categoryColorMap = createCategoryColorMap(safeCategories);
  const barValue = platform === 'desktop' ? scoreText : scoreTextShort;
  const tooltipText = infoText1 + '\n\n' + infoText2;

  return (
    <ProgressBarTooltip
      value={score}
      indicatorStyle={getIndicatorStyle(categoryId, categoryColorMap)}
      style={getBackgroundStyle(categoryId, categoryColorMap)}
      barTitle={label}
      barValue={barValue}
      tooltipText={tooltipText}
      isMainHealth={true}
    />
  );
}
