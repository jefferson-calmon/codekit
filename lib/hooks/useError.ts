/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { errors as errorsList } from '../constants/errors';

export interface ErrorObject {
    id: string;
    message: string;
}

function createErrorFromString(error: string): ErrorObject {
    return {
        id: error.slugify(),
        message: error,
    };
}

export function useError(customErrors?: Partial<typeof errorsList>) {
    // States
    const [errors, setErrors] = useState<ErrorObject[]>([]);
    const [lastError, setLastError] = useState<ErrorObject | undefined>();

    // Memo vars
    const exists = useMemo(() => errors.length > 0, [errors]);

    // Functions
    function clear() {
        setErrors([]);
        setLastError(undefined);
    }

    function add(error: ErrorObject | string) {
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

            if (index >= 0 && errors[index]) errors[index].message = message;
            return errors;
        });
    }

    function catcher(error: any) {
        const err = (error.errors ? error.errors[0] : error) as any;
        const code = err.code;
        const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message;

        const errors = Object.assign(errorsList, customErrors);
        const isControlled = !!errors[code];

        console.error('[+] Error in useError.catcher', error);

        add({
            id: isControlled ? code : 'process',
            message: isControlled ? errors[code] : message,
        });
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
