import { useEffect, useState, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { stats } from './data/numbersData';

const CounterCard = ({ stat, index, startTrigger, scrollOpacity, scrollY }) => {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (startTrigger && !animatedRef.current) {
      animatedRef.current = true;
      const duration = 2000;
      const start = Date.now();
      let stepFrameId;
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * stat.value));
        if (progress < 1) {
          stepFrameId = requestAnimationFrame(step);
        } else {
          setCount(stat.value);
        }
      };
      const timerId = setTimeout(() => {
        stepFrameId = requestAnimationFrame(step);
      }, index * 100);

      return () => {
        clearTimeout(timerId);
        if (stepFrameId) cancelAnimationFrame(stepFrameId);
      };
    }
  }, [startTrigger, stat.value, index]);

  return (
    <motion.div style={{ opacity: scrollOpacity, y: scrollY }} className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="counter-card glass-card rounded-3xl p-8 md:p-10 text-center group hover:ring-1 hover:ring-primary/30 transition-all duration-500 h-full"
      >
        <div className="mb-4">
          <span className="text-5xl md:text-7xl font-bold gradient-text font-display">
            {count.toLocaleString()}
          </span>
          <span className="text-3xl md:text-5xl font-bold text-primary">{stat.suffix}</span>
        </div>

        <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {stat.label}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed">{stat.description}</p>

        <div className="mt-6 h-0.5 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary w-[40%] group-hover:w-[60%] transition-all duration-500" />
      </motion.div>
    </motion.div>
  );
};

const NumbersDesktop = ({ scrollYProgress }) => {
  const [triggerCount, setTriggerCount] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.15) setTriggerCount(true);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Header animations
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2],  [0, 1]);
  const yTitle       = useTransform(scrollYProgress, [0, 0.2],  [30, 0]);

  // Staggered entry for each stat card
  const opacityC1 = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const yC1       = useTransform(scrollYProgress, [0.05, 0.25], [40, 0]);

  const opacityC2 = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);
  const yC2       = useTransform(scrollYProgress, [0.12, 0.32], [40, 0]);

  const opacityC3 = useTransform(scrollYProgress, [0.19, 0.39], [0, 1]);
  const yC3       = useTransform(scrollYProgress, [0.19, 0.39], [40, 0]);

  const opacityC4 = useTransform(scrollYProgress, [0.26, 0.46], [0, 1]);
  const yC4       = useTransform(scrollYProgress, [0.26, 0.46], [40, 0]);

  const cardMotion = [
    { opacity: opacityC1, y: yC1 },
    { opacity: opacityC2, y: yC2 },
    { opacity: opacityC3, y: yC3 },
    { opacity: opacityC4, y: yC4 },
  ];

  const contentOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <motion.div style={{ opacity: contentOpacity }} className="container-safe relative z-10">
        <div className="text-center mb-16">
          <motion.p style={{ opacity: opacityTitle, y: yTitle }} className="chapter-label mb-6">
            Chapter 07 — The Numbers
          </motion.p>
          <motion.div style={{ opacity: opacityTitle, y: yTitle }} className="overflow-hidden">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-2">
              Impact in <span className="gradient-text">numbers.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <CounterCard
              key={i}
              stat={stat}
              index={i}
              startTrigger={triggerCount}
              scrollOpacity={cardMotion[i].opacity}
              scrollY={cardMotion[i].y}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

const CounterCardMobile = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (inView && !animatedRef.current) {
      animatedRef.current = true;
      const duration = 2000;
      const start = Date.now();
      let stepFrameId;
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * stat.value));
        if (progress < 1) {
          stepFrameId = requestAnimationFrame(step);
        } else {
          setCount(stat.value);
        }
      };
      const timerId = setTimeout(() => {
        stepFrameId = requestAnimationFrame(step);
      }, index * 100);

      return () => {
        clearTimeout(timerId);
        if (stepFrameId) cancelAnimationFrame(stepFrameId);
      };
    }
  }, [inView, stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="counter-card glass-card rounded-3xl p-6 text-center group hover:ring-1 hover:ring-primary/30 transition-all duration-500 h-full">
        <div className="mb-4">
          <span className="text-4xl sm:text-5xl font-bold gradient-text font-display">
            {count.toLocaleString()}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-primary">{stat.suffix}</span>
        </div>

        <h4 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {stat.label}
        </h4>
        <p className="text-slate-500 text-xs leading-relaxed">{stat.description}</p>

        <div className="mt-6 h-0.5 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary w-[40%] group-hover:w-[60%] transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const NumbersMobile = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <p className="chapter-label mb-4">Chapter 07 — The Numbers</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Impact in <span className="gradient-text">numbers.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <CounterCardMobile
              key={i}
              stat={stat}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Numbers = ({ scrollYProgress }) => {
  if (scrollYProgress) {
    return <NumbersDesktop scrollYProgress={scrollYProgress} />;
  }
  return <NumbersMobile />;
};

export default Numbers;
