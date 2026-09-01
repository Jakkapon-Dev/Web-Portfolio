import { useSyncExternalStore, useCallback } from 'react';

// Tracks a CSS media query live using useSyncExternalStore. Used to gate mounting
// (not just hiding) of heavy lg-only decorations — e.g. the Three.js scenes — so
// phones and tablets never even fetch that JS chunk.
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      if (mql.addEventListener) mql.addEventListener('change', onStoreChange);
      else mql.addListener(onStoreChange);
      return () => {
        if (mql.removeEventListener) mql.removeEventListener('change', onStoreChange);
        else mql.removeListener(onStoreChange);
      };
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
