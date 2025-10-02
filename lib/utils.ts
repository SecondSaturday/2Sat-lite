/**
 * Calculate the next Second Saturday from a given date
 * @param from - The date to calculate from (defaults to today)
 * @returns The next Second Saturday as a Date object
 */
export function getNextSecondSaturday(from: Date = new Date()): Date {
  const year = from.getFullYear();
  const month = from.getMonth();

  // Get the first day of the current month
  const firstDayOfMonth = new Date(year, month, 1);

  // Find the first Saturday (day 6 in getDay())
  const firstSaturday = 1 + ((6 - firstDayOfMonth.getDay() + 7) % 7);

  // Second Saturday is 7 days after the first Saturday
  const secondSaturday = new Date(year, month, firstSaturday + 7);

  // If the second Saturday of the current month has passed, get next month's
  if (secondSaturday <= from) {
    const nextMonth = month + 1;
    const nextYear = nextMonth > 11 ? year + 1 : year;
    const nextMonthValue = nextMonth > 11 ? 0 : nextMonth;

    const firstDayOfNextMonth = new Date(nextYear, nextMonthValue, 1);
    const firstSaturdayNext = 1 + ((6 - firstDayOfNextMonth.getDay() + 7) % 7);

    return new Date(nextYear, nextMonthValue, firstSaturdayNext + 7);
  }

  return secondSaturday;
}

/**
 * Format a date to a short month-day format (e.g., "Oct 11")
 * @param date - The date to format
 * @returns Formatted string like "Oct 11"
 */
export function formatMonthDay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format a date to include the full month, day, and year (e.g., "October 11, 2025")
 * @param date - The date to format
 * @returns Formatted string like "October 11, 2025"
 */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
