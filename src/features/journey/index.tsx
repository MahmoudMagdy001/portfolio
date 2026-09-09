import { useRef, type FC } from 'react';
import { useIsDesktop } from '../../hooks';
import { milestones, type Milestone } from './data/journeyData';
import { gsap, useGSAP } from '../../lib/gsap';

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
}

const MilestoneCard: FC<MilestoneCardProps> = ({ milestone }) => (
  <div className="flex-shrink-0 w-[380px] group relative">
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

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-500">
        {milestone.title}
      </h3>
      <p className="text-slate-400 text-base leading-relaxed font-light">
        {milestone.description}
      </p>

      {/* Connection Node */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-dark border border-white/10 flex items-center justify-center">
        <div 
          className="w-2 h-2 rounded-full animate-pulse-glow"
          style={{ backgroundColor: milestone.color }}
        />
      </div>
    </div>
  </div>
);

const JourneyMobile: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.journey-mobile-item');
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="journey" className="relative bg-transparent py-20 px-6">
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
            <div
              key={index}
              className="journey-mobile-item relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-dark border border-white/10 flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: milestone.color }}
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
                <h3 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JourneyDesktop: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef   = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    if (!track || !section || !pinWrap) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const getDistance = () => {
      return track.scrollWidth - window.innerWidth + window.innerWidth * 0.15;
    };

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: pinWrap,
        start: 'top top',
        end: () => `+=${getDistance() + 800}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="journey" className="relative bg-transparent">
      <div
        ref={pinWrapRef}
        className="h-screen w-full overflow-hidden flex flex-col justify-center"
      >
        {/* Cinematic Background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[160px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container-safe relative z-10 mb-8">
          <div className="max-w-4xl">
            <p className="chapter-label mb-4">Chapter 03 — The Chronicle</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
              A journey of <span className="gradient-text">relentless</span> craft.
            </h2>
            <p className="text-slate-500 font-mono text-sm tracking-[0.3em] uppercase">Scroll to traverse time</p>
          </div>
        </div>

        {/* Horizontal Container */}
        <div className="relative flex items-center">
          <div 
            ref={trackRef}
            className="flex gap-8 px-[10vw]"
            style={{ willChange: 'transform' }}
          >
            {milestones.map((milestone, index) => (
              <MilestoneCard key={index} milestone={milestone} index={index} />
            ))}
          </div>

          {/* Background Timeline Rail */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/5 -z-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

const Journey: FC = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <JourneyDesktop /> : <JourneyMobile />;
};

export default Journey;
