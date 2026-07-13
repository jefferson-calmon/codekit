export function isRg(value: string) {
    const regex = /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/;

    return regex.test(value);
}
