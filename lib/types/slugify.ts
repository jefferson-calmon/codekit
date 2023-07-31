import { locales } from "../constants/slugify";

export interface SlugifyOptions {
    replacement?: string;
    remove?: RegExp;
    lowerCase?: boolean;
    strict?: boolean;
    locale?: keyof typeof locales;
    trim?: boolean;
}
