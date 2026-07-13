import { extractNumbers, mask } from '../text';

export function formatCnpj(value: string) {
    value = extractNumbers(value);

    return mask(value, '##.###.###/####-##');
}
