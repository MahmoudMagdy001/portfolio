import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { stiffness: 700, damping: 40 };
  const ringSpringConfig = { stiffness: 150, damping: 25 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const ringSmoothX = useSpring(ringX, ringSpringConfig);
  const ringSmoothY = useSpring(ringY, ringSpringConfig);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
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

    window.addEventListener('mousemove', moveCursor);

    const interactables = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

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
