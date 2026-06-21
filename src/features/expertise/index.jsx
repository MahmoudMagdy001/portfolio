import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Numbers from '../numbers';
import Skills from '../skills';
import { useIsDesktop } from '../../hooks';

const ExpertiseMobile = () => {
  return (
    <div id="skills" className="relative bg-transparent">
      <Numbers scrollYProgress={null} />
      <Skills scrollYProgress={null} />
    </div>
  );
};

const ExpertiseDesktop = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressNumbers = useTransform(scrollYProgress, [0, 0.42],  [0, 1]);
  const progressSkills  = useTransform(scrollYProgress, [0.45, 1.0], [0, 1]);

  const pointerEventsNumbers = useTransform(scrollYProgress, value => value <= 0.44 ? "auto" : "none");
  const pointerEventsSkills  = useTransform(scrollYProgress, value => value > 0.44  ? "auto" : "none");

  const opacityNumbers = useTransform(scrollYProgress, value => value <= 0.44 ? 1 : 0);
  const opacitySkills  = useTransform(scrollYProgress, value => value > 0.44 ? 1 : 0);

  return (
    <section ref={containerRef} id="skills" className="relative h-[500vh] bg-transparent">
      <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden">

        <motion.div
          className="absolute inset-0 w-full h-full flex flex-col justify-center"
          style={{ opacity: opacityNumbers, pointerEvents: pointerEventsNumbers }}
        >
          <Numbers scrollYProgress={progressNumbers} />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full flex flex-col justify-center"
          style={{ opacity: opacitySkills, pointerEvents: pointerEventsSkills }}
        >
          <Skills scrollYProgress={progressSkills} />
        </motion.div>

      </div>
    </section>
  );
};

const Expertise = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <ExpertiseDesktop /> : <ExpertiseMobile />;
};

export default Expertise;
