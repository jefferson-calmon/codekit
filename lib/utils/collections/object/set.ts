import { GenerateType, DeprecatedKeyOf } from '../../../types';
import { clone } from './clone';

export function set<T extends object, K extends DeprecatedKeyOf<T> & string, V>(
    obj: T,
    key: K,
    value: V,
) {
    return setter(clone(obj), key, value);
}

function setter<T extends object, K extends DeprecatedKeyOf<T> & string, V>(
    obj: T,
    key: K,
    value: V,
) {
    const keyParts = key.split('.');

    if (keyParts.length > 1) {
        const currentKey = keyParts.shift() as string;

        if (
            !(obj as any)[currentKey] ||
            typeof (obj as any)[currentKey] !== 'object'
        ) {
            (obj as any)[currentKey] = {};
        }

        setter(
            (obj as any)[currentKey] as object,
            keyParts.join('.') as DeprecatedKeyOf<object>,
            value,
        );
    } else {
        (obj as any)[keyParts[0]] = value;
    }

    return obj as T & GenerateType<K, V>;
}
