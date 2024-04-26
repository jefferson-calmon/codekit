import { GenerateType, KeyOf } from '../../../types';
import { clone } from './clone';

export function set<T extends object, K extends KeyOf<T> & string, V>(
    obj: T,
    key: K,
    value: V,
) {
    obj = clone(obj);
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

    return clone(obj) as T & GenerateType<K, V>;
}
