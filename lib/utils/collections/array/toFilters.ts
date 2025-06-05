import { KeyOf } from '../../../types';

export interface NormalizedFilters<T> {
    key: KeyOf<T>;
    values: {
        label: string;
        value: string;
    }[];
}

export interface FiltersOptions {
    map?: Record<string, string>;
    key?: string;
}

export function toFilters<T extends object>(
    data: T[],
    key: KeyOf<T>,
    options?: FiltersOptions,
): NormalizedFilters<T> {
    const values = data
        .map(data => Object.get(data, key))
        .uniq()
        .compact()
        .map(value => {
            const newValue = String(value);
            let label = newValue;

            if (options?.map) label = options.map[newValue];

            return { value: newValue, label };
        });

    if (options?.key) key = options?.key as KeyOf<T>;

    return {
        key,
        values,
    };
}
