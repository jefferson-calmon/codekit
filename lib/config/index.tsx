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

    interface Array<T> {
        compact: () => T[];
        last: () => T;
        uniq: () => T[];
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

export const PandoraConfig = (): JSX.Element => {
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

    Array.prototype.compact = function () {
        return this.filter(Boolean);
    }

    Array.prototype.last = function () {
        return this[this.length - 1];
    }

    Array.prototype.uniq = function () {
        return [...new Set(this)];
    }

    return <></>;
};

const teste = ['pt-BR', 'pt-BR'].uniq()
