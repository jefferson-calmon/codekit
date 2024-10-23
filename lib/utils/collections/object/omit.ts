export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
): Omit<T, K> {
    return Object.keys(obj).reduce((acc, key) => {
        if (!keys.includes(key as K)) {
            (acc as any)[key as K] = obj[key as K];
        }
        return acc;
    }, {} as Omit<T, K>);
}
