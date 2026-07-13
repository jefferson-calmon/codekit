export interface GenerateUIAvatarOptions {
	/** Avatar image size in pixels. Between: 16 and 512. Default: 64 */
	size?: number;

	/** Font size in percentage of size. Between 0.1 and 1. Default: 0.5 */
	'font-size'?: number;

	/** Length of the generated initials. Default: 2 */
	length?: number;

	/** Boolean specifying if the returned image should be a circle. Default: false */
	rounded?: boolean;

	/** Boolean specifying if the returned letters should use a bold font. Default: false */
	bold?: boolean;

	/** Hex color for the image background, without the hash (#). Default: f0e9e9 */
	background?: string | 'random';

	/** Hex color for the font, without the hash (#). Default: 8b5d5d */
	color?: string;

	/** Decide if the API should uppercase the name/initials. Default: true */
	uppercase?: boolean;

	/** Decide if the API should return SVG or PNG. Default: svg if the Accept header includes image/svg+xml, png otherwise */
	format?: 'svg' | 'png';
}

export function generateUIAvatarURL(name: string, options: GenerateUIAvatarOptions) {
	const params = new URLSearchParams();
	const entries = Object.entries(options);
	const baseURL = 'https://ui-avatars.com/api?';

	params.set('name', name);

	entries.forEach(([key, value]) => params.set(key, value));

	return baseURL + params.toString();
}
