import { TypeOf } from '../types';

export function isTypeOf(value: unknown, expectedType: TypeOf): boolean {
    return typeof value === expectedType;
}
