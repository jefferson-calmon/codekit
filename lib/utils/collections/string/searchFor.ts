export function searchFor(string: string, search: string) {
    const value = string.toString().toLowerCase();
    const query = search.toString().toLowerCase();

    return value.search(query) >= 0;
}
