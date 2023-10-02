import { KeyOf } from '../../types';
import { ObjectHandler } from '../ObjectHandler';
import { arrayify } from '../arrayify';

export class ArrayPrototypeUtils {
    static compact<T extends any>(array: T[]) {
        return array.filter(Boolean) as Exclude<T, null | undefined | false>[];
    }

    static last<T extends any>(array: T[]) {
        return array[array.length - 1];
    }

    static uniq<T extends any>(array: T[]) {
        return [...new Set<T>(array)];
    }

    static uniqByKey<T extends any>(array: T[], key: keyof T) {
        const map = new Map<any, T>();

        array.forEach(item => {
            map.set(item[key], item);
        });

        return [...map.values()];
    }

    static order<T extends any>(
        array: T[],
        key: keyof T,
        order?: 'asc' | 'desc',
    ) {
        return array.sort((a, b) => {
            if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    static shuffle<T extends any>(array: T[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    static random<T extends any>(array: T[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static search<T extends object>(array: T[], keys: KeyOf<T>[], values: any) {
        values = [values].flat().compact();

        if (values.length === 0) return array;

        return array.filter(item => {
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = ObjectHandler.get(item, key);

                if (values.includes(value)) return true;
            }
            return false;
        });
    }
}

export class ArrayConstructorUtils {
    static new(length: number) {
        return arrayify(length);
    }
}
