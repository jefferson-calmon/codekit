import { uuid } from './uuid';

export function arrayify(length: number): Array<string> {
    return Array.from({ length }, () => uuid());
}
