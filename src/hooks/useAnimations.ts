import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from '../lib/gsap';

export interface MagneticEffectResult<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
}

/**
 * useMagneticEffect
 * Implements high-performance GSAP quickTo magnetic pull on hover for desktop fine pointers.
 * Automatically respects prefers-reduced-motion.
 */
export const useMagneticEffect = <T extends HTMLElement = HTMLElement>(
  strength: number = 0.3
): MagneticEffectResult<T> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      xTo(dx * strength);
      yTo(dy * strength);
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return { ref };
};
