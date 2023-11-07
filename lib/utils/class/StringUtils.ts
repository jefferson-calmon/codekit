import { defaultOptions } from '../../constants/slugify';
import { SlugifyOptions } from '../../types';
import { PropsWithoutText, measureText } from '../measureText';
import { hashify } from '../hashify';
import { slugify } from '../slugify';

export class StringPrototypeUtils {
    static toNumber<S extends String>(string: S) {
        return Number(
            String(string)
                .replace(/[^0-9.,]/gi, '')
                .replaceAll('.', '')
                .replace(',', '.'),
        );
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

    static format<S extends String, R>(str: S, formatter: (v: string) => R) {
        return formatter(str.toString());
    }

    static generateKey(string: string, modulo: number = 100000) {
        const length = string.length;
        let sum = 0;
        let product = 1;

        for (let i = 0; i < length; i++) {
            const charCode = string.charCodeAt(i);
            sum += charCode;
            product *= charCode;
        }

        const key = (sum * product + length) % modulo;

        return key;
    }

    static shuffle(string: string, key?: number) {
        key = key ? key : this.generateKey(string, 343678);

        const charArray = string.split('');
        const length = charArray.length;
        const result = [...charArray];

        for (let i = length - 1; i > 0; i--) {
            const j = Math.floor((i + key) % length);
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result.join('');
    }

    static unshuffle(shuffledStr: string, key?: number) {
        key = key ? key : this.generateKey(shuffledStr, 343678);

        const charArray = shuffledStr.split('');
        const length = charArray.length;
        const result = [...charArray];

        for (let i = 0; i < length - 1; i++) {
            const j = Math.floor((i + key) % length);
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result.join('');
    }

    static hashify(string: string) {
        return hashify(string);
    }
}
