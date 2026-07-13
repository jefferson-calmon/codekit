import { Locale } from '../../types/locale';

type FormatDatePreset = 'pretty' | 'numeric';

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
    preset?: FormatDatePreset;
    locale?: Locale;
}

export function formatDate(
    value: string | number | Date,
    options: FormatDateOptions = { preset: 'pretty' },
) {
    const date = new Date(value);

    const { locale = 'pt-BR', ...restOptions } = options || {};

    if (options.preset) {
        const presetOptionsMap: Record<
            FormatDatePreset,
            Intl.DateTimeFormatOptions
        > = {
            pretty: {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            },
            numeric: {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            },
        };

        const presetOptions = presetOptionsMap[options.preset];

        return Intl.DateTimeFormat('', presetOptions).format(date);
    }

    return Intl.DateTimeFormat(locale, restOptions).format(date);
}
