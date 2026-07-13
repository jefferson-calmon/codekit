import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface UseBooleanReturn {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
}

export function useBoolean(defaultValue?: boolean): UseBooleanReturn {
    // States
    const [value, setValue] = useState(!!defaultValue);

    // Callbacks
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue(x => !x), []);

    return { value, setValue, setTrue, setFalse, toggle };
}
