import { generateKey } from "./generateKey";

export function shuffle(value: string, key?: number) {
    key = key ? key : generateKey(value, 343678);

    const charArray = value.split('');
    const length = charArray.length;
    const result = [...charArray];

    for (let i = length - 1; i > 0; i--) {
        const j = Math.floor((i + key) % length);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join('');
}
