export function toNumber(value: string) {
    return Number(
        String(value)
            .replace(/[^0-9.,]/gi, '')
            .replaceAll('.', '')
            .replace(',', '.'),
    );
}
