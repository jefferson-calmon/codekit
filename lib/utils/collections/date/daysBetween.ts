export function daysBetween(date1: Date, date2: Date) {
    const diff = Math.abs(date1.getTime() - date2.getTime());

    return Math.floor(diff / (3600 * 24 * 1000));
}
