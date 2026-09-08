import { useState, useEffect } from 'react';

export interface UseActiveSectionResult {
  activeSection: string | null;
}

/**
 * Tracks which section is currently centered in the viewport.
 * Uses IntersectionObserver for optimal performance, avoiding expensive scroll event
 * listeners and layout thrashing (getBoundingClientRect).
 */
export const useActiveSection = (sectionIds: readonly string[]): UseActiveSectionResult => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track intersection state of each section
    const intersectingMap = new Map<string, boolean>();
    const observedIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting);
        });

        // Find the first section that is intersecting the center line
        const active = sectionIds.find((id) => intersectingMap.get(id));
        setActiveSection(active || null);
      },
      {
        // 10px vertical band at the center of the viewport
        rootMargin: '-49% 0px -49% 0px',
        threshold: 0,
      }
    );

    const observeElement = (id: string) => {
      if (observedIds.has(id)) return;
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observedIds.add(id);
      }
    };

    // Observe whatever is already in the DOM
    sectionIds.forEach(observeElement);

    // If some lazy sections are still suspended, watch DOM until all are observed
    let mutationObserver: MutationObserver | null = null;
    if (observedIds.size < sectionIds.length) {
      mutationObserver = new MutationObserver(() => {
        sectionIds.forEach(observeElement);
        if (observedIds.size === sectionIds.length && mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [sectionIds]);

  return { activeSection };
};
