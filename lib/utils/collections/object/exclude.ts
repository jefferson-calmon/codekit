import { clone } from './clone';

export function exclude<T extends object, K extends keyof T & string>(
    object: T,
    key: K,
) {
    let returnValue = clone(object);

    delete returnValue[key];

    return clone(returnValue) as Omit<T, K>;
}
