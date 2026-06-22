import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useIsDesktop } from '../../hooks';
import { storyParagraphs } from './data/beginningData';

const BeginningMobile = () => {
  return (
    <section id="beginning" className="relative bg-transparent py-20 px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-5" />
      </div>
      <div className="container mx-auto max-w-3xl relative z-10">
        <p className="chapter-label text-center mb-12">
          Chapter 02 — The Prologue
        </p>
        <div className="space-y-16">
          {storyParagraphs.map((para) => (
            <motion.div
              key={para.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {para.text}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeginningDesktop = () => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Chapter label fade ---
  const labelOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // --- Background parallax ---
  const bgScale   = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  // --- Paragraph 0 (i=0, range 0.00 → 0.25) ---
  const p0Opacity = useTransform(scrollYProgress, [0,    0.20, 0.25], [1, 1, 0]);
  const p0Y       = useTransform(scrollYProgress, [0,    0.25], shouldReduceMotion ? [0, 0] : [0, -40]);
  const p0Scale   = useTransform(scrollYProgress, [0,    0.25], shouldReduceMotion ? [1, 1] : [1, 1.05]);

  // --- Paragraph 1 (i=1, range 0.25 → 0.50) ---
  const p1Opacity = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0]);
  const p1Y       = useTransform(scrollYProgress, [0.25, 0.50], shouldReduceMotion ? [0, 0] : [40, -40]);
  const p1Scale   = useTransform(scrollYProgress, [0.25, 0.50], shouldReduceMotion ? [1, 1] : [0.95, 1.05]);

  // --- Paragraph 2 (i=2, range 0.50 → 0.75) ---
  const p2Opacity = useTransform(scrollYProgress, [0.50, 0.55, 0.70, 0.75], [0, 1, 1, 0]);
  const p2Y       = useTransform(scrollYProgress, [0.50, 0.75], shouldReduceMotion ? [0, 0] : [40, -40]);
  const p2Scale   = useTransform(scrollYProgress, [0.50, 0.75], shouldReduceMotion ? [1, 1] : [0.95, 1.05]);

  // --- Paragraph 3 (i=3, range 0.75 → 1.00) ---
  const p3Opacity = useTransform(scrollYProgress, [0.75, 0.80, 0.95, 1.00], [0, 1, 1, 0]);
  const p3Y       = useTransform(scrollYProgress, [0.75, 1.00], shouldReduceMotion ? [0, 0] : [40, -40]);
  const p3Scale   = useTransform(scrollYProgress, [0.75, 1.00], shouldReduceMotion ? [1, 1] : [0.95, 1.05]);

  const paragraphMotion = [
    { opacity: p0Opacity, y: p0Y, scale: p0Scale },
    { opacity: p1Opacity, y: p1Y, scale: p1Scale },
    { opacity: p2Opacity, y: p2Y, scale: p2Scale },
    { opacity: p3Opacity, y: p3Y, scale: p3Scale },
  ];

  return (
    <section ref={containerRef} id="beginning" className="relative h-[400vh] bg-transparent">
      <div 
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden', willChange: 'transform' }}
      >
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            style={{ scale: bgScale, opacity: bgOpacity, willChange: 'transform' }}
            className="w-full h-full"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[160px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[200px]" />
          </motion.div>
          <div className="absolute inset-0 grid-pattern opacity-10" />
        </div>

        <div className="container-safe relative z-10">
          <motion.p
            style={{ opacity: labelOpacity }}
            className="chapter-label text-center mb-12"
          >
            Chapter 02 — The Prologue
          </motion.p>

          <div className="relative h-[50vh] flex items-center justify-center">
            {storyParagraphs.map((para, i) => (
              <motion.div
                key={para.id}
                style={{ ...paragraphMotion[i], willChange: 'transform, opacity' }}
                className="absolute inset-x-0 text-center px-4"
              >
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {para.text}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Beginning = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <BeginningDesktop /> : <BeginningMobile />;
};

export default Beginning;
