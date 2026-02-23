import { TableData } from '@/lib/types/tables-example';

export function getSortedKeys(keys: string[]): string[] {
  return keys.sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
}

export function getDisplayValue(value: TableData[keyof TableData][string] | undefined) {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (value && typeof value === 'object' && 'text' in value && typeof value.text === 'string') {
    return value.text;
  }

  return '';
}

export function getTriggerValue(value: TableData[keyof TableData][string]) {
  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && 'value' in value && typeof value.value === 'number') {
    return value.value;
  }

  return value;
}
