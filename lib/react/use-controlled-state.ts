import { SetStateAction, useCallback, useRef, useState } from 'react';

export interface UseControlledStateProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
}

export type UseControlledStateReturn<T> = [
    T,
    (next: SetStateAction<T>) => void,
    boolean,
];

export function useControlledState<T>(
    props: UseControlledStateProps<T> & { defaultValue: T },
): UseControlledStateReturn<T>;
export function useControlledState<T>(
    props: UseControlledStateProps<T>,
): UseControlledStateReturn<T | undefined>;
export function useControlledState<T>({
    value: controlledValue,
    defaultValue,
    onChange,
}: UseControlledStateProps<T>) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const valueRef = useRef(value);
    valueRef.current = value;

    const isControlledRef = useRef(isControlled);
    isControlledRef.current = isControlled;

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const setValue = useCallback((next: SetStateAction<T | undefined>) => {
        const resolved =
            typeof next === 'function'
                ? (next as (prev: T | undefined) => T | undefined)(
                      valueRef.current,
                  )
                : next;

        if (Object.is(resolved, valueRef.current)) return;

        if (!isControlledRef.current) {
            setUncontrolledValue(resolved);
        }

        onChangeRef.current?.(resolved as T);
    }, []);

    return [value, setValue, isControlled];
}
