import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T {
    // Refs
    const ref: any = useRef<T>();

    // Effects
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
