import { lazy, Suspense } from 'react';
import { Navbar } from './components/shared';
import { RootLayout } from './app/layouts';
import { useRouter } from './app/router';
import { SectionLoader } from './components/ui';
import HomePage from './pages/HomePage';

const GlobalBackground = lazy(() => import('./components/GlobalBackground'));
const ProjectDetail    = lazy(() => import('./components/ProjectDetail'));

function App() {
  const { view, projectSlug } = useRouter();

  return (
    <>
      <Navbar />
      <RootLayout>
        <Suspense fallback={null}>
          <GlobalBackground />
        </Suspense>

        {view === 'project-detail' ? (
          <Suspense fallback={<SectionLoader />}>
            <ProjectDetail slug={projectSlug} />
          </Suspense>
        ) : (
          <HomePage />
        )}
      </RootLayout>
    </>
  );
}

export default App;
