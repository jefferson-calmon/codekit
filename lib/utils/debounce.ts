export function debounce<T extends (...args: any[]) => void>(
	func: T,
	timeout: number = 1000,
): { (...args: Parameters<T>): void; cancel: () => void } {
	let timeoutId: NodeJS.Timeout | undefined;

	const debounced = function (this: any, ...args: Parameters<T>) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func.apply(this, args), timeout);
	};

	debounced.cancel = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
	};

	return debounced;
}
