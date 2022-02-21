export function validateCnpj(cnpj: string) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    const isValid = regex.test(cnpj);

    return isValid;
}
