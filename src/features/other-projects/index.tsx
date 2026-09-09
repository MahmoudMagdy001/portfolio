import { useRef, useState, type FC } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { otherProjectsData, type OtherProjectItem } from '../../data/otherProjectsData';
import { useIsDesktop } from '../../hooks';
import { gsap, useGSAP } from '../../lib/gsap';

interface OtherProjectWatermarkProps {
  project: OtherProjectItem;
}

const OtherProjectWatermark: FC<OtherProjectWatermarkProps> = ({ project }) => {
  const [imgErr, setImgErr] = useState<boolean>(false);

  if (project.image && !imgErr) {
    return (
      <div
        className="absolute -right-12 -top-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 group-hover:scale-110 w-[300px] h-[220px] pointer-events-none overflow-hidden rounded-2xl"
        aria-hidden="true"
      >
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover blur-[1px]"
        />
      </div>
    );
  }

  const Icon = project.icon || Globe;
  return (
    <div
      className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 group-hover:scale-110 pointer-events-none"
      aria-hidden="true"
    >
      <Icon size={250} />
    </div>
  );
};

interface OtherProjectCardProps {
  project: OtherProjectItem;
}

const OtherProjectCard: FC<OtherProjectCardProps> = ({ project }) => {
  // Extract clean domain for browser mockup URL bar
  const domain = project.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <article className="group relative glass-card rounded-[32px] overflow-hidden transition-all duration-500 ring-1 ring-white/10 hover:ring-1 hover:ring-white/20 h-full flex flex-col justify-between">
      {/* Glow border gradient on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Top Banner with Project Info + Live Screenshot Mockup */}
      <div className={`relative p-5 md:p-6 bg-gradient-to-br ${project.gradient} transition-all duration-500 flex-grow`}>
        <OtherProjectWatermark project={project} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left Column: Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-white/5 bg-white/5 font-semibold"
                style={{ color: project.color }}
              >
                {project.questNumber}
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-white/5 bg-white/5 text-slate-400">
                {project.category}
              </span>
              <span className="text-[11px] font-sans font-medium py-0.5 px-2.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06] hidden sm:inline-block">
                {project.arabicTitle}
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-500 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-slate-300 font-light mb-4 max-w-xl leading-relaxed">
              {project.tagline}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg font-bold transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {t.Icon && <t.Icon size={12} aria-hidden="true" />}
                  {t.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Browser Mockup */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 group/mockup block"
            aria-label={`Visit ${project.title} live website`}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-2xl transition-all duration-500 group-hover/mockup:border-white/25 group-hover/mockup:shadow-primary/10">
              {/* Browser Header Bar */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 mx-2 px-2.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-slate-400 truncate text-center flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {domain}
                </div>
              </div>

              {/* Website Screenshot with hover scale */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={`${project.title} live website preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-white border border-white/10">
                    Live Preview <ExternalLink size={10} />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Gradient Color Divider */}
      <div className="h-1 w-full bg-white/5 relative overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-y-0 left-0 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />
      </div>

      {/* Bottom Section: Challenge / Strategy / Impact */}
      <div className="p-5 md:p-6 border-t border-white/5 bg-white/[0.01]">
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold" style={{ color: project.color }}>
              The Challenge
            </h4>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-primary">
              The Strategy
            </h4>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
              {project.solution}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-secondary">
              Impact
            </h4>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: project.color }}
                    aria-hidden="true"
                  />
                  <span className="font-light flex-1">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-white/5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            style={{
              backgroundColor: project.color,
              boxShadow: `0 10px 20px ${project.color}30`
            }}
          >
            Visit Live Platform <ExternalLink size={14} aria-hidden="true" />
          </a>

          <span className="text-xs text-slate-500 font-mono tracking-wider ml-auto hidden sm:inline-block">
            {domain}
          </span>
        </div>
      </div>
    </article>
  );
};

// Mobile View: Vertical staggered cards
const OtherProjectsMobile: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.other-project-mobile-item');
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 35,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="web-projects" className="relative bg-transparent py-20 px-6">
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mb-12">
          <p className="chapter-label mb-3">Chapter 05 — The Digital Frontier</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tighter leading-none">
            Web & Digital <span className="gradient-text">Ecosystems.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            High-converting commercial platforms, corporate portals, and e-commerce architectures built for production scale.
          </p>
        </div>

        <div className="space-y-8">
          {otherProjectsData.map((project) => (
            <div key={project.id} className="other-project-mobile-item w-full">
              <OtherProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Desktop View: Sticky horizontal scroll (with GSAP ScrollTrigger)
const OtherProjectsDesktop: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const pinWrapRef   = useRef<HTMLDivElement | null>(null);
  const trackRef     = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    const section = containerRef.current;
    const pinWrap = pinWrapRef.current;
    if (!track || !section || !pinWrap) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.15;

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: pinWrap,
        start: 'top top',
        end: () => `+=${getDistance() + 1000}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="web-projects" className="relative bg-transparent">
      <div ref={pinWrapRef} className="h-screen w-full flex flex-col justify-center overflow-hidden pt-24">
        <div className="relative z-10 flex items-center h-full w-full">
          <div className="w-full overflow-visible">
            <div
              ref={trackRef}
              className="flex gap-8 items-stretch px-[10vw]"
              style={{ willChange: 'transform' }}
            >
              {/* Intro Title Block */}
              <div className="w-[85vw] sm:w-[400px] md:w-[480px] flex-shrink-0 flex flex-col justify-center pr-8 md:pr-12">
                <p className="chapter-label mb-3">Chapter 05 — The Digital Frontier</p>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter leading-none">
                  Web & Digital <span className="gradient-text">Ecosystems.</span>
                </h2>
                <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
                  Beyond mobile — high-converting commercial platforms, corporate portals, and e-commerce architectures built for production scale.
                </p>
                <div className="mt-8 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                  <span className="w-12 h-px bg-slate-800" aria-hidden="true" />
                  <span>Scroll down to explore</span>
                </div>
              </div>

              {/* Mapped Project Cards */}
              {otherProjectsData.map((project) => (
                <div
                  key={project.id}
                  className="w-[90vw] sm:w-[550px] md:w-[820px] lg:w-[980px] flex-shrink-0"
                >
                  <OtherProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OtherProjects: FC = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <OtherProjectsDesktop /> : <OtherProjectsMobile />;
};

export default OtherProjects;
