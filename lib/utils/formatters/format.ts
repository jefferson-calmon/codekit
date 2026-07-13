/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatBytes } from './format-bytes';
import { formatCnpj } from './format-cnpj';
import { formatCpf } from './format-cpf';
import { formatCurrency } from './format-currency';
import { formatDate } from './format-date';
import { formatPhone } from './format-phone';
import { formatTime } from './format-time';

const formatters = {
    phone: formatPhone,
    currency: formatCurrency,
    date: formatDate,
    cnpj: formatCnpj,
    cpf: formatCpf,
    bytes: formatBytes,
    time: formatTime,
} as const;

export function format(value: any) {
    return {
        as: <
            FormatterName extends keyof typeof formatters,
            FormatterFn extends (typeof formatters)[FormatterName],
            FormatterArgs extends Parameters<FormatterFn>,
        >(
            name: FormatterName,
            ...args: FormatterArgs extends [any, ...infer R] ? R : []
        ) => {
            if (
                (!value && typeof value !== 'number') ||
                (typeof value === 'string' && value.trim() === '')
            )
                return 'N/A';

            const formatter = formatters[name] as unknown as (
                value: any,
                ...args: any[]
            ) => string;

            return formatter(value, ...args);
        },
    };
}
