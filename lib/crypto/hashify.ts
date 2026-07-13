import crypto from 'crypto';

export function hashify(value: string) {
    const hash = crypto.createHash('sha256');
    hash.update(value);

    return hash.digest('hex');
}
