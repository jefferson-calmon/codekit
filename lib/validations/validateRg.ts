export function validateRg(rg: string) {
    const regex = /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/;

    const isValid = regex.test(rg);

    return isValid;
}
