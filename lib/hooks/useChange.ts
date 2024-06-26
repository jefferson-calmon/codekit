import { KeyOf } from '../types';
import { set, toNumber, validator } from '../utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChangeOptions {
    /**
     * Transform value for change
     * @param value
     * @returns any
     */
    transformer?: (value: any) => any;
}

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
export type DataType = 'currency';

export function useChange<T extends object>(setter: Setter<T>) {
    return (key: KeyOf<T>, options?: ChangeOptions | DataType) => {
        const change = (v: any) => {
            let value = v;

            const isObject = typeof options === 'object';

            const isNumber = !Number.isNaN(Number(value)) && value !== '';
            const isCurrency =
                options === 'currency' || validator.isCurrency(value);

            if (isNumber) value = Number(value);
            if (isCurrency) value = toNumber(value);

            if (isObject && options?.transformer)
                value = options?.transformer(value);

            setter(prev => set(prev, key, value));
        };

        const value = (value: any) => change(value);
        const handler = (e: any) => {
            const isEvent =
                e?.target || e?.currentTarget || e?.nativeEvent?.target;

            const value = isEvent
                ? e?.target?.value ??
                  e?.target?.textContent ??
                  e?.currentTarget?.value ??
                  e?.nativeEvent?.target?.value
                : e;

            return change(String(value));
        };

        return {
            handler,
            value,
        };
    };
}
