import { KeyOf, DeepTypeOf, GenerateType } from '../types';
import { mergeObjects } from './mergeObjects';

export const ObjectHandler = {
    get,
    set,
    delete: <T extends object, K extends keyof T & string>(obj: T, key: K) =>
        del(obj, key),
    equalTo,
    merge,
};

function get<T extends object, K extends KeyOf<T> & string>(obj: T, key: K) {
    const keyParts = key.split('.');

    let returnValue = obj;

    keyParts.forEach(part => {
        if (returnValue) {
            returnValue = (returnValue as any)[part];
        }
    });

    return returnValue as DeepTypeOf<T, K>;
}

function set<T extends object, K extends KeyOf<T> & string, V>(
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

        Object.set(
            (obj as any)[currentKey] as object,
            keyParts.join('.') as KeyOf<object>,
            value,
        );
    } else {
        (obj as any)[keyParts[0]] = value;
    }

    return JSON.parse(JSON.stringify(obj)) as T & GenerateType<K, V>;
}

function del<T extends object, K extends keyof T & string>(object: T, key: K) {
    let returnValue = object;

    delete returnValue[key];

    return returnValue as Omit<T, K>;
}

function equalTo(object1: object, object2: object) {
    if (typeof object1 !== 'object' || typeof object2 !== 'object') {
        return object1 === object2;
    }

    const a = JSON.stringify(object1);
    const b = JSON.stringify(object2);

    const isEqual = a === b;

    return isEqual;
}

function merge<T extends object, U extends object>(target: T, source: U) {
    return mergeObjects<T, U>(target, source);
}
