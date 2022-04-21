import { useCallback, useEffect, useMemo, useState } from 'react';

export type Call<Response = any> = () => Awaited<Response>;

type Args<Response> = {
    call: Call<Response>;
};

type HookReturn<Response extends any, Error = any> = {
    data: Response | null;
    loading: boolean;
    error: Error | null;
    isError: boolean;
    refetch: () => void;
};

export function useFetch<Response = unknown, Error = unknown>({
    call,
}: Args<Response>): HookReturn<Response, Error> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [data, setData] = useState<Response | null>(null);

    const isError = useMemo(() => !!error, [error]);

    const fetch = useCallback(
        async <Response extends any>(call: Call<Response>) => {
            setLoading(true);
            try {
                const response = await call();
                setData(response as any);
            } catch (error) {
                setError(error as Error);
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
