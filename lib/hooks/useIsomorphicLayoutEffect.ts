import { useEffect, useLayoutEffect } from "react";

const isServerSide = typeof window === 'undefined';
export const useIsomorphicLayoutEffect = isServerSide ? useEffect : useLayoutEffect;
