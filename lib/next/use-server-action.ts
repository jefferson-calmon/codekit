'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type ServerAction<TArgs extends unknown[], TResult> = (
    ...args: TArgs
) => Promise<TResult>;

export interface UseServerActionOptions<TArgs extends unknown[], TResult> {
    immediate?: boolean;
    args?: TArgs;
    onSuccess?: (data: TResult) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export interface UseServerActionReturn<TArgs extends unknown[], TResult> {
    data: TResult | undefined;
    error: Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    execute: (...args: TArgs) => Promise<TResult | undefined>;
}

export function useServerAction<TArgs extends unknown[], TResult>(
    action: ServerAction<TArgs, TResult>,
    options: UseServerActionOptions<TArgs, TResult> = {},
): UseServerActionReturn<TArgs, TResult> {
    const { immediate = true, args } = options;

    const [data, setData] = useState<TResult>();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(immediate);

    const actionRef = useRef(action);
    actionRef.current = action;

    const optionsRef = useRef(options);
    optionsRef.current = options;

    const callIdRef = useRef(0);
    const isMountedRef = useRef(false);

    const execute = useCallback(async (...args: TArgs) => {
        const callId = ++callIdRef.current;

        setIsLoading(true);
        setError(null);

        try {
            const result = await actionRef.current(...args);

            if (!isMountedRef.current || callId !== callIdRef.current) {
                return result;
            }

            setData(result);
            setIsLoading(false);

            optionsRef.current.onSuccess?.(result);
            optionsRef.current.onSettled?.();

            return result;
        } catch (thrown) {
            const failure =
                thrown instanceof Error ? thrown : new Error(String(thrown));

            if (!isMountedRef.current || callId !== callIdRef.current) {
                return undefined;
            }

            setError(failure);
            setIsLoading(false);

            optionsRef.current.onError?.(failure);
            optionsRef.current.onSettled?.();

            return undefined;
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!immediate) return;

        execute(...((args ?? []) as TArgs));
    }, [execute]);

    return {
        data,
        error,
        isLoading,
        isError: error !== null,
        isSuccess: !isLoading && error === null && data !== undefined,
        execute,
    };
}
