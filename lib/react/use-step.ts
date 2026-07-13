import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from 'react';

export interface UseStepReturn<T extends number> {
    current: T;
    canGoToNext: boolean;
    canGoToPrev: boolean;
    set: Dispatch<SetStateAction<T>>;
    next: () => void;
    prev: () => void;
    reset: () => void;
}

type SetCallbackType<T extends number> = (step: T | ((step: T) => T)) => void;

export function useStep<T extends number>(max: number): UseStepReturn<T> {
    // States
    const [current, setCurrent] = useState(1);

    // Memo vars
    const canGoToNext = useMemo(() => current + 1 <= max, [current, max]);
    const canGoToPrev = useMemo(() => current - 1 >= 1, [current]);

    // Callbacks
    const set = useCallback<SetCallbackType<T>>(
        step => {
            // Allow value to be a function so we have the same API as useState
            const newStep = step instanceof Function ? step(current as T) : step;

            if (newStep >= 1 && newStep <= max) {
                setCurrent(newStep);
                return;
            }

            throw new Error('Step not valid');
        },
        [max, current],
    );

    const next = useCallback(() => {
        if (canGoToNext) setCurrent(step => step + 1);
    }, [canGoToNext]);

    const prev = useCallback(() => {
        if (canGoToPrev) setCurrent(step => step - 1);
    }, [canGoToPrev]);

    const reset = useCallback(() => {
        setCurrent(1);
    }, []);

    return {
        current: current as T,
        next,
        prev,
        canGoToNext,
        canGoToPrev,
        set,
        reset,
    };
}
