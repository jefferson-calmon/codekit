export function validateCurrency(value: string): boolean {
    const currencyRegex =
        /^(\$|R\$)\s?\d{1,3}(,\d{3})*(\.\d{2})?$|^(\$|R\$)\s?\d{1,3}(\.\d{3})*(\,\d{2})?$/;

    return currencyRegex.test(value);
}
