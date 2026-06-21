import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Home, ShoppingCart, Heart, MessageSquare, GraduationCap, Music, Users, Truck, BookOpen } from 'lucide-react';
import { SiGithub, SiFlutter, SiFirebase, SiDart, SiSupabase, SiGooglemaps } from 'react-icons/si';
import { projectsDetailData } from '../data/projectsDetailData';

const projectMeta = {
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
      { name: 'BLoC', Icon: null },
      { name: 'just_audio', Icon: null },
      { name: 'adhan', Icon: null },
      { name: 'Codemagic', Icon: null },
    ]
  },
  'cancer-detection': {
    icon: Heart,
    gradient: 'from-rose-900/20 to-pink-900/10',
    challenge:
      'Building a reliable clinical-grade Flutter client for colorectal cancer risk assessment that communicates with a trained ML backend, manages patient records, tracks tumor markers over time, and visualizes longitudinal data with charts.',
    solution:
      'Integrated Supabase as the backend for secure patient data storage and ML API calls. Implemented tumor marker charts for longitudinal tracking, gene analysis input forms with rigorous validation, fast patient search, and drug tracking workflows.',
    results: [
      'ML-backed risk prediction with instant probability feedback',
      'Time-series tumor marker charts with Supabase persistence',
      'Comprehensive patient profiles: drugs, genes, and diagnostic history',
      'Colon cancer news feed and educational content integration',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Supabase', Icon: SiSupabase },
      { name: 'ML API', Icon: null },
      { name: 'Charts', Icon: null },
    ]
  },
  'mansy-learning': {
    icon: GraduationCap,
    gradient: 'from-purple-900/20 to-fuchsia-900/10',
    challenge:
      'Delivering a fluid e-learning experience supporting course catalogs, video lectures, downloadable resources, interactive quizzes, progress tracking, role-based access control, and a subscription enrollment flow backed by a serverless Supabase backend.',
    solution:
      'Built with Feature-First MVVM using Cubit for state and Supabase for auth, storage, and real-time data. Integrated GoRouter for declarative role-based navigation, SharedPreferences for local progress caching, and a premium RTL-ready design system with Cairo typography.',
    results: [
      'Full subscription flow with course enrollment and access control',
      'Video lectures, PDF downloads, and interactive quiz modules',
      'RTL-ready bilingual UI (Arabic / English) with Cairo design tokens',
      'Persistent progress tracking with Supabase real-time sync',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'Supabase', Icon: SiSupabase },
      { name: 'Cubit', Icon: null },
      { name: 'go_router', Icon: null },
      { name: 'GetIt', Icon: null },
    ]
  },
  'music-player': {
    icon: Music,
    gradient: 'from-amber-900/20 to-orange-900/10',
    challenge:
      'Building a cross-platform (Android, iOS, macOS, Linux) local music player with smooth playlist management, background audio, lock-screen controls, and a visually polished interface — all without relying on any streaming backend.',
    solution:
      "Leveraged Flutter's multi-platform capabilities with a native audio engine for device library scanning, background playback, and system media session integration. Implemented playlist queuing, shuffle/repeat logic, and an immersive now-playing screen with album art.",
    results: [
      'Cross-platform: Android, iOS, macOS & Linux from one codebase',
      'Background playback with system lock-screen media controls',
      'Full playlist management: create, edit, shuffle & repeat',
      'Immersive now-playing UI with animated album artwork',
    ],
    tech: [
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Dart', Icon: SiDart },
      { name: 'just_audio', Icon: null },
      { name: 'BLoC', Icon: null },
      { name: 'Multi-Platform', Icon: null },
    ]
  }
};

const projects = Object.entries(projectsDetailData).map(([slug, detail], index) => {
  const meta = projectMeta[slug] || {};
  return {
    id: index + 1,
    slug,
    chapter: detail.questNumber.replace('Quest ', ''),
    title: detail.title,
    tagline: detail.tagline,
    category: detail.category,
    icon: meta.icon || BookOpen,
    logo: detail.overview.walkthrough.fallbackImg,
    color: detail.color,
    challenge: meta.challenge || detail.overview.goalDesc1,
    solution: meta.solution || detail.overview.goalDesc2,
    results: meta.results || detail.overview.outcomes,
    tech: meta.tech || [],
    link: detail.repository,
    github: detail.repository,
    gradient: meta.gradient || 'from-slate-900/20 to-slate-900/10'
  };
});

const cardLinkHover = { y: -2 };
const cardLinkTap   = { scale: 0.98 };

// Logo box — shows the real app logo if provided, else falls back to the lucide icon
const ProjectLogo = ({ project, size = 28, boxClass = '' }) => {
  const [imgErr, setImgErr] = useState(false);

  if (project.logo && !imgErr) {
    return (
      <div
        className={`flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-500 ${boxClass}`}
        style={{ boxShadow: `0 0 30px ${project.color}15` }}
      >
        <img
          src={project.logo}
          alt={`${project.title} logo`}
          onError={() => setImgErr(true)}
          className="w-3/4 h-3/4 object-contain"
          style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.08))' }}
        />
      </div>
    );
  }

  const Icon = project.icon;
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-500 ${boxClass}`}
      style={{ boxShadow: `0 0 30px ${project.color}10` }}
    >
      <Icon size={size} style={{ color: project.color }} />
    </div>
  );
};

// Watermark background logo
const ProjectWatermark = ({ project }) => {
  const [imgErr, setImgErr] = useState(false);

  if (project.logo && !imgErr) {
    return (
      <div className="absolute -right-8 -top-8 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-700 group-hover:scale-110 w-[220px] h-[220px]" aria-hidden="true">
        <img
          src={project.logo}
          alt=""
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

const ProjectCard = ({ project }) => (
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
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-white/5 bg-white/5" style={{ color: project.color }}>
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
          <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold" style={{ color: project.color }}>The Challenge</h5>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{project.challenge}</p>
        </div>
        <div className="space-y-2">
          <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-primary">The Strategy</h5>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{project.solution}</p>
        </div>
        <div className="space-y-2">
          <h5 className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-secondary">Impact</h5>
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

      <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-white/5">
        <motion.a
          href={`#/project/${project.slug}`}
          whileHover={cardLinkHover}
          whileTap={cardLinkTap}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white shadow-lg transition-all duration-300"
          style={{ backgroundColor: project.color, boxShadow: `0 10px 20px ${project.color}30` }}
        >
          View Case Study <ExternalLink size={14} aria-hidden="true" />
        </motion.a>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={cardLinkHover}
          whileTap={cardLinkTap}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white glass border border-white/10 hover:bg-white/5 transition-all duration-300"
        >
          <SiGithub size={16} aria-hidden="true" /> Repository
        </motion.a>
      </div>
    </div>
  </article>
);

const Projects = () => {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const [endX, setEndX] = useState(0);

  const updateEndX = useCallback(() => {
    if (trackRef.current) {
      const track    = trackRef.current;
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

  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, endX]);

  return (
    <section ref={containerRef} id="projects" className="relative h-[420vh] bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-24">

        <div className="relative z-10 flex items-center h-full w-full">
          <div className="w-full overflow-visible">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-8 items-stretch px-[10vw]"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
