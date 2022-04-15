interface retryIfTimeoutOptions {
	maxRetries: number;
	delayBetweenRetries: number;
    onRetry?: (error: any, retries: number) => void;
}

export function retryIfFail<T>(
	fn: () => Promise<T>,
	options: Partial<retryIfTimeoutOptions>
): Promise<T> {
	const maxRetries = options.maxRetries || 3;
	const timeout = options.delayBetweenRetries || 1000;

	return new Promise((resolve, reject) => {
		let retries = 0;

		const retry = () => {
			fn()
				.then(resolve)
				.catch((err) => {
					if (retries < maxRetries) {
						retries++;

                        options.onRetry && options.onRetry(err, retries);

						setTimeout(retry, timeout);
					} else {
						reject(err);
					}
				});
		};

		retry();
	});
}
