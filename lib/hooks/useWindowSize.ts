import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { delay } from '../utils';

export interface WindowSize {
    width: number;
    height: number;
}

export interface UseWindowSizeData extends WindowSize {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export function useWindowSize(): UseWindowSizeData {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    useIsomorphicLayoutEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.screen.availWidth,
                height: window.screen.availHeight,
            });
        }

        handleResize();
        delay(0.5).then(handleResize);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        ...windowSize,
        isMobile: !windowSize.width ? false : windowSize.width < 768,
        isTablet: !windowSize.width ? false : windowSize.width <= 1024,
        isDesktop: !windowSize.width ? false : windowSize.width > 1024,
    };
}
