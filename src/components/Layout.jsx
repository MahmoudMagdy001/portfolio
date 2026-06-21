import React, { useEffect } from 'react';
import Lenis from 'lenis';

const Layout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // cancel loop BEFORE destroy
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      {children}
    </main>
  );
};

export default Layout;
