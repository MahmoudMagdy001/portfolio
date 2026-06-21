import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Zap, Globe, Database, Layers, Palette, Code, Users, Shield, RefreshCw } from 'lucide-react';

const services = [
  { icon: Smartphone, title: 'Mobile Applications',   description: 'Pixel-perfect Flutter apps for iOS and Android with buttery-smooth 60fps performance and cinematic UX.', tags: ['Flutter', 'iOS', 'Android'],            color: '#6366f1' },
  { icon: Globe,      title: 'Backend Integration',    description: 'Seamless connection between your app and backend — REST APIs, real-time sockets, and GraphQL.',           tags: ['REST', 'WebSocket', 'GraphQL'],          color: '#06b6d4' },
  { icon: Database,   title: 'Firebase Solutions',     description: 'Full-stack cloud integration — real-time Cloud Firestore databases, Firebase Auth, cloud functions, and crash reporting.', tags: ['Firestore', 'Auth', 'FCM'], color: '#10b981' },
  { icon: Zap,        title: 'Performance Optimization', description: 'Deep-dive profiling and optimization. Faster renders, better memory usage, and improved startup time.', tags: ['Slivers', 'Caching', 'Profiling'],      color: '#f59e0b' },
  { icon: Layers,     title: 'Clean Architecture',     description: 'Scalable 3-layer architecture with Domain, Data, and Presentation layers. Built to last for years.',      tags: ['BLoC', 'GetIt', 'fpdart'],              color: '#8b5cf6' },
  { icon: Palette,    title: 'UI Implementation',      description: 'Translating Figma designs into living, breathing Flutter widgets with precision and artistry.',            tags: ['Custom Widgets', 'Animations', 'Responsive'], color: '#f43f5e' },
];

const principles = [
  { icon: Code,      title: 'Clean Code',           description: "Every line written as if someone brilliant — and critical — will review it tomorrow. Readability is not a bonus, it's the foundation.", color: '#6366f1' },
  { icon: Layers,    title: 'Scalable Architecture', description: 'Systems designed to grow. 3-layer Clean Architecture ensures features can be added without breaking what already works.',              color: '#8b5cf6' },
  { icon: Zap,       title: 'Performance First',     description: "60fps isn't a goal — it's the contract with users. Every widget, every rebuild, every allocation is a deliberate choice.",             color: '#f59e0b' },
  { icon: Users,     title: 'User Experience',       description: 'Apps are stories told to users through motion, hierarchy, and clarity. Technology serves humanity, not the other way around.',         color: '#06b6d4' },
  { icon: Shield,    title: 'Reliability',           description: 'Error handling is not an afterthought. Either<Failure, Success> thinking means failures are first-class citizens of design.',          color: '#10b981' },
  { icon: RefreshCw, title: 'Maintainability',       description: 'Software is a living thing. Code written today must be a gift to the developer who inherits it months — or years — from now.',        color: '#f43f5e' },
];

// M-5 fix: hoist static animation objects — zero object allocation per render
const cardWhileHover = { y: -6 };
const cardTransition  = { duration: 0.3 };

const ServiceCard = ({ service }) => (
  <div className="h-full">
    <motion.div
      whileHover={cardWhileHover}
      transition={cardTransition}
      className="glass-card rounded-xl p-5 h-full group relative overflow-hidden cursor-default"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500 blur-2xl"
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
        <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">{service.title}</h4>
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

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 origin-left"
        style={{ background: service.color }}
        aria-hidden="true"
      />
    </motion.div>
  </div>
);

const PhilosophyCard = ({ principle, index }) => (
  <div className="h-full">
    <motion.div
      whileHover={cardWhileHover}
      transition={cardTransition}
      className="glass-card rounded-xl p-5 h-full relative overflow-hidden group cursor-default"
    >
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 blur-3xl"
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
        <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors pr-8">{principle.title}</h4>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-3 relative z-10">{principle.description}</p>

      <div
        className="mt-2 h-px w-[40%] group-hover:w-[70%] transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${principle.color}, transparent)` }}
        aria-hidden="true"
      />
    </motion.div>
  </div>
);

const Services = () => {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-50%"]);

  if (!isDesktop) {
    return (
      <>
        <section id="services" className="relative bg-transparent py-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
          <div className="container-safe relative z-10">
            <p className="chapter-label mb-3">Chapter 05 — What I Build</p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
              <div className="flex-1 overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Products that<br /><span className="gradient-text">matter.</span></h2>
              </div>
              <p className="flex-1 text-slate-400 text-base leading-relaxed max-w-md mt-2 self-end">
                From concept to production, every service is delivered with obsessive attention to quality and user experience.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service, i) => <ServiceCard key={i} service={service} />)}
            </div>
          </div>
        </section>

        <section id="philosophy" className="relative bg-transparent py-20 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="container-safe relative z-10">
            <p className="chapter-label mb-3">Chapter 06 — How I Work</p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
              <div className="flex-1 overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold text-white">The principles<br /><span className="gradient-text">I live by.</span></h2>
              </div>
              <p className="flex-1 text-slate-400 text-base leading-relaxed max-w-md mt-2 self-end">
                Great software doesn't happen by accident. It's the result of deliberate decisions, repeatable processes, and an unwavering commitment to the craft.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((p, i) => <PhilosophyCard key={i} principle={p} index={i} />)}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section ref={containerRef} id="services" className="relative h-[250vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[200vw] h-full items-stretch">
          {/* Slide 1: Services */}
          <div className="w-[100vw] flex-shrink-0 h-full flex items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
            <div className="container-safe relative z-10 pt-16">
              <p className="chapter-label mb-3">Chapter 05 — What I Build</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start mb-8">
                <div className="flex-1 overflow-hidden">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Products that<br /><span className="gradient-text">matter.</span></h2>
                </div>
                <p className="flex-1 text-slate-400 text-base leading-relaxed max-w-md mt-2 md:mt-2 self-end">
                  From concept to production, every service is delivered with obsessive attention to quality and user experience.
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
              <p className="chapter-label mb-3">Chapter 06 — How I Work</p>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
