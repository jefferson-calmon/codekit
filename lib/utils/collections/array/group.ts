import { KeyOf } from '../../../types';

export interface GroupOptions<K> {
    sum?: K;
    keyTransformer?: KeyTransformer;
}

export interface GroupedData {
    key: string;
    count: number;
    sum: number;
}

export type GroupedDataByKey = Record<string, GroupedData>;

export type KeyTransformer = (key: string) => string;

export function group<T extends object>(
    data: T[],
    key: KeyOf<T>,
    options?: GroupOptions<KeyOf<T>>,
) {
    return data
        .order(key, 'asc')
        .reduce<GroupedDataByKey>((groupedDataByKey, item) => {
            const { keyTransformer, sum } = options ?? {};

            let keyValue = String(Object.get(item, key));
            const sumValue = Number(sum ? Object.get(item, sum) : 0);

            if (keyTransformer) keyValue = keyTransformer(keyValue);

            const data = groupedDataByKey[keyValue];

            const newGroupedData: GroupedData = {
                key: keyValue,
                count: data?.count ? data.count + 1 : 1,
                sum: (data?.sum || 0) + sumValue,
            };

            groupedDataByKey[keyValue] = newGroupedData;

            return { ...groupedDataByKey };
        }, {});
}
