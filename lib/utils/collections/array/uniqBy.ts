import { KeyOf } from '../../../types';
import { get } from '../object';

export function uniqBy<T extends object, K extends KeyOf<T>>(
    array: T[],
    key: K,
) {
    const map = new Map<any, T>();

    array.forEach(item => {
        map.set(get(item, key), item);
    });

    return [...map.values()];
}
