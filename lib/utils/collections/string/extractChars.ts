export function extractChars(value: string) {
    return value.toString().replace(/\d/g, '');
}
