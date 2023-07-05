import { phones } from '../constants/validatePhoneNumber';
import { assert } from '../helpers/assert';

interface Options {
    /**
     * If this is set to `true`, the mobile phone number must be supplied with the country code and therefore must start with `+`.
     *
     * @default false
     */
    strictMode?: boolean | undefined;
}

type Locale = keyof typeof phones | (keyof typeof phones)[] | 'any';

export function validatePhoneNumber(
    value: string,
    locale: Locale = 'pt-BR',
    options?: Options,
) {
    assert(value, 'string');

    if (options?.strictMode && !value.startsWith('+')) {
        return false;
    }

    if (Array.isArray(locale)) {
        return locale.some(key => {
            // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
            // istanbul ignore else
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
        // alias falsy locale as 'any'
    } else if (!locale || locale === 'any') {
        for (const key in phones) {
            // istanbul ignore else
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
