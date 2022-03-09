export async function getImageDataURLFromFile(image: File): Promise<string> {
	const reader = new FileReader();

	reader.readAsDataURL(image);

	const imageDataURL = (await new Promise((resolve, reject) => {
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => reject(null);
	})) as string | null;

	if (!imageDataURL) {
		throw new Error('There was an error getting the image data url');
	}

	return imageDataURL;
}
