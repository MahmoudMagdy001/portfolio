export interface Milestone {
  year: string;
  title: string;
  description: string;
  color: string;
}

export const milestones: readonly Milestone[] = [
  {
    year: '2019',
    title: 'Curiosity',
    description:
      'During my final year at university, I discovered Flutter and instantly became fascinated by the idea of building beautiful applications for multiple platforms from a single codebase. What started as curiosity quickly became a passion.',
    color: '#6366f1',
  },
  {
    year: '2020',
    title: 'Learning',
    description:
      'Spent countless hours exploring Dart, Flutter widgets, layouts, navigation, and APIs. Moved beyond tutorials and started building complete applications while developing a strong foundation in mobile development.',
    color: '#10b981',
  },
  {
    year: '2021',
    title: 'Discipline',
    description:
      'Began focusing on software architecture, clean code, state management, and reusable components. Learned how professional applications are structured and how maintainable products are built.',
    color: '#06b6d4',
  },
  {
    year: '2022',
    title: 'Professionalism',
    description:
      'Started working on real-world projects and transforming ideas into production-ready applications. Gained experience with authentication, backend integration, performance optimization, and deployment.',
    color: '#ec4899',
  },
  {
    year: '2023',
    title: 'Growth',
    description:
      'Expanded into multiple industries including healthcare, education, media, and business solutions. Every project introduced new challenges, pushing my technical and problem-solving abilities further.',
    color: '#8b5cf6',
  },
  {
    year: '2024',
    title: 'Ownership',
    description:
      'Took end-to-end architectural ownership from system design to production delivery. Standardized Feature-First Clean Architecture, integrated full Firebase cloud suites, and enforced regression-proof testing.',
    color: '#f59e0b',
  },
  {
    year: '2025',
    title: 'Scale & Systems',
    description:
      'Scaled multi-module enterprise platforms across logistics, real estate, commerce, and media. Adopted Dart 3 modern standards, Supabase, Genkit AI flows, and automated Patrol E2E testing suites.',
    color: '#14b8a6',
  },
  {
    year: 'Today',
    title: 'Architecting the Future',
    description:
      'Engineering the next generation of intelligent, cloud-native mobile ecosystems — fusing 60fps Flutter craft with autonomous agentic intelligence and production-grade resilience.',
    color: '#f43f5e',
  },
];
