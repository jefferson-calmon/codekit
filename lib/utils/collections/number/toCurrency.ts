import { Locale } from '../../../types';

export type MoneyCurrency = 'BRL' | 'USD' | 'EUR';

export interface MoneyConfig {
    locale: Locale;
    currency: MoneyCurrency;
}

const defaultMoneyConfig: MoneyConfig = {
    locale: 'pt-BR',
    currency: 'BRL',
};

export function toCurrency(
    number: number,
    config: MoneyConfig = defaultMoneyConfig,
) {
    return number.toLocaleString(config.locale, {
        style: 'currency',
        currency: config.currency,
        maximumFractionDigits: 2,
    });
}
