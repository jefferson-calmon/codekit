export function getCSSVarValue(variable: string): string {
    return typeof document !== 'undefined'
        ? getComputedStyle(document.body).getPropertyValue(variable)
        : '';
}
