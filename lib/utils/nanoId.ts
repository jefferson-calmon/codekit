import seedrandom from 'seedrandom';

const urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export function nanoid(size = 21, seed?: string) {
    const rng = seed ? seedrandom(seed) : Math.random;

    let id = '';
    let i = size;

    while (i--) {
        id += urlAlphabet[(rng() * 64) | 0];
    }

    return id;
}

interface CustomNanoIdProps {
    prefix?: string;
    suffix?: string;
    size?: number;
}

export function customNanoId(props: CustomNanoIdProps) {
    return (seed?: string) => {
        return [props.prefix, nanoid(props.size, seed), props.suffix]
            .compact()
            .uniq()
            .join('');
    };
}
