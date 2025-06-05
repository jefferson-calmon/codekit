import { KeyOf } from '../../../types';
import { clone } from './clone';

export function flatten<T extends object>(
    obj: T,
    delimiter = '.',
    parentKey = '',
) {
    return flatter(clone(obj), delimiter, parentKey);
}

export function flatter<T extends object>(
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
            const nestedFlatten = flatter<{}>(value, delimiter, newKey);
            result = { ...result, ...nestedFlatten };
        } else {
            (result as any)[newKey] = value;
        }
    }

    return result as Record<KeyOf<T>, any>;
}
