import { KeyOf } from '../../../types';
import { get } from '../object';

export type ReductionObj = { [key: string]: string };

export function reduction<T extends object>(
    data: T[],
    key: KeyOf<T>,
    value: KeyOf<T>,
): ReductionObj {
    return data.reduce((acc: ReductionObj, item) => {
        const obj = item as Record<string, string>;

        const keyValue = String(get(obj, key));
        const valueValue = String(get(obj, value));

        acc[keyValue] = valueValue;

        return acc;
    }, {});
}
