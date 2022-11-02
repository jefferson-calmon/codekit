import { uuid } from './uuid';

export function makeArray(length: number): Array<string> {
    return Array.from({ length }, () => uuid());
}
