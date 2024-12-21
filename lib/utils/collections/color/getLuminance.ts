export function getLuminance([r, g, b]: [number, number, number]): number {
    const normalize = (c: number) =>
        c / 255 <= 0.03928
            ? c / (255 * 12.92)
            : Math.pow((c / 255 + 0.055) / 1.055, 2.4);

    return (
        0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b)
    );
}
