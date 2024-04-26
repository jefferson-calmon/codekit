import { KeyOf } from '../../../types';
import { clone } from './clone';

export function flatten<T extends object>(
    obj: T,
    delimiter = '.',
    parentKey = '',
) {
    obj = clone(obj);
    let result: any = {};

    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}${delimiter}${key}` : key;

        if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            Object.keys(value).length > 0
        ) {
            const nestedFlatten = flatten<{}>(value, delimiter, newKey);
            result = { ...result, ...nestedFlatten };
        } else {
            (result as any)[newKey] = value;
        }
    }

    return clone(result) as Record<KeyOf<T>, any>;
}
