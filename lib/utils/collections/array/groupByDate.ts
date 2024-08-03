import { group, GroupOptions } from './group';
import { KeyOf } from '../../../types';

export type DateUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export function groupByDate<T extends object>(
    data: T[],
    key: KeyOf<T>,
    unit: DateUnit,
    options?: GroupOptions<KeyOf<T>>,
) {
    const dateTransformer = (dateString: string): string => {
        const date = new Date(dateString);
        const startDate = startOf(date, unit);
        return startDate.toISOString();
    };

    return group(data, key, {
        ...options,
        keyTransformer: dateTransformer,
    });
}

function startOf(date: Date, unit: DateUnit): Date {
    const newDate = new Date(date);
    switch (unit) {
        case 'minute':
            newDate.setSeconds(0, 0);
            break;
        case 'hour':
            newDate.setMinutes(0, 0, 0);
            break;
        case 'day':
            newDate.setHours(0, 0, 0, 0);
            break;
        case 'week':
            const day = newDate.getUTCDay();
            const diff = newDate.getUTCDate() - day + (day === 0 ? -6 : 1);
            newDate.setUTCDate(diff);
            newDate.setUTCHours(0, 0, 0, 0);
            break;
        case 'month':
            newDate.setDate(1);
            newDate.setHours(0, 0, 0, 0);
            break;
        case 'year':
            newDate.setMonth(0, 1);
            newDate.setHours(0, 0, 0, 0);
            break;
    }
    return newDate;
}
