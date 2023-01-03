import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    // States
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // Effects
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
