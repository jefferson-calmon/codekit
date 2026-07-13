export function extractNumbers(value: string) {
    return value.toString().replace(/\D/g, '');
}
