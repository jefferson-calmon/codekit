import { DeepTypeOf, KeyOf } from '../../../types';
import { clone } from './clone';

export function get<T extends object, K extends KeyOf<T> & string>(
    obj: T,
    key: K,
) {
    const keyParts = key.split('.');

    let returnValue = clone(obj);

    keyParts.forEach(part => {
        if (returnValue) {
            returnValue = (returnValue as any)[part];
        }
    });

    return returnValue as DeepTypeOf<T, K>;
}
