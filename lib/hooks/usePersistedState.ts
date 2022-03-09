import { useEffect, useMemo, useState } from 'react';

type Response<T> = [T, React.Dispatch<React.SetStateAction<T>>];

interface usePersistedStateProps<T> {
	key: string;
	initialState: T;
	storage?: 'local' | 'session';
}

export function usePersistedState<T>({
	key,
	initialState,
	storage: storageType = 'local',
}: usePersistedStateProps<T>): Response<T> {
	const storage = useMemo(() => {
        if (typeof window === 'undefined') return null;

		return storageType === 'local' ? localStorage : sessionStorage;
	}, [storageType]);

	// States
	const [state, setState] = useState<T>(() => {
        if (!storage) return initialState;

		const storageValue = storage.getItem(key);

		return storageValue ? JSON.parse(storageValue) : initialState;
	});

	// Effects
	useEffect(() => {
		storage && storage.setItem(key, JSON.stringify(state));
	}, [key, state, storage]);

	return [state, setState];
}

export default usePersistedState;
