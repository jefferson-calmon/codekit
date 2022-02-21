import { FormEntries } from '../types/Forms';
import { notFoundError } from './notFoundError';

export function getFormEntriesByQuery<T = FormEntries>(query: string): T {
    const form = document.querySelector(query) as HTMLFormElement;
    if (!form) notFoundError('query', query);

    const entries = Object.fromEntries(new FormData(form).entries()) as unknown;
    return entries as T;
}
