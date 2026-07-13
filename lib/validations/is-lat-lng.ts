export function isLatLng(value: string) {
    const pattern = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');

    return (
        pattern.test(value.split(',')[0].replace(/\s+/g, '')) &&
        pattern.test(value.split(',')[1].replace(/\s+/g, ''))
    );
}
