export interface TimelineProps {
    days?: number;
    weeks?: number;
    months?: number;
}

/**
 * Generates an array of dates based on the provided options.
 *
 * The function can calculate dates by adding or subtracting days, weeks, or months
 * from the current date. It prioritizes `days` and `weeks` over `months` if both are provided.
 *
 * @param options - Configuration object to specify the range generation criteria.
 * @param options.days - Number of days to include in the timeline (positive for future, negative for past).
 * @param options.weeks - Number of weeks to include in the timeline (positive for future, negative for past).
 * @param options.months - Number of months to include in the timeline (positive for future, negative for past).
 * @returns An array of `Date` objects representing the generated timeline.
 *
 * @example
 * // Generate the last 7 days
 * timeline({ days: -7 });
 *
 * @example
 * // Generate the next 4 weeks
 * timeline({ weeks: 4 });
 *
 * @example
 * // Generate the last 3 months
 * timeline({ months: -3 });
 */
export function timeline(options: TimelineProps): Date[] {
    const { days = 0, weeks = 0, months = 0 } = options;
    const totalDays = days + weeks * 7; // Convert weeks to days and sum with days
    const result: Date[] = [];

    // Handle days and weeks
    if (totalDays !== 0) {
        const direction = totalDays > 0 ? 1 : -1;
        const absoluteDays = Math.abs(totalDays);

        for (let i = 0; i < absoluteDays; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i * direction);
            result.push(date);
        }
    }
    // Handle months
    else if (months !== 0) {
        const direction = months > 0 ? 1 : -1;
        const absoluteMonths = Math.abs(months);

        for (let i = 0; i < absoluteMonths; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i * direction);
            result.push(date);
        }
    }

    return result;
}
