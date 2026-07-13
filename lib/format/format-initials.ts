import { PT_BR_NAME_PARTICLES } from './_particles';

export interface FormatInitialsOptions {
    max?: number;
}

export function formatInitials(value: string, options?: FormatInitialsOptions) {
    const { max = 2 } = options || {};

    const words = value
        .trim()
        .split(/\s+/)
        .filter((word) => !PT_BR_NAME_PARTICLES.has(word.toLocaleLowerCase('pt-BR')));

    if (!words.length) return '';

    const picked =
        words.length <= max
            ? words
            : [...words.slice(0, max - 1), words[words.length - 1]];

    return picked
        .map((word) => word.charAt(0).toLocaleUpperCase('pt-BR'))
        .join('');
}
