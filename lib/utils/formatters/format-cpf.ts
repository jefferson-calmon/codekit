import { extractNumbers, mask } from "../collections/string";

export function formatCpf(value: string) {
    value = extractNumbers(value);

    return mask(value, '###.###.###-##');
}
