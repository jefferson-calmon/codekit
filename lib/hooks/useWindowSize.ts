import { useEffect, useState } from 'react';

interface WindowSize {
	width: number | undefined;
	height: number | undefined;
}

interface useWindowSizeData extends WindowSize {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

export function useWindowSize(): useWindowSizeData {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		...windowSize,
		isMobile: !windowSize.width ? false : windowSize.width < 768,
		isTablet: !windowSize.width ? false : windowSize.width < 992,
		isDesktop: !windowSize.width ? false : windowSize.width > 992,
	};
}
