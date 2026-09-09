import { useState, useEffect, useRef, type FC, type KeyboardEvent } from 'react';
import { roles } from './data/heroData';
import { gsap, useGSAP } from '../../lib/gsap';

const Hero: FC = () => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const roleTextRef = useRef<HTMLHeadingElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.7, delay: 0.2 })
      .from('.hero-greeting', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.hero-role-box', { opacity: 0, scale: 0.95, duration: 0.7 }, '-=0.3')
      .from('.hero-bio', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from(indicatorRef.current, { opacity: 0, y: -15, duration: 0.6 }, '-=0.2');

    // Scroll parallax & fadeout
    if (!prefersReducedMotion && containerRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: -90,
        scale: 0.92,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    }

    // Explore indicator bounce
    if (!prefersReducedMotion && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, { scope: containerRef });

  // Role cycle with GSAP flip transition
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const interval = setInterval(() => {
      if (!roleTextRef.current || prefersReducedMotion) {
        setRoleIndex((i) => (i + 1) % roles.length);
        return;
      }

      gsap.to(roleTextRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setRoleIndex((i) => (i + 1) % roles.length);
          gsap.fromTo(
            roleTextRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
          );
        },
      });
    }, 3200);

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
        <div ref={contentRef} className="container-safe relative z-10 text-center" style={{ willChange: 'transform, opacity' }}>
          <div>
            <p className="hero-badge chapter-label mb-16 tracking-[0.6em] text-primary/80 uppercase">
              Chapter 01 — The Genesis
            </p>

            <h1 className="hero-greeting text-xl md:text-2xl text-slate-400 font-light mb-6 uppercase tracking-[0.25em]">
              Hi, I'm <span className="text-white font-bold tracking-normal">Mahmoud Magdy</span>
            </h1>

            {/* aria-live so screen readers announce role changes */}
            <div
              className="hero-role-box h-16 sm:h-20 md:h-28 xl:h-40 mb-14 overflow-hidden flex items-center justify-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <h2
                ref={roleTextRef}
                className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-bold tracking-tighter whitespace-nowrap"
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="gradient-text">{roles[roleIndex]}</span>
              </h2>
            </div>

            <p className="hero-bio max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light mb-16 leading-relaxed">
              Crafting high-fidelity mobile experiences with <span className="text-white font-semibold">Dart & Flutter</span>, leveraging Clean Architecture and performance optimization.
            </p>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          ref={indicatorRef}
          onClick={scrollDown}
          onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && scrollDown()}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to explore"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
