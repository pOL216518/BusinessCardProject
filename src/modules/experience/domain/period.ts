/**Расчёта стажа ,при расчёте пересекающиеся периоды не суммируются дважды */

export interface DateRange {
  start: Date;
  end: Date | null;
}

export interface Duration {
  years: number;
  months: number;
  totalMonths: number;
  text: string;
}

export interface Period {
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  duration: Duration;
  text: string;
}

const MONTHS_NOMINATIVE = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
] as const;

export function toPeriod(range: DateRange, now: Date): Period {
  return {
    startDate: range.start,
    endDate: range.end,
    isCurrent: range.end === null,
    duration: toDuration(countMonths(range, now)),
    text: `${formatMonth(range.start)} — ${range.end ? formatMonth(range.end) : 'настоящее время'}`,
  };
}

export function totalDuration(
  ranges: readonly DateRange[],
  now: Date,
): Duration {
  const intervals = ranges
    .map(
      (range) =>
        [monthIndex(range.start), monthIndex(range.end ?? now)] as const,
    )
    .sort(([a], [b]) => a - b);

  let total = 0;
  let current: [number, number] | null = null;

  for (const [start, end] of intervals) {
    if (current && start <= current[1]) {
      current[1] = Math.max(current[1], end);
      continue;
    }
    if (current) {
      total += current[1] - current[0] + 1;
    }
    current = [start, end];
  }
  if (current) {
    total += current[1] - current[0] + 1;
  }

  return toDuration(total);
}

export function countMonths(range: DateRange, now: Date): number {
  return monthIndex(range.end ?? now) - monthIndex(range.start) + 1;
}

export function toDuration(totalMonths: number): Duration {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months, totalMonths, text: formatDuration(years, months) };
}

function formatDuration(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${plural(years, ['год', 'года', 'лет'])}`);
  }
  if (months > 0 || years === 0) {
    parts.push(`${months} ${plural(months, ['месяц', 'месяца', 'месяцев'])}`);
  }
  return parts.join(' ');
}

function formatMonth(date: Date): string {
  return `${MONTHS_NOMINATIVE[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function monthIndex(date: Date): number {
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}

function plural(n: number, [one, few, many]: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}