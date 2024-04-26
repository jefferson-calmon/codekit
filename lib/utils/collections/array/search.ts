import { KeyOf } from '../../../types';
import { get } from '../object';
import { searchFor } from '../string/searchFor';
import { compact } from './compact';

export function search<T extends object, K extends KeyOf<T>, Q extends any>(
    array: T[],
    sources: K | K[],
    queries: Q | Q[],
) {
    const values = compact([queries].flat().map(String));
    const keys = [sources].flat();

    if (values.length === 0) return array;

    return array.filter(item => {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = get(item, key as any);

            if (values.some(v => searchFor(String(value), v))) return true;
        }
        return false;
    });
}
