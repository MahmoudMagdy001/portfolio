import type { ComponentType, CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Globe,
  Compass,
  Armchair,
  Palette,
  Stethoscope,
  ShieldCheck,
  ShoppingBag,
  Zap
} from 'lucide-react';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiWordpress,
  SiVercel,
  SiJavascript
} from 'react-icons/si';

export interface TechItem {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }> | null;
}

export interface OtherProjectItem {
  id: number;
  slug: string;
  questNumber: string;
  title: string;
  arabicTitle: string;
  tagline: string;
  category: string;
  icon: LucideIcon;
  image: string;
  color: string;
  gradient: string;
  liveUrl: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: TechItem[];
}

// ponytail: static non-Flutter commercial web & e-commerce showcases
export const otherProjectsData: OtherProjectItem[] = [
  {
    id: 1,
    slug: 'elebtikar',
    questNumber: 'Web 01',
    title: 'Elebtikar SA',
    arabicTitle: 'مؤسسة الابتكار الرقمي',
    tagline: 'Enterprise digital transformation portal empowering Saudi Vision 2030 corporate solutions.',
    category: 'Corporate & Digital Solutions',
    icon: Globe,
    image: '/images/web/elebtikar.png',
    color: '#0284c7',
    gradient: 'from-sky-950/40 via-sky-900/20 to-blue-900/10',
    liveUrl: 'https://www.elebtikar-sa.com/',
    challenge:
      'Architecting an authoritative corporate web portal that communicates advanced digital services, institutional marketing, and business transformation while maintaining high performance and clear conversion pathways.',
    solution:
      'Engineered an SEO-first corporate application with interactive service showcases, responsive storytelling layouts, accessible typography, and streamlined consultation booking funnels.',
    results: [
      'High-impact corporate digital presence aligned with Saudi Vision 2030 standards',
      'Integrated lead capture and automated consultation scheduling funnels',
      'Fully responsive bilingual-ready UI with optimized Core Web Vitals performance'
    ],
    tech: [
      { name: 'React', Icon: SiReact },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Web Architecture', Icon: null },
      { name: 'SEO & Performance', Icon: null }
    ]
  },
  {
    id: 2,
    slug: 'milaftours',
    questNumber: 'Web 02',
    title: 'Milaf Tours',
    arabicTitle: 'ميلاف للسياحة والرحلات',
    tagline: 'End-to-end luxury travel, cruise & domestic tour package booking portal.',
    category: 'Travel & Tourism Engine',
    icon: Compass,
    image: '/images/web/milaf-tours.png',
    color: '#059669',
    gradient: 'from-emerald-950/40 via-emerald-900/20 to-teal-900/10',
    liveUrl: 'https://www.milaftours.com/',
    challenge:
      'Designing an immersive tourism marketplace capable of organizing complex itineraries, cruise reservations, seasonal promotions, and live multi-channel inquiries without interface clutter.',
    solution:
      'Crafted a destination explorer with dynamic tour package categorization, interactive cruise and flight details, rapid WhatsApp reservation hooks, and mobile-optimized booking flow.',
    results: [
      'Streamlined multi-category tour discovery (Cruises, International, Domestic KSA)',
      'Direct WhatsApp and hotline booking integration accelerating client inquiries',
      'Optimized high-resolution destination galleries with smooth lazy loading'
    ],
    tech: [
      { name: 'Modern Web', Icon: SiJavascript },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Booking Workflows', Icon: null },
      { name: 'Responsive UI', Icon: null }
    ]
  },
  {
    id: 3,
    slug: 'atelier-neon',
    questNumber: 'Web 03',
    title: 'S&I Atelier',
    arabicTitle: 'أتيليه الفخامة والتصميم الداخلي',
    tagline: 'Bespoke luxury furniture and interior design crafted for palaces and architectural residences.',
    category: 'Luxury Interiors & Bespoke Furniture',
    icon: Armchair,
    image: '/images/web/atelier-neon.png',
    color: '#d97706',
    gradient: 'from-amber-950/40 via-amber-900/20 to-yellow-900/10',
    liveUrl: 'https://atelier-neon-three.vercel.app/',
    challenge:
      'Translating high-end bespoke craftsmanship and architectural interior elegance into a digital boutique with editorial typography, cinematic dark aesthetic, and private consultation flows.',
    solution:
      'Built a dark-mode luxury showcase utilizing editorial serif typography, curated gallery reveals, smooth micro-interactions, and a VIP design consultation scheduling interface.',
    results: [
      'Editorial luxury dark aesthetic evoking exclusivity and architectural excellence',
      'Curated limited-edition furniture portfolios with immersive visual details',
      'Rapid Vercel deployment with instant page transitions and fluid interactions'
    ],
    tech: [
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'React', Icon: SiReact },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Vercel', Icon: SiVercel },
      { name: 'Luxury UI/UX', Icon: null }
    ]
  },
  {
    id: 4,
    slug: 'taibah-systems',
    questNumber: 'Web 04',
    title: 'Taibah Systems',
    arabicTitle: 'أنظمة طيبة الأمنية',
    tagline: 'Integrated surveillance, IoT smart home automation, and vehicle tracking systems store.',
    category: 'Security & Smart IoT Systems',
    icon: ShieldCheck,
    image: '/images/web/taibah-systems.png',
    color: '#16a34a',
    gradient: 'from-green-950/40 via-emerald-900/20 to-teal-900/10',
    liveUrl: 'https://taibah-systems.com/',
    challenge:
      'Presenting complex technical security hardware packages (CCTV, access control, smart home, anti-theft) with transparent split-tax pricing, installation options, and rapid checkout.',
    solution:
      'Delivered an e-commerce platform with Hikvision/Seagate hardware bundles, dynamic price calculation before and after tax, Tabby/Tamara split payments, and direct technical dispatch channels.',
    results: [
      'Comprehensive security package catalog with live equipment bundle configurations',
      'Integrated modern payment gateways including Tabby, Tamara, Mada, and Apple Pay',
      'Direct WhatsApp technician support hooks enabling immediate installation quotes'
    ],
    tech: [
      { name: 'E-Commerce', Icon: null },
      { name: 'Modern Web', Icon: SiJavascript },
      { name: 'Tabby & Tamara', Icon: null },
      { name: 'Security Tech', Icon: null }
    ]
  },
  {
    id: 5,
    slug: 'lasthome',
    questNumber: 'Web 05',
    title: 'Last Home SA',
    arabicTitle: 'لاست هوم للأثاث العصري',
    tagline: 'Contemporary luxury home furniture, bedroom sets, and dining room collections.',
    category: 'Modern Furniture E-Commerce',
    icon: ShoppingBag,
    image: '/images/web/lasthome.png',
    color: '#6366f1',
    gradient: 'from-indigo-950/40 via-violet-900/20 to-purple-900/10',
    liveUrl: 'https://lasthomesa.com/',
    challenge:
      'Organizing an extensive furniture catalog across 10+ categories with promotional campaign banners, coupon redemption workflows, and responsive category mega-menus.',
    solution:
      'Constructed a modern e-commerce storefront featuring faceted product filtering, promotional coupon logic, Tabby/Tamara installment widgets, and a friction-free mobile cart drawer.',
    results: [
      'Effortless navigation across dozens of furniture categories with intuitive mega-menu',
      'High-converting promotional campaign banners and automated coupon discount engine',
      'Mobile-first checkout experience with real-time cart persistence and wishlist'
    ],
    tech: [
      { name: 'E-Commerce', Icon: null },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'Faceted Search', Icon: null },
      { name: 'Payment Systems', Icon: null }
    ]
  },
  {
    id: 6,
    slug: 'saqer-medical',
    questNumber: 'Web 06',
    title: 'Saqer Elsahraa Medical',
    arabicTitle: 'صقر الصحراء الطبية',
    tagline: 'Certified medical supplies, diagnostic devices, and specialized home healthcare equipment.',
    category: 'Healthcare & Medical Supplies',
    icon: Stethoscope,
    image: '/images/web/saqer-elsahraa.png',
    color: '#0d9488',
    gradient: 'from-teal-950/40 via-cyan-900/20 to-sky-900/10',
    liveUrl: 'https://saqerelsahraamedical.com/',
    challenge:
      'Structuring specialized clinical and home medical equipment (hospital beds, electric wheelchairs, monitoring kits) demanding clear technical specs, trust badges, and reliable ordering.',
    solution:
      'Implemented a trustworthy healthtech storefront with categorized medical collections, seasonal healthcare promotions, certified product guarantees, and emergency delivery contact options.',
    results: [
      'Verified medical-grade product catalog with clear specifications and warranty markers',
      'Fast-track healthcare procurement with real-time consultation and ordering channels',
      'Accessible medical color system with high readability and patient trust signals'
    ],
    tech: [
      { name: 'HealthTech Web', Icon: null },
      { name: 'E-Commerce Store', Icon: null },
      { name: 'Payment Gateways', Icon: null },
      { name: 'Modern UI/UX', Icon: null }
    ]
  },
  {
    id: 7,
    slug: 'samurai-man',
    questNumber: 'Web 07',
    title: 'Samurai Man',
    arabicTitle: 'متجر رجل الساموراي',
    tagline: 'Premium authentic Korean Red Ginseng natural supplements for vitality and endurance.',
    category: 'Health & Natural Supplements',
    icon: Zap,
    image: '/images/web/samurai-man.png',
    color: '#dc2626',
    gradient: 'from-red-950/40 via-rose-900/20 to-orange-900/10',
    liveUrl: 'https://samurai-man.com/ar',
    challenge:
      'Building a high-energy single-niche e-commerce brand that establishes immediate authority, educates customers on Korean Ginseng benefits, and maximizes checkout conversion.',
    solution:
      'Engineered an impactful product landing and storefront with cinematic imagery, educational benefits breakdown, bundle discount incentives, and frictionless express checkout.',
    results: [
      'Distinctive visual branding tailored to athletic performance and natural vitality',
      'Educational product storytelling highlighting Korean Red Ginseng extraction and science',
      'One-click express checkout supporting local Saudi payment gateways and split payments'
    ],
    tech: [
      { name: 'Brand Strategy', Icon: null },
      { name: 'E-Commerce CRO', Icon: null },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'Checkout Optimization', Icon: null }
    ]
  },
  {
    id: 8,
    slug: 'tionystudio',
    questNumber: 'Web 08',
    title: 'Tiony Studio',
    arabicTitle: 'استوديو تيوني الإبداعي',
    tagline: 'Creative digital agency crafting brand identities, visual storytelling, and bespoke web platforms.',
    category: 'Creative Studio & Brand Strategy',
    icon: Palette,
    image: '/images/web/tiony-studio.png',
    color: '#8b5cf6',
    gradient: 'from-purple-950/40 via-violet-900/20 to-fuchsia-900/10',
    liveUrl: 'https://tionystudio.com/',
    challenge:
      'Creating an agency presence designed to build anticipation for upcoming bespoke digital design services, client showcases, and creative campaigns.',
    solution:
      'Built a minimalist upcoming digital studio portal with bold typography, modern branding, client connection hooks, and high-performance cloud hosting.',
    results: [
      'Bold minimalist branding anticipating the agency’s full creative portfolio launch',
      'High-speed cloud-hosted platform optimized for visual agency presentations'
    ],
    tech: [
      { name: 'WordPress', Icon: SiWordpress },
      { name: 'Brand Identity', Icon: null },
      { name: 'Creative Direction', Icon: null },
      { name: 'Cloud Hosting', Icon: null }
    ]
  }
];
