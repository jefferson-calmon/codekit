import { useCallback, useRef, useState } from 'react';

import { useError } from './useError';
import { useChange } from './useChange';
import { useBoolean } from './useBoolean';
import { getFormEntriesByForm } from '../forms';
import { DeepTypeOf, KeyOf } from '../types';

export interface UseFormReturn<T extends object = {}> {
    ref: React.RefObject<HTMLFormElement>;
    errors: ReturnType<typeof useError>['errors'];
    error: ReturnType<typeof useError>;
    change: ReturnType<typeof useChange<T>>;
    data: T;
    setData: (data: T) => void;
    entry: (key: KeyOf<T>) => DeepTypeOf<T, KeyOf<T>>;
    isSubmitting: boolean;
    getEntries: () => T | null;
    onSubmit: (
        handler: (props: OnSubmitProps<T>) => Promise<void>,
    ) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export type OnSubmitProps<T> = { entries: T; nativeEntries: T | null };

export function useForm<T extends object>(initialState?: T): UseFormReturn<T> {
    // Hooks
    const error = useError();

    // Memo vars
    const initialEntries = initialState ?? ({} as T);

    // States
    const [entries, setEntries] = useState<T>(initialEntries);

    // Changers
    const change = useChange(setEntries);

    // Boolean hooks
    const isSubmitting = useBoolean();

    // Refs
    const formRef = useRef<HTMLFormElement>(null);

    // Callbacks
    const getEntries = useCallback(() => {
        const form = formRef.current;
        if (!form) return null;

        return getFormEntriesByForm<T>(form);
    }, []);

    // Functions
    function handleSubmit(handler: (props: OnSubmitProps<T>) => Promise<void>) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            error.clear();
            isSubmitting.setTrue();

            const nativeEntries = getEntries();
            console.log(nativeEntries);

            await handler({ entries, nativeEntries })
                .catch(error.catcher)
                .finally(isSubmitting.setFalse);
        };
    }

    return {
        ref: formRef,
        errors: error.errors,
        error: error,
        change,
        data: entries,
        setData: (data: T) => setEntries(data),
        entry: (key: KeyOf<T>) => Object.get(entries, key),
        isSubmitting: isSubmitting.value,
        getEntries,
        onSubmit: handleSubmit,
    };
}
