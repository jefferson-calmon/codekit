export interface FormatUrlOptions {
    query?: boolean;
}

export function formatUrl(value: string, options?: FormatUrlOptions) {
    const { query = false } = options || {};

    try {
        const url = new URL(value.includes('://') ? value : `https://${value}`);

        const host = url.host.replace(/^www\./, '');
        const path = url.pathname.replace(/\/$/, '');
        const search = query ? url.search : '';

        return `${host}${path}${search}`;
    } catch {
        return value;
    }
}
