export function compact<T>(array: T[]): Exclude<T, null | undefined | false>[] {
    return array.filter(Boolean) as Exclude<T, null | undefined | false>[];
}
