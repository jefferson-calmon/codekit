import { slugify, SlugifyOptions } from '../text';

export function formatSlug(value: string, options?: SlugifyOptions) {
    return slugify(value, options);
}
