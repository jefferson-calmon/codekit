export function validateCpf(cpf: string) {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    const isValid = regex.test(cpf);

    return isValid;
}
