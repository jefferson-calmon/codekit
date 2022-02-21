export function notFoundError(criteriaType: string, criteria: unknown) {
    throw new Error(`Can't found this form by ${criteriaType}: ${criteria}`);
}
