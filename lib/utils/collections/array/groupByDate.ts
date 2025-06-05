import { group, GroupOptions } from './group';
import { KeyOf } from '../../../types';
export type DateUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export interface GroupOptionsWithTimezone<K> extends GroupOptions<K> {
    timezone?: string;
}

export function groupByDate<T extends object>(
    data: T[],
    key: KeyOf<T>,
    unit: DateUnit,
    options?: GroupOptionsWithTimezone<KeyOf<T>>,
) {
    const timezone = options?.timezone || 'America/Sao_Paulo';

    const dateTransformer = (dateString: string): string => {
        const date = new Date(dateString);
        const zonedDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        const startDate = startOf(zonedDate, unit);
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
