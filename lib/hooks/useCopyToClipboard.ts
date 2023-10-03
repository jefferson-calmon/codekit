import { useState } from 'react';
import { debounce } from '../utils';

type HookReturn = [string | null, (text: string) => Promise<boolean>];

export function useCopyToClipboard(): HookReturn {
    // States
    const [copiedText, setCopiedText] = useState<string | null>(null);

    // Functions
    async function copy(text: string) {
        document?.body?.focus();

        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            debounce(() => setCopiedText(null), 3000);
            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);
            return false;
        }
    }

    return [copiedText, copy];
}
