import { MoneyConfig } from '../../types';
import { randomNumber } from '../randomNumber';

export class NumberPrototypeUtils {
    static defaultMoneyConfig: MoneyConfig = {
        locale: 'pt-BR',
        currency: 'BRL',
    };

    static toMoney<N extends Number>(
        number: N,
        config: MoneyConfig = this.defaultMoneyConfig,
    ) {
        return number.toLocaleString(config.locale, {
            style: 'currency',
            currency: config.currency,
            maximumFractionDigits: 2,
        });
    }
}

export class NumberConstructorUtils {
    static random(...props: Parameters<typeof randomNumber>) {
        return randomNumber(...props);
    }
}
