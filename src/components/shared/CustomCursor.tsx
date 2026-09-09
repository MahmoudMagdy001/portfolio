import { useEffect, useRef, type FC } from 'react';
import { gsap } from '../../lib/gsap';

const CustomCursor: FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only initialize custom cursor on devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Center offset adjustments (-6 for dot, -20 for ring based on initial CSS dims)
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power2.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power2.out' });

    let isVisible = false;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      dotXTo(e.clientX - 6);
      dotYTo(e.clientY - 6);
      ringXTo(e.clientX - 20);
      ringYTo(e.clientY - 20);
    };

    const handleHover = () => {
      gsap.to(dot, { scale: 2.5, duration: 0.2, ease: 'power2.out' });
      gsap.to(ring, {
        width: 60,
        height: 60,
        borderColor: 'rgba(99,102,241,0.8)',
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleUnhover = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' });
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: 'rgba(99,102,241,0.5)',
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [data-cursor="pointer"]')) {
        handleHover();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [data-cursor="pointer"]')) {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related?.closest('a, button, [data-cursor="pointer"]')) {
          handleUnhover();
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    // Initially hide until first mouse movement
    gsap.set([dot, ring], { opacity: 0 });

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed z-[9999]"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed z-[9998]"
        style={{ willChange: 'transform, width, height' }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
