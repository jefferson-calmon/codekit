export function validateCpf(cpf: string) {
    cpf = cpf.replace(/\D/g, '');

    const cpfArray = cpf.split('').map(Number);

    if (cpf.length !== 11) return false;
    if (cpfArray.every(digit => digit === cpfArray[0])) return false;

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += cpfArray[i] * (10 - i);
    }
    const firstDigit = (sum * 10) % 11;

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += cpfArray[i] * (11 - i);
    }
    const secondDigit = (sum * 10) % 11;

    return cpfArray[9] === firstDigit && cpfArray[10] === secondDigit;
}
