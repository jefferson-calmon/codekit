let debounceTimeout: NodeJS.Timeout;

export function debounce(cb: () => void, timeout = 1000) {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(cb, timeout);
}
