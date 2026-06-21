import { useState, useEffect } from 'react';

/**
 * Tracks which section is currently centered in the viewport.
 * Uses IntersectionObserver for optimal performance, avoiding expensive scroll event
 * listeners and layout thrashing (getBoundingClientRect).
 */
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    // Track intersection state of each section
    const intersectingMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting);
        });

        // Find the first section that is intersecting the center line
        const active = sectionIds.find(id => intersectingMap.get(id));
        setActiveSection(active || null);
      },
      {
        // 10px vertical band at the center of the viewport
        rootMargin: '-49% 0px -49% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return { activeSection };
};
