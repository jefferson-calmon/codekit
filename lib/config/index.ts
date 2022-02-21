type MoneyCurrency = 'BRL' | 'USD' | 'EUR';

interface MoneyConfig {
    locale: 'pt-BR' | 'en-US';
    currency: MoneyCurrency;
}

declare global {
    interface Number {
        toMoney: (config?: MoneyConfig) => string;
    }

    interface String {
        toNumber: () => number;
        extractNumbers: () => string;
        mask: (pattern: string) => string;
    }
}

export const config = (): void => {
    Number.prototype.toMoney = function (
        config: MoneyConfig = {
            locale: 'pt-BR',
            currency: 'BRL',
        },
    ) {
        return this.toLocaleString(config.locale, {
            style: 'currency',
            currency: config.currency,
            maximumFractionDigits: 2,
        });
    };

    String.prototype.toNumber = function () {
        return Number(this);
    };

    String.prototype.extractNumbers = function () {
        return this.toString().replace(/\D/g, '');
    };

    String.prototype.mask = function (pattern: string) {
        let index = 0;
        const value = this.toString().replace(/\D/g, '');

        return pattern.replace(/#/g, () => value[index++] || '');
    };
};
