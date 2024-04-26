import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from 'react';

export interface UseStepReturn {
    current: number;
    canGoToNext: boolean;
    canGoToPrev: boolean;
    set: Dispatch<SetStateAction<number>>;
    next: () => void;
    prev: () => void;
    reset: () => void;
}

type SetCallbackType = (step: number | ((step: number) => number)) => void;

export function useStep(max: number): UseStepReturn {
    // States
    const [current, setCurrent] = useState(1);

    // Memo vars
    const canGoToNext = useMemo(() => current + 1 <= max, [current, max]);
    const canGoToPrev = useMemo(() => current - 1 >= 1, [current]);

    // Callbacks
    const set = useCallback<SetCallbackType>(
        step => {
            // Allow value to be a function so we have the same API as useState
            const newStep = step instanceof Function ? step(current) : step;

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
        current,
        next,
        prev,
        canGoToNext,
        canGoToPrev,
        set,
        reset,
    };
}
