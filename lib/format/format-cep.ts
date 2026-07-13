import { extractNumbers, mask } from '../text';

export function formatCep(value: string) {
    value = extractNumbers(value);

    return mask(value, '#####-###');
}
