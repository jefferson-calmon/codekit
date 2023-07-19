import { useEffect, useRef } from 'react';

type Event = keyof WindowEventMap;
type Ref<T> = (Window & typeof globalThis) | Document | T;
type Handler<K extends Event> = (this: Window, ev: WindowEventMap[K]) => any;

export function useEventListener<K extends Event, T extends Element>(
    eventName: K,
    handler: Handler<K>,
    element: Ref<T> = window,
) {
    // Refs
    const savedHandler = useRef<any>();

    // Effects
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            const eventListener = (event: any) => savedHandler.current(event);

            if (!element || typeof element === 'undefined') return;

            element.addEventListener(eventName, eventListener);

            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element], // Re-run if eventName or element changes
    );
}
