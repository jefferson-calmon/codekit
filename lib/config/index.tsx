import slugify from 'slugify';

import { MoneyConfig } from '../types';
import { locales, defaultOptions } from '../constants/slugify';
import { randomString } from '../utils';

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
    }

    interface Array<T> {
        /** Returns a copy of the array with all falsy values removed */
        compact: () => Exclude<T, null | undefined | false>[];

        /** Returns the last value from array */
        last: () => T;

        /** Returns a copy of the array with only unique values */
        uniq: () => T[];

        /** Returns the array ordered by key passed in the props */
        order: (key: keyof T, order?: 'asc' | 'desc') => T[];

        /** Returns a copy of array shuffled */
        shuffle: () => T[];
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
};

export const PandoraConfig = (): JSX.Element => {
    config();

    return <></>;
};

''.random();
