import { lazy, Suspense } from 'react';
import Hero from '../features/hero';
import { SectionLoader } from '../components/ui';

// Lazy-loaded feature sections
const Beginning    = lazy(() => import('../features/beginning'));
const Journey      = lazy(() => import('../features/journey'));
const Projects     = lazy(() => import('../features/projects'));
const Services     = lazy(() => import('../features/services'));
const Expertise    = lazy(() => import('../features/expertise'));
const Contact      = lazy(() => import('../features/contact'));

const HomePage = () => (
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

    {/* Chapters 05 + 06 */}
    <Suspense fallback={<SectionLoader />}>
      <Services />
    </Suspense>

    {/* Chapters 07 + 08 */}
    <Suspense fallback={<SectionLoader />}>
      <Expertise />
    </Suspense>

    {/* Chapter 09 */}
    <Suspense fallback={<SectionLoader />}>
      <Contact />
    </Suspense>
  </>
);

export default HomePage;
