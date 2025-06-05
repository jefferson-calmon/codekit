export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Day =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;
export type Hour =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
export type Minute =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59;
export type Second = Minute;

export interface CreateDateInput<
    TYear extends number = number,
    TMonth extends number = Month,
    TDay extends number = Day,
    THour extends number = Hour,
    TMinute extends number = Minute,
    TSecond extends number = Second,
> {
    year?: TYear;
    month?: TMonth;
    day?: TDay;
    hour?: THour;
    minute?: TMinute;
    second?: TSecond;
    timezone?: string; // ex: 'America/Sao_Paulo'
}

/**
 * Cria uma nova instância de `Date`, preenchendo valores ausentes com base
 * na data/hora atual em um fuso horário específico (padrão: 'America/Sao_Paulo').
 */
export function create<
    TYear extends number = number,
    TMonth extends number = Month,
    TDay extends number = Day,
    THour extends number = Hour,
    TMinute extends number = Minute,
    TSecond extends number = Second,
>(input: CreateDateInput<TYear, TMonth, TDay, THour, TMinute, TSecond>): Date {
    const tz = input.timezone || 'America/Sao_Paulo';

    const now = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    })
        .formatToParts(new Date())
        .reduce((acc, part) => {
            if (part.type !== 'literal')
                acc[part.type] = parseInt(part.value, 10);
            return acc;
        }, {} as Record<string, number>);

    const year = input.year ?? now.year;
    const month = input.month ?? now.month;
    const day = input.day ?? now.day;
    const hour = input.hour ?? now.hour;
    const minute = input.minute ?? now.minute;
    const second = input.second ?? now.second;

    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

    const localeDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));

    if (isNaN(localeDate.getTime())) {
        throw new Error('Data inválida com os parâmetros fornecidos.');
    }

    return localeDate;
}
