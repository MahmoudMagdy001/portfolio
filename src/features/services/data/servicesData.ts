import {
  Smartphone,
  Globe,
  ShoppingBag,
  Database,
  Layers,
  Palette,
  Code,
  Users,
  Shield,
  Zap,
  RefreshCw,
  type LucideIcon
} from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

export interface PrincipleItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

// ponytail: 6 curated high-impact services covering Mobile, Web, E-Commerce, Cloud, Architecture & UI/UX
export const services: readonly ServiceItem[] = [
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Pixel-perfect Flutter apps for iOS & Android with buttery-smooth 60fps fluidity, offline resilience, and cinematic native UX.',
    tags: ['Flutter', 'iOS & Android', 'BLoC / Cubit'],
    color: '#6366f1'
  },
  {
    icon: Globe,
    title: 'Web & Digital Platforms',
    description: 'High-performance responsive web applications and portals built with React, Next.js, and TypeScript for blazing speed and SEO.',
    tags: ['React / Next.js', 'TypeScript', 'Tailwind CSS'],
    color: '#0284c7'
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce Architecture',
    description: 'Turnkey digital storefronts with dynamic catalogs, advanced faceted search, cart state, and Saudi payments (Mada, Tabby, Tamara).',
    tags: ['Storefronts', 'Payment Gateways', 'Checkout CRO'],
    color: '#10b981'
  },
  {
    icon: Database,
    title: 'Cloud & API Integration',
    description: 'Scalable data layers connecting RESTful endpoints, Firebase Auth & Firestore, Cloud microservices, FCM push, and real-time WebSockets.',
    tags: ['REST APIs', 'Firebase & Cloud', 'WebSockets'],
    color: '#06b6d4'
  },
  {
    icon: Layers,
    title: 'Clean Architecture',
    description: 'Scalable 3-layer architecture (Presentation → Domain ← Data) with dependency injection and Either-based failure handling. Built to last.',
    tags: ['Domain-Driven', 'Modular Scale', 'SafeBloc'],
    color: '#8b5cf6'
  },
  {
    icon: Palette,
    title: 'UI/UX & Performance',
    description: 'Translating Figma designs into living widgets and web components with 60fps micro-animations, profiling, and design tokens.',
    tags: ['Figma to Code', '60fps UI', 'Design Systems'],
    color: '#f43f5e'
  }
];

export const principles: readonly PrincipleItem[] = [
  {
    icon: Code,
    title: 'Clean Code',
    description: "Every line written as if someone brilliant — and critical — will review it tomorrow. Readability is not a bonus, it's the foundation.",
    color: '#6366f1'
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Systems designed to grow. 3-layer Clean Architecture ensures features can be added without breaking what already works.',
    color: '#8b5cf6'
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: "60fps isn't a goal — it's the contract with users. Every widget, render, and allocation is a deliberate choice.",
    color: '#f59e0b'
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Apps and platforms are stories told to users through motion, hierarchy, and clarity. Technology serves humanity.',
    color: '#06b6d4'
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Error handling is not an afterthought. Either<Failure, Success> thinking means failures are first-class citizens of design.',
    color: '#10b981'
  },
  {
    icon: RefreshCw,
    title: 'Maintainability',
    description: 'Software is living craftsmanship. Code written today must be a gift to the developer who inherits it months — or years — from now.',
    color: '#f43f5e'
  }
];
