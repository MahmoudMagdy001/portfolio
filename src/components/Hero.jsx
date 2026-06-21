import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const roles = ['Flutter Developer.', 'Problem Solver.', 'Architect.', 'Visionary.'];



const roleTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
const scrollIndicatorTransition = { duration: 2, repeat: Infinity };

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Hoisted transforms (C-2 fix: no hooks inside JSX) ---
  const contentY   = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0]      : [0, -80]);
  const scale      = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1]      : [1, 0.9]);
  const opacity    = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollDown = () =>
    document.getElementById('beginning')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-transparent" id="hero">
      <div 
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden', willChange: 'transform' }}
      >
        {/* Main Content Container */}
        <motion.div style={{ opacity, y: contentY, scale, willChange: 'transform, opacity' }} className="container-safe relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="chapter-label mb-16 tracking-[0.6em] text-primary/80 uppercase">Chapter 01 — The Genesis</p>

            <h2 className="text-xl md:text-2xl text-slate-400 font-light mb-6 uppercase tracking-[0.25em]">
              Hi, I'm <span className="text-white font-bold tracking-normal">Mahmoud Magdy</span>
            </h2>

            {/* aria-live so screen readers announce role changes */}
            <div
              className="h-16 sm:h-20 md:h-28 xl:h-40 mb-14 overflow-hidden flex items-center justify-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={roleIndex}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={roleTransition}
                  style={{ willChange: 'transform, opacity' }}
                  className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-bold tracking-tighter whitespace-nowrap"
                >
                  <span className="gradient-text">{roles[roleIndex]}</span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light mb-16 leading-relaxed">
              Crafting high-fidelity mobile experiences with <span className="text-white font-semibold">Dart & Flutter</span>, leveraging Clean Architecture and performance optimization.
            </p>


          </motion.div>
        </motion.div>



        {/* Bottom Scroll Indicator — A-2: role + aria-label + keyboard */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={scrollIndicatorTransition}
          onClick={scrollDown}
          onKeyDown={(e) => e.key === 'Enter' && scrollDown()}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to explore"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
