import { useEffect, useState } from 'react';

export type SystemTheme = 'light' | 'dark';

export function useSystemTheme(): SystemTheme {
    //  States
    const [systemTheme, setSystemTheme] = useState<SystemTheme>(() => {
        const prefersDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        return prefersDarkScheme ? 'dark' : 'light';
    });

    // Effects
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleThemeChange = (event: MediaQueryListEvent) => {
            setSystemTheme(event.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleThemeChange);

        return () =>
            mediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

    return systemTheme;
}
