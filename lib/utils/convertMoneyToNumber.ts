export function convertMoneyToNumber(string: string) {
    return Number(
        String(string)
            .replace(/[^0-9.,]/gi, '')
            .replaceAll('.', '')
            .replace(',', '.'),
    );
}
