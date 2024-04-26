import { KeyOf } from "../../../types";

export type QueryValue = string | string[];
export type Query<T> = Partial<Record<KeyOf<T>, QueryValue>>;

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
                        firstKey as KeyOf<T>,
                    );
                    if (typeof keyValueArray === 'undefined') return true;

                    return [keyValueArray].flat().some(item => {
                        const keyValue = Object.get(
                            item as T,
                            lastKey as KeyOf<T>,
                        );
                        if (typeof keyValue === 'undefined') return true;

                        return keyValue === value;
                    });
                }

                const keyValue = Object.get(item, key as KeyOf<T>);
                if (typeof keyValue === 'undefined') return true;

                return keyValue === value;
            });
        });
    });
}
