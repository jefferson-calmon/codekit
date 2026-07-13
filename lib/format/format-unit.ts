import { SupportedLocale } from '../types';

export interface FormatUnitOptions extends Intl.NumberFormatOptions {
    locale?: SupportedLocale;
}

export function formatUnit(
    value: number,
    unit: string,
    options?: FormatUnitOptions,
) {
    const { locale = 'pt-BR', ...restOptions } = options || {};

    return value.toLocaleString(locale, {
        style: 'unit',
        unit,
        maximumFractionDigits: 1,
        ...restOptions,
    });
}
