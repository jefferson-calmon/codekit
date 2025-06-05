import { DeprecatedKeyOf } from '../../../types';
import { get } from '../object';

export function order<T extends object, K extends DeprecatedKeyOf<T>>(
    array: T[],
    key: K,
    order?: 'asc' | 'desc',
) {
    return array.sort((a, b) => {
        const valueA = get(a, key);
        const valueB = get(b, key);

        if (valueA < valueB) return order === 'asc' ? -1 : 1;
        if (valueA > valueB) return order === 'asc' ? 1 : -1;
        return 0;
    });
}
