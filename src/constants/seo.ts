export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  author: string;
  url: string;
  ogImage: string;
  themeColor: string;
}

// ponytail: single source of truth for all SEO metadata
export const SEO: SeoConfig = {
  title: 'Mahmoud Magdy Mansour — Flutter Developer',
  description:
    'Mahmoud Magdy Mansour is a Flutter Developer specializing in Clean Architecture, BLoC state management, Firebase, and high-performance cross-platform mobile engineering.',
  keywords:
    'Mahmoud Magdy Mansour, Flutter Developer, Dart, Clean Architecture, BLoC, Firebase, Mobile Development, Flutter Engineer, Egypt',
  author: 'Mahmoud Magdy Mansour',
  url: 'https://mahmoudmagdy.dev/',
  ogImage: 'https://mahmoudmagdy.dev/og-image.jpg',
  themeColor: '#020617',
};
