import { useEffect, useState, useCallback, useMemo } from 'react';

import { createPortal } from 'react-dom';

export interface MountedPortalProps {
	children: Parameters<typeof createPortal>['0'];
	container: HTMLElement;
}

export type PortalProps = Pick<MountedPortalProps, 'children'>;
export type PortalContainer = HTMLElement | (() => HTMLElement | null) | null;

export function usePortal(container: PortalContainer, waitMount = true) {
	// Common vars
	const containerElement =
		typeof container === 'function' ? container() : container;

	// Memo vars
	const rootElement = useMemo(() => {
		const isBrowser = typeof document !== 'undefined';

		return isBrowser ? containerElement || document.body : null;
	}, [containerElement]);

	// Callbacks
	const Portal = useCallback(
		(props: PortalProps) => {
			if (!rootElement) return null;

			return createPortal(props.children, rootElement);
		},
		[rootElement]
	);

	const WaitMountPortal = useCallback(
		(props: PortalProps) => {
			if (!rootElement) return null;

			return <MountedPortal container={rootElement} {...props} />;
		},
		[rootElement]
	);

	return {
		target: rootElement,
		Portal: waitMount ? WaitMountPortal : Portal,
	};
}

function MountedPortal(props: MountedPortalProps) {
    // States
	const [mounted, setMounted] = useState(false);

    // Effects
	useEffect(() => setMounted(true), []);

	if (props.container && mounted) {
		return createPortal(props.children, props.container);
	}

	return null;
}
