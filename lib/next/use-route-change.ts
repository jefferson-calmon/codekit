'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export interface RouteChangeContext {
    pathname: string;
    searchParams: URLSearchParams;
    previousUrl: string | null;
}

export interface UseRouteChangeOptions {
    runOnMount?: boolean;
}

export function useRouteChange(
    onChange: (context: RouteChangeContext) => void,
    options: UseRouteChangeOptions = {},
): void {
    const { runOnMount = false } = options;

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const url = `${pathname}?${searchParams.toString()}`;

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const pathnameRef = useRef(pathname);
    pathnameRef.current = pathname;

    const searchParamsRef = useRef(searchParams);
    searchParamsRef.current = searchParams;

    const previousUrlRef = useRef<string | null>(null);
    const isFirstRef = useRef(true);

    useEffect(() => {
        const isFirst = isFirstRef.current;
        isFirstRef.current = false;

        if (isFirst && !runOnMount) {
            previousUrlRef.current = url;
            return;
        }

        onChangeRef.current({
            pathname: pathnameRef.current || '/',
            searchParams: new URLSearchParams(searchParamsRef.current.toString()),
            previousUrl: previousUrlRef.current,
        });

        previousUrlRef.current = url;
    }, [url, runOnMount]);
}
