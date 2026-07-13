/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useCallback } from 'react';

type UseControlledStateReturn<V, D> = [
    V | D | null,
    (value: React.SetStateAction<V | D | null>) => void,
    boolean,
];

/**
 * A hook for controlled value management.
 * In the case of passing the controlled value, the controlled value is returned, otherwise the value in state is returned.
 * Generally used for a component including controlled and uncontrolled modes.
 * @param controlledValue
 * @param defaultValue
 * @param formatValue
 */
export function useControlledState<V = any, D = V>(
    controlledValue: V,
    defaultValue: D,
): UseControlledStateReturn<V, D> {
    const controlledRef = useRef(false);
    controlledRef.current = controlledValue !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = useState<D | V | null>(
        defaultValue,
    );

    // If it is controlled, this directly returns the attribute value.
    const value = controlledRef.current ? controlledValue : uncontrolledValue;

    const setValue = useCallback(
        (nextValue: React.SetStateAction<V | D | null>) => {
            // Only update the value in state when it is not under control.
            if (!controlledRef.current) {
                setUncontrolledValue(nextValue);
            }
        },
        [controlledRef],
    );

    return [value, setValue, controlledRef.current];
}
