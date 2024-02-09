export interface ClearSiteDataOptions {
    indexDBName?: string;
    reload?: boolean;
}

export async function clearSiteData(options: ClearSiteDataOptions) {
    try {
        window.localStorage.clear();
        window.sessionStorage.clear();

        clearCookies();
        await clearCacheStorage();
        await clearIndexedDatabase();

        if (options.reload) window.location.reload();
    } catch (error) {
        console.error(error);
    }
}

function clearCookies() {
    const allCookies = window.document.cookie.split(';');

    // The "expire" attribute of every cookie is Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (let i = 0; i < allCookies.length; i++)
        window.document.cookie =
            allCookies[i] + '=;expires=' + new Date(0).toUTCString();
}

async function clearCacheStorage() {
    await window.caches.keys().then(names => {
        names.forEach(name => {
            caches.delete(name);
        });
    });
}

async function clearIndexedDatabase() {
    await window.indexedDB?.databases().then(r => {
        for (var i = 0; i < r.length; i++) {
            if (typeof r[i].name === 'string')
                window.indexedDB.deleteDatabase(r[i].name!);
        }
    });
}
