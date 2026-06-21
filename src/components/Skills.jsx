import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion';
import { SiFlutter, SiDart, SiFirebase, SiGithub } from 'react-icons/si';
import { Layers, Cpu, Box, Code, Brain, Bell, MapPin, Send } from 'lucide-react';

const skillCategories = [
  {
    id: 'core',
    label: 'Core Stack',
    color: '#7F77DD',
    glow: 'rgba(127,119,221,0.5)',
    radiusX: 290,
    radiusY: 74,
    tilt: 0,
    speed: 0.35,
    skills: [
      { name: 'Flutter',  Icon: SiFlutter },
      { name: 'Dart',     Icon: SiDart },
      { name: 'Firebase', Icon: SiFirebase },
      { name: 'Hive DB',  Icon: Box },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    color: '#5DCAA5',
    glow: 'rgba(93,202,165,0.5)',
    radiusX: 210,
    radiusY: 52,
    tilt: 8,
    speed: -0.45,
    skills: [
      { name: 'BLoC Pattern', Icon: Cpu },
      { name: 'Clean Arch.',  Icon: Layers },
      { name: 'FCM Push',     Icon: Send },
      { name: 'AI Tools',     Icon: Brain },
    ],
  },
  {
    id: 'integration',
    label: 'Integration',
    color: '#F0997B',
    glow: 'rgba(240,153,123,0.5)',
    radiusX: 130,
    radiusY: 32,
    tilt: -6,
    speed: 0.6,
    skills: [
      { name: 'REST APIs',    Icon: Code },
      { name: 'Google Maps',  Icon: MapPin },
      { name: 'Git & GitHub', Icon: SiGithub },
      { name: 'Local Alerts', Icon: Bell },
    ],
  },
];

/**
 * H-3 Fix: replaced useState + rAF with useMotionValue.
 * This eliminates ~720 React state updates/sec (12 items × 60fps).
 * Framer Motor updates MotionValues without triggering React re-renders.
 */
const OrbitItem = ({ skill, color, glow, radiusX, radiusY, tilt, speed, phase, isActive }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const zIndex = useMotionValue(10);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      // Park items at their natural position
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
  }, [radiusX, radiusY, tilt, speed, phase, x, y, scale, zIndex, shouldReduceMotion]);

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

const Skills = ({ scrollYProgress }) => {
  const [scrollActiveCategory, setScrollActiveCategory] = useState('core');
  const currentActive = scrollActiveCategory;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.38)       setScrollActiveCategory('core');
      else if (latest < 0.72)  setScrollActiveCategory('architecture');
      else                     setScrollActiveCategory('integration');
    });
    return () => unsubscribe();
  }, [scrollYProgress]); // L-5 fix: scrollYProgress in deps

  const opacityTitle = useTransform(scrollYProgress, [0, 0.15],  [0, 1]);
  const yTitle       = useTransform(scrollYProgress, [0, 0.15],  [30, 0]);

  const opacityCore  = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const scaleCore    = useTransform(scrollYProgress, [0.05, 0.25], [0.8, 1]);

  const opacityArch  = useTransform(scrollYProgress, [0.3,  0.5],  [0, 1]);
  const scaleArch    = useTransform(scrollYProgress, [0.3,  0.5],  [0.8, 1]);

  const opacityInteg = useTransform(scrollYProgress, [0.6,  0.8],  [0, 1]);
  const scaleInteg   = useTransform(scrollYProgress, [0.6,  0.8],  [0.8, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);

  const activeCategoryData = skillCategories.find(c => c.id === currentActive) || skillCategories[0];
  const activeColor = activeCategoryData.color;
  const activeGlow  = activeCategoryData.glow;

  // Per-category opacity/scale lookup (avoid if/else in map)
  const ringMotion = {
    core:         { opacity: opacityCore,  scale: scaleCore  },
    architecture: { opacity: opacityArch,  scale: scaleArch  },
    integration:  { opacity: opacityInteg, scale: scaleInteg },
  };

  return (
    <>
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />

      <motion.div style={{ opacity: contentOpacity }} className="container-safe relative z-10 flex flex-col items-center justify-center h-full py-4">
        {/* Header */}
        <motion.div style={{ opacity: opacityTitle, y: yTitle }} className="text-center mb-8 max-w-2xl">
          <p className="chapter-label mb-1.5">Chapter 08 — The Expertise Ecosystem</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            A universe of <span className="gradient-text">mastered</span> tools.
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
            Scroll to expand orbit layers, or hover directly to explore components.
          </p>
        </motion.div>

        {/* Orbit Visualization */}
        <div
          className="relative w-full h-[340px] flex items-center justify-center scale-90 sm:scale-100 md:scale-110"
          style={{ perspective: '1200px' }}
          role="img"
          aria-label="3D orbit visualization of skill categories"
        >
          {/* Central Node */}
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

            {/* Pulse rings */}
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

          {/* Orbits — deepest first */}
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

export default Skills;