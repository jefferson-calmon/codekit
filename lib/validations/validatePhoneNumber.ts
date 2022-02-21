export function validatePhoneNumber(phone: string) {
    const regex = /(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/;

    const isValid = regex.test(phone);

    return isValid;
}
