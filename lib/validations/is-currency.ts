export function isCurrency(value: string): boolean {
    const regex =
        /^(\$|R\$)\s?\d{1,3}(,\d{3})*(\.\d{2})?$|^(\$|R\$)\s?\d{1,3}(\.\d{3})*(\,\d{2})?$/;

    return regex.test(value);
}
