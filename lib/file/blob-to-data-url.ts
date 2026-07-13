export function blobToDataURL(blob: Blob): Promise<string> {
    const reader = new FileReader();

    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = () => reject(null);
    });
}
