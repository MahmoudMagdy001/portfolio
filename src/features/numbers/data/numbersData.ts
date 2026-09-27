export interface NumberStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const stats: readonly NumberStat[] = [
  { value: 4,    suffix: '+', label: 'Years Experience',  description: 'Mastering Flutter and Dart with strict Clean Architecture' },
  { value: 12,   suffix: '+', label: 'Production Platforms', description: 'Enterprise mobile applications and commercial digital systems delivered' },
  { value: 40,   suffix: '+', label: 'Architectural Skills', description: 'Flutter, Dart 3, Clean Arch, BLoC, Firebase suite, Supabase, Genkit AI & Patrol' },
  { value: 3500, suffix: '+', label: 'Hours Coding',      description: 'Crafting responsive UI, robust modules, and resilient cloud integrations' },
];
