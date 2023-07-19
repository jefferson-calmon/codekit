/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';

type O = Record<string, any>;
type ProcessObjectProps<T> = [
    action: 'encrypt' | 'decrypt',
    obj: T,
    secret: string,
    criteria?: boolean | keyof T | (keyof T)[],
];
type Config = {
    iv?: CryptoJS.lib.WordArray | undefined;
    [key: string]: any;
};

function encrypt(value: string, secret: string, config?: Config): string {
    if (!value) throw new Error('value must not be null or undefined');

    if (!secret || typeof secret !== 'string') {
        throw new Error('crypto.AES: secret must be a non-0-length string');
    }

    return CryptoJS.AES.encrypt(value, secret, config).toString();
}

function decrypt(cipher: string, secret: string, config?: Config): string {
    if (cipher == null) {
        throw new Error('value must not be null or undefined');
    }
    if (!secret || typeof secret !== 'string') {
        throw new Error('Cryptr: secret must be a non-0-length string');
    }

    return CryptoJS.AES.decrypt(cipher, secret, config).toString(
        CryptoJS.enc.Utf8,
    );
}

function cryptObject<T extends O = O>(...props: ProcessObjectProps<T>): T {
    const [action, obj, secret, properties] = props;

    const object = { ...obj } as any;

    const isEncrypt = action === 'encrypt';
    const crypto = isEncrypt ? encrypt : decrypt;

    const isPropertiesTrue = properties === true;
    const isPropertiesArray = Array.isArray(properties);
    const isPropertiesString = typeof properties === 'string';

    if (isPropertiesTrue) {
        for (const key in object) {
            if (object.hasOwnProperty(key) && typeof object[key] === 'string') {
                object[key] = crypto(object[key], secret);
            }
        }
    }

    if (isPropertiesString) {
        if (
            object.hasOwnProperty(properties) &&
            typeof object[properties] === 'string'
        ) {
            object[properties] = crypto(object[properties], secret);
        }
    }

    if (isPropertiesArray) {
        for (const item of object as unknown as any[]) {
            for (const key of properties) {
                if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
                    item[key] = crypto(item[key], secret);
                }
            }
        }
    }

    return object;
}

export const AES = { encrypt, decrypt, cryptObject };
