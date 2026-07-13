import { useEffect, useRef } from 'react';

type Event = keyof WindowEventMap;
type Ref<T> = (Window & typeof globalThis) | Document | T;
type Handler<K extends Event> = (this: Window, ev: WindowEventMap[K]) => any;

export function useEventListener<K extends Event, T extends Element>(
	eventName: K,
	handler: Handler<K>,
	target?: Ref<T>
) {
	// Refs
	const savedHandler = useRef<any>();

	// Effects
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const root = target ?? window;

		const isSupported = root && root.addEventListener;
		if (!isSupported) return;

		const eventListener = (event: any) => savedHandler.current(event);

		root.addEventListener(eventName, eventListener);

		return () => {
			root.removeEventListener(eventName, eventListener);
		};
	}, [eventName, target]);
}
