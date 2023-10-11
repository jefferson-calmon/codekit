import { DeepTypeOf, GenerateType, KeyOf, MoneyConfig } from '../types';
import { randomString } from '../utils/randomString';
import { PropsWithoutText } from '../utils/measureText';
import { SlugifyOptions } from '../types/slugify';

import {
    ArrayPrototypeUtils,
    ArrayConstructorUtils,
    StringPrototypeUtils,
    NumberPrototypeUtils,
    mergeObjects,
    ObjectUtils,
    arrayify,
    indexify,
    NumberConstructorUtils,
} from '../utils';

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
        uniqBy: (key: keyof T) => T[];

        /** Returns the array ordered by key passed in the props */
        order: (key: keyof T, order?: 'asc' | 'desc') => T[];

        /** Returns a copy of array shuffled */
        shuffle: () => T[];

        /** Returns a random item from array */
        random: () => T;

        /**  */
        indexifyBy: <K extends string = string>(key: keyof T) => Record<K, T>;

        /**  */
        search: <K extends KeyOf<Type>, Type = T>(
            keys: K[] | K,
            values: any,
        ) => T[];
    }

    interface ArrayConstructor {
        new: typeof ArrayConstructorUtils.new;
    }

    interface ObjectConstructor {
        get: typeof ObjectUtils.get;
        set: typeof ObjectUtils.set;
        delete: typeof ObjectUtils.delete;
        merge: typeof ObjectUtils.merge;
        flatten: typeof ObjectUtils.flatten;
        equalTo: typeof ObjectUtils.equalTo;
        clone: typeof ObjectUtils.clone;
    }

    interface NumberConstructor {
        random: typeof NumberConstructorUtils.random;
    }
}

export const config = (): void => {
    // Number
    Number.prototype.toMoney = function (...props) {
        return NumberPrototypeUtils.toMoney(this, ...props);
    };

    // Number constructor
    Number.random = function (...props) {
        return NumberConstructorUtils.random(...props);
    };

    // String
    String.prototype.toNumber = function () {
        return StringPrototypeUtils.toNumber(this);
    };
    String.prototype.toCapitalize = function () {
        return StringPrototypeUtils.toCapitalize(this);
    };
    String.prototype.extractNumbers = function () {
        return StringPrototypeUtils.extractNumbers(this);
    };
    String.prototype.mask = function (...props) {
        return StringPrototypeUtils.mask(this, ...props);
    };
    String.prototype.slugify = function (...props) {
        return StringPrototypeUtils.slugify(this, ...props);
    };
    String.prototype.measure = function (...props) {
        return StringPrototypeUtils.measure(this, ...props);
    };
    String.prototype.searchFor = function (...props) {
        return StringPrototypeUtils.searchFor(this, ...props);
    };

    // Array
    Array.prototype.compact = function () {
        return ArrayPrototypeUtils.compact(this);
    };
    Array.prototype.last = function () {
        return ArrayPrototypeUtils.last(this);
    };
    Array.prototype.uniq = function () {
        return ArrayPrototypeUtils.uniq(this);
    };
    Array.prototype.uniqBy = function <T>(key: keyof T) {
        return ArrayPrototypeUtils.uniqByKey(this, key);
    };
    Array.prototype.order = function (key, order) {
        return ArrayPrototypeUtils.order(this, key, order);
    };
    Array.prototype.shuffle = function () {
        return ArrayPrototypeUtils.shuffle(this);
    };
    Array.prototype.random = function () {
        return ArrayPrototypeUtils.random(this);
    };
    Array.prototype.indexifyBy = function (key) {
        return indexify(this, key);
    };
    Array.prototype.search = function <T extends object>(
        keys: any,
        values: any,
    ) {
        return ArrayPrototypeUtils.search<T>(this, keys, values);
    };

    // Array constructor
    Array.new = function (length: number) {
        return arrayify(length);
    };

    // Object constructor
    Object.get = function <T extends object, K extends KeyOf<T> & string>(
        obj: T,
        key: K,
    ) {
        const keyParts = key.split('.');

        let returnValue = obj;

        keyParts.forEach(part => {
            if (returnValue) {
                returnValue = (returnValue as any)[part];
            }
        });

        return returnValue as DeepTypeOf<T, K>;
    };

    Object.set = function <T extends object, K extends KeyOf<T> & string, V>(
        obj: T,
        key: K,
        value: V,
    ) {
        const keyParts = key.split('.');

        if (keyParts.length > 1) {
            const currentKey = keyParts.shift() as string;

            if (
                !(obj as any)[currentKey] ||
                typeof (obj as any)[currentKey] !== 'object'
            ) {
                (obj as any)[currentKey] = {};
            }

            Object.set(
                (obj as any)[currentKey] as object,
                keyParts.join('.') as KeyOf<object>,
                value,
            );
        } else {
            (obj as any)[keyParts[0]] = value;
        }

        return JSON.parse(JSON.stringify(obj)) as T & GenerateType<K, V>;
    };

    Object.delete = function <T extends object, K extends keyof T & string>(
        object: T,
        key: K,
    ) {
        let returnValue = object;

        delete returnValue[key];

        return returnValue as Omit<T, K>;
    };

    Object.merge = function <T extends object, U extends object>(
        target: T,
        source: U,
    ) {
        return mergeObjects<T, U>(target, source);
    };

    Object.flatten = function <T extends object>(
        obj: T,
        delimiter = '.',
        parentKey = '',
    ) {
        let result: any = {};

        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}${delimiter}${key}` : key;

            if (
                typeof value === 'object' &&
                !Array.isArray(value) &&
                Object.keys(value).length > 0
            ) {
                const nestedFlatten = Object.flatten<{}>(
                    value,
                    delimiter,
                    newKey,
                );
                result = { ...result, ...nestedFlatten };
            } else {
                (result as any)[newKey] = value;
            }
        }

        return result as Record<KeyOf<T>, any>;
    };

    Object.equalTo = function (object1: object, object2: object) {
        if (typeof object1 !== 'object' || typeof object2 !== 'object') {
            return object1 === object2;
        }

        const a = JSON.stringify(object1);
        const b = JSON.stringify(object2);

        const isEqual = a === b;

        return isEqual;
    };

    Object.clone = function (obj: any) {
        return JSON.parse(JSON.stringify(obj));
    };
};

export const CodeKitConfig = (): JSX.Element => {
    config();

    return <></>;
};
