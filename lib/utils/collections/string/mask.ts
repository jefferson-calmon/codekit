export function mask(value: string, pattern: string) {
    let index = 0;
    value = value.toString().replace(/\D/g, '');

    return pattern.replace(/#/g, () => value[index++] || '');
}
