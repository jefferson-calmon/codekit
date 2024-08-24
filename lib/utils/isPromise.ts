export function isPromise(p: any) {
	if (
		p !== null &&
		typeof p === 'object' &&
		typeof p.then === 'function' &&
		typeof p.catch === 'function'
	) {
		return true;
	}

	return false;
}
