export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  weeks: { days: ContributionDay[] }[];
  totalContributions: number;
}

export function parseContributionDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

/** Fill missing dates so calendar positions stay accurate, including partial weeks. */
export function buildContributionData(
  days: ContributionDay[],
): ContributionData {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  if (!sorted.length) return { weeks: [], totalContributions: 0 };

  const byDate = new Map(sorted.map((day) => [day.date, day]));
  const cursor = parseContributionDate(sorted[0].date);
  const end = parseContributionDate(sorted[sorted.length - 1].date);
  const weeks: ContributionData["weeks"] = [];
  let totalContributions = 0;

  while (cursor <= end) {
    const date = cursor.toISOString().slice(0, 10);
    const day = byDate.get(date) ?? { date, count: 0, level: 0 };
    if (!weeks.length || cursor.getUTCDay() === 0) {
      weeks.push({ days: [] });
    }
    weeks[weeks.length - 1].days.push(day);
    totalContributions += day.count;
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return { weeks, totalContributions };
}
