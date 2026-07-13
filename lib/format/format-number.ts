import { SupportedLocale } from '../types';

export interface FormatNumberOptions extends Intl.NumberFormatOptions {
    locale?: SupportedLocale;
    compact?: boolean;
}

export function formatNumber(value: number, options?: FormatNumberOptions) {
    const { locale = 'pt-BR', compact = false, ...restOptions } = options || {};

    return value.toLocaleString(locale, {
        ...(compact && { notation: 'compact' as const }),
        ...restOptions,
    });
}
