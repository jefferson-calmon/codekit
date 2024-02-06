import { MutableRefObject, useEffect, useState } from 'react';

export function useOnScreen<T extends Element>(
    ref: MutableRefObject<T | null>,
    rootMargin: string = '0px',
): boolean {
    // States
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    // Effects
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin,
            },
        );
        if (ref?.current) observer.observe(ref.current);

        return () => {
            if (ref?.current) observer.unobserve(ref.current);
        };
    }, []);

    return isIntersecting;
}
