import { slugify } from './slugify';

export function searchFor(string: string, search: string) {
    const value = slugify(string.toString().toLowerCase());
    const query = slugify(search.toString().toLowerCase());

    return value.search(query) >= 0;
}
