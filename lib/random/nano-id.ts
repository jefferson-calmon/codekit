import seedrandom from 'seedrandom';
import { compact } from '../array/compact';
import { uniq } from '../array/uniq';

const urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export function nanoid(size = 21, seed?: string, charset = urlAlphabet) {
    const rng = seed ? seedrandom(seed) : Math.random;

    let id = '';
    let i = size;

    while (i--) {
        id += charset[(rng() * 64) | 0];
    }

    return id;
}

export interface CustomNanoIdProps {
    prefix?: string;
    suffix?: string;
    size?: number;
    charset?:
        | string
        | {
              numbers?: boolean;
              lowercase?: boolean;
              uppercase?: boolean;
              underscore?: boolean;
              hyphen?: boolean;
              special?: boolean;
          };
}

export function customNanoId(props: CustomNanoIdProps) {
    const charset =
        typeof props.charset === 'string'
            ? props.charset
            : [
                  props.charset?.numbers && '0123456789',
                  props.charset?.lowercase && 'abcdefghijklmnopqrstuvwxyz',
                  props.charset?.uppercase && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                  props.charset?.underscore && '_',
                  props.charset?.hyphen && '-',
                  props.charset?.special && '!@#$%^&*()_+-=[]{}|;:,.<>?',
              ].filter(Boolean).join('');

    return (seed?: string) => {
        const parts = [
            props.prefix,
            nanoid(props.size, seed, props.charset ? charset : urlAlphabet),
            props.suffix,
        ];

        return uniq(compact(parts)).join('');
    };
}
