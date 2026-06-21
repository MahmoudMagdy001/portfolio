import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * useMagneticEffect
 * Returns { ref, x, y } where x & y are Framer MotionValues.
 * Attach ref to the element and spread { x, y } into its style prop.
 * Using MotionValues avoids direct DOM style mutations that conflict
 * with Framer's own transform compositor.
 */
export const useMagneticEffect = (strength = 0.3) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring gives the elastic snap-back on mouse-leave automatically
  const x = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
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
