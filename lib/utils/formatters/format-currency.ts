import { Locale } from '../../types/locale';

type Currency = 'BRL' | 'USD' | 'EUR';

interface FormatCurrencyOptions {
    locale?: Locale;
    currency?: Currency;
}

export function formatCurrency(value: number, options?: FormatCurrencyOptions) {
    const { locale = 'pt-BR', currency = 'BRL' } = options || {};

    return value.toLocaleString(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
}
