/* eslint-disable @typescript-eslint/no-explicit-any */

import { clone, merge } from './collections/object';

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

    options = merge(clone(defaultAttributes), options ?? {});

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

export const cookies = {
    set: setCookie,
    get: getCookie,
    remove: removeCookie,
};
