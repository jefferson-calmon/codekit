export interface FormatAgeOptions {
    suffix?: boolean;
    now?: string | number | Date;
}

export function formatAge(
    value: string | number | Date,
    options?: FormatAgeOptions,
) {
    const { suffix = true, now = Date.now() } = options || {};

    const birth = new Date(value);
    const reference = new Date(now);

    let age = reference.getUTCFullYear() - birth.getUTCFullYear();

    const monthDiff = reference.getUTCMonth() - birth.getUTCMonth();
    const hasBirthdayPassed =
        monthDiff > 0 ||
        (monthDiff === 0 && reference.getUTCDate() >= birth.getUTCDate());

    if (!hasBirthdayPassed) age--;

    if (!suffix) return String(age);

    return age === 1 ? '1 ano' : `${age} anos`;
}
