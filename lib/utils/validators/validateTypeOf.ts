import { TypeOf } from '../../types';

export function validateTypeOf(value: any, expectedType: TypeOf): boolean {
    const type = typeof value;

    return type === expectedType;
}
