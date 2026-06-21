import { Smartphone, Zap, Globe, Database, Layers, Palette, Code, Users, Shield, RefreshCw } from 'lucide-react';

export const services = [
  { icon: Smartphone, title: 'Mobile Applications',   description: 'Pixel-perfect Flutter apps for iOS and Android with buttery-smooth 60fps performance and cinematic UX.', tags: ['Flutter', 'iOS', 'Android'],            color: '#6366f1' },
  { icon: Globe,      title: 'Backend Integration',    description: 'Seamless connection between your app and backend — REST APIs, real-time sockets, and GraphQL.',           tags: ['REST', 'WebSocket', 'GraphQL'],          color: '#06b6d4' },
  { icon: Database,   title: 'Firebase Solutions',     description: 'Full-stack cloud integration — real-time Cloud Firestore databases, Firebase Auth, cloud functions, and crash reporting.', tags: ['Firestore', 'Auth', 'FCM'], color: '#10b981' },
  { icon: Zap,        title: 'Performance Optimization', description: 'Deep-dive profiling and optimization. Faster renders, better memory usage, and improved startup time.', tags: ['Slivers', 'Caching', 'Profiling'],      color: '#f59e0b' },
  { icon: Layers,     title: 'Clean Architecture',     description: 'Scalable 3-layer architecture with Domain, Data, and Presentation layers. Built to last for years.',      tags: ['BLoC', 'GetIt', 'fpdart'],              color: '#8b5cf6' },
  { icon: Palette,    title: 'UI Implementation',      description: 'Translating Figma designs into living, breathing Flutter widgets with precision and artistry.',            tags: ['Custom Widgets', 'Animations', 'Responsive'], color: '#f43f5e' },
];

export const principles = [
  { icon: Code,      title: 'Clean Code',           description: "Every line written as if someone brilliant — and critical — will review it tomorrow. Readability is not a bonus, it's the foundation.", color: '#6366f1' },
  { icon: Layers,    title: 'Scalable Architecture', description: 'Systems designed to grow. 3-layer Clean Architecture ensures features can be added without breaking what already works.',              color: '#8b5cf6' },
  { icon: Zap,       title: 'Performance First',     description: "60fps isn't a goal — it's the contract with users. Every widget, every rebuild, every allocation is a deliberate choice.",             color: '#f59e0b' },
  { icon: Users,     title: 'User Experience',       description: 'Apps are stories told to users through motion, hierarchy, and clarity. Technology serves humanity, not the other way around.',         color: '#06b6d4' },
  { icon: Shield,    title: 'Reliability',           description: 'Error handling is not an afterthought. Either<Failure, Success> thinking means failures are first-class citizens of design.',          color: '#10b981' },
  { icon: RefreshCw, title: 'Maintainability',       description: 'Software is a living thing. Code written today must be a gift to the developer who inherits it months — or years — from now.',        color: '#f43f5e' },
];
