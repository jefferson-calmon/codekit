export function generateKey(value: string, module: number = 100000) {
    const length = value.length;
    let sum = 0;
    let product = 1;

    for (let i = 0; i < length; i++) {
        const charCode = value.charCodeAt(i);
        sum += charCode;
        product *= charCode;
    }

    const key = (sum * product + length) % module;

    return key;
}
