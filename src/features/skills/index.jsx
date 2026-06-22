import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue, useReducedMotion, useInView } from 'framer-motion';
import { skillCategories } from './data/skillsData';

const OrbitItem = ({ skill, color, glow, radiusX, radiusY, tilt, speed, phase, isActive, isInView }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const zIndex = useMotionValue(10);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      const angle = phase / 1000;
      const tiltRad = (tilt * Math.PI) / 180;
      const rawX = radiusX * Math.cos(angle);
      const rawY = radiusY * Math.sin(angle);
      x.set(rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad));
      y.set(rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad));
      return;
    }

    let frameId;
    const start = performance.now() + phase;
    const tiltRad = (tilt * Math.PI) / 180;

    const frame = (now) => {
      const t = (now - start) / 1000;
      const angle = t * speed;
      const rawX = radiusX * Math.cos(angle);
      const rawY = radiusY * Math.sin(angle);
      x.set(rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad));
      y.set(rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad));
      scale.set(0.78 + 0.22 * ((Math.sin(angle) + 1) / 2));
      zIndex.set(Math.sin(angle) > 0 ? 30 : 10);
      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, [radiusX, radiusY, tilt, speed, phase, x, y, scale, zIndex, shouldReduceMotion, isInView]);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex flex-col items-center group cursor-pointer"
      style={{ x, y, scale, zIndex }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125"
        style={{
          background: isActive ? `${color}26` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isActive ? `${color}66` : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isActive ? `0 0 18px ${glow}` : 'none',
        }}
      >
        <skill.Icon size={20} style={{ color: isActive ? color : '#475569' }} aria-hidden="true" />
      </div>
      <span className="absolute top-full mt-2 text-[10px] font-mono whitespace-nowrap uppercase tracking-widest text-white/0 group-hover:text-white/60 transition-colors duration-300 pointer-events-none">
        {skill.name}
      </span>
    </motion.div>
  );
};

const OrbitRing = ({ cat, isActive, opacity, scale }) => (
  <motion.div
    style={{ opacity, scale }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
  >
    <svg
      className="absolute"
      width={cat.radiusX * 2 + 20}
      height={cat.radiusY * 2 + 20}
      viewBox={`0 0 ${cat.radiusX * 2 + 20} ${cat.radiusY * 2 + 20}`}
      style={{ transform: `rotate(${cat.tilt}deg)` }}
      aria-hidden="true"
    >
      <ellipse
        cx={cat.radiusX + 10}
        cy={cat.radiusY + 10}
        rx={cat.radiusX}
        ry={cat.radiusY}
        fill="none"
        stroke={isActive ? `${cat.color}55` : 'rgba(255,255,255,0.06)'}
        strokeWidth="1"
        style={{ transition: 'stroke 0.6s ease' }}
      />
    </svg>
  </motion.div>
);

const SkillsDesktop = ({ scrollYProgress }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [scrollActiveCategory, setScrollActiveCategory] = useState('core');
  const currentActive = scrollActiveCategory;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.38)       setScrollActiveCategory('core');
      else if (latest < 0.72)  setScrollActiveCategory('architecture');
      else                     setScrollActiveCategory('integration');
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacityTitle = useTransform(scrollYProgress, [0, 0.15],  [1, 1]);
  const yTitle       = useTransform(scrollYProgress, [0, 0.15],  [0, 0]);

  const opacityCore  = useTransform(scrollYProgress, [0, 0.25], [1, 1]);
  const scaleCore    = useTransform(scrollYProgress, [0, 0.25], [1, 1]);

  const opacityArch  = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);
  const scaleArch    = useTransform(scrollYProgress, [0.25, 0.38], [0.8, 1]);

  const opacityInteg = useTransform(scrollYProgress, [0.58, 0.72], [0, 1]);
  const scaleInteg   = useTransform(scrollYProgress, [0.58, 0.72], [0.8, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);

  const activeCategoryData = skillCategories.find(c => c.id === currentActive) || skillCategories[0];
  const activeColor = activeCategoryData.color;
  const activeGlow  = activeCategoryData.glow;

  const ringMotion = {
    core:         { opacity: opacityCore,  scale: scaleCore  },
    architecture: { opacity: opacityArch,  scale: scaleArch  },
    integration:  { opacity: opacityInteg, scale: scaleInteg },
  };

  return (
    <>
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />

      <motion.div ref={containerRef} style={{ opacity: contentOpacity }} className="container-safe relative z-10 flex flex-col items-center justify-center h-full py-4">
        <motion.div style={{ opacity: opacityTitle, y: yTitle }} className="text-center mb-8 max-w-2xl">
          <p className="chapter-label mb-1.5">Chapter 08 — The Expertise Ecosystem</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            A universe of <span className="gradient-text">mastered</span> tools.
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
            Scroll to expand orbit layers, or hover directly to explore components.
          </p>
        </motion.div>

        <div
          className="relative w-full h-[340px] flex items-center justify-center scale-90 sm:scale-100 md:scale-110"
          style={{ perspective: '1200px' }}
          role="img"
          aria-label="3D orbit visualization of skill categories"
        >
          <motion.div
            className="relative z-20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-700 cursor-default relative z-10"
              animate={{
                borderColor: `${activeColor}66`,
                boxShadow: `0 0 40px ${activeGlow}, inset 0 0 18px ${activeColor}22`,
                background: `radial-gradient(circle, ${activeColor}22 0%, rgba(15,23,42,0.95) 80%)`,
                scale: [1, 1.04, 1],
              }}
              transition={{
                borderColor: { duration: 0.7 },
                boxShadow:   { duration: 0.7 },
                background:  { duration: 0.7 },
                scale:       { duration: 0.5, ease: 'easeOut' },
              }}
              style={{ backdropFilter: 'blur(2px)' }}
            >
              <div className="text-center flex flex-col items-center justify-center px-2">
                <motion.span
                  className="text-[7px] font-mono uppercase tracking-[0.25em] mb-1"
                  animate={{ color: activeColor }}
                  transition={{ duration: 0.7 }}
                >
                  Category
                </motion.span>
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeCategoryData.id}
                      initial={{ opacity: 0, y: 6,  filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                      exit={{   opacity: 0, y: -6, filter: 'blur(3px)' }}
                      transition={{ duration: 0.35 }}
                      className="text-[10px] font-bold text-white uppercase tracking-wider text-center leading-tight block max-w-[80px]"
                    >
                      {activeCategoryData.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              key={`pulse-${activeCategoryData.id}`}
              className="absolute inset-0 rounded-full border pointer-events-none"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{
                borderColor: `${activeColor}55`,
                scale:   [1, 1.6, 1],
                opacity: [0.9, 0, 0.9],
              }}
              transition={{
                scale:       { duration: 3, repeat: Infinity, ease: 'easeOut' },
                opacity:     { duration: 3, repeat: Infinity, ease: 'easeOut' },
                borderColor: { duration: 0.5 },
              }}
            />
          </motion.div>

          {[...skillCategories].reverse().map((cat) => {
            const { opacity: orbitOpacity, scale: orbitScale } = ringMotion[cat.id];
            const isCatActive = currentActive === cat.id;

            return (
              <div key={cat.id} className="absolute inset-0 flex items-center justify-center">
                <OrbitRing cat={cat} isActive={isCatActive} opacity={orbitOpacity} scale={orbitScale} />
                {cat.skills.map((skill, skillIdx) => (
                  <OrbitItem
                    key={skill.name}
                    skill={skill}
                    color={cat.color}
                    glow={cat.glow}
                    radiusX={cat.radiusX}
                    radiusY={cat.radiusY}
                    tilt={cat.tilt}
                    speed={cat.speed}
                    phase={(skillIdx / cat.skills.length) * (2 * Math.PI / Math.abs(cat.speed)) * 1000}
                    isActive={isCatActive}
                    isInView={isInView}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

const SkillsMobile = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <p className="chapter-label mb-2">Chapter 08 — The Expertise Ecosystem</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            A universe of <span className="gradient-text">mastered</span> tools.
          </h2>
        </div>

        <div className="space-y-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-[22px] p-6 border border-white/5 relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 transition-all duration-700 blur-2xl"
                style={{ background: cat.color }}
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold tracking-wide"
                    style={{
                      background: `${cat.color}08`,
                      borderColor: `${cat.color}20`,
                      boxShadow: `0 0 12px ${cat.color}03`,
                    }}
                  >
                    <skill.Icon size={16} style={{ color: cat.color }} aria-hidden="true" />
                    <span className="text-slate-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = ({ scrollYProgress }) => {
  if (scrollYProgress) {
    return <SkillsDesktop scrollYProgress={scrollYProgress} />;
  }
  return <SkillsMobile />;
};

export default Skills;
