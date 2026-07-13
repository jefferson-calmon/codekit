import { formatBytes } from './format-bytes';
import { formatCnpj } from './format-cnpj';
import { formatCpf } from './format-cpf';
import { formatCurrency } from './format-currency';
import { formatDate } from './format-date';
import { formatPhone } from './format-phone';
import { formatTime } from './format-time';

interface FormatConfig {
    fallback?: string;
}

const isEmpty = (value: unknown): boolean =>
    value == null || (typeof value === 'string' && value.trim() === '');

const guard =
    <Value, Args extends unknown[]>(
        fallback: string,
        formatter: (value: Value, ...args: Args) => string,
    ) =>
    (value: Value | null | undefined, ...args: Args): string =>
        isEmpty(value) ? fallback : formatter(value as Value, ...args);

export const createFormat = ({ fallback = 'N/A' }: FormatConfig = {}) => ({
    cpf: guard(fallback, formatCpf),
    cnpj: guard(fallback, formatCnpj),
    phone: guard(fallback, formatPhone),
    currency: guard(fallback, formatCurrency),
    date: guard(fallback, formatDate),
    bytes: guard(fallback, formatBytes),
    time: guard(fallback, formatTime),
});

export const format = createFormat();
