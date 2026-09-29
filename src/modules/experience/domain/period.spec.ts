import { countMonths, toPeriod, totalDuration } from './period.js';

const month = (value: string) => new Date(`${value}-01T00:00:00.000Z`);
const NOW = month('2026-09');

describe('period', () => {
  it('Включает оба крайних месяца', () => {
    expect(
      countMonths({ start: month('2024-06'), end: month('2026-07') }, NOW),
    ).toBe(26);
  });

  it('Считает незавершённый период до текущего месяца', () => {
    const period = toPeriod({ start: month('2026-07'), end: null }, NOW);

    expect(period.isCurrent).toBe(true);
    expect(period.duration.text).toBe('3 месяца');
    expect(period.text).toBe('июль 2026 — настоящее время');
  });

  it('Склоняет годы и месяцы', () => {
    const period = toPeriod(
      { start: month('2024-06'), end: month('2026-07') },
      NOW,
    );

    expect(period.duration).toMatchObject({ years: 2, months: 2 });
    expect(period.duration.text).toBe('2 года 2 месяца');
    expect(period.text).toBe('июнь 2024 — июль 2026');
  });

  it('Не учитывает пересечения дважды в общем стаже', () => {
    const total = totalDuration(
      [
        { start: month('2026-07'), end: null },
        { start: month('2024-06'), end: month('2026-07') },
      ],
      NOW,
    );

    expect(total.totalMonths).toBe(28);
    expect(total.text).toBe('2 года 4 месяца');
  });

  it('Суммирует непересекающиеся периоды', () => {
    const total = totalDuration(
      [
        { start: month('2020-01'), end: month('2020-12') },
        { start: month('2022-01'), end: month('2022-05') },
      ],
      NOW,
    );

    expect(total.text).toBe('1 год 5 месяцев');
  });

  it('Возвращает нулевой стаж для пустого списка', () => {
    expect(totalDuration([], NOW).text).toBe('0 месяцев');
  });
});