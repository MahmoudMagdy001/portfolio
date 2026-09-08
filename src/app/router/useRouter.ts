// ponytail: hash-based router — no library needed for a single-page portfolio
import { useState, useEffect } from 'react';

export type RouterView = 'home' | 'project-detail';

export interface RouterResult {
  view: RouterView;
  projectSlug: string;
}

/**
 * useRouter
 * Returns { view, projectSlug } derived from window.location.hash.
 * view: 'home' | 'project-detail'
 */
export const useRouter = (): RouterResult => {
  const [view, setView] = useState<RouterView>('home');
  const [projectSlug, setProjectSlug] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        setProjectSlug(hash.replace('#/project/', ''));
        setView('project-detail');
        window.scrollTo(0, 0);
      } else {
        setView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to anchor when returning home
  useEffect(() => {
    if (view === 'home') {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [view]);

  return { view, projectSlug };
};
