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

    static order<T extends object>(
        array: T[],
        // key: KeyOf<T>,
        key: keyof T,
        order?: 'asc' | 'desc',
    ) {
        return array.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            if (valueA < valueB) return order === 'asc' ? -1 : 1;
            if (valueA > valueB) return order === 'asc' ? 1 : -1;
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

    static search<T extends object>(
        array: T[],
        sources: KeyOf<T>[] | KeyOf<T>,
        queries: any,
    ) {
        const values = [queries].flat().compact().map(String);
        const keys = [sources].flat();

        if (values.length === 0) return array;

        return array.filter(item => {
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = ObjectHandler.get(item, key as any);

                if (values.some(v => String(value).searchFor(v))) return true;
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
