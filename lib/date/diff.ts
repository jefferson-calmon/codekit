export type DiffType =
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'months'
    | 'years';

export function diff(start: Date, end: Date) {
    const seconds = Math.floor((start.getTime() - end.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    const months = Math.floor(seconds / 2592000);
    const years = Math.floor(seconds / 31536000);

    let formatted = '';
    let type: DiffType = 'seconds';
    let value = seconds;

    if (seconds < 60) {
        formatted = `agora mesmo`;
        type = 'seconds';
    } else if (seconds < 3600) {
        formatted = `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
        type = 'minutes';
        value = minutes;
    } else if (seconds < 86400) {
        formatted = `${hours} hora${hours > 1 ? 's' : ''} atrás`;
        type = 'hours';
        value = hours;
    } else if (seconds < 2592000) {
        formatted = `${days} dia${days > 1 ? 's' : ''} atrás`;
        type = 'days';
        value = days;
    } else if (seconds < 31536000) {
        formatted = `${months} mês${months > 1 ? 'es' : ''} atrás`;
        type = 'months';
        value = months;
    } else {
        formatted = `${years} ano${years > 1 ? 's' : ''} atrás`;
        type = 'years';
        value = years;
    }

    return {
        formatted,
        type,
        value,
        seconds,
        minutes,
        hours,
        days,
        months,
        years,
    };
}
