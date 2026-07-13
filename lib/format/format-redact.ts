import { formatCnpj } from './format-cnpj';
import { formatCpf } from './format-cpf';
import { formatPhone } from './format-phone';

export type RedactTarget = 'cpf' | 'cnpj' | 'email' | 'phone';

const redactors: Record<RedactTarget, (value: string) => string> = {
    cpf: (value) =>
        formatCpf(value).replace(/^\d{3}/, '•••').replace(/\d{2}$/, '••'),

    cnpj: (value) => formatCnpj(value).replace(/\d(?=[\d.]*\/)/g, '•'),

    email: (value) => {
        const [local, domain] = value.split('@');
        if (!domain || !local) return value;

        return `${local.charAt(0)}•••@${domain}`;
    },

    phone: (value) => {
        const formatted = formatPhone(value);
        const totalDigits = formatted.replace(/\D/g, '').length;

        let seen = 0;
        return formatted.replace(/\d/g, (digit) =>
            ++seen <= totalDigits - 4 ? '•' : digit,
        );
    },
};

export function formatRedact(value: string, target: RedactTarget) {
    return redactors[target](value);
}
