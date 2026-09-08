import { useEffect, useRef, type RefObject } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

export interface MagneticEffectResult<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * useMagneticEffect
 * Returns { ref, x, y } where x & y are Framer MotionValues.
 * Attach ref to the element and spread { x, y } into its style prop.
 * Using MotionValues avoids direct DOM style mutations that conflict
 * with Framer's own transform compositor.
 */
export const useMagneticEffect = <T extends HTMLElement = HTMLElement>(
  strength: number = 0.3
): MagneticEffectResult<T> => {
  const ref = useRef<T | null>(null);
  const rawX = useMotionValue<number>(0);
  const rawY = useMotionValue<number>(0);

  // Spring gives the elastic snap-back on mouse-leave automatically
  const x = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    };

    const onMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength, rawX, rawY]);

  return { ref, x, y };
};
