import { KeyOf } from '../types';
import { set, toNumber } from '../utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChangeOptions {
    formatter?: (value: any) => any;
}

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
type DataType = 'money';

export function useChange<T extends object>(setter: Setter<T>) {
    return (key: KeyOf<T>, options?: ChangeOptions | DataType) => {
        const change = (v: any) => {
            let value = v;

            const isObj = typeof options === 'object';

            if (options === 'money') value = toNumber(value);
            if (isObj && options?.formatter) value = options?.formatter(value);

            setter(prev => set(prev, key, value));
        };

        const handler = (e: any) => change(e.target.value);
        const value = (value: any) => change(value);

        return {
            handler,
            value,
        };
    };
}
