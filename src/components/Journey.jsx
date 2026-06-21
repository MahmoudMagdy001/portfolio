import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
{
year: '2019',
title: 'Curiosity',
description:
'During my final year at university, I discovered Flutter and instantly became fascinated by the idea of building beautiful applications for multiple platforms from a single codebase. What started as curiosity quickly became a passion.',
color: '#6366f1',
},

{
year: '2020',
title: 'Learning',
description:
'Spent countless hours exploring Dart, Flutter widgets, layouts, navigation, and APIs. Moved beyond tutorials and started building complete applications while developing a strong foundation in mobile development.',
color: '#10b981',
},

{
year: '2021',
title: 'Discipline',
description:
'Began focusing on software architecture, clean code, state management, and reusable components. Learned how professional applications are structured and how maintainable products are built.',
color: '#06b6d4',
},

{
year: '2022',
title: 'Professionalism',
description:
'Started working on real-world projects and transforming ideas into production-ready applications. Gained experience with authentication, backend integration, performance optimization, and deployment.',
color: '#ec4899',
},

{
year: '2023',
title: 'Growth',
description:
'Expanded into multiple industries including healthcare, education, media, and business solutions. Every project introduced new challenges, pushing my technical and problem-solving abilities further.',
color: '#8b5cf6',
},

{
year: '2024',
title: 'Ownership',
description:
'Took responsibility for complete products from concept to delivery. Worked closely with stakeholders, refined user experiences, and focused on building scalable and reliable mobile solutions.',
color: '#f59e0b',
},

{
year: '2025',
title: 'Scale',
description:
'Delivered advanced applications across e-commerce, real estate, learning platforms, and service systems using Flutter, Supabase, BLoC/Cubit, and modern software architecture patterns.',
color: '#14b8a6',
},

{
year: 'Today',
title: 'Building the Future',
description:
'Now focused on creating exceptional digital experiences through Flutter, scalable architectures, and modern technologies—while continuously learning, improving, and preparing for even bigger challenges ahead.',
color: '#f43f5e',
},
];


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

const Journey = () => {
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
        <div className="absolute inset-0 pointer-events-none">
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
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/5 -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Journey;
