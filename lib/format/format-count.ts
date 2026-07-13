import { SupportedLocale } from '../types';
import { formatNumber } from './format-number';

export interface FormatCountOptions {
    locale?: SupportedLocale;
    zero?: string;
}

export function formatCount(
    value: number,
    singular: string,
    plural?: string,
    options?: FormatCountOptions,
) {
    const { locale = 'pt-BR', zero } = options || {};

    const pluralWord = plural ?? `${singular}s`;

    if (value === 0) return zero ?? `Nenhum ${singular}`;
    if (value === 1) return `1 ${singular}`;

    return `${formatNumber(value, { locale })} ${pluralWord}`;
}
