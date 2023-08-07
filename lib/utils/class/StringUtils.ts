import { defaultOptions } from '../../constants/slugify';
import { SlugifyOptions } from '../../types';
import { PropsWithoutText, measureText } from '../measureText';
import { slugify } from '../slugify';

export class StringPrototypeUtils {
    static toNumber<S extends String>(string: S) {
        return Number(string);
    }

    static toCapitalize<S extends String>(string: S) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static extractNumbers<S extends String>(string: S) {
        return string.toString().replace(/\D/g, '');
    }

    static extractChars<S extends String>(string: S) {
        return string.toString().replace(/\d/g, '');
    }

    static mask<S extends String>(string: S, pattern: string) {
        let index = 0;
        const value = string.toString().replace(/\D/g, '');

        return pattern.replace(/#/g, () => value[index++] || '');
    }

    static slugify<S extends String>(string: S, options?: SlugifyOptions) {
        const value = string.toString();

        const slugifyOptions: SlugifyOptions = {
            locale: options?.locale ?? defaultOptions.locale,
            lowerCase: options?.lowerCase ?? defaultOptions.lowerCase,
            remove: options?.remove ?? defaultOptions.remove,
            replacement: options?.replacement ?? defaultOptions.replacement,
            strict: options?.strict ?? defaultOptions.strict,
            trim: options?.trim ?? defaultOptions.trim,
        };

        return slugify(value, slugifyOptions);
    }

    static measure<S extends String>(string: S, ...props: PropsWithoutText) {
        return measureText(string.toString(), ...props);
    }

    static searchFor<S extends String>(string: S, search: string) {
        const value = string.toString().toLowerCase();
        const query = search.toString().toLowerCase();

        return value.search(query) >= 0;
    }
}
