type Obj = Record<string | never, any>;

export function mergeObjects<T extends Obj = Obj, U extends Obj = Obj>(
    target: T,
    source: Partial<U>,
): T & Partial<U> {
    if (typeof target !== 'object' || typeof source !== 'object') {
        throw new Error('Os parâmetros devem ser objetos.');
    }

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

    return merged as T & Partial<U>;
}
