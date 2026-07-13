import { useEffect, useState } from 'react';

import { TargetKey } from '../types';

/**
 * Hook to detect if a key is pressed.
 * @param targetKey - The key to detect.
 * @returns Whether the key is pressed.
 */

export function useKey(targetKey: TargetKey, onKeyPress?: (event: KeyboardEvent) => void): boolean {
    // States
    const [keyPressed, setKeyPressed] = useState(false);

    // Effects
    useEffect(() => {
        window.addEventListener('keydown', handler(true));
        window.addEventListener('keyup', handler(false));

        return () => {
            window.removeEventListener('keydown', handler(true));
            window.removeEventListener('keyup', handler(false));
        };
    }, []);

    // Functions
    function handler(state: boolean) {
        return (event: KeyboardEvent) => {
            if (event.key === targetKey) {
                setKeyPressed(state);
                onKeyPress?.(event);
            }
        }
    }

    return keyPressed;
}
