'use client';

import { usePathname } from 'next/navigation';

export interface UseIsActiveLinkOptions {
    exact?: boolean;
}

const normalize = (path: string): string => {
    const [withoutQuery] = path.split('?');
    const [clean] = withoutQuery.split('#');

    if (clean === '/') return '/';

    return clean.replace(/\/+$/, '');
};

export function useIsActiveLink(
    href: string,
    options: UseIsActiveLinkOptions = {},
): boolean {
    const { exact = false } = options;

    const pathname = usePathname();

    const current = normalize(pathname || '/');
    const target = normalize(href);

    if (exact || target === '/') return current === target;

    return current === target || current.startsWith(`${target}/`);
}
