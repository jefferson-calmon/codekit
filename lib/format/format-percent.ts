import { SupportedLocale } from '../types';

export interface FormatPercentOptions {
    locale?: SupportedLocale;
    decimals?: number;
}

export function formatPercent(value: number, options?: FormatPercentOptions) {
    const { locale = 'pt-BR', decimals = 1 } = options || {};

    return value.toLocaleString(locale, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    });
}
