export function oldest(dates: Date[]): Date | undefined {
    if (dates.length === 0) return undefined;

    return dates.reduce((maxDate, currentDate) => {
        return currentDate > maxDate ? currentDate : maxDate;
    }, dates[0]);
}
