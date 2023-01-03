import { useEffect, useState } from 'react';

import { TargetKey } from '../types';

export function useKeyPress(targetKey: TargetKey): boolean {
    // States
    const [keyPressed, setKeyPressed] = useState(false);

    // Effects
    useEffect(() => {
        window.addEventListener('keydown', e => downHandler(e.key));
        window.addEventListener('keyup', e => upHandler(e.key));

        return () => {
            window.removeEventListener('keydown', e => downHandler(e.key));
            window.removeEventListener('keyup', e => upHandler(e.key));
        };
    }, []);

    // Functions
    function downHandler(key: string): void {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    function upHandler(key: string): void {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    }

    return keyPressed;
}
