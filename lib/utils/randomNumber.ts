type Options = [min: number, max: number] | [length: number];

export function randomNumber(...options: Options) {
    if (typeof options[0] === 'number' && typeof options[1] === 'number') {
        return randomInt(options[0], options[1]);
    }

    return randomSequence(options[0]);
}

function randomInt(min: number, max: number) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);

    const random = Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;

    return random;
}

function randomSequence(length: number) {
    const sequence: number[] = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        sequence.push(randomNumber);
    }

    return Number(sequence.join(''));
}
