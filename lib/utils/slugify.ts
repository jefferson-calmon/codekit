import { locales, charMap } from '../constants/slugify';
import { SlugifyOptions } from '../types/slugify';

export function slugify(string: string, options: SlugifyOptions) {
    if (typeof string !== 'string') {
        throw new Error('slugify: string argument expected');
    }

    options =
        typeof options === 'string' ? { replacement: options } : options || {};

    const locale = locales[options.locale ?? 'pt'] || {};

    const replacement =
        options.replacement === undefined ? '-' : options.replacement;

    const trim = options.trim === undefined ? true : options.trim;

    let slug = string
        .normalize()
        .split('')
        // replace characters based on charMap
        .reduce(function (result, ch) {
            let appendChar: string = locale[ch as keyof typeof locale];

            if (appendChar === undefined)
                appendChar = charMap[ch as keyof typeof charMap];

            if (appendChar === undefined) appendChar = ch;
            if (appendChar === replacement) appendChar = ' ';

            return (
                result +
                appendChar
                    // remove not allowed characters
                    .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
            );
        }, '');

    if (options.strict) slug = slug.replace(/[^A-Za-z0-9\s]/g, '');

    if (trim) slug = slug.trim();

    slug = slug.replace(/\s+/g, replacement);

    if (options.lowerCase) slug = slug.toLowerCase();

    return slug;
}
