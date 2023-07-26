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

function set<T extends object, K extends string, V extends any>(
    object: T,
    key: K,
    value: V,
) {
    const keyParts = key.split('.');

    let objectRef = { ...object };

    keyParts.forEach((part: string | number, index: number) => {
        if (keyParts.length - 1 === index) {
            return;
        }

        if (!(objectRef as any)[part]) {
            (objectRef as any)[part] = {};
        }

        objectRef = (objectRef as any)[part];
    });

    const finalKey: string = keyParts[keyParts.length - 1];
    if (finalKey !== '__proto__' && finalKey !== 'constructor') {
        (objectRef as any)[finalKey] = value;
    }

    return objectRef as T & GenerateType<typeof key, typeof value>;
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
