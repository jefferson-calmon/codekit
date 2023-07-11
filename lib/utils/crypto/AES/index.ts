/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const ivLength = 16;
const tagLength = 16;
const defaultSaltLength = 64;
const defaultPbkdf2Iterations = 1000;

type O = Record<string, any>;
type ProcessObjectProps<T> = [
    action: 'encrypt' | 'decrypt',
    obj: T,
    secret: string,
    criteria?: boolean | keyof T | (keyof T)[],
];

function encrypt(value: string, secret: string): string {
    if (!value) throw new Error('value must not be null or undefined');

    if (!secret || typeof secret !== 'string') {
        throw new Error('cryptoAES: secret must be a non-0-length string');
    }

    const iv = crypto.randomBytes(ivLength);
    const salt = crypto.randomBytes(defaultSaltLength);

    const key = crypto.pbkdf2Sync(
        secret,
        salt,
        defaultPbkdf2Iterations,
        32,
        'sha512',
    );

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
        cipher.update(String(value), 'utf8'),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString('hex');
}

function decrypt(encryptedValue: string, secret: string): string {
    if (encryptedValue == null) {
        throw new Error('value must not be null or undefined');
    }
    if (!secret || typeof secret !== 'string') {
        throw new Error('Cryptr: secret must be a non-0-length string');
    }

    const stringValue = Buffer.from(encryptedValue, 'hex');

    const salt = stringValue.slice(0, defaultSaltLength);
    const iv = stringValue.slice(
        defaultSaltLength,
        defaultSaltLength + ivLength,
    );
    const tag = stringValue.slice(
        defaultSaltLength + ivLength,
        defaultSaltLength + ivLength + tagLength,
    );
    const encrypted = stringValue.slice(
        defaultSaltLength + ivLength + tagLength,
    );

    const key = crypto.pbkdf2Sync(
        secret,
        salt,
        defaultPbkdf2Iterations,
        32,
        'sha512',
    );

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final('utf8');
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
