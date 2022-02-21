export function validateLatLng(LatLng: string) {
    const pattern = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}");
    const isValid =
        pattern.test(LatLng.split(",")[0].replace(/\s+/g, "")) &&
        pattern.test(LatLng.split(",")[1].replace(/\s+/g, ""));

    return isValid;
}

export default validateLatLng;
