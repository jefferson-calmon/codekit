import { RGB } from '../../../types';

export function hexToRgb(color: string): RGB {
    const hex = color.startsWith('#') ? color.slice(1) : color;

    if (hex.length !== 6)
        throw new Error(`Invalid color format: Received ${hex}`);

    const bigint = parseInt(hex, 16);

    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
