export function newest(dates: Date[]): Date | undefined {
    if (dates.length === 0) return undefined;

    return dates.reduce((minDate, currentDate) => {
        return currentDate < minDate ? currentDate : minDate;
    }, dates[0]);
}
