import { endOfMonth, endOfWeek, getWeek, startOfMonth, startOfWeek } from "date-fns";
import type { Locale } from "date-fns";
import type { WeekDates } from "./types";

export { cn } from "cn";

/**
 * Gets the start and end date of a locale week that overlaps a given month.
 * @param year e.g., 2023
 * @param month 1-12 (January = 1)
 * @param weekNumber the week number returned by date-fns `getWeek`
 */
export function getStartEndOfWeekInMonth(
  year: number,
  month: number,
  weekNumber: number,
  options?: { locale?: Locale },
): WeekDates {
  const firstOfMonth = startOfMonth(new Date(year, month - 1, 1));
  const lastOfMonth = endOfMonth(firstOfMonth);
  let weekStart = startOfWeek(firstOfMonth, options);

  // A locale week may begin in the previous month or end in the next one.
  // Search the weeks overlapping this month so week numbers at year boundaries
  // (for example, week 1 in late December) use the same rules as HabitItems.
  for (let i = 0; i < 7; i++) {
    const weekEnd = endOfWeek(weekStart, options);
    if (
      getWeek(weekStart, options) === weekNumber &&
      weekEnd >= firstOfMonth &&
      weekStart <= lastOfMonth
    ) {
      return { start: weekStart, end: weekEnd };
    }

    weekStart = new Date(weekStart);
    weekStart.setDate(weekStart.getDate() + 7);
  }

  throw new RangeError(
    `Week ${weekNumber} does not overlap ${year}-${String(month).padStart(2, "0")}`,
  );
}
