import { useState, useEffect } from 'react';

/**
 * useIsDesktop
 * Returns a boolean indicating if the screen width is >= 1024px.
 * Uses window.matchMedia for optimal performance, avoiding expensive resize event listeners.
 */
export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check if window is defined (for SSR safety, though this is a SPA)
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(min-width: 1024px)');
    
    // Set initial value
    setIsDesktop(media.matches);

    const listener = (e) => {
      setIsDesktop(e.matches);
    };

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, []);

  return isDesktop;
};
