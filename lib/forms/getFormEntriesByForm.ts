import { notFoundError } from './notFoundError';
import { FormEntries } from '../models/Forms';

export function getFormEntriesByForm<T = FormEntries>(
    form: HTMLFormElement,
): T {
    if (!form) notFoundError('form', form);

    const entries = Object.fromEntries(new FormData(form).entries()) as unknown;
    return entries as T;
}
