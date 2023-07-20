export function indexify<T>(data: T[], key: keyof T) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const object: any = {};

	data.map((item) => {
		const index = item[key];

		object[index] = item;
	});

	return object as Record<string, T>;
}
