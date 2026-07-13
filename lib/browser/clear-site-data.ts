export interface ClearSiteDataOptions {
    indexDBName?: string;
    reload?: boolean;
}

export async function clearSiteData(options?: ClearSiteDataOptions) {
    try {
        clearLocalStorage();
        clearSessionStorage();
        clearCookies();

        await clearCacheStorage();
        await clearIndexedDatabase();

        if (options?.reload) window.location.reload();
    } catch (error) {
        console.error(error);
    }
}

export function clearLocalStorage() {
    window.localStorage.clear();
}

export function clearSessionStorage() {
    window.sessionStorage.clear();
}

export function clearCookies() {
    const allCookies = window.document.cookie.split(';');

    // The "expire" attribute of every cookie is Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (let i = 0; i < allCookies.length; i++)
        window.document.cookie =
            allCookies[i] + '=;expires=' + new Date(0).toUTCString();
}

export async function clearCacheStorage() {
    await window.caches.keys().then(names => {
        names.forEach(name => {
            caches.delete(name);
        });
    });
}

export async function clearIndexedDatabase() {
    await window.indexedDB?.databases().then(r => {
        for (var i = 0; i < r.length; i++) {
            if (typeof r[i].name === 'string')
                window.indexedDB.deleteDatabase(r[i].name!);
        }
    });
}
