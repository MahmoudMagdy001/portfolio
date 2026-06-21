import { useState, useEffect, useCallback } from 'react';

/**
 * Tracks which section is currently centered in the viewport.
 * Returns null when no section is centered (e.g. while viewing the Hero),
 * so the navbar doesn't highlight any link unnecessarily.
 */
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(null);

  const handleScroll = useCallback(() => {
    const centerOfViewport = window.innerHeight / 2;
    let matched = null;

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= centerOfViewport && rect.bottom >= centerOfViewport) {
          matched = id;
          break;
        }
      }
    }

    setActiveSection(matched);
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { activeSection };
};
