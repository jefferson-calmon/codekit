import { useCallback, useRef, useState } from 'react';

import { useError } from './useError';
import { ChangeOptions, DataType, useChange } from './useChange';
import { useBoolean } from './useBoolean';
import { getFormEntriesByForm } from '../utils/getFormEntries';
import { DeepTypeOf, DeprecatedKeyOf } from '../types';
import { get, toNumber } from '../utils';

export interface UseFormReturn<T extends object = {}> {
    ref: React.RefObject<HTMLFormElement>;
    errors: ReturnType<typeof useError>['errors'];
    error: ReturnType<typeof useError>;
    data: T;
    isLoading: boolean;
    clear: () => void;
    set: (
        key: DeprecatedKeyOf<T>,
        options?: ChangeOptions | DataType,
    ) => {
        value: (value: any) => void;
        handler: (e: any) => void;
    };
    change: (
        key: DeprecatedKeyOf<T>,
        options?: ChangeOptions | DataType,
    ) => (e: any) => void;
    setData: (data: T) => void;
    entry: (key: DeprecatedKeyOf<T>) => DeepTypeOf<T, DeprecatedKeyOf<T>>;
    value: (key: DeprecatedKeyOf<T>) => string;
    getEntries: () => T | null;
    onSubmit: (
        handler: (props: OnSubmitProps<T>) => Promise<void>,
    ) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export type OnSubmitProps<T> = { data: T; entries: T | null };
export type Handler<T> = (props: OnSubmitProps<T>) => Promise<void>;
export type Validations<T> = Partial<
    Record<DeprecatedKeyOf<T>, Validation | Validation[]>
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

    function handleSet(key: DeprecatedKeyOf<T>, options?: ChangeOptions | DataType) {
        return change(key, options);
    }

    function handleChange(key: DeprecatedKeyOf<T>, options?: ChangeOptions | DataType) {
        return change(key, options).handler;
    }

    function handleValue(key: DeprecatedKeyOf<T>) {
        const value = Object.get(data, key);

        if (value === undefined) return '';
        if (value === null) return '';

        return String(value);
    }

    async function validate() {
        const entries = getEntries();
        const target = entries ? entries : data;

        await Promise.all(
            Object.entries<any>(validations).map(async ([k, validations]) => {
                const key = k as DeprecatedKeyOf<T>;

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
        data: data,
        isLoading: isLoading.value,
        getEntries,
        onSubmit: handleSubmit,
        clear: handleClear,
        set: handleSet,
        change: handleChange,
        value: handleValue,
        entry: (key: DeprecatedKeyOf<T>) => Object.get(data, key),
        setData: (data: T) => setData(data),
    };
}
