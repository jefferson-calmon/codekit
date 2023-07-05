export function validateByRegex(value: string, regex: RegExp): boolean {
    return regex.test(value);
}
