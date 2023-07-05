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

export const validator = {
    isEmail: validateEmail,
    isRg: validateRg,
    isCpf: validateCpf,
    isCnpj: validateCnpj,
    isCpfOrCnpj: validateCpfOrCnpj,
    isPhoneNumber: validatePhoneNumber,
    isLatLng: validateLatLng,
    regex: validateByRegex
};
