export interface FormEntries {
    [k: string]: FormDataEntryValue;
}

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

export function getFormEntriesByForm<T = FormEntries>(
    form: HTMLFormElement,
): T {
    if (!form) notFoundError('form', form);

    const entries = Object.fromEntries(new FormData(form).entries()) as unknown;
    return entries as T;
}

export function notFoundError(criteriaType: string, criteria: unknown) {
    throw new Error(`Can't found this form by ${criteriaType}: ${criteria}`);
}
