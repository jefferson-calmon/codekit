export function mergeObjects<T extends object, U extends object>(
    target: T,
    source: U,
) {
    const merged = { ...target } as any;

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];

            if (
                sourceValue &&
                typeof sourceValue === 'object' &&
                !Array.isArray(sourceValue)
            ) {
                if (!merged[key] || typeof merged[key] !== 'object') {
                    merged[key] = {};
                }

                merged[key] = mergeObjects(merged[key], sourceValue);
            } else {
                merged[key] = sourceValue;
            }
        }
    }

    return merged as T & U;
}
