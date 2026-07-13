import { extractNumbers, mask } from "../text";

export function formatPhone(value: string) {
	value = extractNumbers(value);
	const digits = value.length;

	if (digits === 8) return mask(value, '####-####');
	if (digits === 9) return mask(value, '#####-####');
	if (digits === 10) return mask(value, '(##) ####-####');
	if (digits === 11) return mask(value, '(##) #####-####');
	if (digits === 12) return mask(value, '+## (##) ####-####');
	if (digits === 13) return mask(value, '+## (##) #####-####');

	return value;
}
