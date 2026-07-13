export function random<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}
