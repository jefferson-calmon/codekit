import { isCnpj } from './is-cnpj';
import { isCpf } from './is-cpf';
import { isDocument } from './is-document';
import { isCurrency } from './is-currency';
import { isEmail } from './is-email';
import { isLatLng } from './is-lat-lng';
import { isMatch } from './is-match';
import { isPhoneNumber } from './is-phone-number';
import { isRg } from './is-rg';
import { isTypeOf } from './is-type-of';
import { isUrl } from './is-url';
import { isPromise } from './is-promise';

interface IsConfig {
    empty?: boolean;
}

const isEmpty = (value: unknown): boolean =>
    value == null || (typeof value === 'string' && value.trim() === '');

const guard =
    <Value, Args extends unknown[]>(
        empty: boolean,
        validator: (value: Value, ...args: Args) => boolean,
    ) =>
    (value: Value | null | undefined, ...args: Args): boolean =>
        isEmpty(value) ? empty : validator(value as Value, ...args);

export const createIs = ({ empty = false }: IsConfig = {}) => ({
    cpf: guard(empty, isCpf),
    cnpj: guard(empty, isCnpj),
    document: guard(empty, isDocument),
    rg: guard(empty, isRg),
    email: guard(empty, isEmail),
    phone: guard(empty, isPhoneNumber),
    url: guard(empty, isUrl),
    currency: guard(empty, isCurrency),
    latLng: guard(empty, isLatLng),
    match: guard(empty, isMatch),
    promise: guard(empty, isPromise),

    typeOf: isTypeOf,
    string: (value: unknown) => isTypeOf(value, 'string'),
    number: (value: unknown) => isTypeOf(value, 'number'),
    boolean: (value: unknown) => isTypeOf(value, 'boolean'),
    object: (value: unknown) => isTypeOf(value, 'object'),
    function: (value: unknown) => isTypeOf(value, 'function'),
    symbol: (value: unknown) => isTypeOf(value, 'symbol'),
    bigInt: (value: unknown) => isTypeOf(value, 'bigint'),
    undefined: (value: unknown) => isTypeOf(value, 'undefined'),
});

export const is = createIs();
