export function getCSSVarValue(color: string): string {
	return typeof document !== 'undefined'
		? getComputedStyle(document.body).getPropertyValue(color)
		: '';
}
