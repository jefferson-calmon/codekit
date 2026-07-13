import { extractNumbers } from '../text';
import { formatCnpj } from './format-cnpj';
import { formatCpf } from './format-cpf';

export function formatDocument(value: string) {
    const digits = extractNumbers(value);

    return digits.length > 11 ? formatCnpj(digits) : formatCpf(digits);
}
