import { useCallback, useReducer } from 'react';

interface Action {
    type: 'UNDO' | 'REDO' | 'SET' | 'RESET';
    newPresent?: any;
    initialPresent?: any;
}

export interface UseHistoryReturn<T = any> {
    state: T;
    set: (newPresent: T) => void;
    undo: () => void;
    redo: () => void;
    reset: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

// Initial state that we pass into useReducer
const initialState = {
    // Array of previous state values updated each time we push a new state
    past: [],
    // Current state value
    present: null,
    // Will contain "future" state values if we undo (so we can redo)
    future: [],
};

// reducer function to handle state changes based on action
const reducer = (state: any, action: Action) => {
    const { past, present, future } = state;

    switch (action.type) {
        case 'UNDO':
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        case 'REDO':
            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        case 'SET':
            const { newPresent } = action;
            if (newPresent === present) {
                return state;
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            };
        case 'RESET':
            const { initialPresent } = action;
            return {
                ...initialState,
                present: initialPresent,
            };
    }
};

// Hook
export function useHistory<T = any>(initialPresent: T): UseHistoryReturn<T> {
    // Hooks
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        present: initialPresent,
    });

    // Vars
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;

    // Callbacks
    const undo = useCallback(() => {
        if (canUndo) {
            dispatch({ type: 'UNDO' });
        }
    }, [canUndo, dispatch]);

    const redo = useCallback(() => {
        if (canRedo) {
            dispatch({ type: 'REDO' });
        }
    }, [canRedo, dispatch]);

    const set = useCallback(
        (newPresent: any) => dispatch({ type: 'SET', newPresent }),
        [dispatch],
    );

    const reset = useCallback(
        () => dispatch({ type: 'RESET', initialPresent }),
        [dispatch],
    );

    return { state: state.present, set, undo, redo, reset, canUndo, canRedo };
}
