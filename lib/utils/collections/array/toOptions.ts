import { KeyOf } from '../../../types';
import { reduction } from './reduction';

export type NormalizedOption = {
    label: string;
    value: string;
}

export function toOptions<T extends object>(
    data: T[],
    key: KeyOf<T>,
    value: KeyOf<T>,
) {
    const reduced = reduction(data, key, value);

    return Object.entries(reduced).map(([key, value]) => ({
        label: value,
        value: key,
    }));
}
