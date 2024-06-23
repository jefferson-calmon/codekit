import { validateEmail } from './validateEmail';
export { validateEmail } from './validateEmail';

import { validateLatLng } from './validateLatLng';
export { validateLatLng } from './validateLatLng';

import { validatePhoneNumber } from './validatePhoneNumber';
export { validatePhoneNumber } from './validatePhoneNumber';

import { validateCpf } from './validateCpf';
export { validateCpf } from './validateCpf';

import { validateCnpj } from './validateCnpj';
export { validateCnpj } from './validateCnpj';

import { validateCpfOrCnpj } from './validateCpfOrCnpj';
export { validateCpfOrCnpj } from './validateCpfOrCnpj';

import { validateRg } from './validateRg';
export { validateRg } from './validateRg';

import { validateByRegex } from './validateByRegex';
export { validateByRegex } from './validateByRegex';

import { validateUrl } from './validateUrl';
export { validateUrl } from './validateUrl';

import { validateTypeOf } from './validateTypeOf';
export { validateTypeOf } from './validateTypeOf';

import { validateCurrency } from './validateCurrency';
export { validateCurrency } from './validateCurrency';

export const validator = {
    isUrl: validateUrl,
    isEmail: validateEmail,
    isRg: validateRg,
    isCpf: validateCpf,
    isCnpj: validateCnpj,
    isCpfOrCnpj: validateCpfOrCnpj,
    isPhoneNumber: validatePhoneNumber,
    isLatLng: validateLatLng,
    isCurrency: validateCurrency,
    regex: validateByRegex,

    isUndefined: (value: any) => validateTypeOf(value, 'undefined'),
    isBoolean: (value: any) => validateTypeOf(value, 'boolean'),
    isNumber: (value: any) => validateTypeOf(value, 'number'),
    isString: (value: any) => validateTypeOf(value, 'string'),
    isObject: (value: any) => validateTypeOf(value, 'object'),
    isFunction: (value: any) => validateTypeOf(value, 'function'),
    isSymbol: (value: any) => validateTypeOf(value, 'symbol'),
    isBigInt: (value: any) => validateTypeOf(value, 'bigint'),
};
