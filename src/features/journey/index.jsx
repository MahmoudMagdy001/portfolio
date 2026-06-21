import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '../../hooks';
import { milestones } from './data/journeyData';

const MilestoneCard = ({ milestone, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="flex-shrink-0 w-[380px] group relative"
  >
    <div className="glass-card rounded-[28px] p-8 h-full border border-white/5 relative overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:bg-white/[0.03]">
      {/* Background Glow */}
      <div 
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 blur-[80px]"
        style={{ background: milestone.color }}
      />
      
      {/* Top Accent */}
      <div 
        className="absolute top-0 left-8 right-8 h-px transition-opacity duration-500 opacity-20 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${milestone.color}, transparent)` }}
      />

      <div className="flex items-center gap-3 mb-4">
        <span 
          className="text-xs font-mono font-bold px-3 py-1.5 rounded-full"
          style={{ background: `${milestone.color}15`, color: milestone.color, border: `1px solid ${milestone.color}30` }}
        >
          {milestone.year}
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <h4 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-500">
        {milestone.title}
      </h4>
      <p className="text-slate-400 text-base leading-relaxed font-light">
        {milestone.description}
      </p>

      {/* Connection Node */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-dark border border-white/10 flex items-center justify-center">
        <motion.div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: milestone.color }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  </motion.div>
);

const JourneyMobile = () => {
  return (
    <section id="journey" className="relative bg-transparent py-20 px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="mb-12">
          <p className="chapter-label mb-4">Chapter 03 — The Chronicle</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            A journey of <span className="gradient-text">relentless</span> craft.
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-8 border-l border-white/10 space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-dark border border-white/10 flex items-center justify-center">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: milestone.color }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="glass-card rounded-[22px] p-6 border border-white/5 relative overflow-hidden transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${milestone.color}15`, color: milestone.color, border: `1px solid ${milestone.color}30` }}
                  >
                    {milestone.year}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JourneyDesktop = () => {
  const targetRef = useRef(null);
  const trackRef  = useRef(null);
  const [endX, setEndX] = useState(0);

  // Same centering logic as Projects: last card stops at viewport midpoint (with -180px offset)
  const updateEndX = useCallback(() => {
    if (trackRef.current) {
      const track = trackRef.current;
      const lastCard = track.lastElementChild;
      if (!lastCard) return;
      const lastCardLeft  = lastCard.offsetLeft - track.offsetLeft;
      const lastCardWidth = lastCard.offsetWidth;
      const vw = window.innerWidth;
      setEndX(vw / 2 - lastCardWidth / 2 - lastCardLeft - 180);
    }
  }, []);

  useEffect(() => {
    updateEndX();
    window.addEventListener('resize', updateEndX);
    return () => window.removeEventListener('resize', updateEndX);
  }, [updateEndX]);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x       = useTransform(scrollYProgress, [0.1, 0.9], [0, endX]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} id="journey" className="relative h-[400vh]">
      <div className="sticky top-[80px] h-[calc(100vh-80px)] overflow-hidden flex flex-col justify-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[160px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <motion.div style={{ opacity }} className="container-safe relative z-10 mb-8">
          <div className="max-w-4xl">
            <motion.p className="chapter-label mb-4">Chapter 03 — The Chronicle</motion.p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
              A journey of <span className="gradient-text">relentless</span> craft.
            </h2>
            <p className="text-slate-500 font-mono text-sm tracking-[0.3em] uppercase">Scroll to traverse time</p>
          </div>
        </motion.div>

        {/* Horizontal Container */}
        <div className="relative flex items-center">
          <motion.div 
            ref={trackRef}
            style={{ x }} 
            className="flex gap-8 px-[10vw]"
          >
            {milestones.map((milestone, index) => (
              <MilestoneCard key={index} milestone={milestone} index={index} />
            ))}
          </motion.div>

          {/* Background Timeline Rail */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/5 -z-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

const Journey = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <JourneyDesktop /> : <JourneyMobile />;
};

export default Journey;
