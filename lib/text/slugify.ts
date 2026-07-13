import { charMap, langsMap } from './slugify-maps';
import { nanoid } from '../random/nano-id';

type SlugAffix =
    | string
    | {
          type: 'nanoid';
          length?: number;
      }
    | {
          type: 'string';
          value: string;
      }
    | {
          type: 'function';
          fn: (value: string) => string;
      };

export interface SlugifyOptions {
    /**
     * Character to replace spaces with.
     * @default '-'
     */
    replacement?: string;

    /**
     * Regular expression pattern to remove specific characters from the string.
     */
    remove?: RegExp;

    /**
     * Whether to convert the result to lowercase.
     * @default true
     */
    lowerCase?: boolean;

    /**
     * If `true`, only allows URL-safe characters in the slug.
     * @default false
     */
    strict?: boolean;

    /**
     * Language code to use for locale-specific replacements.
     */
    lang?: keyof typeof langsMap;

    /**
     * Whether to trim leading and trailing whitespace.
     * @default true
     */
    trim?: boolean;

    suffix?: SlugAffix;
    prefix?: SlugAffix;
}

export function slugify(
    value: string,
    {
        lang = 'pt',
        lowerCase = true,
        replacement = '-',
        strict = false,
        trim = true,
        remove,
        suffix,
        prefix,
    }: SlugifyOptions = {},
) {
    value = value.toString();

    const langMap = langsMap[lang] || {};

    let slug = value
        .normalize()
        .split('')
        .reduce(function (result, char) {
            let appendChar: string = langMap[char as keyof typeof langMap];

            if (appendChar === undefined)
                appendChar = charMap[char as keyof typeof charMap];

            if (appendChar === undefined) appendChar = char;
            if (appendChar === replacement) appendChar = ' ';

            return (
                result +
                appendChar.replace(remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
            );
        }, '');

    if (strict) slug = slug.replace(/[^A-Za-z0-9\s]/g, '');
    if (trim) slug = slug.trim();

    slug = slug.replace(/\s+/g, replacement);

    if (lowerCase) slug = slug.toLowerCase();
    if (prefix) slug = applySlugAffix(slug, prefix, 'prefix');
    if (suffix) slug = applySlugAffix(slug, suffix, 'suffix');

    return slug;
}

function applySlugAffix(
    slug: string,
    affix: SlugAffix,
    position: 'prefix' | 'suffix',
) {
    let affixValue: string;

    if (typeof affix === 'string') {
        affixValue = affix;
    } else {
        switch (affix.type) {
            case 'nanoid':
                affixValue = nanoid(affix.length ?? 6);
                break;
            case 'string':
                affixValue = affix.value;
                break;
            case 'function':
                affixValue = affix.fn(slug);
                break;
            default:
                affixValue = '';
        }
    }

    return position === 'prefix'
        ? `${affixValue}${slug}`
        : `${slug}${affixValue}`;
}
