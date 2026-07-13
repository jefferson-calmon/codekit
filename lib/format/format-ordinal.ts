import { SupportedLocale } from '../types';

export interface FormatOrdinalOptions {
    locale?: SupportedLocale;
    gender?: 'm' | 'f';
}

const EN_ORDINAL_SUFFIXES: Record<string, string> = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
};

export function formatOrdinal(value: number, options?: FormatOrdinalOptions) {
    const { locale = 'pt-BR', gender = 'm' } = options || {};

    if (locale === 'en-US') {
        const rule = new Intl.PluralRules(locale, { type: 'ordinal' }).select(value);
        return `${value}${EN_ORDINAL_SUFFIXES[rule]}`;
    }

    return `${value}${gender === 'f' ? 'ª' : 'º'}`;
}
