import { useCallback, useEffect, useMemo, useState } from 'react';

export type CallType<Response = any> = () => Promise<Response>;

type Args<Response> = {
    call: CallType<Response>;
};

type HookReturn<Response extends any, Error = any> = {
    data: Response | null;
    loading: boolean;
    error: Error | null;
    isError: boolean;
    refetch: () => void;
};

export function useFetch<ResponseType = unknown, Error = unknown>({
    call,
}: Args<ResponseType>): HookReturn<ResponseType, Error> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [data, setData] = useState<ResponseType | null>(null);

    const isError = useMemo(() => !!error, [error]);

    const fetch = useCallback(
        async <T extends ResponseType>(callFetch: CallType<T>) => {
            setLoading(true);
            try {
                const response = await callFetch();
                setData(response as any);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        },
        [setData, setLoading, setError],
    );

    const refetch = useCallback(() => {
        fetch(call);
    }, [fetch, call]);

    useEffect(() => {
        (async () => {
            await fetch(call);
        })();
    }, []);

    return {
        data,
        error,
        loading,
        isError,
        refetch,
    };
}
