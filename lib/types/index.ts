// Global
export type TypeOf =
    | 'undefined'
    | 'boolean'
    | 'number'
    | 'string'
    | 'object'
    | 'function'
    | 'symbol'
    | 'bigint';

export type KeyOf<
    T,
    Prefix extends string = '',
    Separator extends string = '.',
> = T extends object
    ? {
          [K in keyof T]-?:
              | `${Prefix & string}${K & string}`
              | KeyOf<
                    T[K],
                    `${Prefix & string}${K & string}${Separator & string}`
                >;
      }[keyof T]
    : '';

export type DeepKeyOf<T, Prefix extends string = ''> = T extends object
    ? {
          [K in keyof T]: `${Prefix}${K & string}${DeepKeyOf<T[K], '.'>}`;
      }[keyof T]
    : '';

export type DeepTypeOf<
    T,
    K extends string,
> = K extends `${infer FirstKey}.${infer RestKeys}`
    ? FirstKey extends keyof T
        ? DeepTypeOf<T[FirstKey], RestKeys>
        : never
    : K extends keyof T
    ? T[K]
    : never;

export type GenerateType<
    T extends string,
    V,
> = T extends `${infer FirstKey}.${infer RestKeys}`
    ? { [K in FirstKey]: GenerateType<RestKeys, V> }
    : { [K in T]: V };

// Config
export type MoneyCurrency = 'BRL' | 'USD' | 'EUR';

export interface MoneyConfig {
    locale: 'pt-BR' | 'en-US';
    currency: MoneyCurrency;
}

// useEventListener
export type EventName = keyof WindowEventMap;
export type Events = WindowEventMap;

// useKeyPress
export type TargetKey =
    | 'Backspace'
    | 'Tab'
    | 'Enter'
    | 'Shift'
    | 'Shift'
    | 'Control'
    | 'Control'
    | 'Alt'
    | 'Alt'
    | 'Pause'
    | 'CapsLock'
    | 'Escape'
    | '|'
    | 'PageUp'
    | 'PageDown'
    | 'End'
    | 'Home'
    | 'ArrowLeft'
    | 'ArrowUp'
    | 'ArrowRight'
    | 'ArrowDown'
    | 'PrintScreen'
    | 'Insert'
    | 'Delete'
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z'
    | 'Meta'
    | 'Meta'
    | 'ContextMenu'
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '*'
    | '+'
    | '-'
    | '.'
    | '/'
    | 'F1'
    | 'F2'
    | 'F3'
    | 'F4'
    | 'F5'
    | 'F6'
    | 'F7'
    | 'F8'
    | 'F9'
    | 'F10'
    | 'F11'
    | 'F12'
    | 'NumLock'
    | 'ScrollLock'
    | 'AudioVolumeMute'
    | 'AudioVolumeDown'
    | 'AudioVolumeUp'
    | 'LaunchMediaPlayer'
    | 'LaunchApplication1'
    | 'LaunchApplication2'
    | ';'
    | '='
    | ','
    | '-'
    | '.'
    | '/'
    | '`'
    | '['
    | ']'
    | "'";

export * from './slugify';
