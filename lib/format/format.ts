import { formatAge } from './format-age';
import { formatBytes } from './format-bytes';
import { formatCep } from './format-cep';
import { formatCnpj } from './format-cnpj';
import { formatCount } from './format-count';
import { formatCpf } from './format-cpf';
import { formatCurrency } from './format-currency';
import { formatDate } from './format-date';
import { formatDocument } from './format-document';
import { formatInitials } from './format-initials';
import { formatList } from './format-list';
import { formatNumber } from './format-number';
import { formatOrdinal } from './format-ordinal';
import { formatPercent } from './format-percent';
import { formatPhone } from './format-phone';
import { formatRedact } from './format-redact';
import { formatRelativeTime } from './format-relative-time';
import { formatSlug } from './format-slug';
import { formatTime } from './format-time';
import { formatTitleCase } from './format-title-case';
import { formatTruncate } from './format-truncate';
import { formatUnit } from './format-unit';
import { formatUrl } from './format-url';

interface FormatConfig {
    fallback?: string;
}

const isEmpty = (value: unknown): boolean =>
    value == null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0);

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
    document: guard(fallback, formatDocument),
    redact: guard(fallback, formatRedact),
    phone: guard(fallback, formatPhone),
    cep: guard(fallback, formatCep),
    currency: guard(fallback, formatCurrency),
    number: guard(fallback, formatNumber),
    percent: guard(fallback, formatPercent),
    unit: guard(fallback, formatUnit),
    ordinal: guard(fallback, formatOrdinal),
    count: guard(fallback, formatCount),
    date: guard(fallback, formatDate),
    age: guard(fallback, formatAge),
    relativeTime: guard(fallback, formatRelativeTime),
    time: guard(fallback, formatTime),
    bytes: guard(fallback, formatBytes),
    list: guard(fallback, formatList),
    truncate: guard(fallback, formatTruncate),
    slug: guard(fallback, formatSlug),
    titleCase: guard(fallback, formatTitleCase),
    initials: guard(fallback, formatInitials),
    url: guard(fallback, formatUrl),
});

export const format = createFormat();
