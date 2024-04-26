import { generateKey } from './generateKey';

export function unshuffle(shuffledStr: string, key?: number) {
    key = key ? key : generateKey(shuffledStr, 343678);

    const charArray = shuffledStr.split('');
    const length = charArray.length;
    const result = [...charArray];

    for (let i = 0; i < length - 1; i++) {
        const j = Math.floor((i + key) % length);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join('');
}
