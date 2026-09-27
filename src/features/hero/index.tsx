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
      .from('.hero-status', { opacity: 0, scale: 0.9, duration: 0.5 }, '-=0.4')
      .from('.hero-greeting', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.hero-role-box', { opacity: 0, scale: 0.95, duration: 0.7 }, '-=0.3')
      .from('.hero-bio', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.hero-pills', { opacity: 0, y: 15, duration: 0.5, stagger: 0.05 }, '-=0.3')
      .from('.hero-actions', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
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
    <section ref={containerRef} className="relative h-[160vh] bg-transparent" id="hero">
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden', willChange: 'transform' }}
      >
        {/* Banner Decorative Ambiance */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary/15 via-secondary/8 to-transparent rounded-full blur-[160px]" />
          <div className="absolute -top-10 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent opacity-40" />
        </div>

        {/* Main Content Container */}
        <div ref={contentRef} className="container-safe relative z-10 text-center" style={{ willChange: 'transform, opacity' }}>
          <div>
            <div className="flex flex-col items-center gap-3 mb-6">
              <p className="hero-badge chapter-label tracking-[0.5em] text-primary/80 uppercase">
                Chapter 01 — The Genesis
              </p>

              {/* Status Pill */}
              <div className="hero-status inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span>Available for Senior Mobile & Architecture Projects</span>
              </div>
            </div>

            <h1 className="hero-greeting text-xl md:text-2xl text-slate-400 font-light mb-3 uppercase tracking-[0.25em]">
              Hi, I'm <span className="text-white font-bold tracking-normal">Mahmoud Magdy</span>
            </h1>

            {/* aria-live so screen readers announce role changes */}
            <div
              className="hero-role-box h-16 sm:h-20 md:h-24 xl:h-32 mb-6 overflow-hidden flex items-center justify-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <h2
                ref={roleTextRef}
                className="text-3xl sm:text-5xl md:text-6xl xl:text-8xl font-bold tracking-tighter whitespace-nowrap"
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="gradient-text">{roles[roleIndex]}</span>
              </h2>
            </div>

            <p className="hero-bio max-w-2xl mx-auto text-slate-400 text-base md:text-xl font-light mb-8 leading-relaxed">
              Engineering high-fidelity mobile ecosystems with <span className="text-white font-semibold">Dart 3 & Flutter</span>, strict <span className="text-primary-light font-semibold">Clean Architecture</span>, resilient cloud backends, and autonomous AI agents.
            </p>

            {/* Tech Badges Strip */}
            <div className="hero-pills flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10">
              {['Flutter & Dart 3', 'Clean Architecture', 'BLoC & Cubit', 'Firebase Suite', 'Supabase', 'Genkit AI', 'Patrol E2E'].map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:border-primary/40 hover:text-white transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Banner CTAs */}
            <div className="hero-actions flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Battle-Tested Quests
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full glass border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:border-primary/50 hover:bg-white/5 active:scale-95 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">Explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
