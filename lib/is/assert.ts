import { TypeOf } from '../types';

export function assert(input: any, expectedType: TypeOf) {
    const isValidType = typeof input === expectedType;

    if (!isValidType) {
        let invalidType: string = typeof input;

        if (input === null) invalidType = 'null';
        else if (invalidType === 'object') invalidType = input.constructor.name;

        throw new TypeError(`Expected a string but received a ${invalidType}`);
    }
}
