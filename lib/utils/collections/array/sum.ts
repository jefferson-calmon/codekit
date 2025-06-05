import { KeyOf } from '../../../types';
import { get } from '../object';

export function sum<T extends object, K extends KeyOf<T>>(array: T[], key: K) {
    return array.reduce((acc, item) => (acc += Number(get(item, key) || 0)), 0);
}
