import { extractNumbers, mask } from '../collections/string';

export function formatCnpj(value: string) {
    value = extractNumbers(value);

    return mask(value, '##.###.###/####-##');
}
