const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specialCharacters = '@:;#&-?/%+*';

export interface RandomStringOptions {
    useNumbers?: boolean;
    useSpecialCharacters?: boolean;
}

export function randomString(length: number, options?: RandomStringOptions) {
    var result = '';
    const characters = getCharacters(options);

    while (length > 0) {
        const index = Math.floor(Math.random() * characters.length);

        result += characters[index];

        length--;
    }

    return result;
}

function getCharacters(options: RandomStringOptions | undefined) {
    let characters = '';

    characters += letters.toLowerCase();
    characters += letters.toUpperCase();

    if (options?.useNumbers) characters += numbers;
    if (options?.useSpecialCharacters) characters += specialCharacters;

    return characters;
}
