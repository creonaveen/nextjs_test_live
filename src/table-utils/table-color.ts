export type ColorName = 'positive' | 'negative' | 'neutral';

export function techScoreToColorStyle(score: number) {
  if (score >= 25) return 'positive';
  if (score <= -25) return 'negative';
  return 'neutral';
}

export function signToColorStyle(sign: number) {
  if (sign > 0) return 'positive';
  if (sign < 0) return 'negative';
  return 'neutral';
}

type TriggerMap = {
  type: '' | 'styleTrigger' | 'styleUser';
  fn: string;
};

export function parseStyleTriggers(styleTriggerObj: Record<string, string>) {
  const map: TriggerMap[] = [];

  Object.keys(styleTriggerObj)
    .sort()
    .forEach((key) => {
      const val = styleTriggerObj[key];
      if (!val) {
        map.push({ type: '', fn: '' });
        return;
      }

      const [type, fn] = val.split('.');
      map.push({ type: type as TriggerMap['type'], fn });
    });

  return map;
}

const styleFns: Record<string, (v: number) => ColorName> = {
  signToColor: signToColorStyle,
  techScoreTocolor: techScoreToColorStyle,
};

export function getRowTriggeredStyles(row: number[], triggerMap: TriggerMap[]) {
  const styles = new Array(row.length).fill('neutral');

  // build once
  const userTargets: Record<string, number[]> = {};

  triggerMap.forEach((col, index) => {
    if (col.type === 'styleUser') {
      userTargets[col.fn] ??= [];
      userTargets[col.fn].push(index);
    }
  });

  triggerMap.forEach((col, triggerIndex) => {
    if (col.type !== 'styleTrigger') return;

    const fn = styleFns[col.fn];
    if (!fn) return;

    const styleClass = fn(row[triggerIndex]);

    userTargets[col.fn]?.forEach((targetIndex) => {
      styles[targetIndex] = styleClass;
    });
  });

  return styles;
}

export function getCellColorClass(style: ColorName) {
  switch (style) {
    case 'positive':
      return 'text-success-text';
    case 'negative':
      return 'text-error-text';
    case 'neutral':
      return 'text-warning-text';
    default:
      return '';
  }
}
