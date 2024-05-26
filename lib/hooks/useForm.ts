import { useCallback, useRef, useState } from 'react';

import { useError } from './useError';
import { useChange } from './useChange';
import { useBoolean } from './useBoolean';
import { getFormEntriesByForm } from '../utils/getFormEntries';
import { DeepTypeOf, KeyOf } from '../types';
import { get } from '../utils';

export interface UseFormReturn<T extends object = {}> {
    ref: React.RefObject<HTMLFormElement>;
    errors: ReturnType<typeof useError>['errors'];
    error: ReturnType<typeof useError>;
    set: ReturnType<typeof useChange<T>>;
    data: T;
    isLoading: boolean;
    clear: () => void;
    setData: (data: T) => void;
    entry: (key: KeyOf<T>) => DeepTypeOf<T, KeyOf<T>>;
    valueOf: (key: KeyOf<T>) => string;
    getEntries: () => T | null;
    onSubmit: (
        handler: (props: OnSubmitProps<T>) => Promise<void>,
    ) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export type OnSubmitProps<T> = { data: T; entries: T | null };
export type Handler<T> = (props: OnSubmitProps<T>) => Promise<void>;
export type Validations<T> = Partial<
    Record<KeyOf<T>, Validation | Validation[]>
>;

export interface Validation {
    error: string;
    validator: (value: string) => boolean | Promise<boolean>;
}

export function useForm<T extends object>(
    initialState: T,
    validations: Validations<T> = {} as Validations<T>,
): UseFormReturn<T> {
    // Hooks
    const error = useError();

    // Memo vars
    const initialData = initialState ?? ({} as T);

    // States
    const [data, setData] = useState<T>(initialData);

    // Changers
    const change = useChange(setData);

    // Boolean hooks
    const isLoading = useBoolean();

    // Refs
    const formRef = useRef<HTMLFormElement>(null);

    // Callbacks
    const getEntries = useCallback(() => {
        const form = formRef.current;
        if (!form) return null;

        return getFormEntriesByForm<T>(form);
    }, []);

    // Functions
    function handleSubmit(handler: Handler<T>) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            error.clear();
            isLoading.setTrue();

            const entries = getEntries();

            return await (async () => {
                await validate();

                await handler({ data, entries });
            })()
                .catch(error.catcher)
                .finally(isLoading.setFalse);
        };
    }

    function handleClear() {
        setData(initialData);
        formRef?.current?.reset();
    }

    async function validate() {
        const entries = getEntries();
        const target = entries ? entries : data;

        await Promise.all(
            Object.entries<any>(validations).map(async ([k, validations]) => {
                const key = k as KeyOf<T>;

                await Promise.all(
                    [validations as Validation | Validation[]]
                        .flat()
                        .map(async ({ error, validator }) => {
                            const value = get(target, key) as any;

                            const isValid = await validator(value);
                            if (!isValid) throw new Error(error);
                        }),
                );
            }),
        );
    }

    return {
        ref: formRef,
        errors: error.errors,
        error: error,
        set: change,
        data: data,
        isLoading: isLoading.value,
        getEntries,
        onSubmit: handleSubmit,
        clear: handleClear,
        setData: (data: T) => setData(data),
        entry: (key: KeyOf<T>) => Object.get(data, key),
        valueOf: (key: KeyOf<T>) => String(Object.get(data, key)),
    };
}
