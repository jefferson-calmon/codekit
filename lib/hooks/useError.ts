/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { firebaseErrors } from '../constants/firebaseErrors';

interface Error {
    id: string;
    message: string;
}

function createErrorFromString(error: string): Error {
    return {
        id: error.slugify(),
        message: error,
    };
}

export function useError(customErrors?: Partial<typeof firebaseErrors>) {
    // States
    const [errors, setErrors] = useState<Error[]>([]);
    const [lastError, setLastError] = useState<Error | undefined>();

    // Memo vars
    const exists = useMemo(() => errors.length > 0, [errors]);

    // Functions
    function clear() {
        setErrors([]);
        setLastError(undefined);
    }

    function add(error: Error | string) {
        setErrors(prev => {
            const errors = Array.from(prev);
            const isString = typeof error === 'string';

            const errorObject = isString ? createErrorFromString(error) : error;
            const index = errors.findIndex(err => err.id === errorObject.id);

            if (index >= 0) errors[index] = errorObject;
            else errors.push(errorObject);

            setLastError(errorObject);
            return errors;
        });
    }

    function get(id: string) {
        return errors.find(error => error.id === id);
    }

    function remove(id: string) {
        setErrors(prev => prev.filter(error => error.id !== id));
    }

    function update(id: string, message: string) {
        setErrors(prev => {
            const errors = Array.from(prev);
            const index = errors.findIndex(error => error.id === id);

            if (index >= 0) errors[index].message = message;
            return errors;
        });
    }

    function catcher(error: unknown) {
        const err = error as Record<string, string>;
        const code = err.code;
        const message = err.message;

        const errorsList = Object.assign(firebaseErrors, customErrors);

        console.log('[+] Error in `useError.catcher`', error);

        if (!code) {
            add({
                id: 'process',
                message: `Houve um erro durante o processo. Error: ${message}.`,
            });
        } else {
            add({
                id: code,
                message: (errorsList as any)[code],
            });
        }
    }

    return {
        exists,
        errors,
        lastError,

        catcher,
        clear,
        add,
        get,
        remove,
        update,
    };
}
