export interface ShiftDateValues {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

export function shift(date: Date, values: ShiftDateValues): Date {
    const result = new Date(date);

    if (values.years) {
        result.setFullYear(result.getFullYear() + values.years);
    }

    if (values.months) {
        result.setMonth(result.getMonth() + values.months);
    }

    if (values.weeks) {
        result.setDate(result.getDate() + values.weeks * 7);
    }

    if (values.days) {
        result.setDate(result.getDate() + values.days);
    }

    if (values.hours) {
        result.setHours(result.getHours() + values.hours);
    }

    if (values.minutes) {
        result.setMinutes(result.getMinutes() + values.minutes);
    }

    if (values.seconds) {
        result.setSeconds(result.getSeconds() + values.seconds);
    }

    return result;
}
