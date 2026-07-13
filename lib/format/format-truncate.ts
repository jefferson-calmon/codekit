export interface FormatTruncateOptions {
    ellipsis?: string;
    wordBoundary?: boolean;
}

export function formatTruncate(
    value: string,
    maxLength: number,
    options?: FormatTruncateOptions,
) {
    const { ellipsis = '…', wordBoundary = true } = options || {};

    const text = value.trim();
    if (text.length <= maxLength) return text;

    const sliced = text.slice(0, Math.max(maxLength - ellipsis.length, 0));
    const lastSpace = sliced.lastIndexOf(' ');
    const cut = wordBoundary && lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;

    return `${cut.trimEnd()}${ellipsis}`;
}
