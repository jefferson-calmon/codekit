import { charMap, defaultOptions, locales } from '../../../constants/slugify';
import { SlugifyOptions } from '../../../types';

export function slugify(value: string, options?: Partial<SlugifyOptions>) {
    value = value.toString();

    const slugifyOptions: SlugifyOptions = {
        locale: options?.locale ?? defaultOptions.locale,
        lowerCase: options?.lowerCase ?? defaultOptions.lowerCase,
        remove: options?.remove ?? defaultOptions.remove,
        replacement: options?.replacement ?? defaultOptions.replacement,
        strict: options?.strict ?? defaultOptions.strict,
        trim: options?.trim ?? defaultOptions.trim,
    };

    options = slugifyOptions;

    const locale = locales[slugifyOptions.locale ?? 'pt'] || {};

    const replacement =
        options.replacement === undefined ? '-' : options.replacement;

    const trim = options.trim === undefined ? true : options.trim;

    let slug = value
        .normalize()
        .split('')
        .reduce(function (result, ch) {
            let appendChar: string = locale[ch as keyof typeof locale];

            if (appendChar === undefined)
                appendChar = charMap[ch as keyof typeof charMap];

            if (appendChar === undefined) appendChar = ch;
            if (appendChar === replacement) appendChar = ' ';

            return (
                result +
                appendChar.replace(
                    options?.remove || /[^\w\s$*_+~.()'"!\-:@]+/g,
                    '',
                )
            );
        }, '');

    if (options.strict) slug = slug.replace(/[^A-Za-z0-9\s]/g, '');
    if (trim) slug = slug.trim();

    slug = slug.replace(/\s+/g, replacement);

    if (options.lowerCase) slug = slug.toLowerCase();

    return slug;
}
