import { SupportedLocale } from '../types';

export interface FormatRelativeTimeOptions {
    locale?: SupportedLocale;
    now?: string | number | Date;
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000000],
    ['month', 2592000000],
    ['week', 604800000],
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000],
    ['second', 1000],
];

export function formatRelativeTime(
    value: string | number | Date,
    options?: FormatRelativeTimeOptions,
) {
    const { locale = 'pt-BR', now = Date.now() } = options || {};

    const elapsed = new Date(value).getTime() - new Date(now).getTime();
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    for (const [unit, milliseconds] of UNITS) {
        if (Math.abs(elapsed) >= milliseconds) {
            return formatter.format(Math.trunc(elapsed / milliseconds), unit);
        }
    }

    return formatter.format(0, 'second');
}
