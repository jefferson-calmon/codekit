import { KeyOf } from '../types';
import { get } from './collections/object';

export function renderify<T extends object>(data: T, string: string) {
    let value = string;

    const placeholders = value.match(/{{(.*?)}}/g);

    if (placeholders) {
        for (const placeholder of placeholders) {
            const keyOf = placeholder.slice(2, -2).trim() as KeyOf<T>;
            const realValue = String(get(data, keyOf));

            if (realValue !== undefined) {
                value = value.replace(placeholder, realValue);
            }
        }
    }

    return value;
}
