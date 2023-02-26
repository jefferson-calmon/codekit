export type PropsWithoutText = [
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
];

export function measureText(
    text: string,
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    const biggerText = text
        .split('\n')
        .reduce(
            (biggerText, current) =>
                biggerText.length > current.length ? biggerText : current,
            '',
        );

    context.font = font;

    const width = context.measureText(biggerText).width + 2;

    return width;
}
