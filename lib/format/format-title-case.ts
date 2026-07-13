import { PT_BR_NAME_PARTICLES } from './_particles';

export function formatTitleCase(value: string) {
    return value
        .toLocaleLowerCase('pt-BR')
        .trim()
        .split(/\s+/)
        .map((word, index) => {
            if (index > 0 && PT_BR_NAME_PARTICLES.has(word)) return word;

            return word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1);
        })
        .join(' ');
}
