export function isPromise(p: any) {
    return p && Object.prototype.toString.call(p) === '[object Promise]';
}
