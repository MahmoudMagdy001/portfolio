import React, { lazy, Suspense, useState, useEffect } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GlobalBackground from './components/GlobalBackground';

// Lazy-loaded components
const Beginning = lazy(() => import('./components/Beginning'));
const Services  = lazy(() => import('./components/Services'));
const Journey   = lazy(() => import('./components/Journey'));
const Projects  = lazy(() => import('./components/Projects'));
const Expertise = lazy(() => import('./components/Expertise'));
const Contact   = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary rounded-full border-t-transparent animate-spin" role="status" aria-label="Loading section" />
  </div>
);

function App() {
  const [view, setView] = useState('home');
  const [projectSlug, setProjectSlug] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const slug = hash.replace('#/project/', '');
        setProjectSlug(slug);
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

  // Handle scrolling when returning to home page from the detail page
  useEffect(() => {
    if (view === 'home') {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, [view]);

  return (
    <>
      <Navbar />
      <Layout>
        <GlobalBackground />
        
        {view === 'project-detail' ? (
          <Suspense fallback={<SectionLoader />}>
            <ProjectDetail slug={projectSlug} />
          </Suspense>
        ) : (
          <>
            {/* Chapter 01 */}
            <Hero />
            
            {/* Chapter 02 */}
            <Suspense fallback={<SectionLoader />}>
              <Beginning />
            </Suspense>
            
            {/* Chapter 03 */}
            <Suspense fallback={<SectionLoader />}>
              <Journey />
            </Suspense>
            
            {/* Chapter 04 */}
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
            
            {/* Chapter 05 */}
            <Suspense fallback={<SectionLoader />}>
              <Services />
            </Suspense>
            
            {/* Chapters 07, 08 Combined */}
            <Suspense fallback={<SectionLoader />}>
              <Expertise />
            </Suspense>
            
            {/* Chapter 09 */}
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </>
        )}
      </Layout>
    </>
  );
}

export default App;
