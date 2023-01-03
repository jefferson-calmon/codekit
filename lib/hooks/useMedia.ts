import { useEffect, useState } from 'react';

export function useMedia<T>(queries: string[], values: T[], defaultValue: T) {
    // Vars
    const mediaQueryLists = queries.map(q => window.matchMedia(q));

    // States
    const [value, setValue] = useState<T>(getValue);

    // Effects
    useEffect(() => {
        const handler = () => setValue(getValue);

        mediaQueryLists.forEach(mql => mql.addListener(handler));

        return () =>
            mediaQueryLists.forEach(mql => mql.removeListener(handler));
    }, []);

    // Functions
    function getValue() {
        const index = mediaQueryLists.findIndex(mql => mql.matches);

        return values?.[index] || defaultValue;
    }

    return value;
}
