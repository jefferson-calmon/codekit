export function isMatch(value: string, regex: RegExp): boolean {
    return regex.test(value);
}
