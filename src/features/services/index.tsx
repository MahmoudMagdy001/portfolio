import { useRef, type FC } from 'react';
import { useIsDesktop } from '../../hooks';
import { services, principles, type ServiceItem, type PrincipleItem } from './data/servicesData';
import { gsap, useGSAP } from '../../lib/gsap';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: FC<ServiceCardProps> = ({ service }) => (
  <div className="h-full">
    <div
      className="glass-card rounded-xl p-5 h-full group relative overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500 blur-2xl pointer-events-none"
        style={{ background: service.color }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
        >
          <service.icon size={20} style={{ color: service.color }} aria-hidden="true" />
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{service.title}</h3>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-3">{service.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag, i) => (
          <span
            key={i}
            className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
            style={{ background: `${service.color}12`, color: service.color, border: `1px solid ${service.color}25` }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 origin-left"
        style={{ background: service.color }}
        aria-hidden="true"
      />
    </div>
  </div>
);

interface PhilosophyCardProps {
  principle: PrincipleItem;
  index: number;
}

const PhilosophyCard: FC<PhilosophyCardProps> = ({ principle, index }) => (
  <div className="h-full">
    <div
      className="glass-card rounded-xl p-5 h-full relative overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/30"
    >
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 blur-3xl pointer-events-none"
        style={{ background: principle.color }}
        aria-hidden="true"
      />
      <div className="absolute top-4 right-4 text-4xl font-bold opacity-5 font-display" style={{ color: principle.color }} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${principle.color}15`, border: `1px solid ${principle.color}30` }}
        >
          <principle.icon size={20} style={{ color: principle.color }} aria-hidden="true" />
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors pr-8">{principle.title}</h3>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-3 relative z-10">{principle.description}</p>

      <div
        className="mt-2 h-px w-[40%] group-hover:w-[70%] transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${principle.color}, transparent)` }}
        aria-hidden="true"
      />
    </div>
  </div>
);

const ServicesMobile: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.service-card-mobile');
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section id="services" className="relative bg-transparent py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
        <div className="container-safe relative z-10">
          <p className="chapter-label mb-3">Chapter 06 — What I Build</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
            <div className="flex-1 overflow-hidden">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Products that<br /><span className="gradient-text">matter.</span></h2>
            </div>
            <p className="flex-1 text-slate-400 text-base leading-relaxed max-w-md mt-2 self-end">
              From concept to production, every service is delivered with obsessive attention to quality, architecture, and user experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div key={i} className="service-card-mobile">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="relative bg-transparent py-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="container-safe relative z-10">
          <p className="chapter-label mb-3">Chapter 07 — How I Work</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
            <div className="flex-1 overflow-hidden">
              <h2 className="text-4xl md:text-5xl font-bold text-white">The principles<br /><span className="gradient-text">I live by.</span></h2>
            </div>
            <p className="flex-1 text-slate-400 text-base leading-relaxed max-w-md mt-2 self-end">
              Great software doesn't happen by accident. It's the result of deliberate decisions, repeatable processes, and an unwavering commitment to the craft.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p, i) => (
              <div key={i} className="service-card-mobile">
                <PhilosophyCard principle={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesDesktop: FC = () => {
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

    gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: pinWrap,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="relative bg-transparent">
      <div ref={pinWrapRef} className="h-screen w-full flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-[200vw] h-full items-stretch"
          style={{ willChange: 'transform' }}
        >
          {/* Slide 1: Services */}
          <div className="w-[100vw] flex-shrink-0 h-full flex items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
            <div className="container-safe relative z-10 pt-16">
              <p className="chapter-label mb-3">Chapter 06 — What I Build</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
                <div className="flex-1 overflow-hidden">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Products that<br /><span className="gradient-text">matter.</span></h2>
                </div>
                <p className="flex-1 text-slate-400 text-base leading-relaxed max-w-md mt-2 md:mt-2 self-end">
                  From concept to production, every service is delivered with obsessive attention to quality, architecture, and user experience.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, i) => <ServiceCard key={i} service={service} />)}
              </div>
            </div>
          </div>

          {/* Slide 2: Philosophy */}
          <div id="philosophy" className="w-[100vw] flex-shrink-0 h-full flex items-center relative">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
            <div className="container-safe relative z-10 pt-16">
              <p className="chapter-label mb-3">Chapter 07 — How I Work</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
                <div className="flex-1 overflow-hidden">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">The principles<br /><span className="gradient-text">I live by.</span></h2>
                </div>
                <p className="flex-1 text-slate-400 text-base leading-relaxed self-end max-w-md mt-2 md:mt-2">
                  Great software doesn't happen by accident. It's the result of deliberate decisions, repeatable processes, and an unwavering commitment to the craft.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {principles.map((p, i) => <PhilosophyCard key={i} principle={p} index={i} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: FC = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <ServicesDesktop /> : <ServicesMobile />;
};

export default Services;
