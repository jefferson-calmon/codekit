import { clone } from './clone';

export function merge<T extends object, U extends object>(
    target: T,
    source: U,
) {
    const merged = { ...clone(target) } as any;

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

                merged[key] = merge(merged[key], sourceValue);
            } else {
                merged[key] = sourceValue;
            }
        }
    }

    return clone(merged) as T & U;
}
