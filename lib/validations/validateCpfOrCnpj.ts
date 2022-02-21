export function validateCpfOrCnpj(cpfOrCnpj: string) {
    const regex =
        /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

    const isValid = regex.test(cpfOrCnpj);

    return isValid;
}
