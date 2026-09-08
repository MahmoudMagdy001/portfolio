import { useEffect, useRef, type FC } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: FC = () => {
  const cursorX = useMotionValue<number>(-100);
  const cursorY = useMotionValue<number>(-100);
  const ringX = useMotionValue<number>(-100);
  const ringY = useMotionValue<number>(-100);

  const springConfig = { stiffness: 700, damping: 40 };
  const ringSpringConfig = { stiffness: 150, damping: 25 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const ringSmoothX = useSpring(ringX, ringSpringConfig);
  const ringSmoothY = useSpring(ringY, ringSpringConfig);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only initialize custom cursor on devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const handleHover = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(2.5)';
      if (ringRef.current) {
        ringRef.current.style.width = '60px';
        ringRef.current.style.height = '60px';
        ringRef.current.style.borderColor = 'rgba(99,102,241,0.8)';
      }
    };

    const handleUnhover = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(1)';
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(99,102,241,0.5)';
      }
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

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="custom-cursor"
        style={{ x: smoothX, y: smoothY, transition: 'transform 0.2s ease' }}
      />
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ x: ringSmoothX, y: ringSmoothY }}
      />
    </>
  );
};

export default CustomCursor;
