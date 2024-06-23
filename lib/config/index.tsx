import { KeyOf } from '../types';
import { SlugifyOptions } from '../types/slugify';

import {
    uuid,
    randomize,
    MoneyConfig,
    MeasurePropsWithoutText,
    array,
    object,
    number,
    string,
    GroupOptions,
    GroupedDataByKey,
    Query,
    ReductionObj,
    NormalizedOption,
    FiltersOptions,
    NormalizedFilters,
} from '../utils';

declare global {
    interface Number {
        toCurrency: (config?: MoneyConfig) => string;
    }

    interface String {
        toNumber: () => number;
        toCapitalize: () => string;
        extractNumbers: () => string;
        mask: (pattern: string) => string;
        slugify: (options?: SlugifyOptions) => string;
        random: typeof randomize.string;
        measure: (...props: MeasurePropsWithoutText) => number;
        searchFor: (search: string) => boolean;
        transform: <Result>(transformer: (value: string) => Result) => Result;
        hashify: () => string;
        shuffle: (key?: number) => string;
        unshuffle: (key?: number) => string;
        generateKey: (modulo?: number) => number;
    }

    interface Array<T> {
        /** Returns a copy of the array with all falsy values removed */
        compact: () => Exclude<T, null | undefined | false>[];

        /** Returns the last value from array */
        last: () => T;

        /** Returns a copy of the array with only unique values */
        uniq: () => T[];

        /** Returns a copy of the array with only unique values by key */
        uniqBy: <K extends KeyOf<Type>, Type = T>(key: K) => T[];

        /** Returns the array ordered by key passed in the props */
        order: <K extends KeyOf<Type>, Type = T>(
            key: K,
            order?: 'asc' | 'desc',
        ) => T[];

        /** Returns a copy of array shuffled */
        shuffle: () => T[];

        /** Returns a random item from array */
        random: () => T;

        /**  */
        indexify: <K extends string = string>(key: keyof T) => Record<K, T>;

        /**  */
        search: <K extends KeyOf<Type>, Type = T>(
            keys: K[] | K,
            values: any,
        ) => T[];

        group: <K extends KeyOf<Type>, Type = T>(
            key: K,
            options?: GroupOptions<K>,
        ) => GroupedDataByKey;

        query: <Type = T>(query: Query<Type>) => T[];

        reduction: <K extends KeyOf<Type>, V extends KeyOf<Type>, Type = T>(
            key: K,
            value: V,
        ) => ReductionObj;

        toOptions: <K extends KeyOf<Type>, V extends KeyOf<Type>, Type = T>(
            key: K,
            value: V,
        ) => NormalizedOption[];

        toFilters: <K extends KeyOf<Type>, Type = T>(
            key: K,
            options?: FiltersOptions,
        ) => NormalizedFilters<K>;
    }

    interface StringConstructor {
        uuid: () => string;
    }

    interface ArrayConstructor {
        new: typeof array.fresh;
    }

    interface ObjectConstructor {
        get: typeof object.get;
        set: typeof object.set;
        exclude: typeof object.exclude;
        merge: typeof object.merge;
        flatten: typeof object.flatten;
        isEqual: typeof object.isEqual;
        clone: typeof object.clone;
    }

    interface NumberConstructor {
        random: typeof randomize.number;
    }
}

export const config = (): void => {
    // Number
    Number.prototype.toCurrency = function (...props) {
        return number.toCurrency(Number(this), ...props);
    };

    // Number constructor
    Number.random = function (...props) {
        return randomize.number(...props);
    };

    // String
    String.prototype.toNumber = function () {
        return string.toNumber(String(this));
    };
    String.prototype.toCapitalize = function () {
        return string.toCapitalize(String(this));
    };
    String.prototype.extractNumbers = function () {
        return string.extractNumbers(String(this));
    };
    String.prototype.mask = function (...props) {
        return string.mask(String(this), ...props);
    };
    String.prototype.slugify = function (...props) {
        return string.slugify(String(this), ...props);
    };
    String.prototype.measure = function (...props) {
        return string.measure(String(this), ...props);
    };
    String.prototype.searchFor = function (...props) {
        return string.searchFor(String(this), ...props);
    };
    String.prototype.transform = function <R>(transformer: any) {
        return string.transform<R>(String(this), transformer);
    };
    String.prototype.hashify = function () {
        return string.hashify(String(this).toString());
    };
    String.prototype.generateKey = function (modulo) {
        return string.generateKey(String(this).toString(), modulo);
    };
    String.prototype.shuffle = function (key) {
        return string.shuffle(String(this).toString(), key);
    };
    String.prototype.unshuffle = function (key) {
        return string.unshuffle(String(this).toString(), key);
    };

    // String constructor
    String.uuid = function () {
        return uuid();
    };

    // Array
    Array.prototype.compact = function () {
        return array.compact(this);
    };
    Array.prototype.last = function () {
        return array.last(this);
    };
    Array.prototype.uniq = function () {
        return array.uniq(this);
    };
    Array.prototype.uniqBy = function (key: any) {
        return array.uniqBy<object, never>(this, key as never);
    };
    Array.prototype.order = function (key: any, order: any) {
        return array.order<object, never>(this, key as never, order);
    };
    Array.prototype.shuffle = function () {
        return array.shuffleArray(this);
    };
    Array.prototype.random = function () {
        return array.random(this);
    };
    Array.prototype.indexify = function (key) {
        return array.indexify(this, key);
    };
    Array.prototype.search = function (keys: any, values: any) {
        return array.search(this as object[], keys as never[], values);
    };
    Array.prototype.group = function (key, options) {
        return array.group<object>(this, key as never, options as any);
    };
    Array.prototype.query = function (query: any) {
        return array.query<object>(this, query);
    };
    Array.prototype.reduction = function (key: any, value) {
        return array.reduction<object>(this, key as never, value as never);
    };

    // Array constructor
    Array.new = function (length: number) {
        return array.fresh(length);
    };

    // Object constructor
    Object.get = function <T extends object, K extends KeyOf<T> & string>(
        obj: T,
        key: K,
    ) {
        return object.get(obj, key);
    };

    Object.set = function <T extends object, K extends KeyOf<T> & string, V>(
        obj: T,
        key: K,
        value: V,
    ) {
        return object.set(obj, key, value);
    };

    Object.exclude = function <T extends object, K extends keyof T & string>(
        obj: T,
        key: K,
    ) {
        return object.exclude(obj, key);
    };

    Object.merge = function <T extends object, U extends object>(
        target: T,
        source: U,
    ) {
        return object.merge(target, source);
    };

    Object.flatten = function <T extends object>(
        obj: T,
        delimiter = '.',
        parentKey = '',
    ) {
        return object.flatten(obj, delimiter, parentKey);
    };

    Object.isEqual = function (object1: object, object2: object) {
        return object.isEqual(object1, object2);
    };

    Object.clone = function (obj: any) {
        return object.clone(obj);
    };
};

export const CodeKitConfig = (): JSX.Element => {
    config();

    return <></>;
};
