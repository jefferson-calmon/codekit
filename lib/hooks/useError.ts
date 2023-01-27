import { useState } from 'react';

import { firebaseErrors } from '../constants/firebaseErrors';

interface Error {
    id: string;
    message: string;
}

export function useError() {
    // States
    const [errors, setErrors] = useState<Error[]>([]);
    const [lastError, setLastError] = useState<Error>();

    // Functions
    function clear() {
        setErrors([]);
        setLastError(undefined);
    }

    function set(error: Error | string) {
        if (typeof error === 'string') {
            setErrors(prev => {
                const errors = prev.slice();

                const newError: Error = {
                    id: error.slugify(),
                    message: error,
                };

                errors.push(newError);

                return errors;
            });

            return;
        }

        setErrors(prev => {
            const errors = prev.slice();

            const index = errors.findIndex(err => err.id === error.id);

            if (index >= 0) errors[index] = error;
            if (index === -1) errors.push(error);

            return errors;
        });
        setLastError(error);
    }

    function remove(id: string) {
        setErrors(prev => {
            const errors = prev.filter(error => error.id !== id);

            return errors;
        });
    }

    function get(id: string) {
        return errors.find(error => error.id === id);
    }

    function catcher(error: unknown) {
        const err = error as Record<string, string>;
        const code = err.code;

        console.log(error);

        if (!code) {
            return set({
                id: 'process',
                message: 'Houve um erro durante o processo',
            });
        }

        set({
            id: code,
            message: firebaseErrors[code],
        });
    }

    return {
        errors,
        lastError,
        catcher,
        clear,
        set,
        remove,
        get,
    };
}
