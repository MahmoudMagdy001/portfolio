import { useRef, useState, type FC, type ComponentType, type CSSProperties } from 'react';
import { ExternalLink, Home, ShoppingCart, Heart, GraduationCap, Music, Truck, BookOpen, type LucideIcon } from 'lucide-react';
import { SiGithub, SiFlutter, SiFirebase, SiDart } from 'react-icons/si';
import { projectsDetailData } from '../../data/projectsDetailData';
import { useIsDesktop } from '../../hooks';
import { gsap, useGSAP } from '../../lib/gsap';

interface TechItem {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }> | null;
}

interface ProjectMetaItem {
  icon: LucideIcon;
  gradient: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: TechItem[];
}

const projectMeta: Record<string, ProjectMetaItem> = {
  wassaly: {
    icon: Truck,
    gradient: 'from-indigo-900/20 to-purple-900/10',
    challenge:
      'Architecting a multi-domain platform that unifies e-commerce, professional service booking, real-time order tracking, and push notifications — all under a single, maintainable codebase with zero business-logic leakage across layers.',
    solution:
      'Applied strict Clean Architecture (Presentation → Domain ← Data) with SafeBloc/SafeCubit, fpdart Either-based error handling, GetIt DI, and go_router deep-linking. Encapsulated all async I/O in runTask() with network-awareness flags, and enforced pixel-perfect responsiveness via flutter_screenutil.',
    results: [
      'Strict 3-layer Clean Architecture with feature-first modular structure',
      'SafeBloc pattern with auto HTTP cancellation and emission protection',
      'Full-stack: auth, cart, product catalog, service booking, order lifecycle & reviews',
      'Consistent 60fps via BlocSelector scope isolation and optimized image caching',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Clean Arch.', Icon: null },
      { name: 'BLoC / Cubit', Icon: null },
      { name: 'fpdart', Icon: null },
      { name: 'Firebase', Icon: SiFirebase },
    ]
  },
  propix8: {
    icon: Home,
    gradient: 'from-sky-900/20 to-cyan-900/10',
    challenge:
      'Designing a modular, highly scalable real estate ecosystem capable of handling 19+ distinct modules — listings, map routing, side-by-side comparisons, video walkthroughs, and maintenance bookings — while maintaining strict layer isolation and smooth state transitions.',
    solution:
      'Engineered a Feature-First MVVM architecture with Cubit state management. Integrated flutter_map for geographic property discovery, chewie for immersive video tours, and app_links for deep linking. Built service-repository abstractions with Dio and local caching for offline resilience.',
    results: [
      'Strict 5-layer Feature-First MVVM system powering 19+ scalable modules',
      'Interactive map plotting with local geolocator queries and cluster markers',
      'Side-by-side property & compound comparison engine',
      'Skeleton loading screens with chewie video walkthrough integration',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Cubit (BLoC)', Icon: null },
      { name: 'Feature MVVM', Icon: null },
      { name: 'Flutter Map', Icon: null },
      { name: 'Dio', Icon: null },
    ]
  },
  bynona: {
    icon: ShoppingCart,
    gradient: 'from-cyan-900/20 to-teal-900/10',
    challenge:
      'Building a feature-rich e-commerce application that seamlessly switches between wholesale and retail pricing modes, supports full bilingual (AR/EN) localization, and handles real-time cart, favorites, order management, and push notifications without sacrificing UI fluidity.',
    solution:
      'Implemented BLoC pattern with GetIt DI and Dio for RESTful API integration. Integrated Firebase Cloud Messaging with Awesome Notifications, CachedNetworkImage for optimized rendering, skeletonizer shimmer states, and connectivity monitoring for seamless offline handling.',
    results: [
      'Dual wholesale / retail pricing mode with instant UI switching',
      'Full AR/EN localization with dynamic theme (light / dark) support',
      'OTP-verified auth, multi-address management, and COD + card payments',
      'FCM push notifications with local awesome_notifications delivery',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'BLoC', Icon: null },
      { name: 'Firebase', Icon: SiFirebase },
      { name: 'Dio', Icon: null },
      { name: 'REST API', Icon: null },
    ]
  },
  muslim: {
    icon: BookOpen,
    gradient: 'from-emerald-900/20 to-teal-900/10',
    challenge:
      'Delivering a feature-dense Islamic app — Quran playback, GPS-based prayer times, live Qibla compass, Hadith library, Zakat calculator, and Azkar — while keeping it fully offline-capable, battery-efficient, and production-ready with CI/CD on Codemagic.',
    solution:
      'Used just_audio + audio_service for background Quran playback with lock-screen controls, adhan package for precision prayer time calculations, flutter_qiblah for live sensor-based Qibla direction, and awesome_notifications for scheduled Adhan alerts. Shipped with a Clean Architecture BLoC structure and offline-first caching.',
    results: [
      'Background Quran playback with lock-screen media controls',
      'GPS-aware prayer times with custom Adhan push notifications',
      'Real-time Qibla compass powered by device sensors & geolocator',
      'Zakat calculator with live gold-rate API integration',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Clean Arch.', Icon: null },
      { name: 'BLoC', Icon: null },
      { name: 'just_audio', Icon: null },
      { name: 'Offline First', Icon: null },
    ]
  },
  'cancer-detection': {
    icon: Heart,
    gradient: 'from-rose-900/20 to-pink-900/10',
    challenge:
      'Building a reliable clinical-grade Flutter client for colorectal cancer risk assessment that communicates with a trained ML backend, manages patient records, tracks tumor markers over time, and visualizes longitudinal data with charts.',
    solution:
      'Integrated Firebase and secure REST endpoints for patient data storage and ML API calls. Implemented tumor marker charts for longitudinal tracking, gene analysis input forms with rigorous validation, fast patient search, and drug tracking workflows.',
    results: [
      'ML-backed risk prediction with instant probability feedback',
      'Time-series tumor marker charts with cloud database persistence',
      'Comprehensive patient profiles: drugs, genes, and diagnostic history',
      'Colon cancer news feed and educational content integration',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Firebase', Icon: SiFirebase },
      { name: 'ML API', Icon: null },
      { name: 'Charts', Icon: null },
    ]
  },
  'mansy-learning': {
    icon: GraduationCap,
    gradient: 'from-purple-900/20 to-fuchsia-900/10',
    challenge:
      'Delivering a fluid e-learning experience supporting course catalogs, video lectures, downloadable resources, interactive quizzes, progress tracking, role-based access control, and a subscription enrollment flow backed by a robust cloud backend.',
    solution:
      'Built with Feature-First MVVM using Cubit for state and Firebase for auth, storage, and real-time data. Integrated GoRouter for declarative role-based navigation, SharedPreferences for local progress caching, and a premium RTL-ready design system with Cairo typography.',
    results: [
      'Full subscription flow with course enrollment and access control',
      'Video lectures, PDF downloads, and interactive quiz modules',
      'RTL-ready bilingual UI (Arabic / English) with Cairo design tokens',
      'Persistent progress tracking with Firebase real-time sync',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Firebase', Icon: SiFirebase },
      { name: 'Cubit', Icon: null },
      { name: 'go_router', Icon: null },
      { name: 'GetIt', Icon: null },
    ]
  },
  'music-player': {
    icon: Music,
    gradient: 'from-amber-900/20 to-orange-900/10',
    challenge:
      'Crafting an offline audio player with persistent background playback, lock-screen/notification controls, audio focus handling during calls, and playlist management with high performance.',
    solution:
      'Leveraged just_audio for gapless playback and audio_service for background Android notification and lock-screen integration. Applied on_audio_query for permission-aware local audio querying and Cubit for playback state management.',
    results: [
      'Background playback with lock-screen and notification controls',
      'Permission-aware local device audio scanner with on_audio_query',
      'Dynamic playlist management, shuffle, repeat, and seek bar',
      'Adaptive dark theme with fluid waveform visualization',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'just_audio', Icon: null },
      { name: 'audio_service', Icon: null },
      { name: 'Cubit', Icon: null },
    ]
  }
};

interface ProjectCardItem {
  id: string;
  chapter: string;
  title: string;
  tagline: string;
  category: string;
  color: string;
  github?: string;
  logo?: string;
  icon: LucideIcon;
  gradient: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: TechItem[];
}

const projects: readonly ProjectCardItem[] = Object.entries(projectsDetailData).map(([slug, p]) => {
  const meta = projectMeta[slug] || {
    icon: Home,
    gradient: 'from-slate-900/20 to-slate-800/10',
    challenge: p.subtitle,
    solution: p.overview.goalDesc1,
    results: p.overview.outcomes.slice(0, 4),
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
    ]
  };

  return {
    id: slug,
    chapter: p.questNumber.replace('Quest ', ''),
    title: p.title,
    tagline: p.subtitle,
    category: p.category,
    color: p.color,
    github: p.repository,
    icon: meta.icon,
    gradient: meta.gradient,
    challenge: meta.challenge,
    solution: meta.solution,
    results: meta.results,
    tech: meta.tech,
  };
});

interface ProjectWatermarkProps {
  project: ProjectCardItem;
}

const ProjectWatermark: FC<ProjectWatermarkProps> = ({ project }) => {
  const [imgErr, setImgErr] = useState<boolean>(false);

  if (project.logo && !imgErr) {
    return (
      <div className="absolute -right-8 -top-8 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-700 group-hover:scale-110 w-[220px] h-[220px]" aria-hidden="true">
        <img
          src={project.logo}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImgErr(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const Icon = project.icon;
  return (
    <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 group-hover:scale-110" aria-hidden="true">
      <Icon size={250} />
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectCardItem;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => (
  <article className="group relative glass-card rounded-[32px] overflow-hidden transition-all duration-500 ring-1 ring-white/10 hover:ring-1 hover:ring-white/20 h-full flex flex-col justify-between">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>

    <div className={`relative p-4 md:p-5 bg-gradient-to-br ${project.gradient} transition-all duration-500 flex-grow`}>
      <ProjectWatermark project={project} />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-white/5 bg-white/5 font-semibold" style={{ color: project.color }}>
              Quest {project.chapter}
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-white/5 bg-white/5 text-slate-400">
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-white mb-1.5 group-hover:gradient-text transition-all duration-500">
            {project.title}
          </h3>
          <p className="text-base text-slate-400 font-light mb-4 max-w-2xl">{project.tagline}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg font-bold transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {t.Icon && <t.Icon size={12} aria-hidden="true" />}
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="h-1 w-full bg-white/5 relative overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
    </div>

    <div className="p-5 md:p-6 border-t border-white/5 bg-white/[0.01]">
      <div className="grid md:grid-cols-3 gap-5 md:gap-6">
        <div className="space-y-2">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold" style={{ color: project.color }}>The Challenge</h4>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{project.challenge}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-primary">The Strategy</h4>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{project.solution}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-secondary">Impact</h4>
          <ul className="space-y-2">
            {project.results.map((r, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: project.color }} aria-hidden="true" />
                <span className="font-light flex-1">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300"
              aria-label={`View ${project.title} source on GitHub`}
            >
              <SiGithub size={14} aria-hidden="true" />
              <span>Source</span>
            </a>
          )}
        </div>

        <a
          href={`#/project/${project.id}`}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/20 transition-all duration-300 group/btn"
          aria-label={`View full documentation for ${project.title}`}
        >
          <span>Deep Dive</span>
          <ExternalLink size={13} className="text-slate-400 group-hover/btn:text-primary transition-colors" aria-hidden="true" />
        </a>
      </div>
    </div>
  </article>
);

const ProjectsMobile: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.project-mobile-item');
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
    <section ref={containerRef} id="projects" className="relative bg-transparent py-20 px-6">
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="mb-12">
          <p className="chapter-label mb-3">Chapter 04 — The Portfolio of Quests</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Digital <span className="gradient-text">Mastery.</span>
          </h2>
          <p className="text-slate-400 text-base font-light">
            A selection of high-fidelity mobile experiences where performance meets cinematic aesthetics.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="project-mobile-item w-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsDesktop: FC = () => {
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
    <section ref={containerRef} id="projects" className="relative bg-transparent">
      <div ref={pinWrapRef} className="h-screen w-full flex flex-col justify-center overflow-hidden pt-24">
        <div className="relative z-10 flex items-center h-full w-full">
          <div className="w-full overflow-visible">
            <div
              ref={trackRef}
              className="flex gap-8 items-stretch px-[10vw]"
              style={{ willChange: 'transform' }}
            >
              <div className="w-[85vw] sm:w-[400px] md:w-[480px] flex-shrink-0 flex flex-col justify-center pr-8 md:pr-12">
                <p className="chapter-label mb-3">Chapter 04 — The Portfolio of Quests</p>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter leading-none">
                  Digital <span className="gradient-text">Mastery.</span>
                </h2>
                <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
                  A selection of high-fidelity mobile experiences where performance meets cinematic aesthetics.
                </p>
                <div className="mt-8 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                  <span className="w-12 h-px bg-slate-800" aria-hidden="true" />
                  <span>Scroll down to explore</span>
                </div>
              </div>

              {projects.map((project) => (
                <div key={project.id} className="w-[90vw] sm:w-[550px] md:w-[820px] lg:w-[960px] flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects: FC = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <ProjectsDesktop /> : <ProjectsMobile />;
};

export default Projects;
