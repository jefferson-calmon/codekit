import { extractNumbers, mask } from "../text";

export function formatCpf(value: string) {
    value = extractNumbers(value);

    return mask(value, '###.###.###-##');
}
