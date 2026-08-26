export const THRESHOLDS = [0, 0.1, 0.15, 0.2] as const;

export type XgThreshold = (typeof THRESHOLDS)[number];

const THRESHOLD_SET = new Set<number>(THRESHOLDS);

export function isXgThreshold(value: number): value is XgThreshold {
  return THRESHOLD_SET.has(value);
}

export function parseXgThreshold(raw: string | null): XgThreshold {
  if (raw === null) return 0;
  const parsed = Number(raw);
  return isXgThreshold(parsed) ? parsed : 0;
}

export function formatXgThreshold(value: XgThreshold): string {
  return value.toString();
}
