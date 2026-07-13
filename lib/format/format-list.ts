import { SupportedLocale } from '../types';

export interface FormatListOptions {
    locale?: SupportedLocale;
    type?: Intl.ListFormatType;
}

export function formatList(
    value: (string | number)[],
    options?: FormatListOptions,
) {
    const { locale = 'pt-BR', type = 'conjunction' } = options || {};

    return new Intl.ListFormat(locale, { type }).format(value.map(String));
}
