import { RGB } from '../../../types';
import { getLuminance } from './getLuminance';
import { hexToRgb } from './hexToRgb';
import { rgbToHex } from './rgbToHex';

export interface HighlighOptions {
    darkIncrement?: number;
    lightIncrement?: number;
}

function adjustRgb(
    [red, green, blue]: RGB,
    amount: number,
    darken: boolean,
): RGB {
    const factor = darken ? -amount : amount;

    const adjust = (c: number) => Math.min(255, Math.max(0, c + c * factor));

    return [adjust(red), adjust(green), adjust(blue)];
}

export function highlight(
    color: string,
    amount: number,
    options: HighlighOptions = {},
): string {
    const rgb = hexToRgb(color);
    const luminance = getLuminance(rgb);
    const isLight = luminance > 0.5;

    const increment = isLight
        ? options.lightIncrement ?? 0
        : options.darkIncrement ?? 0;

    const adjustedAmount = amount + amount * (increment / 100);
    const adjustedRgb = adjustRgb(rgb, adjustedAmount, !isLight);

    return rgbToHex(adjustedRgb);
}
