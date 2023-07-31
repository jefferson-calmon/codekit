import { useEffect, useMemo, useState } from 'react';

export function usePersistedState<T>(
    key: string,
    initialState: T,
    revalidator: any,
    type?: 'local' | 'session',
) {
    // Memo vars
    const storage = useMemo(() => {
        if (typeof window === 'undefined') return null;

        return type === 'local' ? localStorage : sessionStorage;
    }, [type]);

    // States
    const [state, setState] = useState<T>(initialState);

    // Effects
    useEffect(() => {
        if (!storage || typeof window === 'undefined') return;

        const storageValue = storage.getItem(key);

        const state = storageValue ? JSON.parse(storageValue) : initialState;

        setState(state);
    }, [revalidator]);

    // Functions
    function updateState(newState: T) {
        storage?.setItem(key, JSON.stringify(newState));
        setState(newState);
    }

    return [state, updateState] as const;
}

export default usePersistedState;
