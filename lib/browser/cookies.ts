/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CookieOptions {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

const defaultAttributes: CookieOptions = { path: '/' };

export function setCookie(
    name: string,
    value: string,
    options?: CookieOptions,
) {
    if (typeof document === 'undefined') return;

    options = merge(defaultAttributes, options ?? {});

    if (typeof options.expires === 'number') {
        options.expires = new Date(Date.now() + options.expires * 864e5);
    }

    let cookieString = `${name}=${value}`;

    if (options.expires) {
        cookieString += `; expires=${(options.expires as Date).toUTCString()}`;
    }

    if (options.path) {
        cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
        cookieString += `; secure`;
    }

    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
}

export function getCookie(name: string) {
    if (typeof document === 'undefined') return undefined;

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const cookie = cookies.find(c => c.startsWith(`${name}=`));

    if (cookie) {
        return cookie.split('=').slice(1).join('=');
    }

    return undefined;
}

export function removeCookie(name: string) {
    setCookie(name, '');
}

// Utils

function clone<T>(obj: T) {
    return JSON.parse(JSON.stringify(obj)) as T;
}

function merge<T extends object, U extends object>(
    target: T,
    source: U,
) {
    return merger(clone(target), clone(source));
}

function merger<T extends object, U extends object>(
    target: T,
    source: U,
) {
    const merged = target as any;

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];

            if (
                sourceValue &&
                typeof sourceValue === 'object' &&
                !Array.isArray(sourceValue)
            ) {
                if (!merged[key] || typeof merged[key] !== 'object') {
                    merged[key] = {};
                }

                merged[key] = merger(merged[key], sourceValue);
            } else {
                merged[key] = sourceValue;
            }
        }
    }

    return merged as T & U;
}

export const cookies = {
    set: setCookie,
    get: getCookie,
    remove: removeCookie,
};
