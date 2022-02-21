import { FormEntries } from '../types/Forms';
import { notFoundError } from './notFoundError';

export function getFormEntriesByEvent<T = FormEntries>(
    event: React.FormEvent,
): T {
    const form = event.target as HTMLFormElement;
    if (!form) notFoundError('event', event);

    const entries = Object.fromEntries(
        new FormData(form).entries(),
    ) as unknown as T;

    return entries;
}
