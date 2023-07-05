import slugify from 'slugify';

import { MoneyConfig } from '../types';
import { locales, defaultOptions } from '../constants/slugify';
import { randomString } from '../utils/randomString';
import { measureText, PropsWithoutText } from '../utils/measureText';

export interface SlugifyOptions {
    replacement?: string;
    remove?: RegExp;
    lowerCase?: boolean;
    strict?: boolean;
    locale?: keyof typeof locales;
    trim?: boolean;
}

declare global {
    interface Number {
        toMoney: (config?: MoneyConfig) => string;
    }

    interface String {
        toNumber: () => number;
        toCapitalize: () => string;
        extractNumbers: () => string;
        mask: (pattern: string) => string;
        slugify: (options?: SlugifyOptions) => string;
        random: typeof randomString;
        measure: (...props: PropsWithoutText) => number;
        searchFor: (search: string) => boolean;
    }

    interface Array<T> {
        /** Returns a copy of the array with all falsy values removed */
        compact: () => Exclude<T, null | undefined | false>[];

        /** Returns the last value from array */
        last: () => T;

        /** Returns a copy of the array with only unique values */
        uniq: () => T[];

        /** Returns a copy of the array with only unique values by key */
        uniqByKey: (key: keyof T) => T[];

        /** Returns the array ordered by key passed in the props */
        order: (key: keyof T, order?: 'asc' | 'desc') => T[];

        /** Returns a copy of array shuffled */
        shuffle: () => T[];

        /** Returns a random item from array */
        random: () => T;
    }
}

export const config = (): void => {
    // Number
    Number.prototype.toMoney = function (
        config: MoneyConfig = {
            locale: 'pt-BR',
            currency: 'BRL',
        },
    ) {
        return this.toLocaleString(config.locale, {
            style: 'currency',
            currency: config.currency,
            maximumFractionDigits: 2,
        });
    };

    // String
    String.prototype.toNumber = function () {
        return Number(this);
    };

    String.prototype.toCapitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.extractNumbers = function () {
        return this.toString().replace(/\D/g, '');
    };

    String.prototype.mask = function (pattern: string) {
        let index = 0;
        const value = this.toString().replace(/\D/g, '');

        return pattern.replace(/#/g, () => value[index++] || '');
    };

    String.prototype.slugify = function (options?: SlugifyOptions) {
        const value = this.toString();

        const slugifyOptions: Parameters<typeof slugify>[1] = {
            locale: options?.locale || defaultOptions.locale,
            lower: options?.lowerCase || defaultOptions.lowerCase,
            remove: options?.remove || defaultOptions.remove,
            replacement: options?.replacement || defaultOptions.replacement,
            strict: options?.strict || defaultOptions.strict,
            trim: options?.trim || defaultOptions.trim,
        };

        return slugify(value, slugifyOptions);
    };

    String.prototype.random = randomString;

    String.prototype.measure = function (...props: PropsWithoutText) {
        return measureText(this.toString(), ...props);
    };

    String.prototype.searchFor = function (search: string) {
        const string = this.toString().toLowerCase();
        const value = search.toString().toLowerCase();

        return string.search(value) >= 0;
    };

    // Array
    Array.prototype.compact = function () {
        return this.filter(Boolean);
    };

    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.uniq = function () {
        return [...new Set(this)];
    };

    Array.prototype.uniqByKey = function <T>(key: keyof T) {
        const map = new Map<any, T>();

        this.forEach(item => {
            map.set(item[key], item);
        });
        return [...map.values()];
    };

    Array.prototype.order = function (key, order) {
        return this.sort((a, b) => {
            if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    Array.prototype.shuffle = function () {
        const array = this;

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };

    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };
};

export const CodeKitConfig = (): JSX.Element => {
    config();

    return <></>;
};
