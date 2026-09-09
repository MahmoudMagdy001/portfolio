import { lazy, Suspense, type FC } from 'react';
import Hero from '../features/hero';
import { SectionLoader } from '../components/ui';

// Lazy-loaded feature sections
const Beginning    = lazy(() => import('../features/beginning'));
const Journey      = lazy(() => import('../features/journey'));
const Projects      = lazy(() => import('../features/projects'));
const OtherProjects = lazy(() => import('../features/other-projects'));
const Services      = lazy(() => import('../features/services'));
const Numbers       = lazy(() => import('../features/numbers'));
const Contact       = lazy(() => import('../features/contact'));

const HomePage: FC = () => (
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
      <OtherProjects />
    </Suspense>

    {/* Chapters 05 + 06 */}
    <Suspense fallback={<SectionLoader />}>
      <Services />
    </Suspense>

    {/* Chapter 07 */}
    <Suspense fallback={<SectionLoader />}>
      <Numbers />
    </Suspense>

    {/* Chapter 08 */}
    <Suspense fallback={<SectionLoader />}>
      <Contact />
    </Suspense>
  </>
);

export default HomePage;
