import crypto from 'crypto';

export function hashify(input: string) {
    const hash = crypto.createHash('sha256');
    hash.update(input);

    return hash.digest('hex');
}
