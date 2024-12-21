import { RGB } from '../../../types';

export function rgbToHex([r, g, b]: RGB) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
