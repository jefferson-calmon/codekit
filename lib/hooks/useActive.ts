import { useState } from 'react';

type HookProps<T extends string> = Partial<Record<T, boolean>>;

interface HookReturn<T extends string> {
    isActive: Record<T, boolean>;
    handleActive: (
        item: T | Partial<Record<T, boolean>>,
        state?: boolean,
    ) => void;
}

export function useActive<T extends string>({
    ...props
}: HookProps<T> | void): HookReturn<T> {
    const [isActive, setIsActive] = useState<Record<T, boolean>>({
        ...props,
    } as Record<T, boolean>);

    function handleActive(
        item: T | Partial<Record<T, boolean>>,
        state?: boolean,
    ): void {
        if (typeof item === 'string') {
            setIsActive(prev => ({
                ...prev,
                [item]: typeof state !== 'undefined' ? state : !prev[item],
            }));
        }

        if (typeof item === 'object') {
            setIsActive(prev => ({
                ...prev,
                ...item,
            }));
        }
    }

    return {
        isActive,
        handleActive,
    };
}
