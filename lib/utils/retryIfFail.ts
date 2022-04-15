interface retryIfTimeoutOptions {
	maxRetries: number;
	delayBetweenRetries: number;
    onFail?: () => void;
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

						console.log(
							`[-] Request failed. Trying again... #${retries}`
						);

						setTimeout(retry, timeout);

                        options.onFail && options.onFail();
					} else {
						reject(err);
					}
				});
		};

		retry();
	});
}
