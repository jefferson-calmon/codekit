import { uuid } from '../../uuid';

export function fresh(length: number): Array<Record<'id', string>> {
    return Array.from({ length }, () => ({ id: uuid() }));
}
