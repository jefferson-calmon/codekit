export function validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Impede CPFs com todos os números iguais

    const cpfArray = cpf.split('').map(Number);

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += cpfArray[i] * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0; // Ajuste correto

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += cpfArray[i] * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0; // Ajuste correto

    return cpfArray[9] === firstDigit && cpfArray[10] === secondDigit;
}
