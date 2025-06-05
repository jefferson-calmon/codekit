import { DeprecatedKeyOf, DeepTypeOf } from '../../../types';

export type QueryValue = string | string[];
export type Query<T> = Partial<Record<DeprecatedKeyOf<T>, QueryValue>>;

export function query<T extends object>(data: T[], query: Query<T>) {
    return data.filter(item => {
        if (Object.keys(query).length === 0) return true;

        return Object.entries(query).every(([key, value]) => {
            if (typeof value === 'undefined') return true;

            return [value].flat().some(value => {
                const hasArray = key.includes('[].');

                if (hasArray) {
                    const [firstKey, lastKey] = key.split('[].');

                    const keyValueArray = Object.get(
                        item,
                        firstKey as DeprecatedKeyOf<T>,
                    );
                    if (typeof keyValueArray === 'undefined') return true;

                    return [keyValueArray].flat().some(item => {
                        const keyValue = Object.get(
                            item as T,
                            lastKey as DeprecatedKeyOf<T>,
                        );

                        return validateValues(keyValue, value);
                    });
                }

                const keyValue = Object.get(item, key as DeprecatedKeyOf<T>);

                return validateValues(keyValue, value);
            });
        });
    });
}

function validateValues<T>(
    keyValue: DeepTypeOf<T, DeprecatedKeyOf<T, '', '.'>>,
    value: any,
) {
    if (typeof keyValue === 'undefined') return true;

    // Filter query type: range (min/max)
    if (
        typeof keyValue === 'number' &&
        typeof value === 'string' &&
        value.startsWith('minmax:')
    ) {
        const [min, max] = value.substring(7).split('-').map(Number);

        return keyValue >= min && keyValue <= (max || Infinity);
    }

    return keyValue === value;
}
