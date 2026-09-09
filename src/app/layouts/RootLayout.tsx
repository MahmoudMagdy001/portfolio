import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export interface RootLayoutProps {
  children?: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      {children}
    </main>
  );
};

export default RootLayout;
