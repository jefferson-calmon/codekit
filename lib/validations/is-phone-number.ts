import { phones } from './phones';
import { assert } from './assert';

export interface IsPhoneNumberOptions {
    strictMode?: boolean | undefined;
}

export type IsPhoneNumberLocale =
    | keyof typeof phones
    | (keyof typeof phones)[]
    | 'any';

export function isPhoneNumber(
    value: string,
    locale: IsPhoneNumberLocale = 'pt-BR',
    options?: IsPhoneNumberOptions,
) {
    assert(value, 'string');

    if (options?.strictMode && !value.startsWith('+')) {
        return false;
    }

    if (Array.isArray(locale)) {
        return locale.some((key) => {
            if (phones.hasOwnProperty(key)) {
                const phone = phones[key];
                if (phone.test(value)) {
                    return true;
                }
            }
            return false;
        });
    } else if (locale in phones) {
        return phones[locale as keyof typeof phones].test(value);
    } else if (!locale || locale === 'any') {
        for (const key in phones) {
            if (phones.hasOwnProperty(key)) {
                const phone = phones[key as keyof typeof phones];
                if (phone.test(value)) {
                    return true;
                }
            }
        }
        return false;
    }

    throw new Error(`Invalid locale '${locale}'`);
}
